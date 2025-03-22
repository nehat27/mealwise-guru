
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Loader2, X } from 'lucide-react';
import { nutritionService, type Food } from '../../services/nutritionService';

interface NutritionSearchProps {
  className?: string;
}

const NutritionSearch: React.FC<NutritionSearchProps> = ({ className }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Food[]>([]);
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (searchQuery.length >= 2) {
        setIsLoading(true);
        try {
          const results = await nutritionService.searchFoods(searchQuery);
          setSearchResults(results);
        } catch (error) {
          console.error('Error searching foods:', error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  const handleSelectFood = (food: Food) => {
    setSelectedFood(food);
    setSearchQuery('');
    setSearchResults([]);
  };

  const clearSelectedFood = () => {
    setSelectedFood(null);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`glass p-6 rounded-2xl ${className}`}
    >
      <h3 className="text-lg font-semibold mb-6">Nutrition Facts</h3>
      
      <div className="relative">
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/60" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for a food..."
            className="w-full py-2 pl-10 pr-4 rounded-lg border border-border bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
          {isLoading && (
            <Loader2 size={18} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-foreground/60 animate-spin" />
          )}
        </div>
        
        {searchResults.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-10 mt-1 w-full bg-background rounded-lg shadow-lg border border-border max-h-[300px] overflow-y-auto"
          >
            {searchResults.map((food) => (
              <div 
                key={food.id}
                onClick={() => handleSelectFood(food)}
                className="px-4 py-3 hover:bg-muted cursor-pointer transition-colors border-b border-border last:border-0"
              >
                <div className="font-medium">{food.name}</div>
                <div className="text-sm text-foreground/70 mt-1 flex flex-wrap gap-1">
                  <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded">
                    {food.category}
                  </span>
                  <span className="bg-muted text-foreground/70 text-xs px-2 py-0.5 rounded">
                    {food.nutritionPer100g.calories} cal per 100g
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </div>
      
      {selectedFood && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="mt-6 bg-background/50 p-6 rounded-xl shadow-sm border border-border"
        >
          <div className="flex justify-between items-start mb-4">
            <h4 className="text-xl font-semibold">{selectedFood.name}</h4>
            <button 
              onClick={clearSelectedFood}
              className="text-foreground/60 hover:text-foreground"
            >
              <X size={18} />
            </button>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <div className="text-foreground/70 text-sm">Category</div>
              <div className="font-medium">{selectedFood.category}</div>
            </div>
            <div>
              <div className="text-foreground/70 text-sm">Ayurvedic Property</div>
              <div className="font-medium">{selectedFood.ayurvedicProperty}</div>
            </div>
            <div>
              <div className="text-foreground/70 text-sm">Region</div>
              <div className="font-medium">{selectedFood.region}</div>
            </div>
            <div>
              <div className="text-foreground/70 text-sm">Season</div>
              <div className="font-medium">{selectedFood.season}</div>
            </div>
          </div>
          
          <h5 className="text-md font-medium mb-3">Nutrition (per 100g)</h5>
          <div className="space-y-3">
            {Object.entries(selectedFood.nutritionPer100g).map(([key, value]) => (
              <div key={key} className="flex justify-between pb-2 border-b border-border last:border-0">
                <span className="capitalize">{key}</span>
                <span className="font-medium">
                  {typeof value === 'number' ? value : JSON.stringify(value)}
                  {key === 'calories' ? ' kcal' : key === 'protein' || key === 'carbs' || key === 'fat' || key === 'fiber' || key === 'sugar' ? 'g' : ''}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      )}
      
      {!selectedFood && !isLoading && searchQuery.length < 2 && (
        <div className="mt-10 text-center text-foreground/70">
          <p>Search for a food to see its nutritional information</p>
        </div>
      )}
    </motion.div>
  );
};

export default NutritionSearch;
