import React, { useMemo } from 'react';

import type { Settings, Weather } from 'types';

import Day from './components/day';

import './index.css';

interface WeeklyDaysProps {
  settings: Settings;
  weather: Weather;
}

const WeeklyDays = React.memo<WeeklyDaysProps>(({ settings, weather }) => {
  const days = useMemo(() =>
    weather
      .days
      .filter((day, i) => i> 0 && i < 5)
      .map((day) => <Day key={day.name} day={day} settings={settings} />),
    [settings, weather]
  );
  
  return (
    <div className="-offset --huge weekly">
      <ul className="weekly-days">
        {days}
      </ul>
    </div>
  );
});

export default WeeklyDays;
