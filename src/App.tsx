import React, { useState } from 'react';
import { format } from 'date-fns';

// import { useGeoLocation } from './lib/location';
import { useWeather } from './lib/open-weather';

import './App.css';

import CurrentConditions from './components/current-conditions';
import DailyHighLow from './components/daily-high-low';
import Header from './components/header';
import WeeklyDays from './components/weekly-days';

function App() {
  const [now] = useState(new Date());

  // const [coords, coordsError] = useGeoLocation();

  const [weather, weatherError] = useWeather();

  return (
    <div className="layout">
      <Header />

      <main className="layout-main">
        <h2>Today is {format(now, 'EEEE, MMM do')}.</h2>

        {!!weatherError && (
          <div>{weatherError.message}</div>
        )}

        <div className="daily">
          <CurrentConditions weather={weather} />
          <DailyHighLow high={weather.high} loading={weather.loading} low={weather.low} />
        </div>

        <WeeklyDays weather={weather} />
      </main>
    </div>
  );
}

export default App;
