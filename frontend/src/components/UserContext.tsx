import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User } from '../interfaces/User';

interface UserContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData: User) => {
    try{
    setUser(userData)
    sessionStorage.setItem("user", JSON.stringify(userData));
    console.log("User data:", user);
    } catch (error) {
      console.error('Failed to login:', error);
    }
  };
  const logout = () => {
    sessionStorage.removeItem("user");
    setUser(null)
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};