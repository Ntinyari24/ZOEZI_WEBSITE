
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { Activity, Timer, Utensils } from 'lucide-react';

interface WorkoutLoggerProps {
  onAddWorkout: (workout: any) => void;
}

const WorkoutLogger = ({ onAddWorkout }: WorkoutLoggerProps) => {
  const [workout, setWorkout] = useState({
    type: '',
    duration: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const workoutTypes = [
    'Running', 'Cycling', 'Weight Training', 'Swimming', 'Yoga', 'Walking', 'HIIT', 'Pilates', 'Boxing', 'Dancing'
  ];

  const getMealPlan = (workoutType: string) => {
    const mealPlans: { [key: string]: string[] } = {
      'Running': [
        'Pre-workout: Banana with almond butter',
        'Post-workout: Greek yogurt with berries',
        'Hydration: Electrolyte drink during long runs'
      ],
      'Weight Training': [
        'Pre-workout: Oatmeal with protein powder',
        'Post-workout: Protein shake with banana',
        'Recovery: Lean protein with quinoa'
      ],
      'Swimming': [
        'Pre-workout: Light carbs like toast',
        'Post-workout: Chocolate milk for recovery',
        'Hydration: Water before, during, and after'
      ],
      'Cycling': [
        'Pre-workout: Energy bar or dates',
        'During: Sports drink for long rides',
        'Post-workout: Recovery smoothie'
      ],
      'Yoga': [
        'Pre-workout: Light snack if needed',
        'Post-workout: Herbal tea with nuts',
        'Focus: Stay hydrated throughout'
      ],
      'HIIT': [
        'Pre-workout: Small portion of carbs',
        'Post-workout: Protein-rich meal',
        'Recovery: Anti-inflammatory foods'
      ]
    };
    
    return mealPlans[workoutType] || [
      'Pre-workout: Light, easily digestible carbs',
      'Post-workout: Protein and carbs within 30 minutes',
      'Hydration: Water before, during, and after'
    ];
  };

  const getExerciseTips = (workoutType: string) => {
    const tips: { [key: string]: string[] } = {
      'Running': [
        'Warm up with 5-10 minutes of walking',
        'Land on midfoot, not heel',
        'Keep your cadence around 180 steps per minute'
      ],
      'Weight Training': [
        'Focus on proper form over heavy weight',
        'Rest 48-72 hours between training same muscle groups',
        'Progressive overload: gradually increase weight/reps'
      ],
      'Swimming': [
        'Focus on breathing technique',
        'Keep your body position horizontal',
        'Start with shorter distances and build endurance'
      ],
      'Cycling': [
        'Adjust bike fit properly to prevent injury',
        'Maintain steady cadence (80-100 RPM)',
        'Use gears efficiently on hills'
      ],
      'Yoga': [
        'Listen to your body and don\'t force poses',
        'Focus on breathing throughout practice',
        'Use props when needed for proper alignment'
      ],
      'HIIT': [
        'Work at 80-90% max effort during intervals',
        'Allow complete rest between intervals',
        'Limit HIIT sessions to 2-3 times per week'
      ]
    };
    
    return tips[workoutType] || [
      'Start with proper warm-up',
      'Maintain good form throughout',
      'Cool down and stretch after workout'
    ];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!workout.type || !workout.duration) {
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
      duration: parseInt(workout.duration)
    });

    const mealPlan = getMealPlan(workout.type);
    const exerciseTips = getExerciseTips(workout.type);

    toast({
      title: "Workout Logged! 🎉",
      description: `Great ${workout.type} session! Check your recommendations below.`,
    });

    setWorkout({ type: '', duration: '' });
    setIsSubmitting(false);
  };

  const selectedMealPlan = workout.type ? getMealPlan(workout.type) : [];
  const selectedTips = workout.type ? getExerciseTips(workout.type) : [];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Card className="p-8 bg-gradient-to-br from-white to-blue-50 shadow-xl hover:shadow-2xl transition-all duration-300">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-full mb-4">
            <Activity className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Log Your Workout</h2>
          <p className="text-gray-600">Track your progress and get personalized recommendations!</p>
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

      {/* Recommendations */}
      {workout.type && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fade-in">
          {/* Meal Plan Recommendations */}
          <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <div className="flex items-center mb-4">
              <Utensils className="w-6 h-6 mr-2 text-green-600" />
              <h3 className="text-xl font-semibold text-green-800">Meal Plan for {workout.type}</h3>
            </div>
            <div className="space-y-3">
              {selectedMealPlan.map((meal, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-white rounded-lg shadow-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700">{meal}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Exercise Tips */}
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <div className="flex items-center mb-4">
              <Activity className="w-6 h-6 mr-2 text-blue-600" />
              <h3 className="text-xl font-semibold text-blue-800">{workout.type} Tips</h3>
            </div>
            <div className="space-y-3">
              {selectedTips.map((tip, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-white rounded-lg shadow-sm">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700">{tip}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default WorkoutLogger;
