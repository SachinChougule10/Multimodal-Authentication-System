
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import FaceScanner from '@/components/FaceScanner';
import VoiceRecorder from '@/components/VoiceRecorder';
import FingerScanner from '@/components/FingerScanner';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { Camera, Mic, Fingerprint, Lock, CheckCircle2 } from 'lucide-react';

const Auth = () => {
  const [activeTab, setActiveTab] = useState('face');
  const [verificationSteps, setVerificationSteps] = useState({
    face: false,
    voice: false,
    fingerprint: false
  });
  
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleFaceScanComplete = () => {
    setVerificationSteps(prev => ({ ...prev, face: true }));
    toast({
      title: "Face verification complete",
      description: "Face scan verified successfully",
      className: "bg-card border-secondary"
    });
    setActiveTab('voice');
  };
  
  const handleVoiceRecordComplete = () => {
    setVerificationSteps(prev => ({ ...prev, voice: true }));
    toast({
      title: "Voice verification complete",
      description: "Voice pattern matched successfully",
      className: "bg-card border-secondary"
    });
    setActiveTab('fingerprint');
  };
  
  const handleFingerprintScanComplete = () => {
    setVerificationSteps(prev => ({ ...prev, fingerprint: true }));
    toast({
      title: "Fingerprint verification complete",
      description: "Fingerprint matched successfully",
      className: "bg-card border-secondary"
    });
  };
  
  const allStepsCompleted = Object.values(verificationSteps).every(Boolean);
  
  const handleLogin = () => {
    toast({
      title: "Authentication successful",
      description: "Welcome back to your secure vault",
      className: "bg-card border-secondary"
    });
    
    setTimeout(() => {
      navigate('/locker');
    }, 1500);
  };
  
  return (
    <div className="auth-container">
      <Navbar />
      
      <div className="container mx-auto flex-1 flex flex-col items-center justify-center px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Secure Authentication</h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            Complete all three verification steps to access your secure vault.
          </p>
        </div>
        
        <div className="glass-card w-full max-w-4xl p-6">
          <div className="flex flex-col md:flex-row justify-center gap-4 mb-6">
            <div className={`flex items-center gap-2 border rounded-full px-4 py-2 ${verificationSteps.face ? 'border-secondary text-secondary' : 'border-muted text-muted-foreground'}`}>
              {verificationSteps.face ? <CheckCircle2 size={16} /> : <Camera size={16} />}
              <span className="text-sm">Face</span>
            </div>
            <div className={`flex items-center gap-2 border rounded-full px-4 py-2 ${verificationSteps.voice ? 'border-secondary text-secondary' : 'border-muted text-muted-foreground'}`}>
              {verificationSteps.voice ? <CheckCircle2 size={16} /> : <Mic size={16} />}
              <span className="text-sm">Voice</span>
            </div>
            <div className={`flex items-center gap-2 border rounded-full px-4 py-2 ${verificationSteps.fingerprint ? 'border-secondary text-secondary' : 'border-muted text-muted-foreground'}`}>
              {verificationSteps.fingerprint ? <CheckCircle2 size={16} /> : <Fingerprint size={16} />}
              <span className="text-sm">Fingerprint</span>
            </div>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="face" className="gap-2" disabled={verificationSteps.face}>
                <Camera size={16} />
                <span className="hidden md:inline">Face</span>
              </TabsTrigger>
              <TabsTrigger value="voice" className="gap-2" disabled={!verificationSteps.face || verificationSteps.voice}>
                <Mic size={16} />
                <span className="hidden md:inline">Voice</span>
              </TabsTrigger>
              <TabsTrigger value="fingerprint" className="gap-2" disabled={!verificationSteps.voice || verificationSteps.fingerprint}>
                <Fingerprint size={16} />
                <span className="hidden md:inline">Fingerprint</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="face" className="flex justify-center">
              <FaceScanner onScanComplete={handleFaceScanComplete} />
            </TabsContent>
            
            <TabsContent value="voice" className="flex justify-center">
              <VoiceRecorder onRecordComplete={handleVoiceRecordComplete} />
            </TabsContent>
            
            <TabsContent value="fingerprint" className="flex justify-center">
              <FingerScanner onScanComplete={handleFingerprintScanComplete} />
            </TabsContent>
          </Tabs>
          
          {allStepsCompleted && (
            <div className="mt-8 text-center">
              <div className="flex justify-center gap-2 items-center mb-4 text-secondary">
                <CheckCircle2 size={24} />
                <span className="text-lg font-medium">All verifications complete</span>
              </div>
              <Button 
                className="gap-2" 
                size="lg"
                onClick={handleLogin}
              >
                <Lock size={16} />
                Access Secure Vault
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
