import { useEffect, useState } from 'react';

const SUPPORTS_LOCATION = !!navigator.geolocation;

// https://developer.mozilla.org/en-US/docs/Web/API/GeolocationPositionError
const ERROR_MESSAGES = {
  1: 'Location access was not allowed, which is needed to get local weather info.', // Permission denied
  2: "Your location couldn't be determined.", // Position unavailable
  3: 'Attempt to get your location timed out.', // Timeout
};

export const useGeoLocation = (): [GeolocationCoordinates | null, Error | null] => {
  const [coords, setCoords] = useState<GeolocationCoordinates | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (SUPPORTS_LOCATION) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCoords(position.coords);
      }, (error) => {
        let errorMessage = 'Location error';

        if (error.code === 1 || error.code === 2 || error.code === 3) {
          errorMessage = ERROR_MESSAGES[error.code];
        }
        setError(new Error(errorMessage));
      });
    } else {
      setError(new Error('Sorry, your browser doesn’t support locations.'));
    }
  }, []);

  return [coords, error];
};
