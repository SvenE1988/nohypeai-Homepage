
export type CallStatus = 
  | 'disconnected'
  | 'connecting'
  | 'idle'
  | 'listening'
  | 'thinking'
  | 'speaking'
  | 'error'
  | 'completed';

export interface CallMessage {
  text: string;
  timestamp: Date;
  type: 'status' | 'error' | 'info';
}

export interface Transcript {
  text: string;
  isFinal: boolean;
  speaker: 'user' | 'agent';
  medium: 'voice' | 'text';
}
