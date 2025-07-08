
import { Card } from '@/components/ui/card';
import { Activity, Heart, Timer, TrendingUp } from 'lucide-react';

interface Workout {
  id: number;
  type: string;
  duration: number;
  date: string;
}

interface DashboardStatsProps {
  workouts: Workout[];
}

const DashboardStats = ({ workouts }: DashboardStatsProps) => {
  const totalWorkouts = workouts.length;
  const totalDuration = workouts.reduce((sum, workout) => sum + workout.duration, 0);
  const avgDuration = totalWorkouts > 0 ? Math.round(totalDuration / totalWorkouts) : 0;
  const uniqueWorkoutTypes = new Set(workouts.map(w => w.type)).size;

  const stats = [
    {
      title: 'Total Workouts',
      value: totalWorkouts,
      icon: Activity,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-500'
    },
    {
      title: 'Total Minutes',
      value: totalDuration,
      icon: Timer,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-500'
    },
    {
      title: 'Workout Types',
      value: uniqueWorkoutTypes,
      icon: Heart,
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-50',
      iconColor: 'text-red-500'
    },
    {
      title: 'Avg Duration',
      value: `${avgDuration}m`,
      icon: TrendingUp,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-500'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card 
            key={stat.title} 
            className={`p-6 ${stat.bgColor} border-0 hover:shadow-lg transform hover:scale-105 transition-all duration-300 animate-fade-in`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-full bg-gradient-to-r ${stat.color}`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default DashboardStats;
