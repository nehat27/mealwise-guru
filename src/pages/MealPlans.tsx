
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Layout/Navbar';
import MealPlanGenerator from '../components/MealPlans/MealPlanGenerator';
import PageTransition from '../components/Layout/PageTransition';

const MealPlans = () => {
  const { user, hasCompletedQuestionnaire } = useAuth();

  // Redirect if not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <PageTransition>
      <Navbar />
      <div className="min-h-screen pt-24 pb-12 px-4">
        <div className="container mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">AI Meal Plans</h1>
            <p className="text-foreground/70 mt-1">Generate personalized meal plans based on your profile</p>
          </div>
          
          <MealPlanGenerator />
        </div>
      </div>
    </PageTransition>
  );
};

export default MealPlans;
