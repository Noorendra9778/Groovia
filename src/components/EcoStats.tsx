
import React from 'react';
import { TreePine, Waves, Leaf } from 'lucide-react';

const stats = [
  {
    icon: TreePine,
    title: 'Trees Planted',
    description: 'Every search with Ecosia plants trees',
    color: 'text-green-600'
  },
  {
    icon: Waves,
    title: 'Ocean Cleanup',
    description: 'OceanHero & Ekoru remove plastic from oceans',
    color: 'text-blue-600'
  },
  {
    icon: Leaf,
    title: 'Environmental Impact',
    description: 'All engines support sustainability',
    color: 'text-emerald-600'
  }
];

const EcoStats = () => {
  return (
    <div className="w-full max-w-4xl mx-auto mt-12">
      <h3 className="text-xl font-semibold text-gray-800 text-center mb-8">
        Your searches make a difference
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <div
              key={index}
              className="flex flex-col items-center p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 hover:-translate-y-1"
            >
              <IconComponent className={`h-8 w-8 ${stat.color} mb-3`} />
              <h4 className="font-semibold text-gray-900 text-center text-sm">
                {stat.title}
              </h4>
              <p className="text-xs text-gray-600 text-center mt-2 leading-relaxed">
                {stat.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EcoStats;
