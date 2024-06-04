"use client";

import React, { ReactNode, createContext, useContext, useState } from "react";

type UserType = {
  id: string;
  email: string;
};

interface UserContextType {
  user: UserType | null;
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
  isAuth: boolean;
  setAuth: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserContext = createContext<UserContextType | null>(null);

const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [isAuth, setAuth] = useState<boolean>(false);
  return (
    <UserContext.Provider value={{ user, setUser, isAuth, setAuth }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;

export const useUserContext = (): UserContextType => {
  const context = useContext<UserContextType | null>(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserContextProvider");
  }
  return context;
};
