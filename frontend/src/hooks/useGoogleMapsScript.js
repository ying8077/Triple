import { useState, useEffect } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

export function useGoogleMapsLoader() {
  const [isLoaded, setIsLoaded] = useState(false);
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  useEffect(() => {
    if (!apiKey) {
      console.warn('Google Maps API key is missing');
      return;
    }

    const loader = new Loader({
      apiKey,
      version: 'weekly',
      libraries: ['places', 'drawing', 'geometry'],
    });

    loader
      .load()
      .then(() => {
        setIsLoaded(true);
      })
      .catch((err) => {
        console.error('Google Maps load error:', err);
      });
  }, [apiKey]);

  return isLoaded;
}

