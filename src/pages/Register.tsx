
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import FaceScanner from '@/components/FaceScanner';
import VoiceRecorder from '@/components/VoiceRecorder';
import FingerScanner from '@/components/FingerScanner';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { User, Mail, Key, CreditCard, Camera, Mic, Fingerprint, CheckCircle2 } from 'lucide-react';

const Register = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [registrationSteps, setRegistrationSteps] = useState({
    personal: false,
    face: false,
    voice: false,
    fingerprint: false
  });
  
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handlePersonalInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRegistrationSteps(prev => ({ ...prev, personal: true }));
    setActiveTab('face');
    toast({
      title: "Personal information saved",
      description: "Your personal details have been recorded.",
      className: "bg-card border-secondary"
    });
  };
  
  const handleFaceScanComplete = () => {
    setRegistrationSteps(prev => ({ ...prev, face: true }));
    setActiveTab('voice');
    toast({
      title: "Face scan completed",
      description: "Your facial biometrics have been recorded.",
      className: "bg-card border-secondary"
    });
  };
  
  const handleVoiceRecordComplete = () => {
    setRegistrationSteps(prev => ({ ...prev, voice: true }));
    setActiveTab('fingerprint');
    toast({
      title: "Voice sample recorded",
      description: "Your voice pattern has been recorded.",
      className: "bg-card border-secondary"
    });
  };
  
  const handleFingerprintScanComplete = () => {
    setRegistrationSteps(prev => ({ ...prev, fingerprint: true }));
    toast({
      title: "Fingerprint registered",
      description: "Your fingerprint has been recorded.",
      className: "bg-card border-secondary"
    });
  };
  
  const allStepsCompleted = Object.values(registrationSteps).every(Boolean);
  
  const handleRegistrationComplete = () => {
    toast({
      title: "Registration successful",
      description: "Your account has been created. You can now log in.",
      className: "bg-card border-secondary"
    });
    
    setTimeout(() => {
      navigate('/auth');
    }, 1500);
  };
  
  return (
    <div className="auth-container">
      <Navbar />
      
      <div className="container mx-auto flex-1 flex flex-col items-center justify-center px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Create Your Secure Account</h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            Register your personal information and biometric data for secure access.
          </p>
        </div>
        
        <div className="glass-card w-full max-w-4xl p-6">
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6 flex-wrap">
            <div className={`flex items-center gap-2 border rounded-full px-4 py-2 ${registrationSteps.personal ? 'border-secondary text-secondary' : 'border-muted text-muted-foreground'}`}>
              {registrationSteps.personal ? <CheckCircle2 size={16} /> : <User size={16} />}
              <span className="text-sm">Personal Info</span>
            </div>
            <div className={`flex items-center gap-2 border rounded-full px-4 py-2 ${registrationSteps.face ? 'border-secondary text-secondary' : 'border-muted text-muted-foreground'}`}>
              {registrationSteps.face ? <CheckCircle2 size={16} /> : <Camera size={16} />}
              <span className="text-sm">Face Scan</span>
            </div>
            <div className={`flex items-center gap-2 border rounded-full px-4 py-2 ${registrationSteps.voice ? 'border-secondary text-secondary' : 'border-muted text-muted-foreground'}`}>
              {registrationSteps.voice ? <CheckCircle2 size={16} /> : <Mic size={16} />}
              <span className="text-sm">Voice Sample</span>
            </div>
            <div className={`flex items-center gap-2 border rounded-full px-4 py-2 ${registrationSteps.fingerprint ? 'border-secondary text-secondary' : 'border-muted text-muted-foreground'}`}>
              {registrationSteps.fingerprint ? <CheckCircle2 size={16} /> : <Fingerprint size={16} />}
              <span className="text-sm">Fingerprint</span>
            </div>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="personal" className="gap-2" disabled={registrationSteps.personal}>
                <User size={16} />
                <span className="hidden md:inline">Personal</span>
              </TabsTrigger>
              <TabsTrigger value="face" className="gap-2" disabled={!registrationSteps.personal || registrationSteps.face}>
                <Camera size={16} />
                <span className="hidden md:inline">Face</span>
              </TabsTrigger>
              <TabsTrigger value="voice" className="gap-2" disabled={!registrationSteps.face || registrationSteps.voice}>
                <Mic size={16} />
                <span className="hidden md:inline">Voice</span>
              </TabsTrigger>
              <TabsTrigger value="fingerprint" className="gap-2" disabled={!registrationSteps.voice || registrationSteps.fingerprint}>
                <Fingerprint size={16} />
                <span className="hidden md:inline">Fingerprint</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="personal">
              <Card className="bg-card/60 backdrop-blur-sm border border-border">
                <CardContent className="pt-6">
                  <form onSubmit={handlePersonalInfoSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input id="fullName" placeholder="John Doe" className="pl-10" required />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input id="email" type="email" placeholder="john@example.com" className="pl-10" required />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="password">Create Password</Label>
                        <div className="relative">
                          <Key className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input id="password" type="password" placeholder="••••••••" className="pl-10" required />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="idCard">ID Card Number</Label>
                        <div className="relative">
                          <CreditCard className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input id="idCard" placeholder="ID-12345678" className="pl-10" required />
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-4 flex justify-end">
                      <Button type="submit">Continue to Biometrics</Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="face" className="flex justify-center">
              <FaceScanner onScanComplete={handleFaceScanComplete} isRegister={true} />
            </TabsContent>
            
            <TabsContent value="voice" className="flex justify-center">
              <VoiceRecorder onRecordComplete={handleVoiceRecordComplete} isRegister={true} />
            </TabsContent>
            
            <TabsContent value="fingerprint" className="flex justify-center">
              <FingerScanner onScanComplete={handleFingerprintScanComplete} isRegister={true} />
            </TabsContent>
          </Tabs>
          
          {allStepsCompleted && (
            <div className="mt-8 text-center">
              <div className="flex justify-center gap-2 items-center mb-4 text-secondary">
                <CheckCircle2 size={24} />
                <span className="text-lg font-medium">Registration complete</span>
              </div>
              <p className="text-muted-foreground mb-4">
                All your biometric data has been securely recorded. You can now access your secure vault.
              </p>
              <Button 
                size="lg"
                onClick={handleRegistrationComplete}
              >
                Complete Registration
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
