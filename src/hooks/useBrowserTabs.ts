import { useState, useCallback } from 'react';

interface Tab {
  id: string;
  url: string;
  title: string;
}

export const useBrowserTabs = (initialUrl: string) => {
  const [tabs, setTabs] = useState<Tab[]>([
    { id: '1', url: initialUrl, title: new URL(initialUrl).hostname }
  ]);
  const [activeTabId, setActiveTabId] = useState('1');

  const addTab = useCallback(() => {
    const newTabId = Date.now().toString();
    const newTab = { 
      id: newTabId, 
      url: 'https://www.google.com', 
      title: 'New Tab' 
    };
    setTabs(prev => [...prev, newTab]);
    setActiveTabId(newTabId);
    return newTab;
  }, []);

  const closeTab = useCallback((tabId: string) => {
    const newTabs = tabs.filter(tab => tab.id !== tabId);
    setTabs(newTabs);
    
    if (activeTabId === tabId && newTabs.length > 0) {
      setActiveTabId(newTabs[0].id);
      return newTabs[0];
    }
    return null;
  }, [tabs, activeTabId]);

  const switchTab = useCallback((tabId: string) => {
    const tab = tabs.find(t => t.id === tabId);
    if (tab) {
      setActiveTabId(tabId);
      return tab;
    }
    return null;
  }, [tabs]);

  const updateTabTitle = useCallback((tabId: string, title: string) => {
    setTabs(prev => prev.map(tab => 
      tab.id === tabId ? { ...tab, title } : tab
    ));
  }, []);

  const activeTab = tabs.find(tab => tab.id === activeTabId);

  return {
    tabs,
    activeTabId,
    activeTab,
    addTab,
    closeTab,
    switchTab,
    updateTabTitle
  };
};