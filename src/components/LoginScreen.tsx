import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Chrome, LogIn } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import logo from '@/assets/logo.png';

interface LoginScreenProps {
  onLogin: () => void;
}

const LoginScreen = ({ onLogin }: LoginScreenProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    
    // Simulate authentication delay
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Welcome!",
        description: "Successfully logged in with Google",
      });
      onLogin();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-primary flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-glass opacity-20" />
      
      {/* Floating elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-primary-glow/10 rounded-full animate-float" />
      <div className="absolute bottom-20 right-20 w-24 h-24 bg-accent/10 rounded-full animate-float" style={{animationDelay: '1.5s'}} />
      
      <Card className="w-full max-w-md bg-background/95 backdrop-blur-md border-0 shadow-glass animate-scale-in">
        <CardHeader className="space-y-6 text-center pb-8">
          <div className="flex justify-center">
            <img 
              src={logo} 
              alt="Logo" 
              className="w-16 h-16"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Welcome Back
            </h1>
            <p className="text-muted-foreground mt-2">
              Sign in to manage your tasks
            </p>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <Button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full h-12 text-base"
            variant="outline"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                Signing in...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Chrome className="w-5 h-5" />
                Sign in with Google
              </div>
            )}
          </Button>
          
          <div className="text-center text-sm text-muted-foreground">
            <p>Don't have an account? Sign up with Google</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginScreen;