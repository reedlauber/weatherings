import { add } from 'date-fns';

import type { DayWeather, HourWeather, Settings, ThemeMode, Weather } from 'types';

interface StoredWeather {
  timestamp: number;
  weather: Weather;
}

const getStoredWeather = (json: any): StoredWeather => {
  const jsonWeather = json.weather ?? {};

  const days: DayWeather[] = (jsonWeather.days ?? []).map((jsonDay: any) => ({
    high: jsonDay.high ?? 0,
    low: jsonDay.low ?? 0,
    name: jsonDay.name ?? 0,
  }));

  const hours: HourWeather[] = (jsonWeather.hours ?? []).map((jsonHour: any) => ({
    description: jsonHour.description,
    icon: jsonHour.icon,
    name: jsonHour.name ?? '',
    temp: jsonHour.temp ?? 0,
  }));

  const weather: Weather = {
    currentTemp: jsonWeather.currentTemp ?? 0,
    days,
    description: jsonWeather.description,
    high: jsonWeather.high ?? 0,
    hours,
    icon: jsonWeather.icon,
    lastUpdated: jsonWeather.lastUpdated ?? 0,
    loading: jsonWeather.loading ?? false,
    low: jsonWeather.low ?? 0,
  };

  return {
    timestamp: json.timestamp ?? 0,
    weather,
  };
};

export const getRecentWeather = (): Weather | undefined => {
  const now = new Date();
  const recentStored = localStorage.getItem('recentWeather');

  if (recentStored) {
    let storedData: StoredWeather | null = null;

    try {
      storedData = getStoredWeather(JSON.parse(recentStored));
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

export const getSettings = (): Settings => {
  const storedSettings = localStorage.getItem('settings');

  let showHourly = false;
  let theme: ThemeMode = 'light';

  try {
    const json = JSON.parse(storedSettings ?? '');
    showHourly = json.showHourly ?? false;
    theme = ['dark', 'lcars', 'light'].includes(json.theme) ? json.theme : 'light';
  }
  catch(e) {}

  return {
    showHourly,
    theme,
  };
};

export const setSettings = (settings: Settings) => {
  localStorage.setItem('settings', JSON.stringify(settings));
};
