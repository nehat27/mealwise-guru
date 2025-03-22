
import React from 'react';
import { Navigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, UserCircle, FileText, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Layout/Navbar';
import PageTransition from '../components/Layout/PageTransition';

const Profile = () => {
  const { user, logout, hasCompletedQuestionnaire } = useAuth();

  // Redirect if not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <PageTransition>
      <Navbar />
      <div className="min-h-screen pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-3xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 text-center"
          >
            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center text-primary text-4xl font-semibold mx-auto mb-4">
              {user.name.charAt(0)}
            </div>
            <h1 className="text-3xl font-bold">{user.name}</h1>
            <p className="text-foreground/70 mt-1">{user.email}</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass p-6 rounded-2xl mb-6"
          >
            <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
            
            <div className="space-y-4">
              <Link
                to="/questionnaire"
                className="flex items-center justify-between p-4 rounded-xl bg-background/50 border border-border hover:bg-background/80 transition-colors"
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                    <FileText size={20} className="text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">Health Questionnaire</div>
                    <div className="text-sm text-foreground/60">
                      {hasCompletedQuestionnaire 
                        ? 'Update your health profile and preferences' 
                        : 'Complete your questionnaire to get personalized recommendations'}
                    </div>
                  </div>
                </div>
                <ChevronRight size={20} className="text-foreground/40" />
              </Link>
              
              <div className="flex items-center justify-between p-4 rounded-xl bg-background/50 border border-border">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                    <UserCircle size={20} className="text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">Account Information</div>
                    <div className="text-sm text-foreground/60">
                      Manage your account details and settings
                    </div>
                  </div>
                </div>
                <ChevronRight size={20} className="text-foreground/40" />
              </div>
              
              <div className="flex items-center justify-between p-4 rounded-xl bg-background/50 border border-border">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                    <Settings size={20} className="text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">Preferences</div>
                    <div className="text-sm text-foreground/60">
                      Customize your application settings
                    </div>
                  </div>
                </div>
                <ChevronRight size={20} className="text-foreground/40" />
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center"
          >
            <button
              onClick={logout}
              className="flex items-center justify-center mx-auto text-foreground/80 hover:text-foreground transition-colors"
            >
              <LogOut size={18} className="mr-2" />
              Sign Out
            </button>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Profile;
