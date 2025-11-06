import { useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { BarChart3, PieChart, Calendar as CalendarIcon, TrendingUp } from "lucide-react";
import { useUrlState } from "@/context/UrlContext";
import { getWebsiteData } from "@/data/mockWebsiteData";

const Summary = () => {
  const { url: paramUrl } = useParams();
  const location = useLocation();
  const { url, setUrl } = useUrlState();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const queryUrl = params.get("url");
    const trimmedQuery = queryUrl?.trim();
    const fromParam = paramUrl ? decodeURIComponent(paramUrl) : undefined;
    const nextUrl = trimmedQuery && trimmedQuery.length > 0 ? trimmedQuery : fromParam;

    if (nextUrl && nextUrl !== url) {
      setUrl(nextUrl);
    }
  }, [location.search, paramUrl, setUrl, url]);

  const decodedUrl = url;
  const websiteData = getWebsiteData(decodedUrl);

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

  if (!websiteData) return null;

  const { mimeTypes, yearlyStats, recentCaptures, totalSnapshots, uniqueUrls, timeSpan, firstCapture, lastCapture } = websiteData;
  const maxCaptures = Math.max(...yearlyStats.map(s => s.captures));

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="archive-header">Summary</h1>
        {decodedUrl && (
          <p className="text-sm text-muted-foreground font-mono">
            Showing statistics for: <span className="text-primary">{decodedUrl}</span>
          </p>
        )}
      </div>

      {/* Key Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border p-4 text-center">
          <div className="text-2xl font-bold text-primary">{totalSnapshots.toLocaleString()}</div>
          <div className="text-sm text-muted-foreground">Total Snapshots</div>
        </div>
        <div className="bg-card border border-border p-4 text-center">
          <div className="text-2xl font-bold text-primary">{uniqueUrls}</div>
          <div className="text-sm text-muted-foreground">Unique URLs</div>
        </div>
        <div className="bg-card border border-border p-4 text-center">
          <div className="text-2xl font-bold text-primary">{timeSpan}</div>
          <div className="text-sm text-muted-foreground">Time Span</div>
        </div>
        <div className="bg-card border border-border p-4 text-center">
          <div className="text-2xl font-bold text-primary">{mimeTypes.length}</div>
          <div className="text-sm text-muted-foreground">MIME Types</div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* MIME Types Bar Chart */}
        <div className="bg-card border border-border p-4">
          <h2 className="font-bold mb-4 flex items-center space-x-2">
            <BarChart3 className="w-5 h-5" />
            <span>MIME Types Distribution</span>
          </h2>
          <div className="space-y-3">
            {mimeTypes.map((mime, index) => (
              <div key={index} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="font-mono">{mime.type}</span>
                  <span>{mime.count} ({mime.percentage}%)</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${mime.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Yearly Captures Chart */}
        <div className="bg-card border border-border p-4">
          <h2 className="font-bold mb-4 flex items-center space-x-2">
            <TrendingUp className="w-5 h-5" />
            <span>Captures by Year</span>
          </h2>
          <div className="space-y-2">
            {yearlyStats.map((stat, index) => (
              <div key={index} className="flex items-center space-x-3">
                <span className="text-sm font-mono w-12">{stat.year}</span>
                <div className="flex-1 bg-muted rounded-full h-4 relative">
                  <div
                    className="bg-primary h-4 rounded-full transition-all duration-300"
                    style={{ width: `${(stat.captures / maxCaptures) * 100}%` }}
                  ></div>
                </div>
                <span className="text-sm w-8 text-right">{stat.captures}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Captures Table */}
      <div className="bg-card border border-border">
        <div className="p-4 border-b border-border">
          <h2 className="font-bold flex items-center space-x-2">
            <CalendarIcon className="w-5 h-5" />
            <span>Last 10 Captures</span>
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="archive-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Time</th>
                <th>URL</th>
                <th>Status</th>
                <th>Size</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentCaptures.map((capture, index) => (
                <tr key={index} className="hover:bg-accent">
                  <td className="text-sm">{capture.date}</td>
                  <td className="text-sm font-mono">{capture.time}</td>
                  <td className="font-mono text-sm">
                    {decodedUrl}{capture.url}
                  </td>
                  <td className="text-center">
                    <span className={`px-2 py-1 rounded text-xs ${
                      capture.status === '200'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {capture.status}
                    </span>
                  </td>
                  <td className="text-sm">{capture.size}</td>
                  <td>
                    <Link
                      to="#"
                      className="archive-link text-sm"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Archive Timeline */}
      <div className="bg-card border border-border p-4">
        <h2 className="font-bold mb-4 flex items-center space-x-2">
          <PieChart className="w-5 h-5" />
          <span>Archive Timeline</span>
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-muted rounded">
            <div>
              <div className="font-semibold">First Capture</div>
              <div className="text-sm text-muted-foreground">{firstCapture}</div>
            </div>
            <div className="text-right">
              <div className="font-semibold">Last Capture</div>
              <div className="text-sm text-muted-foreground">{lastCapture}</div>
            </div>
          </div>
          <div className="text-center text-sm text-muted-foreground">
            <strong>{timeSpan}</strong> of continuous archiving
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      {decodedUrl && (
        <div className="flex justify-center space-x-4">
          <Link to={`/calendar?url=${encodeURIComponent(decodedUrl)}`} className="archive-button">
            Calendar View
          </Link>
          <Link to={`/sitemap?url=${encodeURIComponent(decodedUrl)}`} className="archive-button">
            Site Map
          </Link>
          <Link to={`/urls?url=${encodeURIComponent(decodedUrl)}`} className="archive-button">
            URL List
          </Link>
        </div>
      )}
    </div>
  );
};

export default Summary;
