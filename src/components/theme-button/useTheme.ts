import { useCallback, useEffect, useState } from 'react';

import type { ThemeMode } from 'types';

import { getTheme, setTheme } from 'lib/local';

const useTheme = (): [ThemeMode, () => void] => {
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

  const handleToggle = useCallback(() => {
    setMode(mode === 'light' ? 'dark' : 'light');
  }, [mode]);

  return [mode, handleToggle];
};

export default useTheme;
