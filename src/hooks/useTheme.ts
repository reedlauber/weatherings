import { useEffect, useState } from 'react';

import type { Settings, ThemeMode } from 'types';

const useTheme = (settings: Settings): void => {
  const [mode, setMode] = useState<ThemeMode>(settings.theme);

  useEffect(() => {
    setMode(settings.theme);
  }, [settings]);

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
  }, [mode]);
};

export default useTheme;
