import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
// import { User } from '../interfaces/User';

// interface UserContextType {
//   user: User | null;
//   login: (userData: User) => void;
//   logout: () => void;
// }

const UserContext = createContext(undefined);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const refreshUserData = async () => {
    const savedUser = sessionStorage.getItem('user');
    if (!savedUser) return;

    try {
      const user = await JSON.parse(savedUser);
      setUser(user);
    } catch (error) {
      console.error('Failed to refresh user data:', error);
    }
  };

  const login = async (userData) => {
    sessionStorage.setItem("user", JSON.stringify(userData));
    setUser(userData); // Set user immediately without parsing session storage again
  };

  const logout = () => {
    sessionStorage.removeItem("user");
    setUser(null)
  };

  return (
    <UserContext.Provider value={{ user, login, logout, refreshUserData }}>
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