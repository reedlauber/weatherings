import React from 'react';

import * as temperature from 'lib/temperature';

interface DailyHighLowProps {
  high: number;
  loading?: boolean;
  low: number;
}

const DailyHighLow = React.memo<DailyHighLowProps>(({ high, loading = false, low }) => {
  if (!loading) {
    const fahrenheitHigh = temperature.toFahrenheit(high);
    const celciusHigh = temperature.toCelcius(high);
    const fahrenheitLow = temperature.toFahrenheit(low);
    const celciusLow = temperature.toCelcius(low);

    return (
      <ul className="daily-hilo">
        <li>
          <span>HI</span>
          <span>{celciusHigh?.toFixed(0)}&deg;c</span>
          <span>{fahrenheitHigh.toFixed(0)}&deg;f</span>
        </li>
        <li>
          <span>LO</span>
          <span>{celciusLow?.toFixed(0)}&deg;c</span>
          <span>{fahrenheitLow.toFixed(0)}&deg;f</span>
        </li>
      </ul>
    );
  }

  return null;
});

export default DailyHighLow;
