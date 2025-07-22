import { createContext, useContext, useState } from 'react';


const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [isBack, setIsBack] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  return (
    <AppContext.Provider value={{ isBack, setIsBack, isLoading, setIsLoading }}>
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => {
  return useContext(AppContext)
}