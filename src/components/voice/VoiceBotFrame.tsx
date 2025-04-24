
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Headphones } from 'lucide-react';
import { Iphone15Pro } from '@/components/ui/iphone-15-pro';
import { ReactNode } from 'react';

interface VoiceBotFrameProps {
  children: ReactNode;
}

const VoiceBotFrame = ({ children }: VoiceBotFrameProps) => {
  return (
    <div className="max-w-md mx-auto">
      <Iphone15Pro className="w-full h-auto">
        <Card className="border-0 bg-gradient-to-b from-[#1A1F35] to-black h-full px-4 py-6 space-y-4">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl font-semibold text-center text-white flex items-center justify-center gap-2">
              <Headphones className="w-5 h-5 text-primary" />
              KI-Sprachassistent
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-0">
            {children}
          </CardContent>
        </Card>
      </Iphone15Pro>
    </div>
  );
};

export default VoiceBotFrame;
