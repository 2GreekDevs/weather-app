import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Cloud, 
  Sun, 
  CloudRain, 
  CloudSnow, 
  Zap, 
  Eye, 
  Wind, 
  Droplets,
  Thermometer
} from "lucide-react";

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

interface WeatherCardProps {
  weather: WeatherData;
}

const getWeatherIcon = (iconCode: string) => {
  const icons: { [key: string]: JSX.Element } = {
    "01d": <Sun className="w-16 h-16 text-sun" />,
    "01n": <Sun className="w-16 h-16 text-sun" />,
    "02d": <Cloud className="w-16 h-16 text-sky-medium" />,
    "02n": <Cloud className="w-16 h-16 text-sky-medium" />,
    "03d": <Cloud className="w-16 h-16 text-muted-foreground" />,
    "03n": <Cloud className="w-16 h-16 text-muted-foreground" />,
    "04d": <Cloud className="w-16 h-16 text-muted-foreground" />,
    "04n": <Cloud className="w-16 h-16 text-muted-foreground" />,
    "09d": <CloudRain className="w-16 h-16 text-sky-dark" />,
    "09n": <CloudRain className="w-16 h-16 text-sky-dark" />,
    "10d": <CloudRain className="w-16 h-16 text-sky-dark" />,
    "10n": <CloudRain className="w-16 h-16 text-sky-dark" />,
    "11d": <Zap className="w-16 h-16 text-accent" />,
    "11n": <Zap className="w-16 h-16 text-accent" />,
    "13d": <CloudSnow className="w-16 h-16 text-sky-light" />,
    "13n": <CloudSnow className="w-16 h-16 text-sky-light" />,
  };
  
  return icons[iconCode] || <Sun className="w-16 h-16 text-sun" />;
};

export const WeatherCard = ({ weather }: WeatherCardProps) => {
  return (
    <Card className="bg-gradient-card shadow-floating border-0 backdrop-blur-sm">
      <div className="p-8">
        {/* Main weather display */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-2">
            {weather.location}
          </h2>
          <div className="flex items-center justify-center mb-4">
            {getWeatherIcon(weather.icon)}
          </div>
          <div className="text-6xl font-light text-foreground mb-2">
            {Math.round(weather.temperature)}°
          </div>
          <Badge variant="secondary" className="text-sm px-3 py-1">
            {weather.condition}
          </Badge>
          <p className="text-muted-foreground mt-2 capitalize">
            {weather.description}
          </p>
        </div>

        {/* Weather details */}
        <div className="grid grid-cols-2 gap-6">
          <div className="flex items-center space-x-3">
            <Thermometer className="w-5 h-5 text-accent" />
            <div>
              <p className="text-sm text-muted-foreground">Feels like</p>
              <p className="font-semibold">{Math.round(weather.feelsLike)}°</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Droplets className="w-5 h-5 text-sky-medium" />
            <div>
              <p className="text-sm text-muted-foreground">Humidity</p>
              <p className="font-semibold">{weather.humidity}%</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Wind className="w-5 h-5 text-sky-dark" />
            <div>
              <p className="text-sm text-muted-foreground">Wind Speed</p>
              <p className="font-semibold">{weather.windSpeed} m/s</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Eye className="w-5 h-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Visibility</p>
              <p className="font-semibold">{weather.visibility} km</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};