import React, { useMemo } from 'react';

import type { Weather, WeatherIcon } from 'types';


import {
  CloudIcon,
  CloudFogIcon,
  CloudLightningIcon,
  CloudMoonIcon,
  CloudRainIcon,
  CloudSunIcon,
  MoonIcon,
  SnowflakeIcon,
  SunIcon,
} from 'components/icons';

const weatherIcons: {
  [key in WeatherIcon]: string
} = {
  '01d': SunIcon,
  '01n': MoonIcon,
  '02d': CloudSunIcon,
  '02n': CloudMoonIcon,
  '03d': CloudIcon,
  '03n': CloudIcon,
  '04d': CloudIcon,
  '04n': CloudIcon,
  '09d': CloudRainIcon,
  '09n': CloudRainIcon,
  '10d': CloudRainIcon,
  '10n': CloudRainIcon,
  '11d': CloudLightningIcon,
  '11n': CloudLightningIcon,
  '13d': SnowflakeIcon,
  '13n': SnowflakeIcon,
  '50d': CloudFogIcon,
  '50n': CloudFogIcon,
};

interface WeatherSummaryProps {
  weather: Weather;
}

const WeatherSummary = React.memo<WeatherSummaryProps>(({ weather }) => {
  const icon = useMemo(() => {
    return (weather.icon && weatherIcons[weather.icon]) ?? null;
  }, [weather]);

  if (icon) {
    return (
      <div className="layout-section layout-summary summary">
        <img src={icon} alt="Weather icon" />
      </div>
    );
  }

  return null;
});

export default WeatherSummary;
