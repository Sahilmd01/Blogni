import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  FaGithub, 
  FaTwitter, 
  FaLinkedin, 
  FaInstagram, 
  FaYoutube, 
  FaEnvelope,
  FaRss,
  FaCoffee,
  FaShareAlt,
  FaCopy,
  FaCheck
} from 'react-icons/fa';

const SocialMediaSection = () => {
  const [copied, setCopied] = useState(false);
  
  // Pure white neumorphic style to match your design
  const neumorphicStyle = (size = 15) => ({
    boxShadow: `${size}px ${size}px ${size * 2}px #d1d1d1, -${size}px -${size}px ${size * 2}px #ffffff`
  });

  const socialLinks = [
    { 
      icon: FaGithub, 
      label: 'GitHub', 
      url: 'https://github.com/yourusername',
      color: 'hover:text-gray-800'
    },
    { 
      icon: FaTwitter, 
      label: 'Twitter', 
      url: 'https://twitter.com/yourusername',
      color: 'hover:text-blue-500'
    },
    { 
      icon: FaLinkedin, 
      label: 'LinkedIn', 
      url: 'https://linkedin.com/in/yourusername',
      color: 'hover:text-blue-600'
    },
    { 
      icon: FaInstagram, 
      label: 'Instagram', 
      url: 'https://instagram.com/yourusername',
      color: 'hover:text-pink-500'
    },
    { 
      icon: FaYoutube, 
      label: 'YouTube', 
      url: 'https://youtube.com/yourchannel',
      color: 'hover:text-red-500'
    },
    { 
      icon: FaEnvelope, 
      label: 'Newsletter', 
      url: '/newsletter',
      color: 'hover:text-green-500'
    },
    { 
      icon: FaRss, 
      label: 'RSS Feed', 
      url: '/rss.xml',
      color: 'hover:text-orange-500'
    },
    { 
      icon: FaCoffee, 
      label: 'Support', 
      url: '/support',
      color: 'hover:text-yellow-600'
    }
  ];

  const copyProfileUrl = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-12">
      {/* Main Social Media Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl border-2 border-gray-200 p-8"
        style={{ ...neumorphicStyle(12), boxShadow: `${neumorphicStyle(12).boxShadow}, inset 2px 2px 4px #ffffff` }}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-gray-800 mb-4">Let's Connect! 🌟</h2>
          <p className="text-gray-600 text-lg font-medium max-w-2xl mx-auto">
            Follow me across platforms for more content and updates
          </p>
        </div>

        {/* Social Media Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 mb-8">
          {socialLinks.map((social, index) => (
            <motion.a
              key={social.label}
              href={social.url}
              target={social.url.startsWith('http') ? '_blank' : '_self'}
              rel={social.url.startsWith('http') ? 'noopener noreferrer' : ''}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="group relative"
            >
              <div 
                className="bg-white rounded-2xl p-4 text-center border-2 border-gray-200 transition-all duration-300 group-hover:border-gray-300"
                style={neumorphicStyle(6)}
              >
                <div className={`text-2xl text-gray-600 transition-colors duration-300 ${social.color} mb-2`}>
                  <social.icon />
                </div>
                <span className="text-xs font-bold text-gray-700 block">{social.label}</span>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Additional Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {/* Quick Actions */}
          <motion.div 
            whileHover={{ y: -2 }}
            className="bg-white rounded-2xl p-6 border-2 border-gray-200"
            style={neumorphicStyle(8)}
          >
            <h3 className="font-black text-gray-800 mb-3 text-lg">🚀 Quick Links</h3>
            <p className="text-gray-600 text-sm mb-4">Explore more content</p>
            <div className="flex flex-col gap-2">
              <a 
                href="/archives"
                className="px-4 py-3 bg-white text-gray-700 rounded-xl font-bold text-sm border-2 border-gray-200 hover:border-gray-300 text-center transition-all duration-300"
                style={neumorphicStyle(4)}
              >
                Browse Archives
              </a>
              <a 
                href="/about"
                className="px-4 py-3 bg-white text-gray-700 rounded-xl font-bold text-sm border-2 border-gray-200 hover:border-gray-300 text-center transition-all duration-300"
                style={neumorphicStyle(4)}
              >
                About Me
              </a>
            </div>
          </motion.div>

          {/* Share Profile */}
          <motion.div 
            whileHover={{ y: -2 }}
            className="bg-white rounded-2xl p-6 border-2 border-gray-200"
            style={neumorphicStyle(8)}
          >
            <h3 className="font-black text-gray-800 mb-3 text-lg">🔗 Share Profile</h3>
            <p className="text-gray-600 text-sm mb-4">Share my content with others</p>
            <motion.button
              onClick={copyProfileUrl}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full px-4 py-3 bg-white text-gray-700 rounded-xl font-bold text-sm border-2 border-gray-200 hover:border-gray-300 flex items-center justify-center gap-2"
              style={neumorphicStyle(4)}
            >
              {copied ? <FaCheck className="text-green-500" /> : <FaCopy />}
              {copied ? 'Copied!' : 'Copy Profile URL'}
            </motion.button>
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-8 pt-6 border-t-2 border-gray-100"
        >
          <p className="text-gray-600 font-medium mb-4">
            💡 Each platform has different content types and updates!
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SocialMediaSection;