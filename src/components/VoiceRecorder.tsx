
import { useState, useEffect } from 'react';
import { Mic, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface VoiceRecorderProps {
  onRecordComplete?: () => void;
  isRegister?: boolean;
}

const VoiceRecorder = ({ onRecordComplete, isRegister = false }: VoiceRecorderProps) => {
  const [recording, setRecording] = useState(false);
  const [recorded, setRecorded] = useState(false);
  const [seconds, setSeconds] = useState(0);
  
  useEffect(() => {
    let interval: number | null = null;
    
    if (recording) {
      interval = window.setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
    } else if (interval) {
      window.clearInterval(interval);
    }
    
    return () => {
      if (interval) window.clearInterval(interval);
    };
  }, [recording]);
  
  const handleRecord = () => {
    if (recorded) return;
    
    setRecording(true);
    
    setTimeout(() => {
      setRecording(false);
      setRecorded(true);
      
      if (onRecordComplete) {
        setTimeout(onRecordComplete, 1000);
      }
    }, 3000);
  };
  
  return (
    <div className={`scanner-panel ${recording ? 'scanner-active' : ''} w-full max-w-xs`}>
      <div className="flex flex-col items-center">
        <div className="w-64 h-64 mb-4 rounded-xl bg-muted flex flex-col items-center justify-center p-4">
          <Mic size={48} className={`mb-4 ${recording ? 'text-secondary animate-pulse' : 'text-muted-foreground'}`} />
          
          {recording ? (
            <>
              <div className="voice-wave mb-6">
                {[...Array(15)].map((_, i) => (
                  <span key={i} style={{ height: `${Math.random() * 30 + 5}px` }}></span>
                ))}
              </div>
              <p className="text-sm text-center">
                {isRegister 
                  ? "Please read the following phrase: 'My voice is my passport, verify me'" 
                  : "Please say your voice passphrase"}
              </p>
              <p className="text-xs text-muted-foreground mt-2">Recording: {seconds}s</p>
            </>
          ) : (
            <div className="text-center text-muted-foreground">
              <p>{recorded ? "Voice sample recorded" : "Voice Authentication"}</p>
              <p className="text-sm mt-2">
                {isRegister 
                  ? "We'll record a sample of your voice" 
                  : "Speak your passphrase to authenticate"}
              </p>
            </div>
          )}
        </div>
        
        <Button 
          variant={recorded ? "default" : "outline"} 
          className={`w-full ${recorded ? 'bg-secondary text-secondary-foreground' : ''}`}
          onClick={handleRecord}
          disabled={recording}
        >
          {recording ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Recording...
            </>
          ) : recorded ? (
            "Recording Complete"
          ) : (
            `${isRegister ? "Record Voice Sample" : "Start Voice Authentication"}`
          )}
        </Button>
      </div>
    </div>
  );
};

export default VoiceRecorder;
