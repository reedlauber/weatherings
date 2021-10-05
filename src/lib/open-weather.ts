import { useEffect, useRef, useState } from 'react';
import { add, format } from 'date-fns';

import type { OpenWeatherOneCallResult, Weather } from 'types';

import { getRecentWeather, setRecentWeather } from './local';

const BASE_PATH = 'https://api.openweathermap.org/data/2.5/onecall';
const WEATHER_API_URL = `${BASE_PATH}?appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`;
const hasAPIKey = !!process.env.REACT_APP_OPEN_WEATHER_API_KEY;

const DEFAULT_WEATHER: Weather = {
  days: [],
  high: 0,
  loading: true,
  low: 0,
  currentTemp: 0,
};

export const getRemoteWeather = (coords: GeolocationCoordinates): Promise<Weather> => {
  return new Promise((resolve, reject) => {
    const weatherUrl = `${WEATHER_API_URL}&lat=${coords.latitude}&lon=${coords.longitude}`;
    const request = new Request(weatherUrl);
  
    fetch(request).then((response) => {
      response.json().then((json: OpenWeatherOneCallResult) => {
        const weather: Weather = {
          ...DEFAULT_WEATHER,
          loading: false,
        };
  
        weather.high = json?.daily?.[0]?.temp?.max ?? 0;
        weather.low = json?.daily?.[0]?.temp?.min ?? 0;
        weather.currentTemp = json?.current?.temp ?? 0;
  
        weather.description = json?.current?.weather?.[0]?.description;
        weather.icon = json?.current?.weather?.[0]?.icon;
  
        const now = new Date();
  
        weather.days = (json?.daily ?? []).map((day, i) => {
          const date = add(now, { days: i });
          return {
            high: day?.temp?.max ?? 0,
            low: day?.temp?.min ?? 0,
            name: format(date, 'EEEE'),
          };
        });
  
        resolve(weather);

      });
    }).catch(reject);
  });
};

export const useWeather = (coords: GeolocationCoordinates | null): [Weather, Error | null] => {
  const [data, setData] = useState<Weather>(DEFAULT_WEATHER);
  const [error, setError] = useState<Error | null>(null);
  const [lastRequest, setLastRequest] = useState<number>(0);
  const timeout = useRef<NodeJS.Timeout>();

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
    } else {
      if (!coords) {
        return;
      }
  
      getRemoteWeather(coords).then((weather) => {
        setRecentWeather(weather);
        setData(weather);
        setLastRequest(new Date().getTime());
      }).catch((error) => {
        setError(error);
      });
    }
  }, [coords, lastRequest]);

  useEffect(() => {
    if (data) {
      timeout.current = setTimeout(() => {
        console.log('Timer; reset to 0')
        setLastRequest(0);
      }, 1000 * 60 * 21);
    }

    return () => {
      timeout.current && clearInterval(timeout.current);
    };
  }, [data]);

  return [data, error];
};
