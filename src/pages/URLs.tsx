import { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { ExternalLink, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUrlState } from "@/context/UrlContext";
import { getWebsiteData } from "@/data/mockWebsiteData";

const URLs = () => {
  const { url: paramUrl } = useParams();
  const location = useLocation();
  const { url, setUrl } = useUrlState();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 25;

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

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

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

  const mockURLs = websiteData?.urls || [];

  const filteredURLs = mockURLs.filter(urlEntry =>
    urlEntry.url.toLowerCase().includes(searchTerm.toLowerCase()) ||
    urlEntry.mimeType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredURLs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedURLs = filteredURLs.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="archive-header">URL List</h1>
        {decodedUrl && (
          <p className="text-sm text-muted-foreground font-mono">
            Showing all archived URLs for: <span className="text-primary">{decodedUrl}</span>
          </p>
        )}
      </div>

      {/* Search */}
      <div className="bg-card border border-border p-4">
        <div className="flex space-x-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search URLs or MIME types..."
              className="pl-10"
            />
          </div>
          <Button variant="outline">
            Search
          </Button>
        </div>
      </div>

      {/* Stats */}
      {websiteData && (
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-card border border-border p-3 text-center">
            <div className="text-lg font-bold text-primary">{filteredURLs.length}</div>
            <div className="text-xs text-muted-foreground">Total URLs</div>
          </div>
          <div className="bg-card border border-border p-3 text-center">
            <div className="text-lg font-bold text-primary">
              {filteredURLs.reduce((sum, url) => sum + url.snapshots, 0)}
            </div>
            <div className="text-xs text-muted-foreground">Total Snapshots</div>
          </div>
          <div className="bg-card border border-border p-3 text-center">
            <div className="text-lg font-bold text-primary">
              {new Set(filteredURLs.map(url => url.mimeType)).size}
            </div>
            <div className="text-xs text-muted-foreground">MIME Types</div>
          </div>
          <div className="bg-card border border-border p-3 text-center">
            <div className="text-lg font-bold text-primary">{websiteData.timeSpan}</div>
            <div className="text-xs text-muted-foreground">Time Span</div>
          </div>
        </div>
      )}

      {/* URL Table */}
      <div className="bg-card border border-border">
        <table className="archive-table">
          <thead>
            <tr>
              <th>URL</th>
              <th>Snapshots</th>
              <th>First Capture</th>
              <th>Last Capture</th>
              <th>MIME Type</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedURLs.map((urlEntry, index) => (
              <tr key={index} className="hover:bg-accent">
                <td className="font-mono text-sm">
                  {decodedUrl}{urlEntry.url}
                </td>
                <td className="text-center font-bold">
                  {urlEntry.snapshots}
                </td>
                <td className="text-sm">
                  {urlEntry.firstCapture}
                </td>
                <td className="text-sm">
                  {urlEntry.lastCapture}
                </td>
                <td className="text-sm">
                  <span className="px-2 py-1 bg-muted rounded text-xs">
                    {urlEntry.mimeType}
                  </span>
                </td>
                <td className="text-center">
                  <span className={`px-2 py-1 rounded text-xs ${
                    urlEntry.status === '200'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {urlEntry.status}
                  </span>
                </td>
                <td>
                  <Link
                    to={`/calendar?url=${encodeURIComponent(decodedUrl)}`}
                    className="archive-link flex items-center space-x-1"
                  >
                    <ExternalLink className="w-3 h-3" />
                    <span>View</span>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>

          <span className="flex items-center px-3 text-sm">
            Page {currentPage} of {totalPages}
          </span>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}

      {/* Navigation Links */}
      {decodedUrl && (
        <div className="flex justify-center space-x-4">
          <Link to={`/calendar?url=${encodeURIComponent(decodedUrl)}`} className="archive-button">
            Calendar View
          </Link>
          <Link to={`/sitemap?url=${encodeURIComponent(decodedUrl)}`} className="archive-button">
            Site Map
          </Link>
          <Link to={`/summary?url=${encodeURIComponent(decodedUrl)}`} className="archive-button">
            Summary
          </Link>
        </div>
      )}
    </div>
  );
};

export default URLs;
