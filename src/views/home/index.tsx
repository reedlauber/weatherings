import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';

import { useGeoLocation } from 'lib/location';
import { useWeather } from 'lib/open-weather';
import { useRequireSSL } from 'lib/ssl';

import useSavedSettings from 'hooks/useSavedSettings';
import useTheme from 'hooks/useTheme';

import CurrentConditions from 'components/current-conditions';
import DailyHighLow from 'components/daily-high-low';
import Header from 'components/header';
import Hourly from 'components/hourly';
import LastUpdated from 'components/last-updated';
import Layout, { LayoutMain } from 'components/layout';
import Notification from 'components/notification';
import Settings from 'components/settings';
import WeeklyDays from 'components/weekly-days';

// import './index.css';

function App() {
  useRequireSSL();

  const [settings, saveSettings] = useSavedSettings();
  
  const [now, setNow] = useState(new Date());

  const [coords, coordsError] = useGeoLocation();

  const [weather, weatherError] = useWeather(coords);

  useTheme(settings, weather);

  useEffect(() => {
    setNow(new Date());
  }, [weather.lastUpdated]);

  return (
    <Layout>
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
              <CurrentConditions settings={settings} weather={weather} />
              <LastUpdated weather={weather} />
              <DailyHighLow settings={settings} weather={weather} />
            </div>

            {settings.showHourly && <Hourly settings={settings} weather={weather} />}

            <WeeklyDays settings={settings} weather={weather} />
          </>
        )}
      </LayoutMain>

      <Settings settings={settings} onSaveSettings={saveSettings} />
    </Layout>
  );
}

export default App;
