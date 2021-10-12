import React from 'react';

import type { Weather } from 'types';

import * as temperature from 'lib/temperature';

import ConditionsIcon from 'components/conditions-icon';

import './index.css';

interface DailyHighLowProps {
  weather: Weather;
}

const DailyHighLow = React.memo<DailyHighLowProps>(({ weather }) => {
  if (!weather.loading) {
    const fahrenheitHigh = temperature.toFahrenheit(weather.high);
    const celciusHigh = temperature.toCelcius(weather.high);
    const fahrenheitLow = temperature.toFahrenheit(weather.low);
    const celciusLow = temperature.toCelcius(weather.low);

    return (
      <div className="-offset --large daily-hilo">
        <ul>
          <li>
            <span>HI</span>
            <span>{celciusHigh?.toFixed(0)}&deg;c</span>
            <span>{fahrenheitHigh.toFixed(0)}&deg;f</span>
          </li>
          <li>
            <span>LO</span>
            <span>{celciusLow?.toFixed(0)}&deg;c</span>
            <span>{fahrenheitLow.toFixed(0)}&deg;f</span>
          </li>
        </ul>

        <ConditionsIcon icon={weather.icon} title={weather.description} />
      </div>
    );
  }

  return null;
});

export default DailyHighLow;
