
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

interface VoiceBotEmailDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onStartCall: (email: string) => void;
  isLoading: boolean;
}

const VoiceBotEmailDialog = ({ isOpen, onClose, onStartCall, isLoading }: VoiceBotEmailDialogProps) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onStartCall(email);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-black text-white">
        <DialogHeader>
          <DialogTitle>Sprachdialog starten</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              type="email"
              placeholder="Ihre E-Mail-Adresse"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-transparent border-gray-700"
            />
          </div>
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isLoading || !email}
          >
            {isLoading ? (
              <LoadingSpinner size="sm" />
            ) : (
              'Sprachdialog starten'
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default VoiceBotEmailDialog;
