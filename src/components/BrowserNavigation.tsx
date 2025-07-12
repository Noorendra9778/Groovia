import React from 'react';
import { ArrowLeft, ArrowRight, RotateCcw, X, Home, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BrowserNavigationProps {
  currentUrl: string;
  useProxy: boolean;
  canGoBack: boolean;
  canGoForward: boolean;
  onGoBack: () => void;
  onGoForward: () => void;
  onRefresh: () => void;
  onGoHome: () => void;
  onOpenInNewTab: () => void;
  onClose: () => void;
}

export const BrowserNavigation = ({
  currentUrl,
  useProxy,
  canGoBack,
  canGoForward,
  onGoBack,
  onGoForward,
  onRefresh,
  onGoHome,
  onOpenInNewTab,
  onClose
}: BrowserNavigationProps) => {
  return (
    <div className="flex items-center gap-2 p-3 border-b bg-card/80 backdrop-blur-md shadow-lg border-cyan-500/20">
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 hover:scale-105 transition-all duration-300 hover:bg-cyan-500/10 hover:shadow-neon-cyan"
          disabled={!canGoBack}
          onClick={onGoBack}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 hover:scale-105 transition-all duration-300 hover:bg-cyan-500/10 hover:shadow-neon-cyan"
          disabled={!canGoForward}
          onClick={onGoForward}
        >
          <ArrowRight className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 hover:scale-105 transition-all duration-300 hover:bg-emerald-500/10 hover:shadow-neon-emerald"
          onClick={onRefresh}
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
          onClick={onOpenInNewTab}
          title="Open in new tab"
        >
          <ExternalLink className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 hover:scale-105 transition-all duration-300 hover:bg-green-500/10 hover:shadow-neon-green"
          onClick={onGoHome}
          title="Go to home"
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
  );
};