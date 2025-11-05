import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import { FaSearch, FaGlobe, FaUserCog, FaArrowRight, FaUser, FaEnvelope } from 'react-icons/fa';

const Navbar = () => {
  const { navigate, token, setInput, input } = useAppContext();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
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
  };

  return (
    <>
      {/* Separate Fixed About & Contact Buttons - Circular, Right Side Middle */}
      <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-50 flex flex-col space-y-3">
        {/* About Button */}
        <motion.button
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate('/about')}
          className="group relative p-3 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/40 dark:border-gray-600/40 hover:bg-white/90 dark:hover:bg-gray-700/90 transition-all duration-200 shadow-lg"
        >
          {/* 3D Bottom Shadow */}
          <div className="absolute inset-0 rounded-full translate-y-1.5 -z-10 blur-sm opacity-40 dark:opacity-50 bg-gray-400/30 dark:bg-black/40 group-hover:translate-y-1 group-hover:opacity-30 transition-all" />
          
          <FaUser className="w-4 h-4 text-gray-700 dark:text-gray-300 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors" />

          {/* Tooltip */}
          <div className="absolute right-full top-1/2 transform -translate-y-1/2 mr-3 bg-gray-900/90 dark:bg-gray-700/90 text-white text-xs py-2 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap backdrop-blur-sm border border-gray-600/30">
            About Page
            {/* Tooltip arrow */}
            <div className="absolute top-1/2 left-0 transform -translate-x-1 -translate-y-1/2 w-2 h-2 bg-gray-900/90 dark:bg-gray-700/90 rotate-45" />
          </div>
        </motion.button>

        {/* Contact Button */}
        <motion.button
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate('/contact')}
          className="group relative p-3 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/40 dark:border-gray-600/40 hover:bg-white/90 dark:hover:bg-gray-700/90 transition-all duration-200 shadow-lg"
        >
          {/* 3D Bottom Shadow */}
          <div className="absolute inset-0 rounded-full translate-y-1.5 -z-10 blur-sm opacity-40 dark:opacity-50 bg-gray-400/30 dark:bg-black/40 group-hover:translate-y-1 group-hover:opacity-30 transition-all" />
          
          <FaEnvelope className="w-4 h-4 text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />

          {/* Tooltip */}
          <div className="absolute right-full top-1/2 transform -translate-y-1/2 mr-3 bg-gray-900/90 dark:bg-gray-700/90 text-white text-xs py-2 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap backdrop-blur-sm border border-gray-600/30">
            Contact Page
            {/* Tooltip arrow */}
            <div className="absolute top-1/2 left-0 transform -translate-x-1 -translate-y-1/2 w-2 h-2 bg-gray-900/90 dark:bg-gray-700/90 rotate-45" />
          </div>
        </motion.button>
      </div>

      {/* Main Navbar */}
      <AnimatePresence>
        {isVisible && (
          <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            className="fixed top-4 left-1/2 transform -translate-x-1/2 z-40 w-[90%] max-w-3xl"
          >
            {/* Main Container - Universal Glass */}
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-2xl rounded-2xl border border-white/40 dark:border-gray-600/40 shadow-2xl dark:shadow-2xl dark:shadow-black/20">
              {/* 3D Bottom Shadow */}
              <div className="absolute inset-0 rounded-2xl translate-y-2 -z-10 blur-md opacity-30 dark:opacity-40 bg-gray-400/20 dark:bg-black/40" />

              <div className="flex items-center justify-between p-3 sm:p-4 relative">

                {/* Logo */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center space-x-2 sm:space-x-3 cursor-pointer flex-shrink-0 group"
                  onClick={() => navigate('/')}
                >
                  <div className="relative">
                    {/* Logo Background Glass */}
                    <div className="absolute inset-0 bg-white/50 dark:bg-gray-800/50 rounded-lg backdrop-blur-sm border border-white/40 dark:border-gray-600/40" />

                    {/* Logo */}
                    <div className="relative p-2">
                      <img
                        src="/logo.svg"
                        alt="Blogni Logo"
                        className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:scale-110 transition-transform dark:brightness-90"
                      />
                    </div>
                  </div>

                  {/* Logo Text */}
                  <span className="hidden sm:block bg-gradient-to-r from-green-500 via-teal-400 to-blue-500 bg-clip-text text-transparent font-black text-lg tracking-wider">
                    BLOGNI
                  </span>

                </motion.div>

                {/* Search Bar */}
                <form onSubmit={handleSearch} className="flex-1 mx-3 sm:mx-4 lg:mx-6">
                  <div className="relative">
                    {/* Search Glass Background */}
                    <div className="absolute inset-0 bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg rounded-xl border border-white/40 dark:border-gray-600/40" />

                    {/* Search 3D Shadow */}
                    <div className="absolute inset-0 rounded-xl translate-y-1 -z-10 blur-sm opacity-20 dark:opacity-30 bg-gray-400/20 dark:bg-black/40" />

                    <input
                      ref={inputRef}
                      type="text"
                      placeholder="Search blog ...."
                      className="relative w-full pl-4 pr-12 py-3 bg-transparent border-none rounded-xl
                   text-blue-600 dark:text-blue-400
                   placeholder-gray-500 dark:placeholder-gray-400
                   focus:outline-none focus:ring-2 focus:ring-blue-400/40 dark:focus:ring-blue-300/30
                   text-sm font-medium"
                    />

                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 w-7 h-7 
                   bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm rounded-lg 
                   flex items-center justify-center border border-white/40 dark:border-gray-600/40 
                   hover:bg-white dark:hover:bg-gray-600 transition-colors"
                    >
                      <FaSearch className="w-3 h-3 text-gray-600 dark:text-gray-300" />
                    </motion.button>
                  </div>
                </form>

                {/* Action Buttons */}
                <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">

                  {/* Globe Button */}
                  <motion.a
                    whileHover={{ scale: 1.05, y: -1 }}
                    whileTap={{ scale: 0.95 }}
                    href="https://sahilfullstackportfolio.netlify.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative p-2 sm:px-3 sm:py-2 rounded-xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/40 dark:border-gray-600/40 hover:bg-white/80 dark:hover:bg-gray-700/80 transition-colors"
                  >
                    {/* Button 3D Shadow */}
                    <div className="absolute inset-0 rounded-xl translate-y-1 -z-10 blur-sm opacity-20 dark:opacity-30 bg-gray-400/20 dark:bg-black/40 group-hover:translate-y-0.5 group-hover:opacity-15 transition-all" />

                    <div className="relative flex items-center space-x-2">
                      <FaGlobe className="w-3.5 h-3.5 text-gray-700 dark:text-gray-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors" />
                      <span className="hidden sm:block text-gray-700 dark:text-gray-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 font-semibold text-xs transition-colors">
                        Explore
                      </span>
                    </div>
                  </motion.a>

                  {/* Admin Button */}
                  <motion.button
                    whileHover={{ scale: 1.05, y: -1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate('/admin')}
                    className="group relative p-2 sm:px-3 sm:py-2 rounded-xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/40 dark:border-gray-600/40 hover:bg-white/80 dark:hover:bg-gray-700/80 transition-colors"
                    style={{
                      boxShadow: token ? '0 0 0 1px #10b981, 0 0 20px #10b98140' : 'none'
                    }}
                  >
                    {/* Button 3D Shadow */}
                    <div className="absolute inset-0 rounded-xl translate-y-1 -z-10 blur-sm opacity-20 dark:opacity-30 bg-gray-400/20 dark:bg-black/40 group-hover:translate-y-0.5 group-hover:opacity-15 transition-all" />

                    <div className="relative flex items-center space-x-2">
                      <FaUserCog className="w-3.5 h-3.5 text-gray-700 dark:text-gray-300 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors" />

                      <span className="hidden sm:block text-gray-700 dark:text-gray-300 group-hover:text-amber-600 dark:group-hover:text-amber-400 font-semibold text-xs transition-colors">
                        {token ? 'Control' : 'Access'}
                      </span>

                      <motion.span
                        className="hidden sm:block"
                        animate={token ? { x: [0, 2, 0], rotate: [0, 8, -8, 0] } : {}}
                        transition={{ repeat: token ? Infinity : 0, duration: 2 }}
                      >
                        <FaArrowRight className="w-2.5 h-2.5 text-gray-700 dark:text-gray-300 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors" />
                      </motion.span>
                    </div>
                  </motion.button>
                </div>
              </div>

              {/* Subtle Bottom Glow */}
              <div className="absolute bottom-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-gray-300/50 dark:via-gray-600/50 to-transparent" />
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;