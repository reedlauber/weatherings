import { add } from 'date-fns';

import type { ThemeMode, Weather } from 'types';

interface StoredWeather {
  timestamp: number;
  weather: Weather;
}

export const getRecentWeather = (): Weather | undefined => {
  const now = new Date();
  const recentStored = localStorage.getItem('recentWeather');

  if (recentStored) {
    let storedData: StoredWeather | null = null;

    try {
      storedData = JSON.parse(recentStored) as StoredWeather;
    } catch {}

    if (storedData) {
      const recentDate = add(now, { minutes: -21 });

      if (storedData.timestamp > recentDate.getTime()) {
        return storedData.weather;
      }
    }
  }
};

export const setRecentWeather = (weather: Weather) => {
  const storedWeather: StoredWeather = {
    timestamp: new Date().getTime(),
    weather,
  };

  localStorage.setItem('recentWeather', JSON.stringify(storedWeather));
};

export const getTheme = (): ThemeMode => {
  const storedTheme = localStorage.getItem('themeMode');

  if (storedTheme === 'dark') {
    return 'dark';
  }

  return 'light';
};

export const setTheme = (mode: ThemeMode): void => {
  localStorage.setItem('themeMode', mode);
};
