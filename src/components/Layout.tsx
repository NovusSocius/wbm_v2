import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold text-primary">
              Internet Archive: Wayback Machine
            </Link>
            <nav className="flex space-x-6 text-sm">
              <Link 
                to="/" 
                className={`archive-link ${location.pathname === '/' ? 'font-bold' : ''}`}
              >
                Home
              </Link>
              <Link 
                to="/collections" 
                className={`archive-link ${location.pathname === '/collections' ? 'font-bold' : ''}`}
              >
                Collections
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card mt-16">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          <p>Internet Archive • Wayback Machine</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;