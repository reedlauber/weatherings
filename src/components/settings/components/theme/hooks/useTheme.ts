import { useEffect, useState } from 'react';

import type { ThemeMode } from 'types';

import { getTheme, setTheme } from 'lib/local';

const useTheme = (): [ThemeMode, (mode: ThemeMode) => void] => {
  const [mode, setMode] = useState<ThemeMode>('light');

  useEffect(() => {
    setMode(getTheme());
  }, []);

  useEffect(() => {
    const body = document.querySelector('body');

    if (body) {
      if (mode === 'dark') {
        body.className = '--dark';
      } else if (mode === 'lcars') {
        body.className = '--lcars';
      } else {
        body.className = '';
      }
    }

    setTheme(mode);
  }, [mode]);

  return [mode, setMode];
};

export default useTheme;
