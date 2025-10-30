import { useState, useEffect, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getWebsiteData, generateCalendarData } from "@/data/mockWebsiteData";

const Calendar = () => {
  const { url } = useParams();
  const [currentYear, setCurrentYear] = useState(2023);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  
  const years = Array.from({ length: 28 }, (_, i) => 1996 + i);
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  const weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  const decodedUrl = url ? decodeURIComponent(url) : '';
  const websiteData = getWebsiteData(decodedUrl);

  // Memoize calendar data to prevent regeneration on every render
  const calendarData = useMemo(() => {
    const data: Record<string, Record<string, number>> = {};
    years.forEach(year => {
      months.forEach((_, monthIndex) => {
        const key = `${year}-${monthIndex + 1}`;
        data[key] = generateCalendarData(decodedUrl, year, monthIndex + 1);
      });
    });
    return data;
  }, [decodedUrl]);

  const getHeatmapClass = (count: number) => {
    if (count === 0) return 'heatmap-empty';
    if (count <= 3) return 'heatmap-low';
    if (count <= 10) return 'heatmap-medium';
    return 'heatmap-high';
  };

  if (!websiteData && decodedUrl) {
    return (
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="archive-header">Website Not Found</h1>
          <p className="text-muted-foreground">
            No archived data found for: <span className="text-primary font-mono">{decodedUrl}</span>
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Try searching for "example.com" or "github.com"
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="archive-header">Calendar View</h1>
          {decodedUrl && (
            <p className="text-sm text-muted-foreground font-mono">
              Showing snapshots for: <span className="text-primary">{decodedUrl}</span>
            </p>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setCurrentYear(Math.max(1996, currentYear - 1))}
            disabled={currentYear <= 1996}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <span className="text-lg font-bold min-w-16 text-center">{currentYear}</span>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setCurrentYear(Math.min(2023, currentYear + 1))}
            disabled={currentYear >= 2023}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Year Grid */}
      <div className="bg-card border border-border p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {months.map((month, monthIndex) => {
            const monthData = calendarData[`${currentYear}-${monthIndex + 1}`] || {};
            const daysInMonth = new Date(currentYear, monthIndex + 1, 0).getDate();
            const firstDayOfMonth = new Date(currentYear, monthIndex, 1).getDay();
            
            return (
              <div key={month} className="calendar-month">
                <h3 className="text-sm font-bold text-center mb-2">{month}</h3>
                <div className="calendar-grid">
                  {/* Weekday headers */}
                  {weekdays.map((day, idx) => (
                    <div key={`weekday-${idx}`} className="calendar-weekday">
                      {day}
                    </div>
                  ))}
                  
                  {/* Leading blank cells */}
                  {Array.from({ length: firstDayOfMonth }, (_, idx) => (
                    <div key={`blank-${idx}`} className="calendar-empty" />
                  ))}
                  
                  {/* Day cells */}
                  {Array.from({ length: daysInMonth }, (_, day) => {
                    const dateStr = `${currentYear}-${(monthIndex + 1).toString().padStart(2, '0')}-${(day + 1).toString().padStart(2, '0')}`;
                    const count = monthData[dateStr] || 0;
                    
                    return (
                      <button
                        key={day}
                        className={`heatmap-cell ${getHeatmapClass(count)}`}
                        onClick={() => setSelectedDate(count > 0 ? dateStr : null)}
                        title={count > 0 ? `${count} snapshots on ${dateStr}` : `No snapshots on ${dateStr}`}
                        aria-label={count > 0 ? `${count} snapshots on ${dateStr}` : `No snapshots on ${dateStr}`}
                      >
                        <span>{day + 1}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center space-x-4 text-sm">
        <span>Less</span>
        <div className="flex space-x-1">
          <div className="heatmap-cell heatmap-empty"><span> </span></div>
          <div className="heatmap-cell heatmap-low"><span> </span></div>
          <div className="heatmap-cell heatmap-medium"><span> </span></div>
          <div className="heatmap-cell heatmap-high"><span> </span></div>
        </div>
        <span>More</span>
      </div>

      {/* Selected Date Info */}
      {selectedDate && (
        <div className="bg-card border border-border p-4">
          <h3 className="font-bold mb-2">Snapshots for {selectedDate}</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>12:34:56 AM</span>
              <Link to="#" className="archive-link flex items-center space-x-1">
                <span>View snapshot</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>06:15:23 PM</span>
              <Link to="#" className="archive-link flex items-center space-x-1">
                <span>View snapshot</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Links */}
      {decodedUrl && (
        <div className="flex justify-center space-x-4">
          <Link to={`/sitemap/${encodeURIComponent(decodedUrl)}`} className="archive-button">
            Site Map
          </Link>
          <Link to={`/urls/${encodeURIComponent(decodedUrl)}`} className="archive-button">
            URL List
          </Link>
          <Link to={`/summary/${encodeURIComponent(decodedUrl)}`} className="archive-button">
            Summary
          </Link>
        </div>
      )}
    </div>
  );
};

export default Calendar;