import React from 'react';
import { X, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Tab {
  id: string;
  url: string;
  title: string;
}

interface BrowserTabsProps {
  tabs: Tab[];
  activeTabId: string;
  onTabSwitch: (tabId: string) => void;
  onTabClose: (tabId: string) => void;
  onAddTab: () => void;
}

export const BrowserTabs = ({ 
  tabs, 
  activeTabId, 
  onTabSwitch, 
  onTabClose, 
  onAddTab 
}: BrowserTabsProps) => {
  return (
    <div className="flex items-center bg-muted/20 border-b border-cyan-500/10 overflow-x-auto">
      {tabs.map((tab) => (
        <div
          key={tab.id}
          className={`flex items-center min-w-0 max-w-48 cursor-pointer transition-all duration-200 ${
            activeTabId === tab.id 
              ? 'bg-card/80 border-b-2 border-cyan-400 shadow-neon-cyan' 
              : 'bg-muted/10 hover:bg-muted/30'
          }`}
          onClick={() => onTabSwitch(tab.id)}
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
                onTabClose(tab.id);
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
        onClick={onAddTab}
        title="Add new tab"
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
};