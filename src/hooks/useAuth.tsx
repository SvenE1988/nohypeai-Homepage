
import { useState, useEffect } from 'react';

// This is a simple mock of authentication
// In a real application, replace this with your actual authentication system
export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  
  useEffect(() => {
    // For demonstration, we're setting authentication to true
    // In a real app, check if the user is logged in through tokens, cookies, etc.
    setIsAuthenticated(true);
  }, []);

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return { isAuthenticated, login, logout };
};
