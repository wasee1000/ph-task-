import React, { useState, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Provider/Authproviders';
import { toast } from 'react-toastify';

const Navbar = () => {
  const { user, logout, loading } = useContext(AuthContext); // Changed logOut to logout
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
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
      await logout();
      setIsDropdownOpen(false);
      setIsMobileMenuOpen(false);
      navigate('/login');
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Logout failed:', error);
      toast.error('Failed to log out. Please try again.');
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <nav className="fixed w-full top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Website Name */}
          <div className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-sm opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
              <img
                src="/assets/logo.png" // Update to actual logo path
                alt="EventHub Logo"
                className="relative h-10 w-10 rounded-full border-2 border-gray-200 transform group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-blue-500 hover:to-purple-500 transition-all duration-300">
              EventHub
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `relative px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:bg-gray-100 hover:shadow-lg hover:scale-105 ${
                  isActive ? 'text-blue-600 shadow-blue-300/20 shadow-md bg-gray-100' : 'text-gray-700 hover:text-blue-600'
                }`
              }
            >
              <span className="relative z-10">Home</span>
            </NavLink>
            <NavLink
              to="/events"
              className={({ isActive }) =>
                `relative px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:bg-gray-100 hover:shadow-lg hover:scale-105 ${
                  isActive ? 'text-blue-600 shadow-blue-300/20 shadow-md bg-gray-100' : 'text-gray-700 hover:text-blue-600'
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
                    `relative px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:bg-gray-100 hover:shadow-lg hover:scale-105 ${
                      isActive ? 'text-blue-600 shadow-blue-300/20 shadow-md bg-gray-100' : 'text-gray-700 hover:text-blue-600'
                    }`
                  }
                >
                  <span className="relative z-10">Add Event</span>
                </NavLink>
                <NavLink
                  to="/my-events"
                  className={({ isActive }) =>
                    `relative px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:bg-gray-100 hover:shadow-lg hover:scale-105 ${
                      isActive ? 'text-blue-600 shadow-blue-300/20 shadow-md bg-gray-100' : 'text-gray-700 hover:text-blue-600'
                    }`
                  }
                >
                  <span className="relative z-10">My Events</span>
                </NavLink>
              </>
            )}
            {loading ? (
              <span className="text-gray-600 px-4">Loading...</span>
            ) : !user ? (
              <NavLink
                to="/login"
                className="ml-4 px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-medium hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
              >
                Sign In
              </NavLink>
            ) : (
              <div className="relative ml-4">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-sm opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <img
                    src={user.photoURL || 'https://via.placeholder.com/40'}
                    alt="Profile"
                    className="relative h-10 w-10 rounded-full cursor-pointer border-2 border-gray-200 transform hover:scale-110 transition-all duration-300 shadow-lg"
                    onClick={toggleDropdown}
                    aria-label="Toggle user menu"
                  />
                  <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
                </div>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden animate-in slide-in-from-top-2 duration-200">
                    <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50">
                      <div className="font-semibold text-sm text-gray-900">{user.name || 'User'}</div>
                      <div className="text-xs text-gray-600">{user.email}</div>
                    </div>
                    <button
                      onClick={handleLogout}
                      disabled={isLoggingOut}
                      className="block w-full text-left p-4 hover:bg-gray-100 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                      aria-label="Logout"
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
              className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
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
                  d={isMobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div
            className={`md:hidden border-t border-gray-200 bg-white/80 backdrop-blur-sm transition-all duration-300 ease-in-out ${
              isMobileMenuOpen ? 'opacity-100 max-h-screen' : 'opacity-0 max-h-0 overflow-hidden'
            }`}
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-lg font-medium transition-colors duration-200 ${
                    isActive ? 'text-blue-600 bg-gray-100' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100'
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
                    isActive ? 'text-blue-600 bg-gray-100' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100'
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
                        isActive ? 'text-blue-600 bg-gray-100' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100'
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
                        isActive ? 'text-blue-600 bg-gray-100' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100'
                      }`
                    }
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    My Events
                  </NavLink>
                </>
              )}
              {loading ? (
                <span className="block px-3 py-2 text-gray-600">Loading...</span>
              ) : !user ? (
                <NavLink
                  to="/login"
                  className="block px-3 py-2 mt-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium text-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign In
                </NavLink>
              ) : (
                <div className="pt-2 border-t border-gray-200 mt-2">
                  <div className="px-3 py-2 text-sm text-gray-600">
                    Signed in as <span className="text-gray-900 font-medium">{user.name || 'User'}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className="block w-full text-left px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Logout"
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