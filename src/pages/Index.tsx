
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Fingerprint, Mic, Camera, ShieldCheck, Lock, Key } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-20 px-4 container mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Next-Gen <span className="text-primary">Multimodal</span> Authentication
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl">
              Secure your digital assets with our state-of-the-art three-factor authentication system. 
              Combining face recognition, voice authentication, and fingerprint scanning.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button asChild size="lg">
                <Link to="/auth">Try Authentication</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/register">Register Now</Link>
              </Button>
            </div>
          </div>
          
          <div className="flex-1 relative">
            <div className="relative w-full h-[400px]">
              <div className="absolute top-0 left-0 w-64 h-64 bg-primary/20 rounded-full filter blur-3xl"></div>
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-secondary/20 rounded-full filter blur-3xl"></div>
              
              <div className="relative bg-card/60 backdrop-blur-sm border border-border rounded-2xl h-full w-full overflow-hidden flex items-center justify-center">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 w-full">
                  <div className="flex flex-col items-center p-4 bg-muted/50 rounded-xl text-center">
                    <Camera size={36} className="mb-2 text-primary" />
                    <h3 className="font-medium">Face Recognition</h3>
                    <p className="text-xs text-muted-foreground mt-1">Biometric verification</p>
                  </div>
                  
                  <div className="flex flex-col items-center p-4 bg-muted/50 rounded-xl text-center">
                    <Mic size={36} className="mb-2 text-primary" />
                    <h3 className="font-medium">Voice Recognition</h3>
                    <p className="text-xs text-muted-foreground mt-1">Unique voice pattern</p>
                  </div>
                  
                  <div className="flex flex-col items-center p-4 bg-muted/50 rounded-xl text-center">
                    <Fingerprint size={36} className="mb-2 text-primary" />
                    <h3 className="font-medium">Fingerprint Scan</h3>
                    <p className="text-xs text-muted-foreground mt-1">Physical verification</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 px-4 bg-muted/10">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Advanced Security Features</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Our cutting-edge technology ensures your digital assets remain secure while providing seamless access.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-card/60 backdrop-blur-sm border border-border">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <ShieldCheck className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Triple Layer Security</CardTitle>
                <CardDescription>
                  Three independent biometric verification methods
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Combining face, voice, and fingerprint authentication creates a security system that's nearly impossible to breach.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-card/60 backdrop-blur-sm border border-border">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Lock className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Secure Locker System</CardTitle>
                <CardDescription>
                  Digital vault for your most important assets
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Once authenticated, access your personal secure lockers containing your most valuable digital information.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-card/60 backdrop-blur-sm border border-border">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Key className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Easy Registration</CardTitle>
                <CardDescription>
                  Simple one-time setup process
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Our streamlined registration process captures your biometric data securely for future authentication.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="bg-card/60 backdrop-blur-sm border border-border rounded-2xl p-8 md:p-12">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold mb-4">Ready to secure your digital life?</h2>
              <p className="text-muted-foreground mb-8">
                Join thousands of users who trust our multimodal authentication system to protect their most valuable assets.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild size="lg">
                  <Link to="/register">Create Account</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/auth">Try Demo</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Lock className="h-5 w-5 text-primary" />
              <span className="text-lg font-bold">SecureVault</span>
            </div>
            <div className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} SecureVault. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
