import React, { useMemo } from 'react';

import * as temperature from 'lib/temperature';
import type { PrimaryUnits } from 'types';

interface TemperatureProps {
  format?: PrimaryUnits;
  type?: string;
  value: number;
}

const Temperature = React.memo<TemperatureProps>(({ format = 'celcius', type, value }) => {
  const temp = useMemo(() => {
    if ((type === 'celcius' && format === 'celcius') || (type === 'fahrenheit' && format === 'fahrenheit')) {
      return value;
    }

    if (format === 'celcius') {
      return temperature.toCelcius(value, type);
    }

    if (format === 'fahrenheit') {
      return temperature.toFahrenheit(value, type);
    }

    return 0;
  }, [format, type, value]);

  const units = format === 'celcius' ? 'c' : 'f';

  return (
    <span>{temp?.toFixed(0)}&deg;{units}</span>
  );
});

export default Temperature;
