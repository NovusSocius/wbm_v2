import { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { ChevronRight, ChevronDown, Folder, File, ExternalLink } from "lucide-react";
import { useUrlState } from "@/context/UrlContext";
import { getWebsiteData, SiteNode } from "@/data/mockWebsiteData";

const SiteMap = () => {
  const { url: paramUrl } = useParams();
  const location = useLocation();
  const { url, setUrl } = useUrlState();
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(['/']));

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

  const siteData = websiteData?.siteStructure;

  const toggleNode = (path: string) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(path)) {
      newExpanded.delete(path);
    } else {
      newExpanded.add(path);
    }
    setExpandedNodes(newExpanded);
  };

  const renderNode = (node: SiteNode, level: number = 0) => {
    const isExpanded = expandedNodes.has(node.path);
    const hasChildren = node.children && node.children.length > 0;

    return (
      <div key={node.path}>
        <div
          className="flex items-center space-x-2 py-1 hover:bg-accent cursor-pointer"
          style={{ paddingLeft: `${level * 20 + 8}px` }}
          onClick={() => hasChildren && toggleNode(node.path)}
        >
          {hasChildren ? (
            isExpanded ? (
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            ) : (
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            )
          ) : (
            <div className="w-4 h-4" />
          )}

          {node.type === 'folder' ? (
            <Folder className="w-4 h-4 text-primary" />
          ) : (
            <File className="w-4 h-4 text-muted-foreground" />
          )}

          <span className="flex-1 text-sm font-mono">{node.name}</span>

          <span className="text-xs text-muted-foreground">
            {node.snapshots} snapshot{node.snapshots !== 1 ? 's' : ''}
          </span>

          <span className="text-xs text-muted-foreground">
            {node.lastSnapshot}
          </span>

          <Link
            to={`/calendar?url=${encodeURIComponent(decodedUrl)}`}
            className="text-primary hover:underline text-xs"
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink className="w-3 h-3" />
          </Link>
        </div>

        {hasChildren && isExpanded && (
          <div>
            {node.children!.map(child => renderNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="archive-header">Site Map</h1>
        {decodedUrl && (
          <p className="text-sm text-muted-foreground font-mono">
            Showing site structure for: <span className="text-primary">{decodedUrl}</span>
          </p>
        )}
      </div>

      {/* Site Structure */}
      <div className="bg-card border border-border">
        <div className="border-b border-border p-4">
          <div className="grid grid-cols-4 gap-4 text-sm font-bold text-muted-foreground">
            <span>Path</span>
            <span></span>
            <span>Snapshots</span>
            <span>Last Captured</span>
          </div>
        </div>

        <div className="p-2">
          {siteData && renderNode(siteData)}
        </div>
      </div>

      {/* Summary Stats */}
      {websiteData && (
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-card border border-border p-4 text-center">
            <div className="text-2xl font-bold text-primary">{websiteData.totalSnapshots.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Total Snapshots</div>
          </div>
          <div className="bg-card border border-border p-4 text-center">
            <div className="text-2xl font-bold text-primary">{websiteData.uniqueUrls}</div>
            <div className="text-sm text-muted-foreground">Unique Paths</div>
          </div>
          <div className="bg-card border border-border p-4 text-center">
            <div className="text-2xl font-bold text-primary">{websiteData.lastCapture}</div>
            <div className="text-sm text-muted-foreground">Last Capture</div>
          </div>
        </div>
      )}

      {/* Navigation Links */}
      {decodedUrl && (
        <div className="flex justify-center space-x-4">
          <Link to={`/calendar?url=${encodeURIComponent(decodedUrl)}`} className="archive-button">
            Calendar View
          </Link>
          <Link to={`/urls?url=${encodeURIComponent(decodedUrl)}`} className="archive-button">
            URL List
          </Link>
          <Link to={`/summary?url=${encodeURIComponent(decodedUrl)}`} className="archive-button">
            Summary
          </Link>
        </div>
      )}
    </div>
  );
};

export default SiteMap;
