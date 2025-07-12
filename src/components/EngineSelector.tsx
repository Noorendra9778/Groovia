
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Globe, Shuffle } from 'lucide-react';

interface EngineSelectorProps {
  selectedEngine: string;
  onEngineChange: (engine: string) => void;
}

const engines = [
  { id: 'random', name: 'Random Engine', icon: Shuffle, description: 'Surprise me!' },
  { id: 'ecosia', name: 'Ecosia', icon: Globe, description: 'Plants trees with your searches' },
  { id: 'oceanhero', name: 'OceanHero', icon: Globe, description: 'Removes plastic from oceans' },
  { id: 'ekoru', name: 'Ekoru', icon: Globe, description: 'Cleans oceans and plants trees' },
];

const EngineSelector = ({ selectedEngine, onEngineChange }: EngineSelectorProps) => {
  return (
    <div className="w-full max-w-md mx-auto mb-3 sm:mb-6">
      <Select value={selectedEngine} onValueChange={onEngineChange}>
        <SelectTrigger className="w-full h-10 sm:h-11 text-sm sm:text-base bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-green-200 dark:border-green-800 hover:border-green-300 dark:hover:border-green-600 focus:ring-green-300 dark:focus:ring-green-600 transition-all duration-300 hover:scale-[1.02]">
          <SelectValue placeholder="Choose eco-search engine" />
        </SelectTrigger>
        <SelectContent className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-green-200 dark:border-green-800">
          {engines.map((engine) => {
            const IconComponent = engine.icon;
            return (
              <SelectItem 
                key={engine.id} 
                value={engine.id} 
                className="hover:bg-green-50 dark:hover:bg-green-900/30 transition-all duration-200 hover:scale-[1.02] py-2 sm:py-3"
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  <IconComponent className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 dark:text-green-400" />
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-900 dark:text-gray-100 text-sm sm:text-base">{engine.name}</span>
                    <span className="text-xs text-green-600 dark:text-green-400 hidden sm:block">{engine.description}</span>
                  </div>
                </div>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
};

export default EngineSelector;
