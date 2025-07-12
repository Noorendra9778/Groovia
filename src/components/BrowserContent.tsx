import React from 'react';
import { AlertTriangle, ExternalLink, RotateCcw, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BrowserContentProps {
  currentUrl: string;
  isLoading: boolean;
  hasError: boolean;
  useProxy: boolean;
  proxiedContent: string;
  iframeKey: number;
  onIframeLoad: () => void;
  onIframeError: () => void;
  onOpenInNewTab: () => void;
  onRefresh: () => void;
  onClose: () => void;
}

export const BrowserContent = ({
  currentUrl,
  isLoading,
  hasError,
  useProxy,
  proxiedContent,
  iframeKey,
  onIframeLoad,
  onIframeError,
  onOpenInNewTab,
  onRefresh,
  onClose
}: BrowserContentProps) => {
  if (hasError) {
    return (
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
            onClick={onOpenInNewTab} 
            className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white shadow-neon-emerald hover:shadow-neon-emerald-lg transition-all duration-300 transform hover:scale-105"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Open in Browser
          </Button>
          <Button 
            variant="outline" 
            onClick={onRefresh}
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
    );
  }

  if (useProxy) {
    return (
      <div className="w-full h-full overflow-auto backdrop-blur-sm">
        <div
          className="min-h-full bg-white/95 backdrop-blur-sm border border-cyan-500/10"
          dangerouslySetInnerHTML={{ __html: proxiedContent }}
        />
      </div>
    );
  }

  return (
    <>
      {/* Animated Loading Bar */}
      {isLoading && (
        <div className="h-1 bg-muted/30 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-emerald-500 to-blue-500 animate-shimmer bg-[length:200%_100%]" />
        </div>
      )}
      
      <iframe
        key={iframeKey}
        src={currentUrl}
        className="w-full h-full border-0 backdrop-blur-sm"
        onLoad={onIframeLoad}
        onError={onIframeError}
        sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-navigation"
        title="Browser"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </>
  );
};