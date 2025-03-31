
import { useState, useEffect } from 'react';
import { Camera, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FaceScannerProps {
  onScanComplete?: () => void;
  isRegister?: boolean;
}

const FaceScanner = ({ onScanComplete, isRegister = false }: FaceScannerProps) => {
  const [scanning, setScanning] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  
  const handleScan = () => {
    if (isRegister && !cameraActive) {
      setCameraActive(true);
      return;
    }
    
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
      setCameraActive(false);
    };
  }, []);
  
  return (
    <div className={`scanner-panel ${scanning ? 'scanner-active' : ''} w-full max-w-xs`}>
      <div className="flex flex-col items-center">
        <div className="relative w-64 h-64 mb-4 overflow-hidden rounded-xl bg-muted flex items-center justify-center">
          {cameraActive ? (
            <>
              <div className="absolute inset-0 border-4 border-dashed border-secondary animate-pulse opacity-50 rounded-xl"></div>
              <div className="text-center text-muted-foreground">
                <p>Camera feed simulation</p>
                <p className="text-sm">Look directly at the camera</p>
              </div>
              {scanning && <div className="scanning-animation"></div>}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center text-muted-foreground">
              <Camera size={48} className="mb-2" />
              <p className="text-sm">{isRegister ? "Click to activate camera" : "Face Recognition"}</p>
            </div>
          )}
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
          ) : isRegister ? (
            cameraActive ? "Capture Image" : "Activate Camera"
          ) : (
            "Start Face Scan"
          )}
        </Button>
      </div>
    </div>
  );
};

export default FaceScanner;
