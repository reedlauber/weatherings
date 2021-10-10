import React, { useMemo } from 'react';

import type { DayWeather } from 'types';

import { toKelvin } from 'lib/temperature';

import Temperature from 'components/temperature';

interface WeeklyDayProps {
  day: DayWeather;
}


const KELVIN_MIN = toKelvin(-5);
const KELVIN_MAX = toKelvin(115);
const KELVIN_SIZE = Math.abs(KELVIN_MAX - KELVIN_MIN);
const HEIGHT = 16 * 5;

const WeeklyDay = React.memo<WeeklyDayProps>(({ day }) => {
  const styles = useMemo(() => {
    const tempSize = day.high - day.low;
    const relativeSize = tempSize / KELVIN_SIZE;
    const bgSize = HEIGHT / relativeSize;

    const maxDelta = KELVIN_MAX - day.high;
    const offset = (bgSize / HEIGHT) * maxDelta * 2;

    return {
      '--bg-height': `${bgSize}px`,
      '--pos-y': `-${offset}px`,
    };
  }, [day]);

  return (
    // @ts-ignore
    <li key={day.name} className="weekly-day" style={styles}>
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
