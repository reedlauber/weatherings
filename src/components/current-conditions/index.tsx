import React from 'react';

import type { Settings, Weather } from 'types';

import Temperature from 'components/temperature';

import './index.css';

interface CurrentConditionsProps {
  settings: Settings;
  weather: Weather;
}

const CurrentConditions = React.memo<CurrentConditionsProps>(({ settings, weather }) => {
  const secondaryFormat = settings.primaryUnits === 'fahrenheit' ? 'celcius' : 'fahrenheit';

  return (
    <section className="daily-degs">
      <main className="deg-main">
        <strong className="deg-major">
          <Temperature format={settings.primaryUnits} value={weather.currentTemp} />
        </strong>
      </main>

      <aside className="deg-aside">
        <span className="deg-minor">
          <Temperature format={secondaryFormat} value={weather.currentTemp} />
        </span>
      </aside>
    </section>
  );
});

export default CurrentConditions;
