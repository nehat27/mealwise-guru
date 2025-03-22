
import React from 'react';
import { motion } from 'framer-motion';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

// Mock data for charts
const macroData = [
  { name: 'Protein', value: 30 },
  { name: 'Carbs', value: 45 },
  { name: 'Fat', value: 25 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const weeklyData = [
  { day: 'Mon', calories: 1800, protein: 120, carbs: 180, fat: 60 },
  { day: 'Tue', calories: 2100, protein: 140, carbs: 220, fat: 70 },
  { day: 'Wed', calories: 1950, protein: 130, carbs: 200, fat: 65 },
  { day: 'Thu', calories: 2000, protein: 135, carbs: 210, fat: 68 },
  { day: 'Fri', calories: 2200, protein: 145, carbs: 230, fat: 73 },
  { day: 'Sat', calories: 1900, protein: 125, carbs: 195, fat: 63 },
  { day: 'Sun', calories: 1750, protein: 115, carbs: 175, fat: 58 },
];

interface NutritionStatsProps {
  className?: string;
}

const NutritionStats: React.FC<NutritionStatsProps> = ({ className }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className={`glass p-6 rounded-2xl ${className}`}
    >
      <h3 className="text-lg font-semibold mb-6">Nutrition Overview</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h4 className="text-sm font-medium mb-2 text-center">Current Macronutrient Split</h4>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={macroData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {macroData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-medium mb-2 text-center">Weekly Calories</h4>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={weeklyData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="calories" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="bg-background/50 p-4 rounded-xl shadow-sm border border-border">
          <h4 className="text-xs font-medium text-foreground/70 mb-1">Protein</h4>
          <p className="text-xl font-semibold">130g</p>
          <p className="text-xs text-foreground/60 mt-1">Goal: 140g</p>
        </div>
        <div className="bg-background/50 p-4 rounded-xl shadow-sm border border-border">
          <h4 className="text-xs font-medium text-foreground/70 mb-1">Carbs</h4>
          <p className="text-xl font-semibold">210g</p>
          <p className="text-xs text-foreground/60 mt-1">Goal: 230g</p>
        </div>
        <div className="bg-background/50 p-4 rounded-xl shadow-sm border border-border">
          <h4 className="text-xs font-medium text-foreground/70 mb-1">Fat</h4>
          <p className="text-xl font-semibold">65g</p>
          <p className="text-xs text-foreground/60 mt-1">Goal: 70g</p>
        </div>
      </div>
    </motion.div>
  );
};

export default NutritionStats;
