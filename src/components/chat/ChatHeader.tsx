
import { Calendar, Mic } from 'lucide-react';
import { Button } from '../ui/button';

interface ChatHeaderProps {
  handleBookAppointment: () => void;
  handleVoiceChat: () => void;
  toggleChat: () => void;
}

const ChatHeader = ({ 
  handleBookAppointment, 
  handleVoiceChat, 
  toggleChat 
}: ChatHeaderProps) => {
  return (
    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-secondary/80 to-primary/80">
      <div className="flex items-center space-x-2">
        <div className="text-white font-bold">AI Assistent</div>
      </div>
      <div className="flex flex-col space-y-2">
        <Button 
          onClick={handleBookAppointment}
          size="sm" 
          variant="outline"
          className="text-xs bg-black/20 text-white border-white/20 hover:bg-black/40"
        >
          <Calendar className="mr-1 h-3 w-3" /> Termin buchen
        </Button>
        <Button 
          onClick={handleVoiceChat}
          size="sm" 
          variant="outline"
          className="text-xs bg-black/20 text-white border-white/20 hover:bg-black/40"
        >
          <Mic className="mr-1 h-3 w-3" /> Sprachchat
        </Button>
        <Button 
          onClick={toggleChat} 
          variant="ghost"
          size="sm"
          className="text-white hover:bg-black/20 p-1"
        >
          ✕
        </Button>
      </div>
    </div>
  );
};

export default ChatHeader;
