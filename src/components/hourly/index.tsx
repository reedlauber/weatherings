import React, { useMemo } from 'react';

import type { Settings, Weather } from 'types';

import ConditionsIcon from 'components/conditions-icon';
import Temperature from 'components/temperature';
import TemperatureBox from 'components/temperature-box';

import './index.css';

interface HourlyProps {
  settings: Settings;
  weather: Weather;
}

const Hourly = React.memo<HourlyProps>(({ settings, weather }) => {
  const hours = useMemo(() => {
    return weather.hours.filter((hour, i) => i > 0 && i < 12).map((hour) => {
      const secondaryFormat = settings.primaryUnits === 'fahrenheit' ? 'celcius' : 'fahrenheit';

      return (
        <li key={hour.name} className="hourly-hour">
          <TemperatureBox>
            <strong className="hourly-hour-time">{hour.name}</strong>
            <div className="hourly-hour-temp">
              <span>
                <Temperature value={hour.temp} format={settings.primaryUnits} />
              </span>
              <span>
                <Temperature value={hour.temp} format={secondaryFormat} />
              </span>
            </div>
            <div className="hourly-hour-icon">
              <ConditionsIcon icon={hour.icon} title={hour.description} />
            </div>
          </TemperatureBox>
        </li>
      );
    });
  }, [settings, weather]);
  
  return (
    <div className="-offset --huge hourly">
      <ul className="hourly-hours">
        {hours}
      </ul>
    </div>
  );
});

export default Hourly;
