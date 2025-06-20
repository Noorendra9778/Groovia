
import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, RotateCcw, X, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BrowserProps {
  url: string;
  onClose: () => void;
}

const Browser = ({ url, onClose }: BrowserProps) => {
  const [currentUrl, setCurrentUrl] = useState(url);
  const [isLoading, setIsLoading] = useState(true);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 animate-fade-in">
      <div className="flex flex-col h-full">
        {/* Browser Header */}
        <div className="flex items-center gap-2 p-3 border-b bg-card/50 backdrop-blur">
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 hover:scale-105 transition-transform"
              disabled
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 hover:scale-105 transition-transform"
              disabled
            >
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 hover:scale-105 transition-transform"
              onClick={() => window.location.reload()}
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex-1 mx-2">
            <div className="bg-muted/30 rounded-full px-4 py-2 text-sm text-muted-foreground truncate border">
              {currentUrl}
            </div>
          </div>

          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 hover:scale-105 transition-transform"
              onClick={onClose}
            >
              <Home className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 hover:scale-105 transition-transform"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Loading indicator */}
        {isLoading && (
          <div className="h-1 bg-muted relative overflow-hidden">
            <div className="absolute inset-0 bg-primary animate-pulse" />
          </div>
        )}

        {/* Browser Content */}
        <div className="flex-1 relative">
          <iframe
            src={currentUrl}
            className="w-full h-full border-0"
            onLoad={handleIframeLoad}
            sandbox="allow-same-origin allow-scripts allow-forms allow-navigation"
            title="Browser"
          />
        </div>
      </div>
    </div>
  );
};

export default Browser;
