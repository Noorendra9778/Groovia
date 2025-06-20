
import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, RotateCcw, X, Home, ExternalLink, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { fetchProxiedContent } from '../utils/proxyService';

interface BrowserProps {
  url: string;
  onClose: () => void;
}

const Browser = ({ url, onClose }: BrowserProps) => {
  const [currentUrl, setCurrentUrl] = useState(url);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [useProxy, setUseProxy] = useState(false);
  const [proxiedContent, setProxiedContent] = useState<string>('');
  const [iframeKey, setIframeKey] = useState(0);

  useEffect(() => {
    setCurrentUrl(url);
    setIsLoading(true);
    setHasError(false);
    setUseProxy(false);
    setProxiedContent('');
    setIframeKey(prev => prev + 1);
  }, [url]);

  const handleIframeLoad = () => {
    console.log('Iframe loaded successfully');
    setIsLoading(false);
    setHasError(false);
  };

  const handleIframeError = async () => {
    console.log('Iframe failed to load, trying proxy...');
    setIsLoading(true);
    
    try {
      const content = await fetchProxiedContent(currentUrl);
      setProxiedContent(content);
      setUseProxy(true);
      setIsLoading(false);
      setHasError(false);
      toast({
        title: "Loaded via proxy",
        description: "Content loaded using proxy service due to site restrictions.",
      });
    } catch (error) {
      console.error('Proxy also failed:', error);
      setIsLoading(false);
      setHasError(true);
      toast({
        title: "Unable to load page",
        description: "Both direct loading and proxy failed. Please open in browser.",
        variant: "destructive"
      });
    }
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
    setUseProxy(false);
    setProxiedContent('');
    
    if (useProxy) {
      handleIframeError();
    } else {
      setIframeKey(prev => prev + 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 animate-fade-in">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-blue-500/5 to-purple-500/5 animate-pulse"></div>
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300/10 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300/10 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300/10 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        
        {/* Neon Grid Lines */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent animate-pulse"></div>
          <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-400/20 to-transparent animate-pulse animation-delay-1000"></div>
          <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-blue-400/20 to-transparent animate-pulse animation-delay-500"></div>
          <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-purple-400/20 to-transparent animate-pulse animation-delay-1500"></div>
        </div>
      </div>

      <div className="relative flex flex-col h-full">
        {/* Browser Header with Neon Effect */}
        <div className="flex items-center gap-2 p-3 border-b bg-card/80 backdrop-blur-md shadow-lg border-cyan-500/20">
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 hover:scale-105 transition-all duration-300 hover:bg-cyan-500/10 hover:shadow-neon-cyan"
              disabled
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 hover:scale-105 transition-all duration-300 hover:bg-cyan-500/10 hover:shadow-neon-cyan"
              disabled
            >
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 hover:scale-105 transition-all duration-300 hover:bg-emerald-500/10 hover:shadow-neon-emerald"
              onClick={refreshPage}
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex-1 mx-2">
            <div className="bg-muted/30 rounded-full px-4 py-2 text-sm text-muted-foreground truncate border border-cyan-500/20 shadow-inner backdrop-blur-sm">
              {currentUrl} {useProxy && <span className="text-emerald-400">(via proxy)</span>}
            </div>
          </div>

          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 hover:scale-105 transition-all duration-300 hover:bg-blue-500/10 hover:shadow-neon-blue"
              onClick={openInNewTab}
              title="Open in new tab"
            >
              <ExternalLink className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 hover:scale-105 transition-all duration-300 hover:bg-green-500/10 hover:shadow-neon-green"
              onClick={onClose}
              title="Back to home"
            >
              <Home className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 hover:scale-105 transition-all duration-300 hover:bg-red-500/10 hover:shadow-neon-red"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Animated Loading Bar */}
        {isLoading && (
          <div className="h-1 bg-muted/30 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-emerald-500 to-blue-500 animate-shimmer bg-[length:200%_100%]" />
          </div>
        )}

        {/* Browser Content */}
        <div className="flex-1 relative">
          {hasError ? (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center animate-fade-in">
              <div className="p-6 bg-gradient-to-br from-yellow-100/80 to-orange-100/80 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-2xl mb-6 backdrop-blur-sm border border-yellow-400/20 shadow-neon-yellow">
                <AlertTriangle className="h-12 w-12 text-yellow-600 dark:text-yellow-400 animate-pulse" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100 bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
                Cannot display this page
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md leading-relaxed">
                This website cannot be displayed within the app due to security restrictions. 
                You can open it in your device's browser instead.
              </p>
              <div className="flex gap-4 flex-wrap justify-center">
                <Button 
                  onClick={openInNewTab} 
                  className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white shadow-neon-emerald hover:shadow-neon-emerald-lg transition-all duration-300 transform hover:scale-105"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Open in Browser
                </Button>
                <Button 
                  variant="outline" 
                  onClick={refreshPage}
                  className="border-cyan-400/30 hover:bg-cyan-500/10 hover:border-cyan-400/50 transition-all duration-300 transform hover:scale-105"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Try Again
                </Button>
                <Button 
                  variant="outline" 
                  onClick={onClose}
                  className="border-emerald-400/30 hover:bg-emerald-500/10 hover:border-emerald-400/50 transition-all duration-300 transform hover:scale-105"
                >
                  <Home className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </div>
            </div>
          ) : useProxy ? (
            <div className="w-full h-full overflow-auto backdrop-blur-sm">
              <div
                className="min-h-full bg-white/95 backdrop-blur-sm border border-cyan-500/10"
                dangerouslySetInnerHTML={{ __html: proxiedContent }}
              />
            </div>
          ) : (
            <iframe
              key={iframeKey}
              src={currentUrl}
              className="w-full h-full border-0 backdrop-blur-sm"
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
