export const GOOGLE_MAPS_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY || '';

export const GOOGLE_MAPS_KEY_ERROR =
  'Brak klucza Google Maps. Skopiuj zad_travel 3/.env.example do zad_travel 3/.env i ustaw EXPO_PUBLIC_GOOGLE_MAPS_API_KEY.';

export const hasGoogleMapsApiKey = () => GOOGLE_MAPS_API_KEY.trim().length > 0;
