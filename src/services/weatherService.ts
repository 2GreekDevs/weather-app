const API_KEY = "bd5e378503939ddaee76f12ad7a97608"; // OpenWeatherMap free API key
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