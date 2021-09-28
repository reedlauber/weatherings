import React, { useMemo } from 'react';

import type { Weather } from '../../types';

import Day from './components/day';

interface WeeklyDaysProps {
  weather: Weather;
}

const WeeklyDays = React.memo<WeeklyDaysProps>(({ weather }) => {
  const days = useMemo(() => weather.days.filter((day, i) => i> 0 && i < 5).map((day) => <Day key={day.name} day={day} />),
    [weather]
  );
  
  return (
    <div className="weekly">
      <ul className="weekly-days">
        {days}
      </ul>
    </div>
  );
});

export default WeeklyDays;
