import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import { FaSearch, FaGlobe, FaUserCog, FaArrowRight, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const { navigate, token, setInput, input } = useAppContext();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const inputRef = useRef();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleSearch = (e) => {
    e.preventDefault();
    setInput(inputRef.current.value);
    setIsSearchExpanded(false);
  };

  const toggleSearch = () => {
    setIsSearchExpanded(!isSearchExpanded);
    if (!isSearchExpanded) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            className="fixed top-2 left-1/2 transform -translate-x-1/2 z-50 w-[90%] max-w-3xl"
          >
            {/* Main Container with Enhanced Glass Effect */}
            <div className="bg-gradient-to-br from-white/20 to-gray-100/30 backdrop-blur-3xl rounded-2xl border border-white/40 shadow-2xl shadow-blue-400/10">
              <div className="flex items-center justify-between p-2 sm:p-3">
                
                {/* Logo - No Animation and No Padding */}
                <div
                  className="flex items-center space-x-2 sm:space-x-2 cursor-pointer group flex-shrink-0"
                  onClick={() => navigate('/')}
                >
                  <div className="rounded-lg">
                    <img
                      src="/logo.svg"
                      alt="Blogni Logo"
                      className="w-4 h-4 sm:w-5 sm:h-5"
                    />
                  </div>
                  {/* Logo text hidden on mobile, visible on sm and above */}
                  <span className="hidden sm:block text-transparent bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text font-black text-base sm:text-lg tracking-wider">
                    BLOGNI
                  </span>
                </div>

                {/* Expanded Search Bar - Compressed */}
                <form onSubmit={handleSearch} className="flex-1 mx-3 sm:mx-4 lg:mx-6">
                  <div className="relative">
                    {/* Background Effects */}
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-300/30 to-purple-400/30 rounded-xl blur-lg" />
                    <div className="absolute inset-0 border border-white/50 rounded-xl" />
                    
                    {/* Search Input */}
                    <input
                      ref={inputRef}
                      type="text"
                      placeholder="Explore the digital cosmos..."
                      className="relative w-full pl-3 sm:pl-4 pr-10 py-2 bg-white/40 border border-white/50 rounded-xl text-gray-800 placeholder-indigo-500/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent backdrop-blur-xl text-xs sm:text-sm font-medium"
                    />
                    
                    {/* Search Button */}
                    <button
                      type="submit"
                      className="absolute right-1.5 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-gradient-to-br from-indigo-500/90 to-purple-600/90 rounded-lg flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-md shadow-indigo-400/40 backdrop-blur-sm"
                    >
                      <FaSearch className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
                    </button>
                  </div>
                </form>

                {/* Actions - Compressed */}
                <div className="flex items-center space-x-1.5 sm:space-x-2 flex-shrink-0">
                  
                  {/* Globe Button - Enhanced Glass Effect */}
                  <motion.a
                    whileHover={{ scale: 1.05, y: -1 }}
                    whileTap={{ scale: 0.95 }}
                    href="https://sahilfullstackportfolio.netlify.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative p-1.5 sm:px-3 sm:py-2 rounded-xl overflow-hidden"
                  >
                    {/* Enhanced glass background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-300/20 via-teal-300/15 to-cyan-300/10 rounded-xl backdrop-blur-sm" />
                    <div className="absolute inset-0 border border-white/40 rounded-xl" />
                    <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent rounded-xl" />
                    
                    {/* Content */}
                    <div className="relative flex items-center space-x-1.5">
                      <FaGlobe className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-700 group-hover:text-emerald-600 transition-colors" />
                      <span className="hidden sm:block text-emerald-700 group-hover:text-emerald-600 font-semibold text-xs transition-colors">
                        Explore
                      </span>
                    </div>
                    
                    {/* Hover effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </motion.a>

                  {/* Admin Button - Enhanced Glass Effect */}
                  <motion.button
                    whileHover={{ scale: 1.05, y: -1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate('/admin')}
                    className="group relative p-1.5 sm:px-3 sm:py-2 rounded-xl overflow-hidden"
                  >
                    {/* Enhanced glass background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-300/20 via-orange-300/15 to-red-300/10 rounded-xl backdrop-blur-sm" />
                    <div className="absolute inset-0 border border-white/40 rounded-xl" />
                    <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent rounded-xl" />
                    
                    {/* Content */}
                    <div className="relative flex items-center space-x-1.5">
                      <FaUserCog className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-700 group-hover:text-amber-600 transition-colors" />
                      
                      <span className="hidden sm:block text-amber-700 group-hover:text-amber-600 font-semibold text-xs transition-colors">
                        {token ? 'Control' : 'Access'}
                      </span>
                      
                      <motion.span
                        className="hidden sm:block"
                        animate={token ? { x: [0, 2, 0], rotate: [0, 8, -8, 0] } : {}}
                        transition={{ repeat: token ? Infinity : 0, duration: 2 }}
                      >
                        <FaArrowRight className="w-2.5 h-2.5 text-amber-700" />
                      </motion.span>
                    </div>
                    
                    {/* Hover effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </motion.button>
                </div>
              </div>
              
              {/* Subtle bottom glow */}
              <div className="absolute bottom-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;