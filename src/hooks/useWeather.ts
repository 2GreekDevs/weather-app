import { useState, useCallback } from "react";
import { fetchWeatherData, WeatherResponse } from "@/services/weatherService";
import { toast } from "sonner";

interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  description: string;
  humidity: number;
  windSpeed: number;
  visibility: number;
  feelsLike: number;
  icon: string;
}

export const useWeather = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const transformWeatherData = (data: WeatherResponse): WeatherData => {
    return {
      location: `${data.name}, ${data.sys.country}`,
      temperature: data.main.temp,
      condition: data.weather[0].main,
      description: data.weather[0].description,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      visibility: data.visibility / 1000, // Convert to km
      feelsLike: data.main.feels_like,
      icon: data.weather[0].icon,
    };
  };

  const getWeather = useCallback(async (query: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await fetchWeatherData(query);
      const transformedData = transformWeatherData(data);
      setWeather(transformedData);
      toast.success(`Weather data loaded for ${transformedData.location}`);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch weather data";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    weather,
    loading,
    error,
    getWeather,
  };
};