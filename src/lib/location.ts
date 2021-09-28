import { useEffect, useState } from 'react';

const SUPPORTS_LOCATION = !!navigator.geolocation;

export const useGeoLocation = (): [GeolocationCoordinates | null, Error | null] => {
  const [coords, setCoords] = useState<GeolocationCoordinates | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (SUPPORTS_LOCATION) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCoords(position.coords);
      }, (error) => {
        setError(new Error(error.message));
      });
    } else {
      setError(new Error('Sorry, your browser doesn’t support locations.'));
    }
  }, []);

  return [coords, error];
};
