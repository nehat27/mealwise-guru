
import React from 'react';
import { motion } from 'framer-motion';
import { Utensils, Coffee, Salad } from 'lucide-react';
import { Link } from 'react-router-dom';

interface MealPlanOverviewProps {
  className?: string;
}

// Mock meal plan data
const currentMealPlan = {
  breakfast: [
    { name: 'Greek Yogurt with Berries', calories: 250 },
    { name: 'Whole Grain Toast', calories: 120 },
    { name: 'Boiled Egg', calories: 80 },
  ],
  lunch: [
    { name: 'Quinoa Salad', calories: 350 },
    { name: 'Grilled Chicken', calories: 200 },
    { name: 'Steamed Vegetables', calories: 100 },
    { name: 'Olive Oil Dressing', calories: 120 },
  ],
  dinner: [
    { name: 'Baked Salmon', calories: 300 },
    { name: 'Brown Rice', calories: 150 },
    { name: 'Roasted Vegetables', calories: 120 },
  ],
};

const MealPlanOverview: React.FC<MealPlanOverviewProps> = ({ className }) => {
  // Calculate total calories
  const totalCalories = Object.values(currentMealPlan).reduce(
    (total, meals) => total + meals.reduce((mealTotal, meal) => mealTotal + meal.calories, 0),
    0
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className={`glass p-6 rounded-2xl ${className}`}
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Today's Meal Plan</h3>
        <Link 
          to="/meal-plans" 
          className="text-sm text-primary hover:text-primary/80 font-medium transition-colors"
        >
          View all
        </Link>
      </div>
      
      <div className="space-y-6">
        <div className="bg-background/50 p-4 rounded-xl shadow-sm border border-border">
          <div className="flex items-center mb-3">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
              <Coffee size={18} className="text-primary" />
            </div>
            <h4 className="font-medium">Breakfast</h4>
          </div>
          <ul className="space-y-2">
            {currentMealPlan.breakfast.map((item, index) => (
              <li key={index} className="flex justify-between text-sm">
                <span>{item.name}</span>
                <span className="text-foreground/70">{item.calories} cal</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="bg-background/50 p-4 rounded-xl shadow-sm border border-border">
          <div className="flex items-center mb-3">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
              <Salad size={18} className="text-primary" />
            </div>
            <h4 className="font-medium">Lunch</h4>
          </div>
          <ul className="space-y-2">
            {currentMealPlan.lunch.map((item, index) => (
              <li key={index} className="flex justify-between text-sm">
                <span>{item.name}</span>
                <span className="text-foreground/70">{item.calories} cal</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="bg-background/50 p-4 rounded-xl shadow-sm border border-border">
          <div className="flex items-center mb-3">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
              <Utensils size={18} className="text-primary" />
            </div>
            <h4 className="font-medium">Dinner</h4>
          </div>
          <ul className="space-y-2">
            {currentMealPlan.dinner.map((item, index) => (
              <li key={index} className="flex justify-between text-sm">
                <span>{item.name}</span>
                <span className="text-foreground/70">{item.calories} cal</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-primary/10 rounded-xl border border-primary/20">
        <div className="flex justify-between items-center">
          <span className="font-medium">Total Calories</span>
          <span className="font-semibold text-lg">{totalCalories} cal</span>
        </div>
      </div>
    </motion.div>
  );
};

export default MealPlanOverview;
