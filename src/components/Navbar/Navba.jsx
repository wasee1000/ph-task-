 
import React, { useState, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Provider/Authproviders';

const Navbar = () => {
  const { user, logOut, loading } = useContext(AuthContext); // Corrected to logOut and added loading
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false); // Track logout loading state
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logOut(); // Call Firebase logout
      setIsDropdownOpen(false);
      setIsMobileMenuOpen(false);
      navigate('/login'); // Redirect to login page after logout
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <nav className="fixed w-full top-0 z-50 bg-gradient-to-r from-purple-900/95 via-blue-900/95 to-indigo-900/95 backdrop-blur-lg border-b border-white/10 shadow-2xl">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Website Name */}
          <div className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-violet-500 rounded-full blur-sm opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
              <img
                src="https://via.placeholder.com/40"
                alt="Logo"
                className="relative h-10 w-10 rounded-full border-2 border-white/20 transform group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-pink-400 via-purple-300 to-blue-300 bg-clip-text text-transparent hover:from-pink-300 hover:via-purple-200 hover:to-blue-200 transition-all duration-300">
              EventHub
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `relative px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:bg-white/10 hover:backdrop-blur-sm hover:shadow-lg hover:scale-105 ${
                  isActive 
                    ? 'text-cyan-300 shadow-cyan-300/20 shadow-md bg-white/10' 
                    : 'text-white/90 hover:text-white'
                }`
              }
            >
              <span className="relative z-10">Home</span>
            </NavLink>
            
            <NavLink
              to="/events"
              className={({ isActive }) =>
                `relative px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:bg-white/10 hover:backdrop-blur-sm hover:shadow-lg hover:scale-105 ${
                  isActive 
                    ? 'text-cyan-300 shadow-cyan-300/20 shadow-md bg-white/10' 
                    : 'text-white/90 hover:text-white'
                }`
              }
            >
              <span className="relative z-10">Events</span>
            </NavLink>

            {user && !loading && (
              <>
                <NavLink
                  to="/add-event"
                  className={({ isActive }) =>
                    `relative px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:bg-white/10 hover:backdrop-blur-sm hover:shadow-lg hover:scale-105 ${
                      isActive 
                        ? 'text-cyan-300 shadow-cyan-300/20 shadow-md bg-white/10' 
                        : 'text-white/90 hover:text-white'
                    }`
                  }
                >
                  <span className="relative z-10">Add Event</span>
                </NavLink>
                
                <NavLink
                  to="/my-events"
                  className={({ isActive }) =>
                    `relative px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:bg-white/10 hover:backdrop-blur-sm hover:shadow-lg hover:scale-105 ${
                      isActive 
                        ? 'text-cyan-300 shadow-cyan-300/20 shadow-md bg-white/10' 
                        : 'text-white/90 hover:text-white'
                    }`
                  }
                >
                  <span className="relative z-10">My Events</span>
                </NavLink>
              </>
            )}

            {loading ? (
              <span className="text-white/70 px-4">Loading...</span>
            ) : !user ? (
              <NavLink
                to="/login"
                className="ml-4 px-6 py-2 bg-gradient-to-r from-pink-500 to-violet-500 text-white rounded-full font-medium hover:from-pink-600 hover:to-violet-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-pink-500/25"
              >
                Sign In
              </NavLink>
            ) : (
              <div className="relative ml-4">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full blur-sm opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <img
                    src={user.photoURL || 'https://via.placeholder.com/40'}
                    alt="Profile"
                    className="relative h-10 w-10 rounded-full cursor-pointer border-2 border-white/30 transform hover:scale-110 transition-all duration-300 shadow-lg"
                    onClick={toggleDropdown}
                  />
                  <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
                </div>
                
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-white/10 backdrop-blur-xl text-white rounded-2xl shadow-2xl border border-white/20 overflow-hidden animate-in slide-in-from-top-2 duration-200">
                    <div className="p-4 border-b border-white/10 bg-gradient-to-r from-purple-500/20 to-pink-500/20">
                      <div className="font-semibold text-sm">{user.displayName || user.name || 'User'}</div>
                      <div className="text-xs text-white/70">{user.email}</div>
                    </div>
                    <button
                      onClick={handleLogout}
                      disabled={isLoggingOut}
                      className="block w-full text-left p-4 hover:bg-white/10 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="flex items-center space-x-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        <span>{isLoggingOut ? 'Logging out...' : 'Logout'}</span>
                      </span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-lg bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors duration-200"
            >
              <svg
                className={`w-6 h-6 transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-90' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-white/10 bg-black/20 backdrop-blur-sm animate-in slide-in-from-top-2 duration-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-lg font-medium transition-colors duration-200 ${
                    isActive 
                      ? 'text-cyan-300 bg-white/10' 
                      : 'text-white/90 hover:text-white hover:bg-white/5'
                  }`
                }
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </NavLink>
              
              <NavLink
                to="/events"
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-lg font-medium transition-colors duration-200 ${
                    isActive 
                      ? 'text-cyan-300 bg-white/10' 
                      : 'text-white/90 hover:text-white hover:bg-white/5'
                  }`
                }
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Events
              </NavLink>

              {user && !loading && (
                <>
                  <NavLink
                    to="/add-event"
                    className={({ isActive }) =>
                      `block px-3 py-2 rounded-lg font-medium transition-colors duration-200 ${
                        isActive 
                          ? 'text-cyan-300 bg-white/10' 
                          : 'text-white/90 hover:text-white hover:bg-white/5'
                      }`
                    }
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Add Event
                  </NavLink>
                  
                  <NavLink
                    to="/my-events"
                    className={({ isActive }) =>
                      `block px-3 py-2 rounded-lg font-medium transition-colors duration-200 ${
                        isActive 
                          ? 'text-cyan-300 bg-white/10' 
                          : 'text-white/90 hover:text-white hover:bg-white/5'
                      }`
                    }
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    My Events
                  </NavLink>
                </>
              )}

              {loading ? (
                <span className="block px-3 py-2 text-white/70">Loading...</span>
              ) : !user ? (
                <NavLink
                  to="/login"
                  className="block px-3 py-2 mt-2 bg-gradient-to-r from-pink-500 to-violet-500 text-white rounded-lg font-medium text-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign In
                </NavLink>
              ) : (
                <div className="pt-2 border-t border-white/10 mt-2">
                  <div className="px-3 py-2 text-sm text-white/70">
                    Signed in as <span className="text-white font-medium">{user.displayName || user.name || 'User'}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className="block w-full text-left px-3 py-2 text-white/90 hover:text-white hover:bg-white/5 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoggingOut ? 'Logging out...' : 'Logout'}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
 