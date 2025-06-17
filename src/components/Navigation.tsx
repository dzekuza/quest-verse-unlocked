
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Home, Trophy, User, Settings, Menu, X, Target } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { path: '/', label: 'Dashboard', icon: Home },
    { path: '/leaderboard', label: 'Leaderboard', icon: Trophy },
    { path: '/profile', label: 'Profile', icon: User },
    { path: '/admin', label: 'Admin', icon: Settings }
  ];

  const isActivePath = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <Card className="hidden md:block fixed top-6 left-6 bg-white/10 backdrop-blur-lg border-white/20 z-50">
        <div className="p-4">
          <div className="flex items-center space-x-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
              <Target className="w-5 h-5 text-white" />
            </div>
            <div className="text-white font-bold">QuestHub</div>
          </div>
          
          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = isActivePath(item.path);
              
              return (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start text-left ${
                      isActive
                        ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600'
                        : 'text-purple-200 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {item.label}
                    {item.path === '/admin' && (
                      <Badge className="ml-auto bg-red-500/20 text-red-400 text-xs">
                        Admin
                      </Badge>
                    )}
                  </Button>
                </Link>
              );
            })}
          </nav>
        </div>
      </Card>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        {/* Mobile Header */}
        <Card className="fixed top-0 left-0 right-0 bg-white/10 backdrop-blur-lg border-white/20 z-50 rounded-none border-x-0 border-t-0">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                <Target className="w-5 h-5 text-white" />
              </div>
              <div className="text-white font-bold">QuestHub</div>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:bg-white/10"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </Card>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <Card className="fixed top-16 left-0 right-0 bg-white/10 backdrop-blur-lg border-white/20 z-40 rounded-none border-x-0">
            <nav className="p-4 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = isActivePath(item.path);
                
                return (
                  <Link 
                    key={item.path} 
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Button
                      variant="ghost"
                      className={`w-full justify-start text-left ${
                        isActive
                          ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600'
                          : 'text-purple-200 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      {item.label}
                      {item.path === '/admin' && (
                        <Badge className="ml-auto bg-red-500/20 text-red-400 text-xs">
                          Admin
                        </Badge>
                      )}
                    </Button>
                  </Link>
                );
              })}
            </nav>
          </Card>
        )}
      </div>
    </>
  );
};

export default Navigation;
