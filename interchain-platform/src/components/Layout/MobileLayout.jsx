import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const MobileLayout = ({ children }) => {
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', path: '/dashboard', icon: '📊' },
    { name: 'Mobile', path: '/mobile', icon: '📱' },
    { name: 'Integration', path: '/integration', icon: '🔄' },
    { name: 'Profile', path: '/profile', icon: '👤' },
  ];

  return (
    <div className="flex flex-col h-screen">
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
      
      {/* Bottom Navigation */}
      <nav className="bg-white border-t">
        <div className="flex justify-around">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex flex-col items-center p-4 ${
                location.pathname === item.path
                  ? 'text-blue-600'
                  : 'text-gray-600'
              }`}
            >
              <span className="text-2xl">{item.icon}</span>
              <span className="text-xs mt-1">{item.name}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default MobileLayout;
