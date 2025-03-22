
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, Apple, Dumbbell, Info } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navItems: NavItem[] = [
    { label: 'Meal Plans', href: '/meal-plans', icon: <Apple size={18} /> },
    { label: 'Fitness', href: '/fitness', icon: <Dumbbell size={18} /> },
    { label: 'Nutrition Facts', href: '/nutrition', icon: <Info size={18} /> },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 ${
        scrolled ? 'glass shadow-sm' : 'bg-transparent'
      } transition-all duration-300`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-primary font-semibold text-xl">
              NutriAI
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex space-x-1">
            {user && navItems.map((item, index) => (
              <Link
                key={index}
                to={item.href}
                className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center space-x-1 
                  ${
                    location.pathname === item.href
                      ? 'text-primary'
                      : 'text-foreground/70 hover:text-foreground'
                  }`}
              >
                {item.icon}
                <span>{item.label}</span>
                {location.pathname === item.href && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-sm font-medium text-foreground/80 hover:text-foreground"
                >
                  Dashboard
                </Link>
                <button
                  onClick={logout}
                  className="text-sm font-medium text-foreground/80 hover:text-foreground"
                >
                  Logout
                </button>
                <Link
                  to="/profile"
                  className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white"
                >
                  {user.name.charAt(0)}
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm font-medium text-foreground/80 hover:text-foreground"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-primary text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: isOpen ? 1 : 0, height: isOpen ? 'auto' : 0 }}
        transition={{ duration: 0.3 }}
        className="md:hidden overflow-hidden"
      >
        <div className="px-4 py-2 bg-background space-y-1">
          {user && navItems.map((item, index) => (
            <Link
              key={index}
              to={item.href}
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors flex items-center space-x-2 ${
                location.pathname === item.href
                  ? 'bg-primary/10 text-primary'
                  : 'text-foreground/80 hover:bg-primary/5 hover:text-foreground'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}

          <div className="pt-4 pb-3 border-t border-border">
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="block px-3 py-2 rounded-md text-base font-medium text-foreground/80 hover:bg-primary/5 hover:text-foreground"
                >
                  Dashboard
                </Link>
                <Link
                  to="/profile"
                  className="block px-3 py-2 rounded-md text-base font-medium text-foreground/80 hover:bg-primary/5 hover:text-foreground"
                >
                  Profile
                </Link>
                <button
                  onClick={logout}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-foreground/80 hover:bg-primary/5 hover:text-foreground"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block px-3 py-2 rounded-md text-base font-medium text-foreground/80 hover:bg-primary/5 hover:text-foreground"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block px-3 py-2 rounded-md text-base font-medium bg-primary text-white mt-2 px-3 py-2 rounded-md hover:bg-primary/90 transition-colors"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;
