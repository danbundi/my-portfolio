import React, { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('home');

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/90 backdrop-blur-lg border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-cyan-600 rounded-lg flex items-center justify-center mr-3">
              <span className="text-white font-bold text-lg">{'</>'}</span>
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">
                Portfolio
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-6">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setActiveNav(item.id)}
                  className={`relative text-sm font-medium transition-colors duration-300 ${
                    activeNav === item.id
                      ? 'text-emerald-300'
                      : 'text-gray-300 hover:text-emerald-300'
                  }`}
                >
                  {item.label}
                  {activeNav === item.id && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-400 to-cyan-400"></span>
                  )}
                </a>
              ))}
            </div>
            
            <button className="px-6 py-2 bg-gradient-to-r from-emerald-600 to-cyan-600 text-white font-medium rounded-full hover:shadow-lg hover:shadow-emerald-500/30 transition-all duration-300">
              Let's Talk
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-300 hover:text-white"
            aria-label="Toggle menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-gray-900 border-t border-gray-800">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => {
                    setActiveNav(item.id);
                    setIsOpen(false);
                  }}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    activeNav === item.id
                      ? 'text-emerald-300 bg-gray-800'
                      : 'text-gray-300 hover:text-emerald-300 hover:bg-gray-800'
                  }`}
                >
                  {item.label}
                </a>
              ))}
              <button className="w-full mt-4 px-3 py-3 bg-gradient-to-r from-emerald-600 to-cyan-600 text-white font-medium rounded-md">
                Let's Talk
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;