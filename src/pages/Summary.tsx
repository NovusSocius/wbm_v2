import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { BarChart3, PieChart, Calendar, TrendingUp } from "lucide-react";

const Summary = () => {
  const { url } = useParams();
  const decodedUrl = url ? decodeURIComponent(url) : '';

  // Mock data for charts and statistics
  const mimeTypes = [
    { type: 'text/html', count: 456, percentage: 45.6 },
    { type: 'image/jpeg', count: 234, percentage: 23.4 },
    { type: 'image/png', count: 123, percentage: 12.3 },
    { type: 'text/css', count: 89, percentage: 8.9 },
    { type: 'application/javascript', count: 67, percentage: 6.7 },
    { type: 'application/pdf', count: 31, percentage: 3.1 }
  ];

  const recentCaptures = [
    { date: '2023-12-15', time: '14:23:45', status: '200', size: '24.5 KB', url: '/index.html' },
    { date: '2023-12-14', time: '09:15:23', status: '200', size: '18.2 KB', url: '/products/index.html' },
    { date: '2023-12-13', time: '16:42:10', status: '200', size: '15.8 KB', url: '/news/index.html' },
    { date: '2023-12-12', time: '11:30:55', status: '200', size: '22.1 KB', url: '/about/index.html' },
    { date: '2023-12-11', time: '13:45:33', status: '200', size: '8.9 KB', url: '/contact.html' },
    { date: '2023-12-10', time: '10:20:18', status: '200', size: '12.4 KB', url: '/about/team.html' },
    { date: '2023-12-09', time: '15:55:42', status: '404', size: '2.1 KB', url: '/old-page.html' },
    { date: '2023-12-08', time: '08:12:05', status: '200', size: '45.3 KB', url: '/products/brochure.pdf' },
    { date: '2023-12-07', time: '12:38:27', status: '200', size: '156.7 KB', url: '/images/banner.jpg' },
    { date: '2023-12-06', time: '17:25:14', status: '200', size: '3.2 KB', url: '/css/style.css' }
  ];

  const yearlyStats = [
    { year: '2023', captures: 89 },
    { year: '2022', captures: 156 },
    { year: '2021', captures: 134 },
    { year: '2020', captures: 178 },
    { year: '2019', captures: 145 },
    { year: '2018', captures: 123 },
    { year: '2017', captures: 98 },
    { year: '2016', captures: 76 }
  ];

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
          <div className="text-2xl font-bold text-primary">1,247</div>
          <div className="text-sm text-muted-foreground">Total Snapshots</div>
        </div>
        <div className="bg-card border border-border p-4 text-center">
          <div className="text-2xl font-bold text-primary">23</div>
          <div className="text-sm text-muted-foreground">Unique URLs</div>
        </div>
        <div className="bg-card border border-border p-4 text-center">
          <div className="text-2xl font-bold text-primary">24y</div>
          <div className="text-sm text-muted-foreground">Time Span</div>
        </div>
        <div className="bg-card border border-border p-4 text-center">
          <div className="text-2xl font-bold text-primary">6</div>
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
            <Calendar className="w-5 h-5" />
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
              <div className="text-sm text-muted-foreground">March 15, 1999</div>
            </div>
            <div className="text-right">
              <div className="font-semibold">Last Capture</div>
              <div className="text-sm text-muted-foreground">December 15, 2023</div>
            </div>
          </div>
          <div className="text-center text-sm text-muted-foreground">
            <strong>24 years</strong> of continuous archiving
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      {decodedUrl && (
        <div className="flex justify-center space-x-4">
          <Link to={`/calendar/${encodeURIComponent(decodedUrl)}`} className="archive-button">
            Calendar View
          </Link>
          <Link to={`/sitemap/${encodeURIComponent(decodedUrl)}`} className="archive-button">
            Site Map
          </Link>
          <Link to={`/urls/${encodeURIComponent(decodedUrl)}`} className="archive-button">
            URL List
          </Link>
        </div>
      )}
    </div>
  );
};

export default Summary;