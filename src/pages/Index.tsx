import { useEffect } from "react";
import { WeatherCard } from "@/components/WeatherCard";
import { SearchInput } from "@/components/SearchInput";
import { useWeather } from "@/hooks/useWeather";
import { Skeleton } from "@/components/ui/skeleton";

const Index = () => {
  const { weather, loading, getWeather } = useWeather();

  useEffect(() => {
    // Load weather for London by default
    getWeather("London");
  }, [getWeather]);

  return (
    <div className="min-h-screen bg-gradient-sky">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Weather App
          </h1>
          <p className="text-lg text-muted-foreground">
            Get current weather information for any city
          </p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <SearchInput onSearch={getWeather} loading={loading} />
        </div>

        {/* Weather Display */}
        <div className="max-w-md mx-auto">
          {loading ? (
            <div className="bg-gradient-card rounded-lg p-8 shadow-floating">
              <div className="text-center mb-8">
                <Skeleton className="h-8 w-48 mx-auto mb-4" />
                <Skeleton className="h-16 w-16 mx-auto mb-4 rounded-full" />
                <Skeleton className="h-16 w-32 mx-auto mb-2" />
                <Skeleton className="h-6 w-24 mx-auto" />
              </div>
              <div className="grid grid-cols-2 gap-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <Skeleton className="h-5 w-5" />
                    <div>
                      <Skeleton className="h-4 w-16 mb-1" />
                      <Skeleton className="h-5 w-12" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : weather ? (
            <WeatherCard weather={weather} />
          ) : (
            <div className="text-center text-muted-foreground">
              Search for a city to see weather information
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
