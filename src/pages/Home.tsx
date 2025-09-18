import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar, Map, List, BarChart3, Archive } from "lucide-react";

const Home = () => {
  const [url, setUrl] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      navigate(`/calendar/${encodeURIComponent(url.trim())}`);
    }
  };

  const handleFeatureClick = (feature: string) => {
    if (url.trim()) {
      navigate(`/${feature}/${encodeURIComponent(url.trim())}`);
    } else {
      navigate(`/${feature}`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-foreground mb-2">
          Wayback Machine
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Search archived web pages over time. Enter a URL to see its snapshots 
          from 1996 to present day.
        </p>
      </div>

      {/* Search Form */}
      <div className="bg-card border border-border p-6 rounded">
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="flex space-x-2">
            <Input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter URL (e.g., example.com)"
              className="flex-1 font-mono"
            />
            <Button type="submit" className="px-6">
              Browse History
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            * Snapshots currently available: <strong>735 billion web pages</strong> saved over time
          </p>
        </form>
      </div>

      {/* Quick Features */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button
          onClick={() => handleFeatureClick('calendar')}
          className="bg-card border border-border p-4 hover:bg-accent transition-colors text-left"
        >
          <Calendar className="w-6 h-6 text-primary mb-2" />
          <h3 className="font-semibold text-sm">Calendar View</h3>
          <p className="text-xs text-muted-foreground">Browse by date</p>
        </button>

        <button
          onClick={() => handleFeatureClick('sitemap')}
          className="bg-card border border-border p-4 hover:bg-accent transition-colors text-left"
        >
          <Map className="w-6 h-6 text-primary mb-2" />
          <h3 className="font-semibold text-sm">Site Map</h3>
          <p className="text-xs text-muted-foreground">Page structure</p>
        </button>

        <button
          onClick={() => handleFeatureClick('urls')}
          className="bg-card border border-border p-4 hover:bg-accent transition-colors text-left"
        >
          <List className="w-6 h-6 text-primary mb-2" />
          <h3 className="font-semibold text-sm">URL List</h3>
          <p className="text-xs text-muted-foreground">All archived URLs</p>
        </button>

        <button
          onClick={() => handleFeatureClick('summary')}
          className="bg-card border border-border p-4 hover:bg-accent transition-colors text-left"
        >
          <BarChart3 className="w-6 h-6 text-primary mb-2" />
          <h3 className="font-semibold text-sm">Summary</h3>
          <p className="text-xs text-muted-foreground">Stats & charts</p>
        </button>
      </div>

      {/* Collections Link */}
      <div className="bg-muted border border-border p-6 rounded text-center">
        <Archive className="w-8 h-8 text-primary mx-auto mb-3" />
        <h2 className="text-xl font-bold mb-2">Browse Collections</h2>
        <p className="text-muted-foreground mb-4">
          Explore curated archives organized by topic and time period
        </p>
        <Button 
          variant="outline" 
          onClick={() => navigate('/collections')}
        >
          View All Collections
        </Button>
      </div>
    </div>
  );
};

export default Home;