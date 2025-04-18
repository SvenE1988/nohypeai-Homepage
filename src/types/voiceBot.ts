
export type CallStatus = 
  | 'idle'
  | 'connecting'
  | 'active'
  | 'error'
  | 'completed';

export interface CallMessage {
  text: string;
  timestamp: Date;
  type: 'status' | 'error' | 'info';
}
