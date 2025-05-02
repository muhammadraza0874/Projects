import React from "react";
import { ChatMessage as ChatMessageType, ToolType } from "@/types";
import WeatherInfo from "./ToolOutputs/WeatherInfo";
import DealershipAddress from "./ToolOutputs/DealershipAddress";
import AppointmentAvailability from "./ToolOutputs/AppointmentAvailability";
import AppointmentConfirmation from "./ToolOutputs/AppointmentConfirmation";
import LoadingIndicator from "./LoadingIndicator";
import { Zap } from "lucide-react";

interface ChatMessageProps {
  message: ChatMessageType;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  if (message.role === "user") {
    return (
      <div className="flex justify-end mb-4 animate-fade-in">
        <div className="user-message">
          <p>{(message as any)?.content}</p>
        </div>
      </div>
    );
  }

  // Tool message handling for assistant
  if ("tool" in message) {
    return (
      <div className="flex flex-col mb-4 max-w-[85%]">
        <div className="flex items-center mb-1 ml-1">
          <Zap className="h-4 w-4 text-primary mr-1" />
          <span className="text-xs text-muted-foreground">
            Lex used a tool to get information
          </span>
        </div>

        {message.tool === "get_weather" && (
          <WeatherInfo data={message.content} />
        )}

        {message.tool === "get_dealership_address" && (
          <DealershipAddress data={message.content} />
        )}

        {message.tool === "check_appointment_availability" && (
          <AppointmentAvailability data={message.content} />
        )}

        {message.tool === "schedule_appointment" && (
          <AppointmentConfirmation data={message.content} />
        )}
      </div>
    );
  }

  // Text message for assistant
  return (
    <div className="flex flex-col mb-4">
      <div className="assistant-message">
        <p className="whitespace-pre-wrap">{(message as any).content}</p>

        {!(message as any)?.isComplete && (
          <div className="mt-2">
            <LoadingIndicator variant="dots" size="sm" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
