import React from 'react';

import type { DayWeather } from 'types';

import Temperature from 'components/temperature';

interface WeeklyDayProps {
  day: DayWeather;
}

const WeeklyDay = React.memo<WeeklyDayProps>(({ day }) => {
  return (
    <li key={day.name} className="weekly-day">
      <strong>{day.name}</strong>

      <div className="weekly-day-temperature">
        <span>HI</span>
        <Temperature value={day.high} />
      </div>

      <div className="weekly-day-temperature">
        <span>LO</span>
        <Temperature value={day.low} />
      </div>
    </li>
  );
});

export default WeeklyDay;
