import React from 'react';

import type { Weather } from '../../types';

import * as temperature from '../../lib/temperature';

import ConditionsIcon from '../conditions-icon';

interface CurrentConditionsProps {
  weather: Weather;
}

const CurrentConditions = React.memo<CurrentConditionsProps>(({ weather }) => {
  const celciusTemp = temperature.toCelcius(weather?.currentTemp);
  const fahrenheitTemp = temperature.toFahrenheit(weather?.currentTemp);

  return (
    <section className="daily-degs">
      <main className="deg-main">
        <strong className="deg-major">{celciusTemp?.toFixed(0)}&deg;c</strong>
      </main>

      <aside className="deg-aside">
        <span className="deg-minor">{fahrenheitTemp.toFixed(0)}&deg;f</span>

        <div className="-offset deg-conditions-icon">
          <ConditionsIcon icon={weather.icon} />
        </div>
      </aside>
    </section>
  );
});

export default CurrentConditions;
