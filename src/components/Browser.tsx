import React, { useState, useEffect, useCallback } from 'react';
import { toast } from '@/hooks/use-toast';
import { fetchProxiedContent } from '../utils/proxyService';
import { useBrowserHistory } from '@/hooks/useBrowserHistory';
import { useBrowserTabs } from '@/hooks/useBrowserTabs';
import { BrowserTabs } from './BrowserTabs';
import { BrowserNavigation } from './BrowserNavigation';
import { BrowserContent } from './BrowserContent';

interface BrowserProps {
  url: string;
  onClose: () => void;
}

const Browser = ({ url, onClose }: BrowserProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [useProxy, setUseProxy] = useState(false);
  const [proxiedContent, setProxiedContent] = useState<string>('');
  const [iframeKey, setIframeKey] = useState(0);

  const { 
    currentUrl, 
    navigateToUrl, 
    goBack, 
    goForward, 
    canGoBack, 
    canGoForward 
  } = useBrowserHistory(url);

  const { 
    tabs, 
    activeTabId, 
    addTab, 
    closeTab, 
    switchTab 
  } = useBrowserTabs(url);

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
    setUseProxy(false);
    setProxiedContent('');
    setIframeKey(prev => prev + 1);
  }, [currentUrl]);

  const handleIframeLoad = useCallback(() => {
    console.log('Iframe loaded successfully');
    setIsLoading(false);
    setHasError(false);
  }, []);

  const handleIframeError = useCallback(async () => {
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
  }, [currentUrl]);

  const openInNewTab = useCallback(() => {
    window.open(currentUrl, '_blank', 'noopener,noreferrer');
    toast({
      title: "Opened in new tab",
      description: "The search has been opened in a new browser tab.",
    });
  }, [currentUrl]);

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
  }, [useProxy, handleIframeError]);

  const handleNavigation = useCallback((newUrl: string) => {
    const url = navigateToUrl(newUrl);
    setIsLoading(true);
    setHasError(false);
    setUseProxy(false);
    setProxiedContent('');
    setIframeKey(prev => prev + 1);
    return url;
  }, [navigateToUrl]);

  const handleGoBack = useCallback(() => {
    const url = goBack();
    if (url) {
      setIsLoading(true);
      setHasError(false);
      setUseProxy(false);
      setProxiedContent('');
      setIframeKey(prev => prev + 1);
    }
  }, [goBack]);

  const handleGoForward = useCallback(() => {
    const url = goForward();
    if (url) {
      setIsLoading(true);
      setHasError(false);
      setUseProxy(false);
      setProxiedContent('');
      setIframeKey(prev => prev + 1);
    }
  }, [goForward]);

  const handleGoHome = useCallback(() => {
    handleNavigation('https://www.google.com');
  }, [handleNavigation]);

  const handleAddTab = useCallback(() => {
    const newTab = addTab();
    if (newTab) {
      handleNavigation(newTab.url);
    }
  }, [addTab, handleNavigation]);

  const handleCloseTab = useCallback((tabId: string) => {
    const remainingTab = closeTab(tabId);
    if (remainingTab) {
      handleNavigation(remainingTab.url);
    } else {
      onClose();
    }
  }, [closeTab, handleNavigation, onClose]);

  const handleSwitchTab = useCallback((tabId: string) => {
    const tab = switchTab(tabId);
    if (tab) {
      handleNavigation(tab.url);
    }
  }, [switchTab, handleNavigation]);

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
        <BrowserTabs
          tabs={tabs}
          activeTabId={activeTabId}
          onTabSwitch={handleSwitchTab}
          onTabClose={handleCloseTab}
          onAddTab={handleAddTab}
        />

        <BrowserNavigation
          currentUrl={currentUrl}
          useProxy={useProxy}
          canGoBack={canGoBack}
          canGoForward={canGoForward}
          onGoBack={handleGoBack}
          onGoForward={handleGoForward}
          onRefresh={refreshPage}
          onGoHome={handleGoHome}
          onOpenInNewTab={openInNewTab}
          onClose={onClose}
        />

        <div className="flex-1 relative">
          <BrowserContent
            currentUrl={currentUrl}
            isLoading={isLoading}
            hasError={hasError}
            useProxy={useProxy}
            proxiedContent={proxiedContent}
            iframeKey={iframeKey}
            onIframeLoad={handleIframeLoad}
            onIframeError={handleIframeError}
            onOpenInNewTab={openInNewTab}
            onRefresh={refreshPage}
            onClose={onClose}
          />
        </div>
      </div>
    </div>
  );
};

export default Browser;