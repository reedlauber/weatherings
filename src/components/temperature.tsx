import React, { useMemo } from 'react';

import * as temperature from '../lib/temperature';

interface TemperatureProps {
  format?: 'celcius' | 'fahrenheit';
  type?: string;
  value: number;
}

const Temperature = React.memo<TemperatureProps>(({ format = 'celcius', type, value }) => {
  const temp = useMemo(() => {
    if (format === 'celcius') {
      return temperature.toCelcius(value, type);
    }

    if (format === 'fahrenheit') {
      return temperature.toFahrenheit(value, type);
    }

    return 0;
  }, [format, type, value]);

  return (
    <span>{temp?.toFixed(0)}&deg;c</span>
  );
});

export default Temperature;
