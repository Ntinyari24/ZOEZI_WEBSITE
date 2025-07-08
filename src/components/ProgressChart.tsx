
import { Card } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Activity, Timer } from 'lucide-react';

interface Workout {
  id: number;
  type: string;
  duration: number;
  date: string;
}

interface ProgressChartProps {
  workouts: Workout[];
}

const ProgressChart = ({ workouts }: ProgressChartProps) => {
  // Prepare data for charts
  const dailyData = workouts.reduce((acc: any[], workout) => {
    const existingDay = acc.find(day => day.date === workout.date);
    if (existingDay) {
      existingDay.duration += workout.duration;
      existingDay.workouts += 1;
    } else {
      acc.push({
        date: workout.date,
        duration: workout.duration,
        workouts: 1
      });
    }
    return acc;
  }, []).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // Workout type distribution
  const workoutTypeData = workouts.reduce((acc: any[], workout) => {
    const existing = acc.find(item => item.name === workout.type);
    if (existing) {
      existing.value += 1;
      existing.totalDuration += workout.duration;
    } else {
      acc.push({ name: workout.type, value: 1, totalDuration: workout.duration });
    }
    return acc;
  }, []);

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#F97316'];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2 flex items-center justify-center">
          <TrendingUp className="w-8 h-8 mr-3 text-blue-500" />
          Your Progress Journey
        </h2>
        <p className="text-gray-600">Track your fitness evolution over time</p>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Daily Activity Chart */}
        <Card className="p-6 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center mb-6">
            <Activity className="w-6 h-6 mr-2 text-blue-500" />
            <h3 className="text-xl font-semibold">Daily Activity</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dailyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip 
                formatter={(value, name) => [value, name === 'duration' ? 'Minutes' : 'Workouts']}
                labelFormatter={(value) => new Date(value).toLocaleDateString()}
              />
              <Bar dataKey="duration" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Workout Frequency */}
        <Card className="p-6 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center mb-6">
            <Timer className="w-6 h-6 mr-2 text-green-500" />
            <h3 className="text-xl font-semibold">Weekly Frequency</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dailyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip 
                formatter={(value) => [value, 'Workouts']}
                labelFormatter={(value) => new Date(value).toLocaleDateString()}
              />
              <Bar dataKey="workouts" fill="#10B981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Workout Distribution */}
        <Card className="p-6 hover:shadow-lg transition-all duration-300 lg:col-span-2">
          <div className="flex items-center mb-6">
            <TrendingUp className="w-6 h-6 mr-2 text-purple-500" />
            <h3 className="text-xl font-semibold">Workout Distribution</h3>
          </div>
          <div className="flex flex-col lg:flex-row items-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={workoutTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {workoutTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value, name, props) => [
                  `${value} sessions (${props.payload.totalDuration} min total)`, 
                  name
                ]} />
              </PieChart>
            </ResponsiveContainer>
            <div className="lg:ml-8 mt-4 lg:mt-0">
              <div className="space-y-2">
                {workoutTypeData.map((entry, index) => (
                  <div key={entry.name} className="flex items-center space-x-3">
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    ></div>
                    <span className="text-sm font-medium">{entry.name}</span>
                    <span className="text-sm text-gray-500">({entry.value} sessions, {entry.totalDuration}min)</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ProgressChart;
