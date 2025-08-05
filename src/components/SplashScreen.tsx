import { useEffect } from 'react';
import { CheckCircle2 } from 'lucide-react';
import logo from '@/assets/logo.png';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-gradient-primary flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-glass opacity-30" />
      
      {/* Floating elements */}
      <div className="absolute top-20 left-20 w-20 h-20 bg-primary-glow/20 rounded-full animate-float" />
      <div className="absolute bottom-40 right-32 w-16 h-16 bg-accent/20 rounded-full animate-float" style={{animationDelay: '1s'}} />
      <div className="absolute top-32 right-20 w-12 h-12 bg-primary-glow/30 rounded-full animate-float" style={{animationDelay: '2s'}} />
      
      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center animate-fade-in">
        <div className="mb-8 relative">
          <img 
            src={logo} 
            alt="Todo Task Manager Logo" 
            className="w-24 h-24 animate-scale-in"
          />
          <div className="absolute inset-0 bg-white/20 rounded-full blur-xl animate-pulse" />
        </div>
        
        <div className="text-center">
          <h1 className="text-4xl font-bold text-primary-foreground mb-2 animate-fade-in" style={{animationDelay: '0.3s'}}>
            Todo Task Manager
          </h1>
          <p className="text-primary-foreground/80 text-lg animate-fade-in" style={{animationDelay: '0.6s'}}>
            Organize your life, one task at a time
          </p>
        </div>
        
        {/* Loading indicator */}
        <div className="mt-12 flex items-center space-x-2 animate-fade-in" style={{animationDelay: '0.9s'}}>
          <div className="w-2 h-2 bg-primary-foreground/60 rounded-full animate-pulse" />
          <div className="w-2 h-2 bg-primary-foreground/60 rounded-full animate-pulse" style={{animationDelay: '0.2s'}} />
          <div className="w-2 h-2 bg-primary-foreground/60 rounded-full animate-pulse" style={{animationDelay: '0.4s'}} />
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;