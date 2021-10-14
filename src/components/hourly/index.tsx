import React, { useMemo } from 'react';

import type { Weather } from 'types';

import * as temperature from 'lib/temperature';

import ConditionsIcon from 'components/conditions-icon';

import './index.css';

interface HourlyProps {
  weather: Weather;
}

const Hourly = React.memo<HourlyProps>(({ weather }) => {
  const hours = useMemo(() => {
    return weather.hours.filter((hour, i) => i > 0 && i < 12).map((hour) => {
      return (
        <li className="hourly-hour">
          <strong className="hourly-hour-time">{hour.name}</strong>
          <div className="hourly-hour-temp">
            <span>{temperature.toCelcius(hour.temp)?.toFixed(0)}&deg;c</span>
            <span>{temperature.toFahrenheit(hour.temp)?.toFixed(0)}&deg;f</span>
          </div>
          <div className="hourly-hour-icon">
            <ConditionsIcon icon={hour.icon} title={hour.description} />
          </div>
        </li>
      );
    });
  }, [weather]);
  
  return (
    <div className="-offset --huge hourly">
      <ul className="hourly-hours">
        {hours}
      </ul>
    </div>
  );
});

export default Hourly;
