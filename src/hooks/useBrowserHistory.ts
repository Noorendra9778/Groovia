import { useState, useCallback } from 'react';

export const useBrowserHistory = (initialUrl: string) => {
  const [history, setHistory] = useState<string[]>([initialUrl]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const navigateToUrl = useCallback((newUrl: string) => {
    const newHistory = history.slice(0, currentIndex + 1);
    newHistory.push(newUrl);
    setHistory(newHistory);
    setCurrentIndex(newHistory.length - 1);
    return newUrl;
  }, [history, currentIndex]);

  const goBack = useCallback(() => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      return history[newIndex];
    }
    return null;
  }, [currentIndex, history]);

  const goForward = useCallback(() => {
    if (currentIndex < history.length - 1) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      return history[newIndex];
    }
    return null;
  }, [currentIndex, history]);

  const canGoBack = currentIndex > 0;
  const canGoForward = currentIndex < history.length - 1;
  const currentUrl = history[currentIndex];

  return {
    currentUrl,
    navigateToUrl,
    goBack,
    goForward,
    canGoBack,
    canGoForward
  };
};