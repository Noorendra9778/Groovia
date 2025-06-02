import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Globe, Shuffle } from 'lucide-react';

interface EngineSelectorProps {
  selectedEngine: string;
  onEngineChange: (engine: string) => void;
}

const engines = [
  { id: 'random', name: 'Random Engine', icon: Shuffle, description: 'Surprise me!' },
  { id: 'oceanhero', name: 'OceanHero', icon: Globe, description: 'Removes plastic from oceans' },
  { id: 'ecosia', name: 'Ecosia', icon: Globe, description: 'Plants trees with your searches' },
  { id: 'ekoru', name: 'Ekoru', icon: Globe, description: 'Cleans oceans and plants trees' },
  { id: 'givewater', name: 'GiveWater', icon: Globe, description: 'Provides clean water access' },
  { id: 'lilo', name: 'Lilo', icon: Globe, description: 'Funds social & environmental projects' },
];

const EngineSelector = ({ selectedEngine, onEngineChange }: EngineSelectorProps) => {
  return (
    <div className="w-full max-w-md mx-auto mb-6">
      <Select value={selectedEngine} onValueChange={onEngineChange}>
        <SelectTrigger className="w-full bg-white border-green-200 hover:border-green-300 focus:ring-green-300">
          <SelectValue placeholder="Choose your eco-search engine" />
        </SelectTrigger>
        <SelectContent className="bg-white border-green-200">
          {engines.map((engine) => {
            const IconComponent = engine.icon;
            return (
              <SelectItem key={engine.id} value={engine.id} className="hover:bg-green-50">
                <div className="flex items-center gap-3">
                  <IconComponent className="h-4 w-4 text-green-600" />
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-900">{engine.name}</span>
                    <span className="text-xs text-green-600">{engine.description}</span>
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
