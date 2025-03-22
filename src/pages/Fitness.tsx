
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Layout/Navbar';
import FitnessRecommendations from '../components/Fitness/FitnessRecommendations';
import PageTransition from '../components/Layout/PageTransition';

const Fitness = () => {
  const { user } = useAuth();

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
            <h1 className="text-3xl font-bold">Fitness Recommendations</h1>
            <p className="text-foreground/70 mt-1">Workouts tailored to your health profile and goals</p>
          </div>
          
          <FitnessRecommendations />
        </div>
      </div>
    </PageTransition>
  );
};

export default Fitness;
