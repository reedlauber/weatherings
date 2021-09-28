function fahrenheitToKelvin(temperature: number) {
  return Math.round(((temperature + 459.67) * 5/9) * 10) / 10;
}

function kelvinToCelcius(temperature: number) {
  return Math.round((temperature - 273.15) * 10) / 10;
}

function fahrenheitToCelcius(temperature: number) {
  return Math.round(((temperature - 32) * 5/9) * 10) / 10;
}

export function toKelvin(temperature: number, type = 'fahrenheit') {
  return fahrenheitToKelvin(temperature);
}

export const toFahrenheit = (temperature: number, type = 'kelvin') => {
  return Math.round((temperature * (9/5) - 459.67) * 10) / 10;
};

export const toCelcius = (temperature: number, type = 'kelvin') => {
  if (type === 'kelvin') {
    return kelvinToCelcius(temperature);
  }

  if (type === 'fahrenheit') {
    return fahrenheitToCelcius(temperature);
  }
};
