import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { corsHeaders } from '../_shared/cors.ts'

interface WeatherResponse {
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

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { query } = await req.json()
    
    if (!query) {
      return new Response(
        JSON.stringify({ error: 'Query parameter is required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    const API_KEY = Deno.env.get('OPENWEATHER_API_KEY')
    if (!API_KEY) {
      throw new Error('OpenWeather API key not configured')
    }

    const BASE_URL = "https://api.openweathermap.org/data/2.5/weather"
    let url = `${BASE_URL}?appid=${API_KEY}&units=metric`
    
    // Check if query contains coordinates (lat,lon)
    if (query.includes(',')) {
      const [lat, lon] = query.split(',')
      url += `&lat=${lat}&lon=${lon}`
    } else {
      url += `&q=${encodeURIComponent(query)}`
    }

    const response = await fetch(url)
    
    if (!response.ok) {
      const errorData = await response.json()
      return new Response(
        JSON.stringify({ 
          error: `Weather data not found for "${query}"`,
          details: errorData.message 
        }),
        { 
          status: response.status,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    const weatherData: WeatherResponse = await response.json()
    
    return new Response(
      JSON.stringify(weatherData),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )

  } catch (error) {
    console.error('Weather API error:', error)
    return new Response(
      JSON.stringify({ 
        error: 'Failed to fetch weather data',
        details: error.message 
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})