import { createContext, useContext, useEffect, useState } from 'react';
import { common } from '@/utils/common';

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const data = common.getLocalStorage('theme');
  const [theme, setTheme] = useState( data );

  useEffect(() => {
    document.body.classList.add(theme);

    return () => {
      document.body.classList.remove(theme);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const themeContext = useContext(ThemeContext);
  if (!themeContext) {
    throw new Error('ThemeContext 안에서 써야 합니다');
  }

  return themeContext;
}
