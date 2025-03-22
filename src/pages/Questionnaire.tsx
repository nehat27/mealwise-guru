
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Layout/Navbar';
import QuestionnaireForm from '../components/Questionnaire/QuestionnaireForm';
import PageTransition from '../components/Layout/PageTransition';

const Questionnaire = () => {
  const { user } = useAuth();

  // Redirect if not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <PageTransition>
      <Navbar />
      <div className="min-h-screen pt-28 pb-12 px-4">
        <QuestionnaireForm />
      </div>
    </PageTransition>
  );
};

export default Questionnaire;
