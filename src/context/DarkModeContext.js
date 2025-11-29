import React, { createContext, useEffect, useState } from 'react';

export const DarkModeContext = createContext(null);

export function DarkModeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    try { return localStorage.getItem('vg_dark') === '1'; } catch (e) { return false; }
  });

  useEffect(() => {
    try {
      localStorage.setItem('vg_dark', isDark ? '1' : '0');
      if (isDark) document.documentElement.classList.add('dark');
      else document.documentElement.classList.remove('dark');
    } catch (e) { /* ignore */ }
  }, [isDark]);

  function toggle() { setIsDark(v => !v); }

  return (
    <DarkModeContext.Provider value={{ isDark, toggle }}>
      {children}
    </DarkModeContext.Provider>
  );
}

export default DarkModeProvider;
