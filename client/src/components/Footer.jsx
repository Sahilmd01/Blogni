import React from 'react';
import { motion } from 'framer-motion';
import { FaTwitter, FaLinkedin, FaGithub, FaInstagram, FaEnvelope, FaHeart, FaArrowUp } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { icon: <FaTwitter className="w-4 h-4" />, url: '#', name: 'Twitter' },
    { icon: <FaLinkedin className="w-4 h-4" />, url: '#', name: 'LinkedIn' },
    { icon: <FaGithub className="w-4 h-4" />, url: '#', name: 'GitHub' },
    { icon: <FaInstagram className="w-4 h-4" />, url: '#', name: 'Instagram' },
    { icon: <FaEnvelope className="w-4 h-4" />, url: '#', name: 'Email' }
  ];

  const quickLinks = [
    { name: 'Home', url: '/' },
    { name: 'Blogs', url: '/blogs' },
    { name: 'About', url: '/about' },
    { name: 'Contact', url: '/contact' }
  ];

  const categories = [
    { name: 'Technology', url: '/category/technology' },
    { name: 'Programming', url: '/category/programming' },
    { name: 'Lifestyle', url: '/category/lifestyle' },
    { name: 'Productivity', url: '/category/productivity' }
  ];

  const neumorphicStyle = (size = 15) => ({
    boxShadow: `${size}px ${size}px ${size * 2}px #d1d1d1, -${size}px -${size}px ${size * 2}px #ffffff`
  });

  return (
    <footer className="bg-gray-50 border-t-2 border-gray-200">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1"
          >
            <div className="bg-gray-50 rounded-2xl p-6 border-2 border-gray-200 h-full" style={neumorphicStyle(8)}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center font-black text-white text-lg" 
                  style={{...neumorphicStyle(4), boxShadow: `${neumorphicStyle(4).boxShadow}, inset 2px 2px 4px rgba(255,255,255,0.3)`}}>
                  B
                </div>
                <h3 className="text-2xl font-black text-gray-800">Blogni</h3>
              </div>
              <p className="text-gray-600 leading-relaxed mb-6 text-sm">
                Sharing thoughts, ideas, and experiences through words. Join me on this journey of learning and growth.
              </p>
              
              {/* Social Links */}
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 rounded-xl flex items-center justify-center border-2 border-gray-200 bg-gray-50 hover:border-blue-400 hover:text-blue-600 transition-all duration-300"
                    style={neumorphicStyle(4)}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="bg-gray-50 rounded-2xl p-6 border-2 border-gray-200 h-full" style={neumorphicStyle(8)}>
              <h4 className="font-black text-gray-800 text-lg mb-6 flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                Quick Links
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <motion.a
                      href={link.url}
                      whileHover={{ x: 5 }}
                      className="text-gray-600 hover:text-blue-600 transition-colors duration-300 flex items-center gap-2 group"
                    >
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full group-hover:bg-blue-500 transition-colors"></div>
                      {link.name}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Categories */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-gray-50 rounded-2xl p-6 border-2 border-gray-200 h-full" style={neumorphicStyle(8)}>
              <h4 className="font-black text-gray-800 text-lg mb-6 flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                Categories
              </h4>
              <ul className="space-y-3">
                {categories.map((category) => (
                  <li key={category.name}>
                    <motion.a
                      href={category.url}
                      whileHover={{ x: 5 }}
                      className="text-gray-600 hover:text-purple-600 transition-colors duration-300 flex items-center gap-2 group"
                    >
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full group-hover:bg-purple-500 transition-colors"></div>
                      {category.name}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Newsletter */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="bg-gray-50 rounded-2xl p-6 border-2 border-gray-200 h-full" style={neumorphicStyle(8)}>
              <h4 className="font-black text-gray-800 text-lg mb-6 flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Stay Updated
              </h4>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                Get the latest posts delivered straight to your inbox.
              </p>
              
              <form className="space-y-3">
                <div>
                  <input 
                    type="email" 
                    placeholder="Your email address"
                    className="w-full p-3 border-2 border-gray-200 rounded-xl outline-none focus:border-blue-400 bg-white text-sm font-medium"
                    style={{boxShadow: "inset 4px 4px 8px #d1d1d1, inset -4px -4px 8px #ffffff"}}
                    required
                  />
                </div>
                
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 bg-gray-50 text-gray-700 font-bold rounded-xl border-2 border-gray-200 hover:border-green-400 hover:text-green-600 transition-all duration-300 text-sm"
                  style={neumorphicStyle(4)}
                >
                  Subscribe
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t-2 border-gray-200"
        >
          {/* Copyright */}
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <span>© {currentYear} Blogni. Made with</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
            >
              <FaHeart className="text-red-500 w-3 h-3" />
            </motion.div>
            <span>by Sahil MD</span>
          </div>

          {/* Additional Links */}
          <div className="flex items-center gap-6 text-sm">
            <motion.a 
              href="/privacy" 
              whileHover={{ scale: 1.05 }}
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Privacy
            </motion.a>
            <motion.a 
              href="/terms" 
              whileHover={{ scale: 1.05 }}
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Terms
            </motion.a>
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
              className="w-8 h-8 rounded-xl flex items-center justify-center border-2 border-gray-200 bg-gray-50 hover:border-blue-400 hover:text-blue-600 transition-all"
              style={neumorphicStyle(3)}
              aria-label="Scroll to top"
            >
              <FaArrowUp className="w-3 h-3" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;