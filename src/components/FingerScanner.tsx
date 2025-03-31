
import { useState, useEffect } from 'react';
import { Fingerprint, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FingerScannerProps {
  onScanComplete?: () => void;
  isRegister?: boolean;
}

const FingerScanner = ({ onScanComplete, isRegister = false }: FingerScannerProps) => {
  const [scanning, setScanning] = useState(false);
  const [scanned, setScanned] = useState(false);
  
  const handleScan = () => {
    setScanning(true);
    
    setTimeout(() => {
      setScanning(false);
      setScanned(true);
      
      if (onScanComplete) {
        setTimeout(onScanComplete, 1000);
      }
    }, 3000);
  };
  
  useEffect(() => {
    return () => {
      setScanning(false);
      setScanned(false);
    };
  }, []);
  
  return (
    <div className={`scanner-panel ${scanning ? 'scanner-active' : ''} w-full max-w-xs`}>
      <div className="flex flex-col items-center">
        <div className="w-64 h-64 mb-4 rounded-xl bg-muted flex items-center justify-center">
          <div className="fingerprint-scanner">
            <div className="fingerprint-inner">
              <Fingerprint 
                size={64} 
                className={scanning ? 'animate-pulse text-secondary' : scanned ? 'text-secondary' : ''}
              />
            </div>
          </div>
        </div>
        
        <Button 
          variant={scanned ? "default" : "outline"} 
          className={`w-full ${scanned ? 'bg-secondary text-secondary-foreground' : ''}`}
          onClick={handleScan}
          disabled={scanning}
        >
          {scanning ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Scanning...
            </>
          ) : scanned ? (
            "Scan Complete"
          ) : (
            `${isRegister ? "Register Fingerprint" : "Scan Fingerprint"}`
          )}
        </Button>
      </div>
    </div>
  );
};

export default FingerScanner;
