
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Dumbbell, Heart } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface ExerciseType {
  id: string;
  name: string;
  description: string;
  durationMinutes: number;
  caloriesBurned: number;
  intensity: 'Low' | 'Medium' | 'High';
  category: 'Cardio' | 'Strength' | 'Flexibility' | 'Balance';
  suitable: string[];
}

const exerciseDatabase: ExerciseType[] = [
  {
    id: '1',
    name: 'Walking',
    description: 'Brisk walking outdoors or on a treadmill',
    durationMinutes: 30,
    caloriesBurned: 120,
    intensity: 'Low',
    category: 'Cardio',
    suitable: ['Weight loss', 'Overall health', 'Stress reduction'],
  },
  {
    id: '2',
    name: 'Yoga',
    description: 'Beginner-friendly yoga poses focusing on flexibility',
    durationMinutes: 30,
    caloriesBurned: 110,
    intensity: 'Low',
    category: 'Flexibility',
    suitable: ['Better flexibility', 'Stress reduction', 'Overall health'],
  },
  {
    id: '3',
    name: 'Bodyweight Exercises',
    description: 'Push-ups, squats, lunges, and planks circuit',
    durationMinutes: 20,
    caloriesBurned: 150,
    intensity: 'Medium',
    category: 'Strength',
    suitable: ['Muscle gain', 'Increased strength', 'Weight loss'],
  },
  {
    id: '4',
    name: 'Swimming',
    description: 'Freestyle swimming laps in a pool',
    durationMinutes: 30,
    caloriesBurned: 200,
    intensity: 'Medium',
    category: 'Cardio',
    suitable: ['Weight loss', 'Improved endurance', 'Overall health'],
  },
  {
    id: '5',
    name: 'Cycling',
    description: 'Outdoor cycling or stationary bike',
    durationMinutes: 30,
    caloriesBurned: 180,
    intensity: 'Medium',
    category: 'Cardio',
    suitable: ['Weight loss', 'Improved endurance', 'Overall health'],
  },
  {
    id: '6',
    name: 'HIIT Workout',
    description: 'High-intensity interval training with short bursts of intense exercise',
    durationMinutes: 20,
    caloriesBurned: 250,
    intensity: 'High',
    category: 'Cardio',
    suitable: ['Weight loss', 'Improved endurance', 'Increased metabolism'],
  },
  {
    id: '7',
    name: 'Weight Training',
    description: 'Resistance training with dumbbells or machines',
    durationMinutes: 45,
    caloriesBurned: 180,
    intensity: 'Medium',
    category: 'Strength',
    suitable: ['Muscle gain', 'Increased strength', 'Weight loss'],
  },
  {
    id: '8',
    name: 'Pilates',
    description: 'Core-strengthening exercises with controlled movements',
    durationMinutes: 40,
    caloriesBurned: 160,
    intensity: 'Medium',
    category: 'Flexibility',
    suitable: ['Better flexibility', 'Core strength', 'Overall health'],
  },
];

interface FitnessRecommendationsProps {
  className?: string;
}

const FitnessRecommendations: React.FC<FitnessRecommendationsProps> = ({ className }) => {
  const { user } = useAuth();
  const [recommendations, setRecommendations] = useState<ExerciseType[]>([]);

  useEffect(() => {
    if (user?.questionnaire?.fitnessGoals) {
      // Filter exercises that match user goals
      const userGoals = user.questionnaire.fitnessGoals;
      
      // Simple algorithm to recommend exercises based on goals
      const matchingExercises = exerciseDatabase.filter(exercise => {
        return exercise.suitable.some(suitability => 
          userGoals.some(goal => 
            suitability.toLowerCase().includes(goal.toLowerCase())
          )
        );
      });
      
      // If we have enough matches, use them, otherwise fall back to all exercises
      setRecommendations(matchingExercises.length >= 3 ? matchingExercises : exerciseDatabase);
    } else {
      // If no questionnaire data, show all exercises
      setRecommendations(exerciseDatabase);
    }
  }, [user]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Cardio':
        return <Heart size={18} />;
      case 'Strength':
        return <Dumbbell size={18} />;
      default:
        return <Activity size={18} />;
    }
  };

  const getIntensityColor = (intensity: string) => {
    switch (intensity) {
      case 'Low':
        return 'bg-green-100 text-green-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'High':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`glass p-6 rounded-2xl ${className}`}
    >
      <h3 className="text-lg font-semibold mb-6">Recommended Workouts</h3>
      
      {!user?.questionnaire?.fitnessGoals && (
        <div className="text-center py-4 mb-4 bg-muted/50 rounded-lg">
          <p className="text-foreground/70 mb-2">
            Complete your profile questionnaire for personalized workout recommendations
          </p>
          <a
            href="/questionnaire"
            className="text-primary hover:text-primary/80 font-medium"
          >
            Update Profile
          </a>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {recommendations.map((exercise) => (
          <motion.div
            key={exercise.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-background/50 p-5 rounded-xl shadow-sm border border-border hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                  {getCategoryIcon(exercise.category)}
                </div>
                <h4 className="font-medium">{exercise.name}</h4>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded ${getIntensityColor(exercise.intensity)}`}>
                {exercise.intensity}
              </span>
            </div>
            
            <p className="text-sm text-foreground/70 mb-3">{exercise.description}</p>
            
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-foreground/60">Duration:</span>
                <span className="ml-1 font-medium">{exercise.durationMinutes} min</span>
              </div>
              <div>
                <span className="text-foreground/60">Calories:</span>
                <span className="ml-1 font-medium">{exercise.caloriesBurned}</span>
              </div>
              <div>
                <span className="text-foreground/60">Type:</span>
                <span className="ml-1 font-medium">{exercise.category}</span>
              </div>
            </div>
            
            <div className="mt-3 pt-3 border-t border-border">
              <div className="text-xs text-foreground/60 mb-1">Good for:</div>
              <div className="flex flex-wrap gap-1">
                {exercise.suitable.map((goal, index) => (
                  <span key={index} className="text-xs bg-muted px-2 py-0.5 rounded">
                    {goal}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default FitnessRecommendations;
