
import React, { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, ArrowRight, RotateCcw, X, Home, ExternalLink, AlertTriangle, Plus } from 'lucide-react';
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
  const [history, setHistory] = useState<string[]>([url]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [tabs, setTabs] = useState<Array<{id: string, url: string, title: string}>>([
    { id: '1', url, title: new URL(url).hostname }
  ]);
  const [activeTabId, setActiveTabId] = useState('1');

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

  const navigateToUrl = useCallback((newUrl: string) => {
    const newHistory = history.slice(0, currentIndex + 1);
    newHistory.push(newUrl);
    setHistory(newHistory);
    setCurrentIndex(newHistory.length - 1);
    setCurrentUrl(newUrl);
    setIsLoading(true);
    setHasError(false);
    setUseProxy(false);
    setProxiedContent('');
    setIframeKey(prev => prev + 1);
  }, [history, currentIndex]);

  const goBack = useCallback(() => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      setCurrentUrl(history[newIndex]);
      setIsLoading(true);
      setHasError(false);
      setUseProxy(false);
      setProxiedContent('');
      setIframeKey(prev => prev + 1);
    }
  }, [currentIndex, history]);

  const goForward = useCallback(() => {
    if (currentIndex < history.length - 1) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      setCurrentUrl(history[newIndex]);
      setIsLoading(true);
      setHasError(false);
      setUseProxy(false);
      setProxiedContent('');
      setIframeKey(prev => prev + 1);
    }
  }, [currentIndex, history]);

  const refreshPage = useCallback(() => {
    setIsLoading(true);
    setHasError(false);
    setUseProxy(false);
    setProxiedContent('');
    
    if (useProxy) {
      handleIframeError();
    } else {
      setIframeKey(prev => prev + 1);
    }
  }, [useProxy]);

  const addTab = useCallback(() => {
    const newTabId = Date.now().toString();
    const newTab = { 
      id: newTabId, 
      url: 'https://www.google.com', 
      title: 'New Tab' 
    };
    setTabs(prev => [...prev, newTab]);
    setActiveTabId(newTabId);
    navigateToUrl(newTab.url);
  }, [navigateToUrl]);

  const closeTab = useCallback((tabId: string) => {
    const newTabs = tabs.filter(tab => tab.id !== tabId);
    if (newTabs.length === 0) {
      onClose();
      return;
    }
    setTabs(newTabs);
    if (activeTabId === tabId) {
      setActiveTabId(newTabs[0].id);
      navigateToUrl(newTabs[0].url);
    }
  }, [tabs, activeTabId, onClose, navigateToUrl]);

  const switchTab = useCallback((tabId: string) => {
    const tab = tabs.find(t => t.id === tabId);
    if (tab) {
      setActiveTabId(tabId);
      navigateToUrl(tab.url);
    }
  }, [tabs, navigateToUrl]);

  const goHome = useCallback(() => {
    navigateToUrl('https://www.google.com');
  }, [navigateToUrl]);

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
        {/* Tab Bar */}
        <div className="flex items-center bg-muted/20 border-b border-cyan-500/10 overflow-x-auto">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              className={`flex items-center min-w-0 max-w-48 cursor-pointer transition-all duration-200 ${
                activeTabId === tab.id 
                  ? 'bg-card/80 border-b-2 border-cyan-400 shadow-neon-cyan' 
                  : 'bg-muted/10 hover:bg-muted/30'
              }`}
              onClick={() => switchTab(tab.id)}
            >
              <div className="flex-1 px-3 py-2 text-sm truncate">
                {tab.title}
              </div>
              {tabs.length > 1 && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 mr-1 hover:bg-red-500/20"
                  onClick={(e) => {
                    e.stopPropagation();
                    closeTab(tab.id);
                  }}
                >
                  <X className="h-3 w-3" />
                </Button>
              )}
            </div>
          ))}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 ml-2 hover:bg-emerald-500/10 hover:shadow-neon-emerald shrink-0"
            onClick={addTab}
            title="Add new tab"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {/* Browser Header with Neon Effect */}
        <div className="flex items-center gap-2 p-3 border-b bg-card/80 backdrop-blur-md shadow-lg border-cyan-500/20">
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 hover:scale-105 transition-all duration-300 hover:bg-cyan-500/10 hover:shadow-neon-cyan"
              disabled={currentIndex === 0}
              onClick={goBack}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 hover:scale-105 transition-all duration-300 hover:bg-cyan-500/10 hover:shadow-neon-cyan"
              disabled={currentIndex === history.length - 1}
              onClick={goForward}
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
              onClick={goHome}
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
