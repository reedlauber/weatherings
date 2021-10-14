import { useEffect, useState } from 'react';
import { add, format } from 'date-fns';

import type { DayWeather, HourWeather, OpenWeatherOneCallResult, Weather } from 'types';

import { getRecentWeather, setRecentWeather } from './local';

const BASE_PATH = 'https://api.openweathermap.org/data/2.5/onecall?exclude=minutely';
const WEATHER_API_URL = `${BASE_PATH}&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`;
const hasAPIKey = !!process.env.REACT_APP_OPEN_WEATHER_API_KEY;

const DEFAULT_WEATHER: Weather = {
  days: [],
  high: 0,
  hours: [],
  lastUpdated: new Date().getTime(),
  loading: true,
  low: 0,
  currentTemp: 0,
};

const getWeatherDays = (now: Date, json: OpenWeatherOneCallResult): DayWeather[] => {
  return (json?.daily ?? []).map((day, i) => {
    const date = add(now, { days: i });
    return {
      high: day?.temp?.max ?? 0,
      low: day?.temp?.min ?? 0,
      name: format(date, 'EEEE'),
    };
  });
};

const getWeatherHours = (now: Date, json: OpenWeatherOneCallResult): HourWeather[] => {
  return (json?.hourly ?? []).map((hour, i) => {
    const date = add(now, { hours: i });
    return {
      description: hour?.weather?.[0]?.description,
      icon: hour?.weather?.[0]?.icon,
      name: i === 0 ? 'Now' : format(date, 'haaa'),
      temp: hour?.temp ?? 0,
    }
  });
};

export const getRemoteWeather = (coords: GeolocationCoordinates): Promise<Weather> => {
  return new Promise((resolve, reject) => {
    const weatherUrl = `${WEATHER_API_URL}&lat=${coords.latitude}&lon=${coords.longitude}`;
    const request = new Request(weatherUrl);
  
    fetch(request).then((response) => {
      response.json().then((json: OpenWeatherOneCallResult) => {
        const weather: Weather = {
          ...DEFAULT_WEATHER,
          lastUpdated: new Date().getTime(),
          loading: false,
        };
  
        weather.high = json?.daily?.[0]?.temp?.max ?? 0;
        weather.low = json?.daily?.[0]?.temp?.min ?? 0;
        weather.currentTemp = json?.current?.temp ?? 0;
  
        weather.description = json?.current?.weather?.[0]?.description;
        weather.icon = json?.current?.weather?.[0]?.icon;
  
        const now = new Date();
  
        weather.days = getWeatherDays(now, json);
        weather.hours = getWeatherHours(now, json);
  
        resolve(weather);

      });
    }).catch(reject);
  });
};

export const useWeather = (coords: GeolocationCoordinates | null): [Weather, Error | null] => {
  const [data, setData] = useState<Weather>(DEFAULT_WEATHER);
  const [error, setError] = useState<Error | null>(null);
  const [lastRequest, setLastRequest] = useState<number>(0);

  useEffect(() => {
    if (!hasAPIKey) {
      setError(new Error('No API key is present'));
      return;
    }

    if (lastRequest !== 0) {
      return;
    }

    const recentWeather = getRecentWeather();

    if (recentWeather) {
      setData(recentWeather);
      setLastRequest(new Date().getTime());
    } else if (coords) {
      getRemoteWeather(coords).then((weather) => {
        setRecentWeather(weather);
        setData(weather);
        setLastRequest(weather.lastUpdated);
      }).catch((error) => {
        setError(error);
      });
    }
  }, [coords, lastRequest]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (data) {
      timeout = setTimeout(() => {
        setLastRequest(0);
      }, 1000 * 60);
    }

    return () => {
      timeout && clearTimeout(timeout);
    };
  }, [data]);

  return [data, error];
};
