
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Utensils, Activity, Salad } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Layout/Navbar';
import PageTransition from '../components/Layout/PageTransition';

const Home = () => {
  const { user } = useAuth();

  return (
    <PageTransition>
      <Navbar />
      
      <div className="min-h-screen pt-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/20 z-0"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
              >
                Your Personalized<br/>
                <span className="text-primary">Nutrition & Diet</span> Plan
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-6 text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto"
              >
                Get customized meal plans based on your health conditions, ayurvedic type,
                and fitness goals. Achieve your health targets with nutrition that works for you.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mt-10 flex flex-col sm:flex-row justify-center gap-4"
              >
                {user ? (
                  <Link
                    to="/dashboard"
                    className="px-8 py-3 bg-primary rounded-full text-white font-medium hover:bg-primary/90 transition-colors flex items-center justify-center"
                  >
                    Go to Dashboard <ArrowRight size={18} className="ml-2" />
                  </Link>
                ) : (
                  <>
                    <Link
                      to="/signup"
                      className="px-8 py-3 bg-primary rounded-full text-white font-medium hover:bg-primary/90 transition-colors flex items-center justify-center"
                    >
                      Get Started <ArrowRight size={18} className="ml-2" />
                    </Link>
                    <Link
                      to="/login"
                      className="px-8 py-3 border border-primary text-primary rounded-full font-medium hover:bg-primary/10 transition-colors flex items-center justify-center"
                    >
                      Sign In
                    </Link>
                  </>
                )}
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Personalized Nutrition Made Simple</h2>
              <p className="text-lg text-foreground/70">
                Our AI-powered platform creates custom meal plans tailored to your unique body and goals
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="glass p-8 rounded-2xl"
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6 mx-auto">
                  <Utensils size={24} className="text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-center">AI Meal Plans</h3>
                <p className="text-foreground/70 text-center">
                  Get customized meal plans based on your dietary needs, preferences, and health goals, including ayurvedic principles.
                </p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="glass p-8 rounded-2xl"
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6 mx-auto">
                  <Activity size={24} className="text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-center">Fitness Suggestions</h3>
                <p className="text-foreground/70 text-center">
                  Receive workout recommendations that complement your diet plan and help you reach your fitness objectives.
                </p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="glass p-8 rounded-2xl"
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6 mx-auto">
                  <Salad size={24} className="text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-center">Nutrition Tracking</h3>
                <p className="text-foreground/70 text-center">
                  Access detailed nutritional information and track your progress toward your health and wellness goals.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/30 z-0"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-3xl md:text-4xl font-bold mb-6"
              >
                Start Your Personalized Nutrition Journey Today
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-lg mb-8 text-foreground/80"
              >
                Join thousands of users who have transformed their health with our AI-powered nutrition and diet planning platform.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {user ? (
                  <Link
                    to="/dashboard"
                    className="px-8 py-3 bg-primary rounded-full text-white font-medium hover:bg-primary/90 transition-colors inline-flex items-center"
                  >
                    Go to Dashboard <ArrowRight size={18} className="ml-2" />
                  </Link>
                ) : (
                  <Link
                    to="/signup"
                    className="px-8 py-3 bg-primary rounded-full text-white font-medium hover:bg-primary/90 transition-colors inline-flex items-center"
                  >
                    Create Free Account <ArrowRight size={18} className="ml-2" />
                  </Link>
                )}
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Footer */}
        <footer className="bg-background py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="text-2xl font-semibold text-primary mb-4">NutriAI</div>
              <p className="text-foreground/70 mb-6">Your personalized nutrition and fitness companion</p>
              <div className="flex justify-center space-x-8">
                <Link to="/" className="text-foreground/60 hover:text-foreground transition-colors">Home</Link>
                <Link to="/about" className="text-foreground/60 hover:text-foreground transition-colors">About</Link>
                <Link to="/faq" className="text-foreground/60 hover:text-foreground transition-colors">FAQ</Link>
                <Link to="/contact" className="text-foreground/60 hover:text-foreground transition-colors">Contact</Link>
              </div>
              <p className="mt-8 text-foreground/40 text-sm">© 2023 NutriAI. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </PageTransition>
  );
};

export default Home;
