
import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Mock data for progress chart
const progressData = [
  { week: 'Week 1', weight: 70, bodyFat: 22 },
  { week: 'Week 2', weight: 69.5, bodyFat: 21.5 },
  { week: 'Week 3', weight: 69, bodyFat: 21 },
  { week: 'Week 4', weight: 68.2, bodyFat: 20.5 },
  { week: 'Week 5', weight: 67.8, bodyFat: 20 },
  { week: 'Week 6', weight: 67.5, bodyFat: 19.7 },
  { week: 'Week 7', weight: 67, bodyFat: 19.2 },
  { week: 'Week 8', weight: 66.5, bodyFat: 18.9 },
];

interface ProgressTrackerProps {
  className?: string;
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({ className }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={`glass p-6 rounded-2xl ${className}`}
    >
      <h3 className="text-lg font-semibold mb-4">Progress Tracker</h3>
      
      <div className="h-[250px] mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={progressData}
            margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week" />
            <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
            <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
            <Tooltip />
            <Legend />
            <Line yAxisId="left" type="monotone" dataKey="weight" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line yAxisId="right" type="monotone" dataKey="bodyFat" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="bg-background/50 p-4 rounded-xl shadow-sm border border-border">
          <h4 className="text-sm font-medium mb-2">Weight Change</h4>
          <p className="text-2xl font-semibold text-primary">-3.5 kg</p>
          <p className="text-xs text-foreground/60 mt-1">since starting</p>
        </div>
        <div className="bg-background/50 p-4 rounded-xl shadow-sm border border-border">
          <h4 className="text-sm font-medium mb-2">Body Fat</h4>
          <p className="text-2xl font-semibold text-primary">-3.1%</p>
          <p className="text-xs text-foreground/60 mt-1">since starting</p>
        </div>
      </div>
    </motion.div>
  );
};

export default ProgressTracker;
