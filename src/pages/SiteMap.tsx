import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronRight, ChevronDown, Folder, File, ExternalLink } from "lucide-react";

interface SiteNode {
  name: string;
  path: string;
  type: 'folder' | 'file';
  children?: SiteNode[];
  snapshots?: number;
  lastSnapshot?: string;
}

const SiteMap = () => {
  const { url } = useParams();
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(['/']));

  const decodedUrl = url ? decodeURIComponent(url) : '';

  // Mock site structure data
  const mockSiteData: SiteNode = {
    name: decodedUrl || 'example.com',
    path: '/',
    type: 'folder',
    snapshots: 1247,
    lastSnapshot: '2023-12-15',
    children: [
      {
        name: 'index.html',
        path: '/index.html',
        type: 'file',
        snapshots: 156,
        lastSnapshot: '2023-12-15'
      },
      {
        name: 'about',
        path: '/about',
        type: 'folder',
        snapshots: 89,
        lastSnapshot: '2023-12-10',
        children: [
          {
            name: 'index.html',
            path: '/about/index.html',
            type: 'file',
            snapshots: 45,
            lastSnapshot: '2023-12-10'
          },
          {
            name: 'team.html',
            path: '/about/team.html',
            type: 'file',
            snapshots: 23,
            lastSnapshot: '2023-11-28'
          },
          {
            name: 'history.html',
            path: '/about/history.html',
            type: 'file',
            snapshots: 21,
            lastSnapshot: '2023-10-15'
          }
        ]
      },
      {
        name: 'products',
        path: '/products',
        type: 'folder',
        snapshots: 342,
        lastSnapshot: '2023-12-14',
        children: [
          {
            name: 'index.html',
            path: '/products/index.html',
            type: 'file',
            snapshots: 78,
            lastSnapshot: '2023-12-14'
          },
          {
            name: 'software',
            path: '/products/software',
            type: 'folder',
            snapshots: 156,
            lastSnapshot: '2023-12-12',
            children: [
              {
                name: 'index.html',
                path: '/products/software/index.html',
                type: 'file',
                snapshots: 89,
                lastSnapshot: '2023-12-12'
              },
              {
                name: 'download.html',
                path: '/products/software/download.html',
                type: 'file',
                snapshots: 67,
                lastSnapshot: '2023-12-01'
              }
            ]
          },
          {
            name: 'services',
            path: '/products/services',
            type: 'folder',
            snapshots: 108,
            lastSnapshot: '2023-11-30',
            children: [
              {
                name: 'consulting.html',
                path: '/products/services/consulting.html',
                type: 'file',
                snapshots: 54,
                lastSnapshot: '2023-11-30'
              },
              {
                name: 'support.html',
                path: '/products/services/support.html',
                type: 'file',
                snapshots: 54,
                lastSnapshot: '2023-11-25'
              }
            ]
          }
        ]
      },
      {
        name: 'news',
        path: '/news',
        type: 'folder',
        snapshots: 234,
        lastSnapshot: '2023-12-13',
        children: [
          {
            name: 'index.html',
            path: '/news/index.html',
            type: 'file',
            snapshots: 89,
            lastSnapshot: '2023-12-13'
          },
          {
            name: '2023',
            path: '/news/2023',
            type: 'folder',
            snapshots: 145,
            lastSnapshot: '2023-12-13',
            children: [
              {
                name: 'announcement.html',
                path: '/news/2023/announcement.html',
                type: 'file',
                snapshots: 67,
                lastSnapshot: '2023-12-13'
              },
              {
                name: 'updates.html',
                path: '/news/2023/updates.html',
                type: 'file',
                snapshots: 78,
                lastSnapshot: '2023-12-01'
              }
            ]
          }
        ]
      },
      {
        name: 'contact.html',
        path: '/contact.html',
        type: 'file',
        snapshots: 67,
        lastSnapshot: '2023-11-20'
      },
      {
        name: 'sitemap.xml',
        path: '/sitemap.xml',
        type: 'file',
        snapshots: 23,
        lastSnapshot: '2023-10-15'
      },
      {
        name: 'robots.txt',
        path: '/robots.txt',
        type: 'file',
        snapshots: 12,
        lastSnapshot: '2023-08-10'
      }
    ]
  };

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
            to={`/calendar/${encodeURIComponent(decodedUrl + node.path)}`}
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
          {renderNode(mockSiteData)}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-card border border-border p-4 text-center">
          <div className="text-2xl font-bold text-primary">1,247</div>
          <div className="text-sm text-muted-foreground">Total Snapshots</div>
        </div>
        <div className="bg-card border border-border p-4 text-center">
          <div className="text-2xl font-bold text-primary">23</div>
          <div className="text-sm text-muted-foreground">Unique Paths</div>
        </div>
        <div className="bg-card border border-border p-4 text-center">
          <div className="text-2xl font-bold text-primary">Dec 15, 2023</div>
          <div className="text-sm text-muted-foreground">Last Capture</div>
        </div>
      </div>

      {/* Navigation Links */}
      {decodedUrl && (
        <div className="flex justify-center space-x-4">
          <Link to={`/calendar/${encodeURIComponent(decodedUrl)}`} className="archive-button">
            Calendar View
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

export default SiteMap;