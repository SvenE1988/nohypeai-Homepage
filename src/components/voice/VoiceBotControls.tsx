
import React from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Speaker, SpeakerOff } from 'lucide-react';
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

  return (
    <div className="flex items-center justify-center gap-4">
      <Button
        onClick={onMicToggle}
        variant="outline"
        disabled={!isActive}
        className={isMicMuted ? 'bg-red-500/10' : ''}
      >
        {isMicMuted ? <MicOff /> : <Mic />}
      </Button>
      <Button
        onClick={onSpeakerToggle}
        variant="outline"
        disabled={!isActive}
        className={isSpeakerMuted ? 'bg-red-500/10' : ''}
      >
        {isSpeakerMuted ? <SpeakerOff /> : <Speaker />}
      </Button>
      <Button
        onClick={onStop}
        variant="destructive"
        disabled={!isActive}
      >
        Beenden
      </Button>
    </div>
  );
};

export default VoiceBotControls;
