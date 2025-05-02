
// Event types from the backend
export type EventType = 'chunk' | 'tool_use' | 'tool_output' | 'end';

// Tool types
export type ToolType = 'get_weather' | 'get_dealership_address' | 'check_appointment_availability' | 'schedule_appointment';

// Base event interface
export interface BaseEvent {
  type: EventType;
}

// Chunk event (text from the AI)
export interface ChunkEvent extends BaseEvent {
  type: 'chunk';
  content: string;
}

// Tool use event (when the AI decides to use a tool)
export interface ToolUseEvent extends BaseEvent {
  type: 'tool_use';
  tool: ToolType;
  tool_input: Record<string, any>;
}

// Tool output event (result of a tool execution)
export interface ToolOutputEvent extends BaseEvent {
  type: 'tool_output';
  tool: ToolType;
  output: any;
}

// End event (signals the end of the response)
export interface EndEvent extends BaseEvent {
  type: 'end';
}

// Union type for all event types
export type StreamEvent = ChunkEvent | ToolUseEvent | ToolOutputEvent | EndEvent;

// Chat message types
export type MessageRole = 'user' | 'assistant' | 'system';

// Base message interface
export interface BaseMessage {
  id: string;
  role: MessageRole;
  createdAt: Date;
}



export type TextMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

export type ToolMessage = {
  id: string;
  role: "tool";
  content: any;
  tool: string;


};

export type ChatMessage = TextMessage | ToolMessage;





