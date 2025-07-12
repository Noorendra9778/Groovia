
import React from 'react';
import { TreePine, Waves, Leaf } from 'lucide-react';

const stats = [
  {
    icon: TreePine,
    title: 'Trees Planted',
    description: 'Every search with Ecosia plants trees',
    color: 'text-green-600 dark:text-green-400'
  },
  {
    icon: Waves,
    title: 'Ocean Cleanup',
    description: 'OceanHero & Ekoru remove plastic from oceans',
    color: 'text-blue-600 dark:text-blue-400'
  },
  {
    icon: Leaf,
    title: 'Environmental Impact',
    description: 'All engines support sustainability',
    color: 'text-emerald-600 dark:text-emerald-400'
  }
];

const EcoStats = () => {
  return (
    <div className="w-full max-w-4xl mx-auto mt-6 sm:mt-12">
      <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-200 text-center mb-4 sm:mb-8 transition-colors duration-300">
        Your searches make a difference
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 px-2">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <div
              key={index}
              className="flex flex-col items-center p-3 sm:p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all duration-300 hover:-translate-y-2 hover:scale-105 group animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="mb-2 sm:mb-3 p-1.5 sm:p-2 rounded-full bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 group-hover:scale-110 transition-transform duration-300">
                <IconComponent className={`h-5 w-5 sm:h-8 sm:w-8 ${stat.color} transition-colors duration-300`} />
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-center text-xs sm:text-sm transition-colors duration-300">
                {stat.title}
              </h4>
              <p className="text-xs text-gray-600 dark:text-gray-400 text-center mt-1 sm:mt-2 leading-relaxed transition-colors duration-300">
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
