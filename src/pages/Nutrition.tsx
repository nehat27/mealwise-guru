
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Layout/Navbar';
import NutritionSearch from '../components/Nutrition/NutritionSearch';
import PageTransition from '../components/Layout/PageTransition';

const Nutrition = () => {
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
            <h1 className="text-3xl font-bold">Nutrition Information</h1>
            <p className="text-foreground/70 mt-1">Search for foods to see detailed nutritional data</p>
          </div>
          
          <NutritionSearch />
        </div>
      </div>
    </PageTransition>
  );
};

export default Nutrition;
