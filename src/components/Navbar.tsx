
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LockKeyhole, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="w-full py-4 bg-background/80 backdrop-blur-md border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <LockKeyhole className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold tracking-tight">SecureVault</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-6">
          <Link 
            to="/" 
            className={`text-sm font-medium transition-colors hover:text-primary ${isActive('/') ? 'text-primary' : 'text-muted-foreground'}`}
          >
            Home
          </Link>
          <Link 
            to="/auth" 
            className={`text-sm font-medium transition-colors hover:text-primary ${isActive('/auth') ? 'text-primary' : 'text-muted-foreground'}`}
          >
            Login
          </Link>
          <Link 
            to="/register" 
            className={`text-sm font-medium transition-colors hover:text-primary ${isActive('/register') ? 'text-primary' : 'text-muted-foreground'}`}
          >
            Register
          </Link>
          <Button asChild variant="default" size="sm">
            <Link to="/auth">Get Started</Link>
          </Button>
        </div>
        
        <button 
          className="md:hidden text-foreground"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {isMenuOpen && (
        <div className="md:hidden absolute w-full bg-background border-b border-border z-50 py-4 px-6 flex flex-col gap-4">
          <Link 
            to="/" 
            className={`text-sm font-medium transition-colors hover:text-primary ${isActive('/') ? 'text-primary' : 'text-muted-foreground'}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            to="/auth" 
            className={`text-sm font-medium transition-colors hover:text-primary ${isActive('/auth') ? 'text-primary' : 'text-muted-foreground'}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Login
          </Link>
          <Link 
            to="/register" 
            className={`text-sm font-medium transition-colors hover:text-primary ${isActive('/register') ? 'text-primary' : 'text-muted-foreground'}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Register
          </Link>
          <Button asChild variant="default" size="sm" className="w-full">
            <Link to="/auth" onClick={() => setIsMenuOpen(false)}>Get Started</Link>
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
