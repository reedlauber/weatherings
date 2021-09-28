import { useEffect, useState } from 'react';
import { add, format } from 'date-fns';

import type { OpenWeatherOneCallResult, Weather } from '../types';

import { getRecentWeather, setRecentWeather } from './local';

const BASE_PATH = 'https://api.openweathermap.org/data/2.5/onecall?lat=45.5234&lon=-122.6762&appid=5d0a638a3a0b4470c8b50413ff097f15';

const DEFAULT_WEATHER: Weather = {
  days: [],
  high: 0,
  loading: true,
  low: 0,
  currentTemp: 0,
};

export const useWeather = (): [Weather, Error | null] => {
  const [data, setData] = useState<Weather>(DEFAULT_WEATHER);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const recentWeather = getRecentWeather();

    if (recentWeather) {
      setData(recentWeather);
    } else {
      const request = new Request(BASE_PATH);
  
      console.log('Queried for API data');
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
    
          setRecentWeather(weather);
          setData(weather);
    
          console.log('data', json);
        });
      }).catch((error) => {
        setError(error);
      });
    }
  }, []);

  return [data, error];
};
