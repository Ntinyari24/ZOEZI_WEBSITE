
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Activity, Heart, Timer, TrendingUp, Calendar, Star } from 'lucide-react';
import WorkoutLogger from '@/components/WorkoutLogger';
import ProgressChart from '@/components/ProgressChart';
import DashboardStats from '@/components/DashboardStats';
import HeroSection from '@/components/HeroSection';

const Index = () => {
  const [activeView, setActiveView] = useState('dashboard');
  const [workouts, setWorkouts] = useState([
    { id: 1, type: 'Running', duration: 30, calories: 250, date: '2024-07-07' },
    { id: 2, type: 'Weight Training', duration: 45, calories: 180, date: '2024-07-06' },
    { id: 3, type: 'Cycling', duration: 60, calories: 320, date: '2024-07-05' },
  ]);

  const addWorkout = (workout: any) => {
    const newWorkout = {
      id: Date.now(),
      ...workout,
      date: new Date().toISOString().split('T')[0]
    };
    setWorkouts([newWorkout, ...workouts]);
  };

  const weeklyGoal = 300; // minutes
  const weeklyProgress = workouts.reduce((total, workout) => total + workout.duration, 0);
  const progressPercentage = Math.min((weeklyProgress / weeklyGoal) * 100, 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {activeView === 'dashboard' && <HeroSection />}
      
      {/* Navigation */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center space-x-1 py-4">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: Activity },
              { id: 'logger', label: 'Log Workout', icon: Timer },
              { id: 'progress', label: 'Progress', icon: TrendingUp }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <Button
                  key={tab.id}
                  variant={activeView === tab.id ? "default" : "ghost"}
                  onClick={() => setActiveView(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-2 rounded-full transition-all duration-300 ${
                    activeView === tab.id 
                      ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-lg transform scale-105' 
                      : 'hover:bg-gray-100 hover:scale-105'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </Button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard View */}
        {activeView === 'dashboard' && (
          <div className="space-y-8 animate-fade-in">
            <DashboardStats workouts={workouts} />
            
            {/* Weekly Goal Progress */}
            <Card className="p-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold flex items-center">
                  <Star className="w-6 h-6 mr-2" />
                  Weekly Goal
                </h3>
                <Badge variant="secondary" className="bg-white/20 text-white border-0">
                  {Math.round(progressPercentage)}% Complete
                </Badge>
              </div>
              <Progress value={progressPercentage} className="h-3 mb-2" />
              <p className="text-sm opacity-90">
                {weeklyProgress} / {weeklyGoal} minutes completed this week
              </p>
            </Card>

            {/* Recent Workouts */}
            <Card className="p-6 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold flex items-center">
                  <Calendar className="w-6 h-6 mr-2 text-blue-500" />
                  Recent Workouts
                </h3>
              </div>
              <div className="space-y-4">
                {workouts.slice(0, 3).map((workout, index) => (
                  <div 
                    key={workout.id} 
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-200 transform hover:scale-102"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-gradient-to-r from-blue-500 to-green-500 rounded-full">
                        <Activity className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium">{workout.type}</p>
                        <p className="text-sm text-gray-500">{workout.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{workout.duration} min</p>
                      <p className="text-sm text-gray-500 flex items-center">
                        <Heart className="w-3 h-3 mr-1" />
                        {workout.calories} cal
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* Workout Logger View */}
        {activeView === 'logger' && (
          <div className="animate-fade-in">
            <WorkoutLogger onAddWorkout={addWorkout} />
          </div>
        )}

        {/* Progress View */}
        {activeView === 'progress' && (
          <div className="animate-fade-in">
            <ProgressChart workouts={workouts} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
