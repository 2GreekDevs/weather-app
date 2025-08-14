import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

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
  const { data, error } = await supabase.functions.invoke('weather', {
    body: { query }
  })

  if (error) {
    throw new Error(error.message || `Weather data not found for "${query}"`)
  }

  if (data.error) {
    throw new Error(data.error)
  }

  return data
}
