import { add } from 'date-fns';

import type { Weather } from '../types';

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
      const recentDate = add(now, { minutes: -20 });

      if (storedData.timestamp > recentDate.getTime()) {
        console.log('Returned cached weather');
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
