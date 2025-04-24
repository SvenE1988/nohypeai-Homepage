
import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import NavHeader from '@/components/blocks/nav-header';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Auth = () => {
  const { signIn, signUp, user, loading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect if already authenticated
  if (user && !loading) {
    return <Navigate to="/proposals" replace />;
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Bitte alle Felder ausfüllen');
      return;
    }

    setIsSubmitting(true);
    const { error, success } = await signIn(email, password);
    setIsSubmitting(false);

    if (error) {
      console.error('Login error:', error);
      toast.error('Login fehlgeschlagen: ' + (error.message || 'Unbekannter Fehler'));
    } else if (success) {
      toast.success('Login erfolgreich');
      navigate('/proposals');
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Bitte alle Felder ausfüllen');
      return;
    }

    setIsSubmitting(true);
    const { error, success } = await signUp(email, password);
    setIsSubmitting(false);

    if (error) {
      console.error('Registration error:', error);
      toast.error('Registrierung fehlgeschlagen: ' + (error.message || 'Unbekannter Fehler'));
    } else {
      toast.success('Registrierung erfolgreich. Bitte überprüfen Sie Ihre E-Mail für den Bestätigungslink.');
    }
  };

  return (
    <main className="min-h-screen bg-black">
      <NavHeader />
      <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-[80vh]">
        <Card className="w-full max-w-md border-white/20 bg-black/80 text-white">
          <Tabs defaultValue="login" className="w-full">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center text-white">Zugang</CardTitle>
              <CardDescription className="text-center text-gray-400">
                Zugang zum Angebotsgenerator und Broschüren-Tool
              </CardDescription>
              <TabsList className="grid w-full grid-cols-2 bg-black/50 text-white">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Registrieren</TabsTrigger>
              </TabsList>
            </CardHeader>
            
            <CardContent>
              <TabsContent value="login">
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">E-Mail</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@beispiel.de"
                      className="bg-black/50 border-white/30 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Passwort</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-black/50 border-white/30 text-white"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isSubmitting}
                    variant="default"
                  >
                    {isSubmitting ? 'Bitte warten...' : 'Anmelden'}
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="register">
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-email">E-Mail</Label>
                    <Input
                      id="register-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@beispiel.de"
                      className="bg-black/50 border-white/30 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-password">Passwort</Label>
                    <Input
                      id="register-password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-black/50 border-white/30 text-white"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isSubmitting}
                    variant="default"
                  >
                    {isSubmitting ? 'Bitte warten...' : 'Konto erstellen'}
                  </Button>
                </form>
              </TabsContent>
            </CardContent>
            
            <CardFooter className="flex justify-center text-sm text-gray-400">
              Durch die Anmeldung stimmen Sie unseren Nutzungsbedingungen zu.
            </CardFooter>
          </Tabs>
        </Card>
      </div>
      <Footer />
    </main>
  );
};

export default Auth;
