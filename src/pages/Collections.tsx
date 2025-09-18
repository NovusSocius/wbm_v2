import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Archive, Calendar, Users, Globe } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Collection {
  id: string;
  name: string;
  description: string;
  itemCount: number;
  lastUpdated: string;
  category: string;
  icon: 'archive' | 'calendar' | 'users' | 'globe';
}

const Collections = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const iconMap = {
    archive: Archive,
    calendar: Calendar,
    users: Users,
    globe: Globe
  };

  // Mock collections data
  const mockCollections: Collection[] = [
    {
      id: "web-crawls",
      name: "Wide Web Crawls",
      description: "Broad crawls of the web including millions of websites from 1996 to present",
      itemCount: 866000000,
      lastUpdated: "2023-12-15",
      category: "web",
      icon: "globe"
    },
    {
      id: "government",
      name: "Government Data",
      description: "Archives of government websites, documents, and public information",
      itemCount: 45600000,
      lastUpdated: "2023-12-14",
      category: "government",
      icon: "archive"
    },
    {
      id: "news-sites",
      name: "News & Media Sites",
      description: "Historical snapshots of major news websites and media publications",
      itemCount: 123500000,
      lastUpdated: "2023-12-15",  
      category: "news",
      icon: "calendar"
    },
    {
      id: "social-media",
      name: "Social Media Archives",
      description: "Archived social media content and platform snapshots",
      itemCount: 78900000,
      lastUpdated: "2023-12-13",
      category: "social",
      icon: "users"
    },
    {
      id: "academic",
      name: "Academic Institutions", 
      description: "University websites, research publications, and educational resources",
      itemCount: 34200000,
      lastUpdated: "2023-12-12",
      category: "education",
      icon: "archive"
    },
    {
      id: "tech-companies",
      name: "Technology Companies",
      description: "Historical snapshots of major technology company websites",
      itemCount: 12800000,
      lastUpdated: "2023-12-14",
      category: "technology",
      icon: "globe"
    },
    {
      id: "cultural-heritage",
      name: "Cultural Heritage",
      description: "Museums, libraries, and cultural institution websites",
      itemCount: 8900000,
      lastUpdated: "2023-12-11",
      category: "culture",
      icon: "archive"
    },
    {
      id: "non-profit",
      name: "Non-Profit Organizations",
      description: "Archived websites of charitable and non-profit organizations",
      itemCount: 15600000,
      lastUpdated: "2023-12-10",
      category: "nonprofit",
      icon: "users"
    },
    {
      id: "blogs-personal",
      name: "Blogs & Personal Sites",
      description: "Individual blogs, personal websites, and online journals",
      itemCount: 234500000,
      lastUpdated: "2023-12-15",
      category: "personal",
      icon: "users"
    },
    {
      id: "e-commerce",
      name: "E-commerce & Business",
      description: "Online stores, business websites, and commercial platforms",
      itemCount: 67800000,
      lastUpdated: "2023-12-14",
      category: "business",
      icon: "globe"
    }
  ];

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "web", label: "Web Crawls" },
    { value: "government", label: "Government" },
    { value: "news", label: "News & Media" },
    { value: "social", label: "Social Media" },
    { value: "education", label: "Education" },
    { value: "technology", label: "Technology" },
    { value: "culture", label: "Culture" },
    { value: "nonprofit", label: "Non-Profit" },
    { value: "personal", label: "Personal" },
    { value: "business", label: "Business" }
  ];

  const filteredCollections = mockCollections.filter(collection => {
    const matchesSearch = collection.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         collection.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || collection.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="archive-header">Collections</h1>
        <p className="text-muted-foreground">
          Browse curated archives organized by topic and institution
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-card border border-border p-4 space-y-4">
        <div className="flex space-x-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search collections..."
              className="pl-10"
            />
          </div>
          <Button variant="outline">
            Search
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              className={`px-3 py-1 rounded text-sm border transition-colors ${
                selectedCategory === category.value
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-background border-border hover:bg-accent'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-card border border-border p-4 text-center">
          <div className="text-2xl font-bold text-primary">{filteredCollections.length}</div>
          <div className="text-sm text-muted-foreground">Collections</div>
        </div>
        <div className="bg-card border border-border p-4 text-center">
          <div className="text-2xl font-bold text-primary">
            {formatNumber(filteredCollections.reduce((sum, col) => sum + col.itemCount, 0))}
          </div>
          <div className="text-sm text-muted-foreground">Total Items</div>
        </div>
        <div className="bg-card border border-border p-4 text-center">
          <div className="text-2xl font-bold text-primary">27y</div>
          <div className="text-sm text-muted-foreground">Time Span</div>
        </div>
      </div>

      {/* Collections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredCollections.map(collection => {
          const IconComponent = iconMap[collection.icon];
          
          return (
            <div key={collection.id} className="bg-card border border-border p-4 hover:bg-accent transition-colors">
              <div className="flex items-start space-x-3">
                <IconComponent className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-foreground mb-1">
                    {collection.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {collection.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{formatNumber(collection.itemCount)} items</span>
                    <span>Updated {collection.lastUpdated}</span>
                  </div>
                  <div className="mt-3">
                    <Link 
                      to="#" 
                      className="archive-link text-sm"
                    >
                      Browse Collection →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredCollections.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <Archive className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>No collections found matching your criteria.</p>
        </div>
      )}

      {/* Info Box */}
      <div className="bg-muted border border-border p-6 rounded">
        <h2 className="font-bold mb-2">About Collections</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Collections are curated groups of archived web content organized by topic, institution, 
          or time period. They provide focused access to specific types of archived material 
          within the larger Wayback Machine database.
        </p>
        <p className="text-sm text-muted-foreground">
          Each collection contains millions of web pages, documents, and other digital content 
          preserved over time, offering researchers and the public access to the evolving digital landscape.
        </p>
      </div>
    </div>
  );
};

export default Collections;