"use client";
import React, { useState, useRef, useEffect } from "react";
import { nanoid } from "nanoid";
import { ChatMessage, ToolMessage } from "@/types";
import { API_BASE_URL, generateSessionId } from "@/lib/utils";
import ChatMessageComponent from "./ChatMessage";
import LoadingIndicator from "./LoadingIndicator";
import { Send, Zap } from "lucide-react";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [sessionId] = useState(() => generateSessionId());
  const [toolInUse, setToolInUse] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = `${Math.min(
        inputRef.current.scrollHeight,
        150
      )}px`;
    }
  }, [input]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleFormRequest = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: nanoid(),
      role: "user",
      content: input.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Create a message ID for the assistant's response that we'll build up incrementally
    const assistantMessageId = nanoid();
    let currentAssistantMessage = "";

    // Add an initial empty message from the assistant
    setMessages((prev) => [
      ...prev,
      {
        id: assistantMessageId,
        role: "assistant",
        content: "",
      },
    ]);

    const abortController = new AbortController();

    try {
      const response = await fetch(`${API_BASE_URL}/query`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "text/event-stream",
        },
        body: JSON.stringify({ query: input.trim(), session_id: sessionId }),
        signal: abortController.signal,
      });

      if (!response.ok || !response.body) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let partialData = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        partialData += decoder.decode(value, { stream: true });

        // const events = partialData.split("\n\n");
        const events = partialData.replace(/\r\n/g, "\n").split("\n\n");

        for (let i = 0; i < events.length; i++) {
          const event = events[i].trim();

          if (!event) continue;

          const lines = event.split("\n");
          const eventTypeLine = lines.find((line) => line.startsWith("event:"));
          const dataLine = lines.find((line) => line.startsWith("data:"));

          if (eventTypeLine && dataLine) {
            const eventType = eventTypeLine.replace("event: ", "").trim();
            let data = dataLine.replace("data: ", "").trim();

            // Handle different event types
            switch (eventType) {
              case "chunk":
                // For text chunks, update the current assistant message

                const cleanedData = data.replace(/^data:\s*/, "").trim();
                currentAssistantMessage +=
                  currentAssistantMessage.endsWith(" ") ||
                  cleanedData.startsWith(" ")
                    ? cleanedData
                    : " " + cleanedData;

                setMessages((prev) =>
                  prev.map((msg) =>
                    msg.id === assistantMessageId
                      ? { ...msg, content: currentAssistantMessage }
                      : msg
                  )
                );
                break;

              case "tool_use":
                // Set the tool in use indicator
                try {
                  const toolData = JSON.parse(data);
                  setToolInUse(toolData.name);
                } catch (error) {
                  console.error("Error parsing tool_use data:", error);
                }
                break;

              case "tool_output":
                // Handle tool output - parse the JSON
                try {
                  const toolOutput = JSON.parse(data);
                  // Add a new message for the tool output
                  setMessages((prev) => [
                    ...prev,
                    {
                      id: nanoid(),
                      role: "tool",
                      content: toolOutput.output,
                      tool: toolOutput.name,
                    } as ToolMessage,
                  ]);
                  // Clear the tool in use indicator
                  setToolInUse(null);
                } catch (error) {
                  console.error("JSON parsing error:", error);
                }
                break;

              case "end":
                // Handle end of stream
                setToolInUse(null);
                setMessages((prev) =>
                  prev.map((msg) =>
                    msg.id === assistantMessageId
                      ? { ...msg, isComplete: true }
                      : msg
                  )
                );
                break;
            }
          }
        }

        partialData = events[events.length - 1];
      }
    } catch (error) {
      console.error("Error fetching stream:", error);
      toast.error("Failed to connect to the assistant");
    } finally {
      setToolInUse(null);
    }
  };

  const mutation = useMutation({
    mutationFn: handleFormRequest,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate();
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  // Handle keyboard shortcuts
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };
  return (
    <div className="flex flex-col h-full">
      {/* Chat header */}
      <div className="glass-panel p-4 flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="h-10 w-10 bg-primary rounded-full flex items-center justify-center mr-3">
            <Zap className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="font-semibold text-lg">Lex</h2>
            <p className="text-xs text-muted-foreground">
              SuperCar Virtual Sales Assistant
            </p>
          </div>
        </div>

        {toolInUse && (
          <div className="flex items-center bg-secondary px-3 py-1 rounded-full">
            <LoadingIndicator variant="spinner" size="sm" className="mr-2" />
            <span className="text-xs">
              Using {toolInUse.replace(/_/g, " ")}
            </span>
          </div>
        )}
      </div>

      {/* Messages container */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="glass-panel p-6 max-w-md animate-fade-in">
              <Zap className="h-10 w-10 text-primary mx-auto mb-4" />
              <h2 className="font-semibold text-xl mb-2">
                Welcome to SuperCar Assistant
              </h2>
              <p className="text-muted-foreground mb-4">
                I'm Lex, your virtual sales assistant. How can I help you with
                your SuperCar journey today?
              </p>
              <div className="grid grid-cols-1 gap-2 text-sm">
                <button
                  className="button-secondary text-left px-3 py-2"
                  onClick={() =>
                    setInput("What's the weather like in Miami today?")
                  }
                >
                  "What's the weather like in Miami today?"
                </button>
                <button
                  className="button-secondary text-left px-3 py-2"
                  onClick={() =>
                    setInput(
                      "Can you show me the address of your dealership in New York?"
                    )
                  }
                >
                  "Can you show me the address of your dealership in New York?"
                </button>
                <button
                  className="button-secondary text-left px-3 py-2"
                  onClick={() =>
                    setInput(
                      "I'd like to schedule a test drive for the new Model S."
                    )
                  }
                >
                  "I'd like to schedule a test drive for the new Model S."
                </button>
              </div>
            </div>
          </div>
        ) : (
          messages.map((message) => (
            <ChatMessageComponent key={message.id} message={message} />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="glass-panel p-4 mt-4">
        <form onSubmit={handleSubmit} className="flex items-end">
          <textarea
            ref={inputRef}
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="flex-1 resize-none rounded-xl border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring min-h-[45px] max-h-[150px]"
            disabled={mutation.isPending}
          />
          <button
            type="submit"
            className="ml-2 rounded-full p-2 h-10 w-10 flex items-center justify-center bg-primary text-primary-foreground disabled:opacity-50 transition-all hover:bg-primary/90 active:scale-95"
            disabled={mutation.isPending || !input.trim()}
          >
            {mutation.isPending ? (
              <svg
                aria-hidden="true"
                role="status"
                className="inline  w-4 h-4 text-white animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB"
                ></path>
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                ></path>
              </svg>
            ) : (
              <Send className="h-5 w-5" />
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;
