import { useState } from "react";
import { Search, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchInputProps {
  onSearch: (city: string) => void;
  loading?: boolean;
}

export const SearchInput = ({ onSearch, loading }: SearchInputProps) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          onSearch(`${latitude},${longitude}`);
        },
        (error) => {
          console.error("Error getting location:", error);
          // Fallback to a default city
          onSearch("London");
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      onSearch("London");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            type="text"
            placeholder="Search for a city..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 bg-card/80 backdrop-blur-sm border-border/50 focus:bg-card"
            disabled={loading}
          />
        </div>
        <Button 
          type="submit" 
          disabled={loading || !query.trim()}
          className="bg-primary hover:bg-primary/90"
        >
          <Search className="w-4 h-4" />
        </Button>
      </form>
      
      <Button 
        onClick={handleCurrentLocation}
        variant="outline"
        className="w-full bg-card/80 backdrop-blur-sm border-border/50 hover:bg-card"
        disabled={loading}
      >
        <MapPin className="w-4 h-4 mr-2" />
        Use Current Location
      </Button>
    </div>
  );
};