
import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, RotateCcw, X, Home, ExternalLink, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

interface BrowserProps {
  url: string;
  onClose: () => void;
}

const Browser = ({ url, onClose }: BrowserProps) => {
  const [currentUrl, setCurrentUrl] = useState(url);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setCurrentUrl(url);
    setIsLoading(true);
    setHasError(false);
  }, [url]);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const handleIframeError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  const openInNewTab = () => {
    window.open(currentUrl, '_blank', 'noopener,noreferrer');
    toast({
      title: "Opened in new tab",
      description: "The search has been opened in a new browser tab.",
    });
  };

  const refreshPage = () => {
    setIsLoading(true);
    setHasError(false);
    // Force iframe refresh by changing the key
    const iframe = document.querySelector('iframe');
    if (iframe) {
      iframe.src = iframe.src;
    }
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
              onClick={refreshPage}
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
              onClick={openInNewTab}
              title="Open in new tab"
            >
              <ExternalLink className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 hover:scale-105 transition-transform"
              onClick={onClose}
              title="Back to home"
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
            <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 animate-pulse" />
          </div>
        )}

        {/* Browser Content */}
        <div className="flex-1 relative">
          {hasError ? (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center animate-fade-in">
              <div className="p-4 bg-yellow-100 dark:bg-yellow-900/20 rounded-full mb-4">
                <AlertTriangle className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
                Cannot display this page
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
                This website cannot be displayed within the app due to security restrictions. 
                You can open it in your device's browser instead.
              </p>
              <div className="flex gap-3">
                <Button onClick={openInNewTab} className="bg-green-600 hover:bg-green-700">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Open in Browser
                </Button>
                <Button variant="outline" onClick={refreshPage}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Try Again
                </Button>
                <Button variant="outline" onClick={onClose}>
                  <Home className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </div>
            </div>
          ) : (
            <iframe
              src={currentUrl}
              className="w-full h-full border-0"
              onLoad={handleIframeLoad}
              onError={handleIframeError}
              sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-navigation"
              title="Browser"
              referrerPolicy="no-referrer-when-downgrade"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Browser;
