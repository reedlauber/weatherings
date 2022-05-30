import React from 'react';

import type { Settings, Weather } from 'types';

import ConditionsIcon from 'components/conditions-icon';
import Temperature from 'components/temperature';

import './index.css';

interface DailyHighLowProps {
  settings: Settings;
  weather: Weather;
}

const DailyHighLow = React.memo<DailyHighLowProps>(({ settings, weather }) => {
  if (!weather.loading) {
    const secondaryFormat = settings.primaryUnits === 'fahrenheit' ? 'celcius' : 'fahrenheit';

    return (
      <div className="-offset --large daily-hilo">
        <ul>
          <li>
            <span>HI</span>
            <span><Temperature value={weather.high} format={settings.primaryUnits} /></span>
            <span><Temperature value={weather.high} format={secondaryFormat} /></span>
          </li>
          <li>
            <span>LO</span>
            <span><Temperature value={weather.low} format={settings.primaryUnits} /></span>
            <span><Temperature value={weather.low} format={secondaryFormat} /></span>
          </li>
        </ul>

        <ConditionsIcon icon={weather.icon} title={weather.description} />
      </div>
    );
  }

  return null;
});

export default DailyHighLow;
