
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import LockerGrid from '@/components/LockerGrid';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { Lock, ShieldCheck, RefreshCw, Clock } from 'lucide-react';

const Locker = () => {
  const [lastLogin, setLastLogin] = useState<string>('');
  const [sessionTime, setSessionTime] = useState<number>(300); // 5 minutes in seconds
  const { toast } = useToast();
  const navigate = useNavigate();
  
  useEffect(() => {
    setLastLogin(new Date().toLocaleString());
    
    // Session timer
    const timer = setInterval(() => {
      setSessionTime(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleLogout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  const handleLogout = () => {
    toast({
      title: "Session ended",
      description: "You have been securely logged out.",
      variant: "default",
    });
    
    setTimeout(() => {
      navigate('/auth');
    }, 1500);
  };
  
  const handleExtendSession = () => {
    setSessionTime(300); // Reset to 5 minutes
    toast({
      title: "Session extended",
      description: "Your session has been extended by 5 minutes.",
      className: "bg-card border-secondary"
    });
  };
  
  return (
    <div className="auth-container">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Secure Locker System</h1>
            <p className="text-muted-foreground">
              Access and manage your secure digital lockers
            </p>
          </div>
          
          <div className="flex items-center gap-2 bg-card/60 backdrop-blur-sm rounded-lg px-4 py-2 border border-border">
            <Clock size={16} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Session expires in: </span>
            <span className={`font-mono ${sessionTime < 60 ? 'text-destructive' : ''}`}>{formatTime(sessionTime)}</span>
            <Button variant="ghost" size="sm" className="ml-2 h-8 w-8 p-0" onClick={handleExtendSession}>
              <RefreshCw size={14} />
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="bg-card/60 backdrop-blur-sm border border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Security Status</CardTitle>
              <CardDescription>System security information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Authentication</span>
                  <div className="flex items-center gap-1 text-secondary">
                    <ShieldCheck size={14} />
                    <span>Complete</span>
                  </div>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Last login</span>
                  <span>{lastLogin}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Security level</span>
                  <span className="text-primary">High</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-card/60 backdrop-blur-sm border border-border lg:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Quick Actions</CardTitle>
              <CardDescription>Common locker operations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" className="h-9">Lock All Lockers</Button>
                <Button variant="outline" size="sm" className="h-9">Verify Identity</Button>
                <Button variant="outline" size="sm" className="h-9">Access History</Button>
                <Button variant="outline" size="sm" className="h-9" onClick={handleLogout}>
                  <Lock className="h-4 w-4 mr-1" /> Secure Logout
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card className="bg-card/60 backdrop-blur-sm border border-border mb-8">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Your Secure Lockers</CardTitle>
            <CardDescription>Click on a locker to access its contents</CardDescription>
          </CardHeader>
          <CardContent>
            <LockerGrid />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Locker;
