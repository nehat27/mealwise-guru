
interface NutritionData {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
  vitamins?: Record<string, number>;
  minerals?: Record<string, number>;
}

interface Food {
  id: string;
  name: string;
  category: string;
  season: string;
  region: string;
  ayurvedicProperty: 'vata' | 'pitta' | 'kapha' | 'tridoshic';
  nutritionPer100g: NutritionData;
}

// Mock food database
const foodDatabase: Food[] = [
  {
    id: '1',
    name: 'Basmati Rice',
    category: 'Grains',
    season: 'All',
    region: 'South Asia',
    ayurvedicProperty: 'tridoshic',
    nutritionPer100g: {
      calories: 130,
      protein: 2.7,
      carbs: 28,
      fat: 0.3,
      fiber: 0.4,
      sugar: 0.1,
    },
  },
  {
    id: '2',
    name: 'Lentils (Dal)',
    category: 'Legumes',
    season: 'All',
    region: 'South Asia',
    ayurvedicProperty: 'pitta',
    nutritionPer100g: {
      calories: 116,
      protein: 9,
      carbs: 20,
      fat: 0.4,
      fiber: 8,
      sugar: 1.8,
    },
  },
  {
    id: '3',
    name: 'Spinach',
    category: 'Vegetables',
    season: 'Winter',
    region: 'Global',
    ayurvedicProperty: 'vata',
    nutritionPer100g: {
      calories: 23,
      protein: 2.9,
      carbs: 3.6,
      fat: 0.4,
      fiber: 2.2,
      sugar: 0.4,
    },
  },
  {
    id: '4',
    name: 'Mango',
    category: 'Fruits',
    season: 'Summer',
    region: 'South Asia',
    ayurvedicProperty: 'pitta',
    nutritionPer100g: {
      calories: 60,
      protein: 0.8,
      carbs: 15,
      fat: 0.4,
      fiber: 1.6,
      sugar: 14,
    },
  },
  {
    id: '5',
    name: 'Yogurt',
    category: 'Dairy',
    season: 'All',
    region: 'Global',
    ayurvedicProperty: 'kapha',
    nutritionPer100g: {
      calories: 59,
      protein: 3.5,
      carbs: 5,
      fat: 3.3,
      fiber: 0,
      sugar: 5,
    },
  },
  {
    id: '6',
    name: 'Chicken Breast',
    category: 'Protein',
    season: 'All',
    region: 'Global',
    ayurvedicProperty: 'kapha',
    nutritionPer100g: {
      calories: 165,
      protein: 31,
      carbs: 0,
      fat: 3.6,
      fiber: 0,
      sugar: 0,
    },
  },
  {
    id: '7',
    name: 'Sweet Potato',
    category: 'Vegetables',
    season: 'Autumn',
    region: 'Global',
    ayurvedicProperty: 'vata',
    nutritionPer100g: {
      calories: 86,
      protein: 1.6,
      carbs: 20,
      fat: 0.1,
      fiber: 3,
      sugar: 4.2,
    },
  },
  {
    id: '8',
    name: 'Salmon',
    category: 'Protein',
    season: 'All',
    region: 'Global',
    ayurvedicProperty: 'pitta',
    nutritionPer100g: {
      calories: 206,
      protein: 22,
      carbs: 0,
      fat: 13,
      fiber: 0,
      sugar: 0,
    },
  },
  {
    id: '9',
    name: 'Quinoa',
    category: 'Grains',
    season: 'All',
    region: 'Global',
    ayurvedicProperty: 'tridoshic',
    nutritionPer100g: {
      calories: 120,
      protein: 4.4,
      carbs: 21.3,
      fat: 1.9,
      fiber: 2.8,
      sugar: 0.9,
    },
  },
  {
    id: '10',
    name: 'Avocado',
    category: 'Fruits',
    season: 'All',
    region: 'Global',
    ayurvedicProperty: 'vata',
    nutritionPer100g: {
      calories: 160,
      protein: 2,
      carbs: 8.5,
      fat: 14.7,
      fiber: 6.7,
      sugar: 0.7,
    },
  },
];

export const nutritionService = {
  searchFoods: (query: string): Promise<Food[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const results = foodDatabase.filter(food => 
          food.name.toLowerCase().includes(query.toLowerCase())
        );
        resolve(results);
      }, 500);
    });
  },
  
  getFoodById: (id: string): Promise<Food | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const food = foodDatabase.find(f => f.id === id);
        resolve(food || null);
      }, 300);
    });
  },
  
  getFoodsByCategory: (category: string): Promise<Food[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const foods = foodDatabase.filter(f => f.category === category);
        resolve(foods);
      }, 300);
    });
  },
  
  getFoodsBySeason: (season: string): Promise<Food[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const foods = foodDatabase.filter(f => 
          f.season === season || f.season === 'All'
        );
        resolve(foods);
      }, 300);
    });
  },
  
  getFoodsByRegion: (region: string): Promise<Food[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const foods = foodDatabase.filter(f => 
          f.region === region || f.region === 'Global'
        );
        resolve(foods);
      }, 300);
    });
  },
  
  getFoodsByAyurvedicType: (type: string): Promise<Food[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const foods = foodDatabase.filter(f => 
          f.ayurvedicProperty === type || f.ayurvedicProperty === 'tridoshic'
        );
        resolve(foods);
      }, 300);
    });
  },

  getAllFoods: (): Promise<Food[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...foodDatabase]);
      }, 300);
    });
  },

  getRandomMeal: (preferences: {
    dietary?: string[];
    ayurvedicType?: string;
    region?: string;
    season?: string;
  }): Promise<{breakfast: Food[], lunch: Food[], dinner: Food[]}> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Filter foods based on preferences
        let filteredFoods = [...foodDatabase];
        
        if (preferences.ayurvedicType) {
          filteredFoods = filteredFoods.filter(f => 
            f.ayurvedicProperty === preferences.ayurvedicType || 
            f.ayurvedicProperty === 'tridoshic'
          );
        }
        
        if (preferences.region) {
          filteredFoods = filteredFoods.filter(f => 
            f.region === preferences.region || f.region === 'Global'
          );
        }
        
        if (preferences.season) {
          filteredFoods = filteredFoods.filter(f => 
            f.season === preferences.season || f.season === 'All'
          );
        }

        // Simple randomization for meal generation
        const shuffle = (array: Food[]) => {
          return [...array].sort(() => Math.random() - 0.5);
        };

        const breakfast = shuffle(filteredFoods).slice(0, 3);
        const lunch = shuffle(filteredFoods).slice(0, 4);
        const dinner = shuffle(filteredFoods).slice(0, 3);

        resolve({ breakfast, lunch, dinner });
      }, 800);
    });
  }
};

export type { Food, NutritionData };
