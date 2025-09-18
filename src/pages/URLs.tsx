import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ExternalLink, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface URLEntry {
  url: string;
  snapshots: number;
  firstCapture: string;
  lastCapture: string;
  mimeType: string;
  status: string;
}

const URLs = () => {
  const { url } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 25;

  const decodedUrl = url ? decodeURIComponent(url) : '';

  // Mock URL data
  const mockURLs: URLEntry[] = [
    {
      url: '/index.html',
      snapshots: 156,
      firstCapture: '1999-03-15',
      lastCapture: '2023-12-15',
      mimeType: 'text/html',
      status: '200'
    },
    {
      url: '/about/index.html',
      snapshots: 45,
      firstCapture: '2000-01-20',
      lastCapture: '2023-12-10',
      mimeType: 'text/html',
      status: '200'
    },
    {
      url: '/about/team.html',
      snapshots: 23,
      firstCapture: '2001-06-10',
      lastCapture: '2023-11-28',
      mimeType: 'text/html',
      status: '200'
    },
    {
      url: '/products/index.html',
      snapshots: 78,
      firstCapture: '2000-08-05',
      lastCapture: '2023-12-14',
      mimeType: 'text/html',
      status: '200'
    },
    {
      url: '/products/software/download.html',
      snapshots: 67,
      firstCapture: '2002-03-12',
      lastCapture: '2023-12-01',
      mimeType: 'text/html',
      status: '200'
    },
    {
      url: '/news/index.html',
      snapshots: 89,
      firstCapture: '2001-09-20',
      lastCapture: '2023-12-13',
      mimeType: 'text/html',
      status: '200'
    },
    {
      url: '/images/logo.png',
      snapshots: 34,
      firstCapture: '2002-01-15',
      lastCapture: '2023-10-20',
      mimeType: 'image/png',
      status: '200'
    },
    {
      url: '/css/style.css',
      snapshots: 89,
      firstCapture: '2001-05-30',
      lastCapture: '2023-11-15',
      mimeType: 'text/css',
      status: '200'
    },
    {
      url: '/js/script.js',
      snapshots: 45,
      firstCapture: '2003-02-10',
      lastCapture: '2023-09-25',
      mimeType: 'application/javascript',
      status: '200'
    },
    {
      url: '/contact.html',
      snapshots: 67,
      firstCapture: '2000-12-05',
      lastCapture: '2023-11-20',
      mimeType: 'text/html',
      status: '200'
    },
    {
      url: '/sitemap.xml',
      snapshots: 23,
      firstCapture: '2004-06-15',
      lastCapture: '2023-10-15',
      mimeType: 'application/xml',
      status: '200'
    },
    {
      url: '/robots.txt',
      snapshots: 12,
      firstCapture: '2003-01-20',
      lastCapture: '2023-08-10',
      mimeType: 'text/plain',
      status: '200'
    },
    {
      url: '/api/data.json',
      snapshots: 156,
      firstCapture: '2010-03-10',
      lastCapture: '2023-12-12',
      mimeType: 'application/json',
      status: '200'
    },
    {
      url: '/products/brochure.pdf',
      snapshots: 34,
      firstCapture: '2005-08-20',
      lastCapture: '2023-09-15',
      mimeType: 'application/pdf',
      status: '200'
    },
    {
      url: '/404.html',
      snapshots: 8,
      firstCapture: '2002-11-30',
      lastCapture: '2023-07-20',
      mimeType: 'text/html',
      status: '404'
    }
  ];

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
          <div className="text-lg font-bold text-primary">24y</div>
          <div className="text-xs text-muted-foreground">Time Span</div>
        </div>
      </div>

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
                    to={`/calendar/${encodeURIComponent(decodedUrl + urlEntry.url)}`}
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
          <Link to={`/calendar/${encodeURIComponent(decodedUrl)}`} className="archive-button">
            Calendar View
          </Link>
          <Link to={`/sitemap/${encodeURIComponent(decodedUrl)}`} className="archive-button">
            Site Map
          </Link>
          <Link to={`/summary/${encodeURIComponent(decodedUrl)}`} className="archive-button">
            Summary
          </Link>
        </div>
      )}
    </div>
  );
};

export default URLs;