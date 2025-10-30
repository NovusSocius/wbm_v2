export interface URLEntry {
  url: string;
  snapshots: number;
  firstCapture: string;
  lastCapture: string;
  mimeType: string;
  status: string;
}

export interface SiteNode {
  name: string;
  path: string;
  type: 'folder' | 'file';
  children?: SiteNode[];
  snapshots?: number;
  lastSnapshot?: string;
}

export interface WebsiteData {
  totalSnapshots: number;
  uniqueUrls: number;
  timeSpan: string;
  mimeTypes: Array<{
    type: string;
    count: number;
    percentage: number;
  }>;
  yearlyStats: Array<{
    year: string;
    captures: number;
  }>;
  recentCaptures: Array<{
    date: string;
    time: string;
    status: string;
    size: string;
    url: string;
  }>;
  firstCapture: string;
  lastCapture: string;
  siteStructure: SiteNode;
  urls: URLEntry[];
}

export const websiteDatabase: Record<string, WebsiteData> = {
  'example.com': {
    totalSnapshots: 1247,
    uniqueUrls: 23,
    timeSpan: '24y',
    mimeTypes: [
      { type: 'text/html', count: 456, percentage: 45.6 },
      { type: 'image/jpeg', count: 234, percentage: 23.4 },
      { type: 'image/png', count: 123, percentage: 12.3 },
      { type: 'text/css', count: 89, percentage: 8.9 },
      { type: 'application/javascript', count: 67, percentage: 6.7 },
      { type: 'application/pdf', count: 31, percentage: 3.1 }
    ],
    yearlyStats: [
      { year: '2023', captures: 89 },
      { year: '2022', captures: 156 },
      { year: '2021', captures: 134 },
      { year: '2020', captures: 178 },
      { year: '2019', captures: 145 },
      { year: '2018', captures: 123 },
      { year: '2017', captures: 98 },
      { year: '2016', captures: 76 }
    ],
    recentCaptures: [
      { date: '2023-12-15', time: '14:23:45', status: '200', size: '24.5 KB', url: '/index.html' },
      { date: '2023-12-14', time: '09:15:23', status: '200', size: '18.2 KB', url: '/products/index.html' },
      { date: '2023-12-13', time: '16:42:10', status: '200', size: '15.8 KB', url: '/news/index.html' },
      { date: '2023-12-12', time: '11:30:55', status: '200', size: '22.1 KB', url: '/about/index.html' },
      { date: '2023-12-11', time: '13:45:33', status: '200', size: '8.9 KB', url: '/contact.html' }
    ],
    firstCapture: 'March 15, 1999',
    lastCapture: 'December 15, 2023',
    siteStructure: {
      name: 'example.com',
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
            }
          ]
        },
        {
          name: 'contact.html',
          path: '/contact.html',
          type: 'file',
          snapshots: 67,
          lastSnapshot: '2023-11-20'
        }
      ]
    },
    urls: [
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
        url: '/products/index.html',
        snapshots: 78,
        firstCapture: '2000-08-05',
        lastCapture: '2023-12-14',
        mimeType: 'text/html',
        status: '200'
      },
      {
        url: '/contact.html',
        snapshots: 67,
        firstCapture: '2000-12-05',
        lastCapture: '2023-11-20',
        mimeType: 'text/html',
        status: '200'
      }
    ]
  },
  'github.com': {
    totalSnapshots: 2456,
    uniqueUrls: 89,
    timeSpan: '15y',
    mimeTypes: [
      { type: 'text/html', count: 1200, percentage: 48.9 },
      { type: 'application/javascript', count: 456, percentage: 18.6 },
      { type: 'text/css', count: 350, percentage: 14.3 },
      { type: 'image/png', count: 280, percentage: 11.4 },
      { type: 'image/svg+xml', count: 170, percentage: 6.9 }
    ],
    yearlyStats: [
      { year: '2023', captures: 245 },
      { year: '2022', captures: 289 },
      { year: '2021', captures: 267 },
      { year: '2020', captures: 234 },
      { year: '2019', captures: 198 },
      { year: '2018', captures: 156 },
      { year: '2017', captures: 134 },
      { year: '2016', captures: 98 }
    ],
    recentCaptures: [
      { date: '2023-12-15', time: '18:45:23', status: '200', size: '156.7 KB', url: '/' },
      { date: '2023-12-14', time: '12:30:15', status: '200', size: '89.2 KB', url: '/explore' },
      { date: '2023-12-13', time: '09:15:42', status: '200', size: '234.8 KB', url: '/trending' }
    ],
    firstCapture: 'April 10, 2008',
    lastCapture: 'December 15, 2023',
    siteStructure: {
      name: 'github.com',
      path: '/',
      type: 'folder',
      snapshots: 2456,
      lastSnapshot: '2023-12-15',
      children: [
        {
          name: 'index.html',
          path: '/',
          type: 'file',
          snapshots: 245,
          lastSnapshot: '2023-12-15'
        },
        {
          name: 'explore',
          path: '/explore',
          type: 'file',
          snapshots: 189,
          lastSnapshot: '2023-12-14'
        },
        {
          name: 'trending',
          path: '/trending',
          type: 'file',
          snapshots: 156,
          lastSnapshot: '2023-12-13'
        }
      ]
    },
    urls: [
      {
        url: '/',
        snapshots: 245,
        firstCapture: '2008-04-10',
        lastCapture: '2023-12-15',
        mimeType: 'text/html',
        status: '200'
      },
      {
        url: '/explore',
        snapshots: 189,
        firstCapture: '2009-06-15',
        lastCapture: '2023-12-14',
        mimeType: 'text/html',
        status: '200'
      }
    ]
  }
};

export const getWebsiteData = (url: string): WebsiteData | null => {
  const cleanUrl = url.replace(/^https?:\/\//, '').replace(/\/$/, '');
  return websiteDatabase[cleanUrl] || null;
};

export const generateCalendarData = (url: string, year: number, month: number) => {
  const websiteData = getWebsiteData(url);
  if (!websiteData) return {};

  const daysInMonth = new Date(year, month, 0).getDate();
  const data: { [key: string]: number } = {};
  
  // Generate different patterns based on website
  const multiplier = websiteData.totalSnapshots > 2000 ? 2 : 1;
  
  for (let day = 1; day <= daysInMonth; day++) {
    const snapshots = Math.random() > 0.4 ? Math.floor(Math.random() * 15 * multiplier) + 1 : 0;
    if (snapshots > 0) {
      data[`${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`] = snapshots;
    }
  }
  return data;
};