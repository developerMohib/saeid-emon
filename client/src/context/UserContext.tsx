"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface UserType {
  name: string;
  email: string;
  role?: string;
  avatar?: string;
  bio?: string;
}

interface UserContextType {
  user: UserType | null;
  setUser: (user: UserType | null) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);

  const logout = () => {
    setUser(null);
    // Optionally call logout API to clear cookies
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for easy usage
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used inside <UserProvider>");
  return context;
};
