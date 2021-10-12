import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';

import { useGeoLocation } from './lib/location';
import { useWeather } from './lib/open-weather';
import { useRequireSSL } from './lib/ssl';

import './App.css';

import CurrentConditions from './components/current-conditions';
import DailyHighLow from './components/daily-high-low';
import Header from './components/header';
import LastUpdated from 'components/last-updated';
import Layout, { LayoutMain } from './components/layout';
import Notification from './components/notification';
import ThemeButton from 'components/theme-button';
import WeeklyDays from './components/weekly-days';

function App() {
  useRequireSSL();
  
  const [now, setNow] = useState(new Date());

  const [coords, coordsError] = useGeoLocation();

  const [weather, weatherError] = useWeather(coords);

  useEffect(() => {
    setNow(new Date());
  }, [weather.lastUpdated]);

  return (
    <Layout>
      <ThemeButton />
      <Header />

      <LayoutMain>
        <h2>Today is {format(now, 'EEEE, MMM do')}.</h2>

        {weather.loading && (
          <Notification message="Getting latest weather..." />
        )}

        {!weather.loading && !!coordsError && (
          <Notification message={coordsError.message} type="error" />
        )}

        {!weather.loading && !!weatherError && (
          <Notification message={weatherError.message} type="error" />
        )}

        {!weather.loading && !coordsError && !weatherError && (
          <>
            <div className="-offset --xlarge daily">
              <CurrentConditions weather={weather} />
              <LastUpdated weather={weather} />
              <DailyHighLow weather={weather} />
            </div>

            <WeeklyDays weather={weather} />
          </>
        )}
      </LayoutMain>
    </Layout>
  );
}

export default App;
