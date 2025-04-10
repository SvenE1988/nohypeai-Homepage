
import { FormEvent, KeyboardEvent } from 'react';
import { Send } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

interface ChatInputProps {
  inputValue: string;
  setInputValue: (value: string) => void;
  handleSubmit: (e: FormEvent) => void;
  handleKeyDown: (e: KeyboardEvent) => void;
  isLoading: boolean;
}

const ChatInput = ({ 
  inputValue, 
  setInputValue, 
  handleSubmit, 
  handleKeyDown, 
  isLoading 
}: ChatInputProps) => {
  return (
    <form onSubmit={handleSubmit} className="p-3 flex">
      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Was möchtest du wissen?"
        className="flex-1 bg-black/40 border-gray-700 text-white focus-visible:ring-primary"
        disabled={isLoading}
      />
      <Button 
        type="submit" 
        className="ml-2" 
        disabled={isLoading || !inputValue.trim()}
      >
        <Send className="h-4 w-4" />
      </Button>
    </form>
  );
};

export default ChatInput;
