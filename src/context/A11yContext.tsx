import React, { createContext, useContext, useState, useEffect } from 'react';

interface A11yContextType {
  isA11y: boolean;
  toggleA11y: () => void;
}

const A11yContext = createContext<A11yContextType | undefined>(undefined);

export const A11yProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isA11y, setIsA11y] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('a11y_mode') === 'true';
    }
    return false;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isA11y) {
      root.classList.add('a11y-mode');
    } else {
      root.classList.remove('a11y-mode');
    }
    localStorage.setItem('a11y_mode', String(isA11y));
  }, [isA11y]);

  const toggleA11y = () => {
    setIsA11y((prev) => !prev);
  };

  return (
    <A11yContext.Provider value={{ isA11y, toggleA11y }}>
      {children}
    </A11yContext.Provider>
  );
};

export const useA11y = (): A11yContextType => {
  const context = useContext(A11yContext);
  if (!context) {
    throw new Error('useA11y must be used within an A11yProvider');
  }
  return context;
};
