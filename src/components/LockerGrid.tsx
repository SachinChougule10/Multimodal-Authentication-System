
import { useState } from 'react';
import { Lock, Unlock, Package, Mail, FileText, Image, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';

interface Locker {
  id: number;
  name: string;
  locked: boolean;
  icon: React.ReactNode;
  contents?: string;
}

const LockerGrid = () => {
  const [lockers, setLockers] = useState<Locker[]>([
    { id: 1, name: "Documents", locked: true, icon: <FileText size={24} />, contents: "Important personal documents" },
    { id: 2, name: "Valuables", locked: true, icon: <Package size={24} />, contents: "Jewelry and valuables" },
    { id: 3, name: "Mail", locked: true, icon: <Mail size={24} />, contents: "Secure mail delivery" },
    { id: 4, name: "Media", locked: true, icon: <Image size={24} />, contents: "Photos and videos" },
    { id: 5, name: "Financial", locked: true, icon: <CreditCard size={24} />, contents: "Financial documents" },
    { id: 6, name: "Documents", locked: true, icon: <FileText size={24} />, contents: "Legal documents" },
    { id: 7, name: "Valuables", locked: true, icon: <Package size={24} />, contents: "Collectibles" },
    { id: 8, name: "Mail", locked: true, icon: <Mail size={24} />, contents: "Private correspondence" },
    { id: 9, name: "Media", locked: true, icon: <Image size={24} />, contents: "Backup drive" },
    { id: 10, name: "Financial", locked: true, icon: <CreditCard size={24} />, contents: "Tax documents" },
  ]);
  
  const [selectedLocker, setSelectedLocker] = useState<Locker | null>(null);
  
  const toggleLock = (id: number) => {
    setLockers(prev => 
      prev.map(locker => 
        locker.id === id ? { ...locker, locked: !locker.locked } : locker
      )
    );
  };
  
  const openLocker = (locker: Locker) => {
    setSelectedLocker(locker);
    
    if (locker.locked) {
      setTimeout(() => {
        toggleLock(locker.id);
        setSelectedLocker(prev => prev ? { ...prev, locked: false } : null);
      }, 1000);
    }
  };
  
  return (
    <div>
      <div className="locker-grid">
        {lockers.map(locker => (
          <div 
            key={locker.id}
            className={`locker-item ${locker.locked ? 'locker-item-locked' : 'locker-item-unlocked'}`}
            onClick={() => openLocker(locker)}
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center p-2">
              <div className="mb-2">
                {locker.locked ? 
                  <Lock size={20} className="text-destructive/70" /> : 
                  <Unlock size={20} className="text-secondary/70" />
                }
              </div>
              <div className="mb-1">{locker.icon}</div>
              <p className="text-xs text-center">{locker.name}</p>
            </div>
          </div>
        ))}
      </div>
      
      <Dialog open={!!selectedLocker} onOpenChange={() => setSelectedLocker(null)}>
        <DialogContent className="glass-card text-foreground">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedLocker?.icon}
              <span>{selectedLocker?.name} Locker</span>
            </DialogTitle>
            <DialogDescription>
              {selectedLocker?.locked ? 
                "Unlocking locker..." : 
                "Locker is unlocked and accessible."}
            </DialogDescription>
          </DialogHeader>
          
          <div className="p-4 bg-muted/20 rounded-lg">
            {selectedLocker?.locked ? (
              <div className="flex justify-center">
                <div className="animate-pulse flex flex-col items-center">
                  <Lock size={40} className="text-destructive/70 mb-2" />
                  <p className="text-sm">Authentication in progress...</p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2 text-secondary">
                  <Unlock size={20} />
                  <span className="text-sm font-medium">Locker Unlocked</span>
                </div>
                <p className="text-sm">{selectedLocker?.contents}</p>
                <Button 
                  variant="outline" 
                  className="mt-2"
                  onClick={() => toggleLock(selectedLocker?.id || 0)}
                >
                  Lock Again
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LockerGrid;
