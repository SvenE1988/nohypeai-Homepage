
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Checkbox } from '@/components/ui/checkbox';
import { Lock } from 'lucide-react';

interface VoiceBotEmailDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onStartCall: (email: string) => void;
  isLoading: boolean;
}

const VoiceBotEmailDialog = ({ isOpen, onClose, onStartCall, isLoading }: VoiceBotEmailDialogProps) => {
  const [email, setEmail] = useState('');
  const [privacyAccepted, setPrivacyAccepted] = useState(false);

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
        <form onSubmit={handleSubmit} className="space-y-6">
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
          
          <div className="flex items-start space-x-3">
            <Checkbox
              id="privacy"
              checked={privacyAccepted}
              onCheckedChange={(checked) => setPrivacyAccepted(checked as boolean)}
              className="mt-1"
            />
            <label htmlFor="privacy" className="text-sm text-gray-300">
              Ich stimme der Verarbeitung meiner Daten gemäß der Datenschutzerklärung zu. 
              Meine E-Mail-Adresse und der gewählte Anwendungsfall werden zu Analyse-Zwecken 
              gespeichert und dienen der Verbesserung des KI-Assistenten.
            </label>
          </div>

          <div className="flex items-center gap-2 p-3 bg-gray-900/50 rounded-lg text-xs text-gray-400">
            <Lock className="w-4 h-4 text-primary" />
            <p>Ihre Daten werden vertraulich behandelt und ausschließlich zur Verbesserung 
              unseres KI-Assistenten verwendet.</p>
          </div>
          
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isLoading || !email || !privacyAccepted}
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
