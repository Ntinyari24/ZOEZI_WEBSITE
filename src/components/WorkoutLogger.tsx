
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { Activity, Timer, Heart } from 'lucide-react';

interface WorkoutLoggerProps {
  onAddWorkout: (workout: any) => void;
}

const WorkoutLogger = ({ onAddWorkout }: WorkoutLoggerProps) => {
  const [workout, setWorkout] = useState({
    type: '',
    duration: '',
    calories: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const workoutTypes = [
    'Running', 'Cycling', 'Weight Training', 'Swimming', 'Yoga', 'Walking', 'HIIT', 'Pilates', 'Boxing', 'Dancing'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!workout.type || !workout.duration || !workout.calories) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields to log your workout.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    onAddWorkout({
      type: workout.type,
      duration: parseInt(workout.duration),
      calories: parseInt(workout.calories)
    });

    toast({
      title: "Workout Logged! 🎉",
      description: `Great job! You burned ${workout.calories} calories in ${workout.duration} minutes.`,
    });

    setWorkout({ type: '', duration: '', calories: '' });
    setIsSubmitting(false);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="p-8 bg-gradient-to-br from-white to-blue-50 shadow-xl hover:shadow-2xl transition-all duration-300">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-full mb-4">
            <Activity className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Log Your Workout</h2>
          <p className="text-gray-600">Track your progress and stay motivated!</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="workout-type" className="text-sm font-medium text-gray-700">
              Workout Type
            </Label>
            <Select value={workout.type} onValueChange={(value) => setWorkout(prev => ({ ...prev, type: value }))}>
              <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-blue-500 transition-colors">
                <SelectValue placeholder="Choose your workout type" />
              </SelectTrigger>
              <SelectContent>
                {workoutTypes.map((type) => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="duration" className="text-sm font-medium text-gray-700 flex items-center">
                <Timer className="w-4 h-4 mr-2 text-green-500" />
                Duration (minutes)
              </Label>
              <Input
                id="duration"
                type="number"
                value={workout.duration}
                onChange={(e) => setWorkout(prev => ({ ...prev, duration: e.target.value }))}
                placeholder="30"
                className="h-12 border-2 border-gray-200 focus:border-green-500 transition-colors"
                min="1"
                max="300"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="calories" className="text-sm font-medium text-gray-700 flex items-center">
                <Heart className="w-4 h-4 mr-2 text-red-500" />
                Calories Burned
              </Label>
              <Input
                id="calories"
                type="number"
                value={workout.calories}
                onChange={(e) => setWorkout(prev => ({ ...prev, calories: e.target.value }))}
                placeholder="250"
                className="h-12 border-2 border-gray-200 focus:border-red-500 transition-colors"
                min="1"
                max="2000"
              />
            </div>
          </div>

          <Button 
            type="submit" 
            disabled={isSubmitting}
            className={`w-full h-12 bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : 'transform hover:scale-105'
            }`}
          >
            {isSubmitting ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Logging Workout...</span>
              </div>
            ) : (
              'Log Workout'
            )}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default WorkoutLogger;
