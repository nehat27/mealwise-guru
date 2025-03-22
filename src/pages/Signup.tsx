
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Layout/Navbar';
import AuthForm from '../components/Auth/AuthForm';
import PageTransition from '../components/Layout/PageTransition';

const Signup = () => {
  const { user } = useAuth();

  // Redirect if already logged in
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <PageTransition>
      <Navbar />
      <div className="min-h-screen pt-28 pb-12 px-4">
        <div className="max-w-md mx-auto mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Create Your Account</h1>
          <p className="text-foreground/70">Get started with your personalized nutrition journey</p>
        </div>
        <AuthForm type="signup" />
      </div>
    </PageTransition>
  );
};

export default Signup;
