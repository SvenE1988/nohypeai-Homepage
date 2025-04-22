
import { Calendar, Mic } from 'lucide-react';
import { Button } from '../ui/button';
import { useCallToAction } from '@/hooks/useCallToAction';
import { useNavigate } from 'react-router-dom';

interface ChatHeaderProps {
  handleVoiceChat: () => void;
  toggleChat: () => void;
}

const ChatHeader = ({ 
  handleVoiceChat, 
  toggleChat 
}: ChatHeaderProps) => {
  const { openCalendarBooking } = useCallToAction();
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-secondary/80 to-primary/80">
      <div className="flex items-center space-x-2">
        <div className="text-white font-bold">AI Assistent</div>
      </div>
      <div className="flex flex-col space-y-2">
        {/* "Zur Sprach-KI" Button */}
        <Button
          className="w-full py-4 md:py-6 bg-[#1A1F35] text-primary hover:bg-[#252A40] transition-all duration-300 flex items-center justify-center gap-2 border border-[#3A3F55] rounded-md"
          onClick={() => navigate('/live-tests')}
          variant={undefined}
          size={undefined}
        >
          Sprach-KI entdecken
        </Button>
        <Button 
          onClick={openCalendarBooking}
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

