import React, { useEffect, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';

import type { Weather } from 'types';

interface LastUpdatedProps {
  weather: Weather;
}

const getFormattedDate = (weather: Weather): string => {
  const date = weather.lastUpdated ? new Date(weather.lastUpdated) : new Date();
  return formatDistanceToNow(date);
};

const LastUpdated = React.memo<LastUpdatedProps>(({ weather }) => {
  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
    setFormattedDate(getFormattedDate(weather));

    const interval = setInterval(() => {
      setFormattedDate(getFormattedDate(weather));
    }, 1000 * 10);

    return () => {
      clearInterval(interval);
    };
  }, [weather]);

  if (formattedDate) {
    return (
      <div className="last-updated">as of {formattedDate} ago</div>
    );
  }

  return null;
});

export default LastUpdated;