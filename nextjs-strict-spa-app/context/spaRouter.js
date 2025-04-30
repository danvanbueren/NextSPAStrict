'use client'

import { createContext, useContext, useState, useEffect } from 'react';

const SPARouterContext = createContext();

export const useSPARouter = () => {
  const context = useContext(SPARouterContext);
  if (!context) {
    throw new Error('useSPARouter must be used within a SPARouterProvider');
  }
  return context;
};

export const SPARouterProvider = ({ children }) => {
  const [currentPath, setCurrentPath] = useState('');
  
  useEffect(() => {
    const path = window.location.hash.slice(1) || '/';
    setCurrentPath(path);
    const handleHashChange = () => {
      const newPath = window.location.hash.slice(1) || '/';
      setCurrentPath(newPath);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);
  
  // Navigate to a path
  const navigate = (to) => {
    window.location.hash = to;
  };
  
  const value = {
    currentPath,
    navigate,
    // Helper method to check if current path matches a pattern
    isActive: (path) => currentPath === path || currentPath.startsWith(`${path}/`),
  };
  
  return (
    <SPARouterContext.Provider value={value}>
      {children}
    </SPARouterContext.Provider>
  );
};

// Route component to conditionally render children based on path
export const Route = ({ path, children }) => {
  const { currentPath } = useSPARouter();
  
  // Check if current path matches this route's path
  const isMatch = path === '*' || currentPath === path || 
    (path.endsWith('/*') && currentPath.startsWith(path.slice(0, -2)));
  
  return isMatch ? <>{children}</> : null;
};

export default SPARouterContext;