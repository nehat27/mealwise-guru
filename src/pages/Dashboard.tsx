
import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Layout/Navbar';
import MealPlanOverview from '../components/Dashboard/MealPlanOverview';
import NutritionStats from '../components/Dashboard/NutritionStats';
import ProgressTracker from '../components/Dashboard/ProgressTracker';
import PageTransition from '../components/Layout/PageTransition';

const Dashboard = () => {
  const { user, hasCompletedQuestionnaire } = useAuth();

  // Redirect if not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Redirect to questionnaire if not completed
  if (!hasCompletedQuestionnaire) {
    return <Navigate to="/questionnaire" replace />;
  }

  return (
    <PageTransition>
      <Navbar />
      <div className="min-h-screen pt-24 pb-12 px-4">
        <div className="container mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold">Welcome, {user.name}</h1>
            <p className="text-foreground/70 mt-1">Here's your nutrition and fitness overview</p>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <MealPlanOverview className="lg:col-span-1" />
            <ProgressTracker className="lg:col-span-2" />
            <NutritionStats className="lg:col-span-3" />
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Dashboard;
