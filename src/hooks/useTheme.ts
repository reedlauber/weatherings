import { useEffect } from 'react';

import type { Settings, Weather } from 'types';

const useTheme = (settings: Settings, weather: Weather): void => {
  useEffect(() => {
    const body = document.querySelector('body');

    if (body) {
      if (settings.theme === 'auto') {
        const now = new Date().getTime();

        if (now < weather.sunrise || now > weather.sunset) {
          body.className = '--dark';
        } else {
          body.className = '';
        }
      } else if (settings.theme === 'dark') {
        body.className = '--dark';
      } else if (settings.theme === 'lcars') {
        body.className = '--lcars';
      } else {
        body.className = '';
      }
    }
  }, [settings.theme, weather]);
};

export default useTheme;
