
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Layout/Navbar';
import AuthForm from '../components/Auth/AuthForm';
import PageTransition from '../components/Layout/PageTransition';

const Login = () => {
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
          <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
          <p className="text-foreground/70">Sign in to access your personalized nutrition plan</p>
        </div>
        <AuthForm type="login" />
      </div>
    </PageTransition>
  );
};

export default Login;
