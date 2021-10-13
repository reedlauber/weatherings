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
      body.className = mode === 'dark' ? '--dark' : '';
    }

    setTheme(mode);
  }, [mode]);

  return [mode, setMode];
};

export default useTheme;
