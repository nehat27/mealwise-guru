
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Loader2, Salad, RefreshCw } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { nutritionService, type Food } from '../../services/nutritionService';
import { toast } from 'sonner';

interface MealPlanGeneratorProps {
  className?: string;
}

const MealPlanGenerator: React.FC<MealPlanGeneratorProps> = ({ className }) => {
  const { user } = useAuth();
  const [isGenerating, setIsGenerating] = useState(false);
  const [mealPlan, setMealPlan] = useState<{
    breakfast: Food[];
    lunch: Food[];
    dinner: Food[];
  } | null>(null);

  const generateMealPlan = async () => {
    if (!user?.questionnaire) {
      toast.error('Please complete your profile questionnaire first');
      return;
    }

    setIsGenerating(true);
    try {
      const userPreferences = {
        dietary: user.questionnaire.dietaryRestrictions,
        ayurvedicType: user.questionnaire.ayurvedicType,
        region: user.questionnaire.region,
        season: getCurrentSeason(),
      };

      // Get meal plan from nutrition service
      const generatedPlan = await nutritionService.getRandomMeal(userPreferences);
      
      setMealPlan(generatedPlan);
      toast.success('Meal plan generated successfully');
    } catch (error) {
      console.error('Error generating meal plan:', error);
      toast.error('Failed to generate meal plan');
    } finally {
      setIsGenerating(false);
    }
  };

  const getCurrentSeason = () => {
    const month = new Date().getMonth();
    if (month >= 2 && month <= 4) return 'Spring';
    if (month >= 5 && month <= 7) return 'Summer';
    if (month >= 8 && month <= 10) return 'Autumn';
    return 'Winter';
  };

  // Calculate total calories for a meal
  const calculateMealCalories = (foods: Food[]) => {
    return foods.reduce((total, food) => total + food.nutritionPer100g.calories, 0);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`glass p-6 rounded-2xl ${className}`}
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">AI Meal Plan Generator</h3>
        <button
          onClick={generateMealPlan}
          disabled={isGenerating || !user?.questionnaire}
          className={`px-4 py-2 rounded-full flex items-center space-x-2 text-sm font-medium transition-all
            ${isGenerating || !user?.questionnaire
              ? 'bg-primary/50 text-white cursor-not-allowed'
              : 'bg-primary text-white hover:bg-primary/90'
            }`}
        >
          {isGenerating ? (
            <>
              <Loader2 size={16} className="animate-spin mr-2" />
              <span>Generating...</span>
            </>
          ) : mealPlan ? (
            <>
              <RefreshCw size={16} className="mr-2" />
              <span>Regenerate</span>
            </>
          ) : (
            <>
              <Salad size={16} className="mr-2" />
              <span>Generate Meal Plan</span>
            </>
          )}
        </button>
      </div>

      {!user?.questionnaire && (
        <div className="text-center py-8">
          <p className="text-foreground/70 mb-4">
            Please complete your profile questionnaire to generate a personalized meal plan.
          </p>
          <a
            href="/questionnaire"
            className="inline-flex items-center text-primary hover:text-primary/80 font-medium"
          >
            Complete Questionnaire <ArrowRight size={16} className="ml-1" />
          </a>
        </div>
      )}

      {mealPlan && (
        <div className="space-y-6 mt-4">
          <div>
            <h4 className="text-md font-medium mb-3 flex items-center">
              <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded mr-2">Breakfast</span>
              <span>{calculateMealCalories(mealPlan.breakfast)} calories</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {mealPlan.breakfast.map((food, index) => (
                <div key={index} className="bg-background/50 p-4 rounded-xl shadow-sm border border-border hover:shadow-md transition-shadow">
                  <h5 className="font-medium mb-1">{food.name}</h5>
                  <div className="text-sm text-foreground/70 mb-2">
                    {food.nutritionPer100g.calories} cal | {food.nutritionPer100g.protein}g protein
                  </div>
                  <div className="flex flex-wrap gap-1">
                    <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">
                      {food.ayurvedicProperty}
                    </span>
                    <span className="text-xs bg-muted text-foreground/70 px-2 py-0.5 rounded">
                      {food.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-md font-medium mb-3 flex items-center">
              <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded mr-2">Lunch</span>
              <span>{calculateMealCalories(mealPlan.lunch)} calories</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {mealPlan.lunch.map((food, index) => (
                <div key={index} className="bg-background/50 p-4 rounded-xl shadow-sm border border-border hover:shadow-md transition-shadow">
                  <h5 className="font-medium mb-1">{food.name}</h5>
                  <div className="text-sm text-foreground/70 mb-2">
                    {food.nutritionPer100g.calories} cal | {food.nutritionPer100g.protein}g protein
                  </div>
                  <div className="flex flex-wrap gap-1">
                    <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">
                      {food.ayurvedicProperty}
                    </span>
                    <span className="text-xs bg-muted text-foreground/70 px-2 py-0.5 rounded">
                      {food.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-md font-medium mb-3 flex items-center">
              <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded mr-2">Dinner</span>
              <span>{calculateMealCalories(mealPlan.dinner)} calories</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {mealPlan.dinner.map((food, index) => (
                <div key={index} className="bg-background/50 p-4 rounded-xl shadow-sm border border-border hover:shadow-md transition-shadow">
                  <h5 className="font-medium mb-1">{food.name}</h5>
                  <div className="text-sm text-foreground/70 mb-2">
                    {food.nutritionPer100g.calories} cal | {food.nutritionPer100g.protein}g protein
                  </div>
                  <div className="flex flex-wrap gap-1">
                    <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">
                      {food.ayurvedicProperty}
                    </span>
                    <span className="text-xs bg-muted text-foreground/70 px-2 py-0.5 rounded">
                      {food.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 p-4 bg-primary/10 rounded-xl border border-primary/20">
            <div className="flex justify-between items-center">
              <span className="font-medium">Total Daily Calories</span>
              <span className="font-semibold text-lg">
                {calculateMealCalories(mealPlan.breakfast) + 
                 calculateMealCalories(mealPlan.lunch) + 
                 calculateMealCalories(mealPlan.dinner)} cal
              </span>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default MealPlanGenerator;
