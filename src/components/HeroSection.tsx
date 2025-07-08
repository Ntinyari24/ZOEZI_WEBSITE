
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { TrendingUp, Heart, Timer } from 'lucide-react';

const HeroSection = () => {
  const [currentStat, setCurrentStat] = useState(0);
  const stats = [
    { value: '2,500+', label: 'Calories Burned', icon: Heart },
    { value: '150+', label: 'Workouts Completed', icon: Timer },
    { value: '95%', label: 'Goals Achieved', icon: TrendingUp }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [stats.length]);

  return (
    <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-green-500 text-white py-20 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-20 h-20 bg-yellow-300 rounded-full animate-bounce"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-pink-300 rounded-full animate-pulse"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
            ZOEZI
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
            Transform your fitness journey with intelligent tracking, beautiful visualizations, and motivating progress insights.
          </p>
          
          {/* Animated stat counter */}
          <div className="mb-8">
            <div className="inline-flex items-center space-x-3 bg-white/20 backdrop-blur-md rounded-full px-6 py-3 transition-all duration-500 transform hover:scale-105">
              {(() => {
                const stat = stats[currentStat];
                const Icon = stat.icon;
                return (
                  <>
                    <Icon className="w-6 h-6 text-yellow-300" />
                    <span className="text-2xl font-bold">{stat.value}</span>
                    <span className="text-blue-100">{stat.label}</span>
                  </>
                );
              })()}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-blue-50 transform hover:scale-105 transition-all duration-300 font-semibold px-8 py-3 rounded-full shadow-lg"
            >
              Start Your Journey
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-blue-600 transform hover:scale-105 transition-all duration-300 font-semibold px-8 py-3 rounded-full"
            >
              View Progress
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
