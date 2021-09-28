import React from 'react';

import type { WeatherIcon } from '../../types';


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
} from '../icons';

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

interface ConditionsIconProps {
  icon?: WeatherIcon;
}

const ConditionsIcon = React.memo<ConditionsIconProps>(({ icon }) => {
  const iconSrc = icon ? weatherIcons[icon] : '';

  if (iconSrc) {
    return (
      <img src={iconSrc} alt="Weather icon" />
    );
  }

  return null;
});

export default ConditionsIcon;
