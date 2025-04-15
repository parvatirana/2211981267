import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();

  // Function to check if a nav link is active
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-blue-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-white font-bold text-xl">Social Media Analytics</h1>
            </div>
          </div>
          <nav className="flex space-x-8">
            <Link
              to="/"
              className={`${
                isActive('/') 
                  ? 'bg-blue-700 text-white' 
                  : 'text-white hover:bg-blue-500'
              } px-3 py-2 rounded-md text-sm font-medium`}
            >
              Top Users
            </Link>
            <Link
              to="/trending"
              className={`${
                isActive('/trending') 
                  ? 'bg-blue-700 text-white' 
                  : 'text-white hover:bg-blue-500'
              } px-3 py-2 rounded-md text-sm font-medium`}
            >
              Trending Posts
            </Link>
            <Link
              to="/feed"
              className={`${
                isActive('/feed') 
                  ? 'bg-blue-700 text-white' 
                  : 'text-white hover:bg-blue-500'
              } px-3 py-2 rounded-md text-sm font-medium`}
            >
              Feed
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header; 