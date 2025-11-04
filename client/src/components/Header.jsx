import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.4,
    },
  },
};

const item = {
  hidden: { opacity: 0, x: -30 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 15,
    },
  },
};

const Header = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const desktopImages = ["/desktop-1.jpg", "/desktop-2.jpg", "/desktop-3.jpg"];
  const mobileImages = ["/mobile-1.jpg", "/mobile-2.jpg", "/mobile-3.jpg"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % 3);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="relative min-h-screen flex items-end overflow-hidden"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {/* Auto-scrolling Background */}
      <div className="absolute inset-0">
        {/* Desktop Images */}
        {desktopImages.map((image, index) => (
          <div
            key={`desktop-${index}`}
            className={`hidden lg:block absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 ${
              index === currentImageIndex 
                ? 'opacity-100 scale-100' 
                : 'opacity-0 scale-105'
            }`}
            style={{ backgroundImage: `url(${image})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40"></div>
          </div>
        ))}
        
        {/* Mobile Images */}
        {mobileImages.map((image, index) => (
          <div
            key={`mobile-${index}`}
            className={`lg:hidden absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 ${
              index === currentImageIndex 
                ? 'opacity-100 scale-100' 
                : 'opacity-0 scale-105'
            }`}
            style={{ backgroundImage: `url(${image})` }}
          >
            <div className="absolute inset-0 bg-black/70"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/70"></div>
          </div>
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-md lg:max-w-lg mb-12 lg:mb-16 ml-2.5"> 
          
          {/* Category & Meta - Smaller */}
          <motion.div
            variants={item}
            className="flex items-center gap-4 mb-6"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              <span className="text-white font-medium tracking-wide text-sm">DESTINATION</span>
            </div>
            <div className="h-3 w-px bg-white/30"></div>
            <div className="text-white/60 text-xs">TRAVEL GUIDE</div>
          </motion.div>

          {/* Main Content - Smaller */}
          <motion.div variants={item} className="mb-6">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white leading-tight mb-4">
              Exploring The{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-orange-200 inline-block">
                Wonders
              </span>{" "}
              Of Hiking
            </h1>
          </motion.div>

          <motion.div variants={item} className="mb-6">
            <p className="text-base text-white/80 leading-relaxed max-w-md font-light">
              An iconic landmarks, this post unveils the secrets that make this destination 
              a traveler's paradise. Discover hidden trails and breathtaking views.
            </p>
          </motion.div>

          {/* Image Navigation - Smaller */}
          <motion.div
            variants={item}
            className="flex items-center gap-3 mt-8"
          >
            <span className="text-white/60 text-xs">Explore more:</span>
            <div className="flex gap-1">
              {[0, 1, 2].map((index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-6 h-1 rounded-full transition-all duration-300 ${
                    index === currentImageIndex 
                      ? 'bg-white' 
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>
          </motion.div>

        </div>
      </div>

      {/* Author Section - Bottom Right Corner */}
      <motion.div
        variants={item}
        className="absolute right-6 bottom-6 lg:right-10 lg:bottom-10"
      >
        <div className="flex items-center gap-3 bg-black/30 backdrop-blur-sm rounded-xl p-3 border border-white/20">
          <div className="w-10 h-10 rounded-full border border-white/40 overflow-hidden">
            <img 
              src="/author.jpg" 
              alt="Theodore Reginald" 
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="text-white font-medium text-sm">Sahil</div>
            <div className="text-white/60 text-xs">New Article • just now</div>
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator - Smaller */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex flex-col items-center text-white/60">
          <span className="text-xs mb-2 tracking-wide">SCROLL</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-4 h-6 border border-white/40 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-1 bg-white/60 rounded-full mt-1"
            />
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Header;