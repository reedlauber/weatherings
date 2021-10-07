import React, { useEffect, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';

import type { Weather } from 'types';

interface LastUpdatedProps {
  weather: Weather;
}

const LastUpdated = React.memo<LastUpdatedProps>(({ weather }) => {
  const [formattedDate, setFormattedDate] = useState(formatDistanceToNow(weather.lastUpdated));

  useEffect(() => {
    setFormattedDate(formatDistanceToNow(weather.lastUpdated));

    const interval = setInterval(() => {
      setFormattedDate(formatDistanceToNow(weather.lastUpdated));
    }, 1000 * 10);

    return () => {
      clearInterval(interval);
    };
  }, [weather]);

  return(
    <div className="last-updated">as of {formattedDate} ago</div>
  );
});

export default LastUpdated;