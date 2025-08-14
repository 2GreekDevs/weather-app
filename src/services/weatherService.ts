import { createClient } from '@supabase/supabase-js'

// For development, we'll use a direct API call approach
// In production, you should use Supabase edge functions for security
const API_KEY = "895284fb2d2c50a520ea537456963d9c"; // Demo API key for testing
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

export interface WeatherResponse {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
  visibility: number;
  sys: {
    country: string;
  };
}

export const fetchWeatherData = async (query: string): Promise<WeatherResponse> => {
  let url = `${BASE_URL}?appid=${API_KEY}&units=metric`;
  
  // Check if query contains coordinates (lat,lon)
  if (query.includes(',')) {
    const [lat, lon] = query.split(',');
    url += `&lat=${lat}&lon=${lon}`;
  } else {
    url += `&q=${encodeURIComponent(query)}`;
  }

  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`Weather data not found for "${query}"`);
  }
  
  return response.json();
};
