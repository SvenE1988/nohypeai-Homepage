
import React from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Volume, VolumeX, PhoneOff } from 'lucide-react';
import type { CallStatus } from '@/types/voiceBot';

interface VoiceBotControlsProps {
  status: CallStatus;
  isMicMuted: boolean;
  isSpeakerMuted: boolean;
  onMicToggle: () => void;
  onSpeakerToggle: () => void;
  onStop: () => void;
}

const VoiceBotControls = ({
  status,
  isMicMuted,
  isSpeakerMuted,
  onMicToggle,
  onSpeakerToggle,
  onStop,
}: VoiceBotControlsProps) => {
  const isActive = status !== 'idle' && status !== 'disconnected';
  
  const getStatusIndicator = () => {
    switch(status) {
      case 'connecting':
        return <div className="flex items-center gap-2 px-3 py-1 bg-yellow-500/20 text-yellow-300 rounded-full text-xs">
          <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
          Verbinden...
        </div>;
      case 'listening':
        return <div className="flex items-center gap-2 px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-xs">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          Hört zu
        </div>;
      case 'thinking':
        return <div className="flex items-center gap-2 px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs">
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
          Verarbeitet
        </div>;
      case 'speaking':
        return <div className="flex items-center gap-2 px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs">
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
          Spricht
        </div>;
      case 'idle':
        return <div className="flex items-center gap-2 px-3 py-1 bg-gray-500/20 text-gray-300 rounded-full text-xs">
          <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
          Bereit
        </div>;
      case 'disconnected':
        return <div className="flex items-center gap-2 px-3 py-1 bg-gray-500/20 text-gray-300 rounded-full text-xs">
          <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
          Getrennt
        </div>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        {getStatusIndicator()}
      </div>
      
      <div className="flex items-center justify-center gap-4">
        <Button
          onClick={onMicToggle}
          variant="outline"
          disabled={!isActive}
          className={`rounded-full p-2 h-10 w-10 ${isMicMuted ? 'bg-red-500/20 border-red-500/50' : 'bg-green-500/20 border-green-500/50'}`}
        >
          {isMicMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
        </Button>
        
        <Button
          onClick={onSpeakerToggle}
          variant="outline"
          disabled={!isActive}
          className={`rounded-full p-2 h-10 w-10 ${isSpeakerMuted ? 'bg-red-500/20 border-red-500/50' : 'bg-blue-500/20 border-blue-500/50'}`}
        >
          {isSpeakerMuted ? <VolumeX className="h-5 w-5" /> : <Volume className="h-5 w-5" />}
        </Button>
        
        <Button
          onClick={onStop}
          variant="outline"
          disabled={!isActive}
          className="rounded-full p-2 h-10 w-10 bg-red-500/20 border-red-500/50"
        >
          <PhoneOff className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default VoiceBotControls;
