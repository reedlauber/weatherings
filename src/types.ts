export interface Settings {
  showHourly: boolean;
  theme: ThemeMode;
}

export type WeatherIcon =
  | '01d' // Clear sky (day)
  | '01n' // Clear sky (night)
  | '02d' // Few clouds (day)
  | '02n' // Few clouds (night)
  | '03d' // Scattered clouds (day)
  | '03n' // Scattered clouds (night)
  | '04d' // Broken clouds (day)
  | '04n' // Broken clouds (night)
  | '09d' // Shower rain (day)
  | '09n' // Shower rain (night)
  | '10d' // Rain (day)
  | '10n' // Rain (night)
  | '11d' // Thunderstorm (day)
  | '11n' // Thunderstorm (night)
  | '13d' // Snow (day)
  | '13n' // Snow (night)
  | '50d' // Mist (day)
  | '50n'; // Mist (night)

export interface DayWeather {
  high: number;
  low: number;
  name: string;
}

export interface HourWeather {
  description?: string;
  icon?: WeatherIcon;
  name: string;
  temp: number;
}

export interface Weather {
  currentTemp: number;
  days: DayWeather[],
  description?: string;
  high: number;
  hours: HourWeather[],
  icon?: WeatherIcon;
  lastUpdated: number;
  loading: boolean;
  low: number;
  sunrise: number;
  sunset: number;
}

export interface OpenWeatherOneCallResult {
  readonly lat?: number;
  readonly lon?: number;
  readonly timezone?: string;
  readonly timezone_offset?: number;

  current?: {
    dt?: number;
    sunrise?: number;
    sunset?: number;
    temp?: number;
    feels_like?: number;
    pressure?: number;
    humidity?: number;
    dew_point?: number;
    uvi?: number;
    clouds?: number;
    visibility?: number;

    weather?: {
      id?: string;
      main?: string;
      description?: string;
      icon?: WeatherIcon;
    }[];

    wind_speed?: number;
    wind_deg?: number;
    wind_gust?: number;
  }

  daily?: {
    dt?: number;
    sunrise?: number;
    sunset?: number;
    moonrise?: number;
    moonset?: number;
    moon_phase?: number;

    temp?: {
      day?: number;
      min?: number;
      max?: number;
      night?: number;
      eve?: number;
      morn?: number;
    }	

    feels_like?: {
      day?: number;
      night?: number;
      eve?: number;
      morn?: number;
    }

    pressure?: number;
    humidity?: number;
    dew_point?: number;
    wind_speed?: number;
    wind_deg?: number;
    wind_gust?: number;
    clouds?: number;
    pop?: number;
    rain?: number;
    uvi?: number;
  }[]

  hourly?: {
    dt?: number;
    temp?: number;
    feels_like?: number;
    pressure?: number;
    humidity?: number;
    dew_point?: number;
    uvi?: number;
    clouds?: number;
    visibility?: number;
    wind_speed?: number;
    wind_deg?: number;
    wind_gust?: number;

    weather: {
      id?: number;
      main?: string;
      description?: string;
      icon?: WeatherIcon;
    }[]
  }[]
}

export type ThemeMode = 'auto' | 'lcars' | 'light' | 'dark';
