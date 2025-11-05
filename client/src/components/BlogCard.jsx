import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export const BlogCard = ({ blog }) => {
  const { title, description, category, image, _id } = blog;
  const navigate = useNavigate();

  return (
    <motion.div
      onClick={() => navigate(`/blog/${_id}`)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
      whileHover={{ 
        y: -8,
        boxShadow: "20px 20px 60px #d1d1d1, -20px -20px 60px #ffffff"
      }}
      className="w-full bg-gray-50 rounded-3xl overflow-hidden cursor-pointer group neumorphic"
      style={{
        boxShadow: "8px 8px 16px #d1d1d1, -8px -8px 16px #ffffff"
      }}
    >
      {/* Image with neumorphic frame */}
      <div className="relative m-4 mb-0 rounded-2xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl" style={{
          boxShadow: "inset 4px 4px 8px #d1d1d1, inset -4px -4px 8px #ffffff"
        }}></div>
        <img
          src={image}
          alt={title}
          className="relative z-10 w-full h-48 object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4 z-20">
          <span className="px-3 py-1.5 bg-gray-50 text-gray-700 font-semibold text-sm rounded-xl border border-gray-200" style={{
            boxShadow: "4px 4px 8px #d1d1d1, -4px -4px 8px #ffffff"
          }}>
            {category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <h3 className="text-xl font-bold text-gray-800 leading-tight line-clamp-2 group-hover:text-blue-600 transition-colors">
          {title}
        </h3>
        
        <div
          className="text-gray-600 text-sm leading-relaxed line-clamp-3"
          dangerouslySetInnerHTML={{ __html: description }}
        />

        <div className="flex items-center justify-between pt-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-2.5 bg-gray-50 text-gray-700 font-semibold rounded-xl hover:text-blue-600 transition-colors duration-300 border border-gray-200"
            style={{
              boxShadow: "4px 4px 8px #d1d1d1, -4px -4px 8px #ffffff"
            }}
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/blog/${_id}`);
            }}
          >
            Read More
          </motion.button>
          
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center" style={{
              boxShadow: "inset 2px 2px 4px #d1d1d1, inset -2px -2px 4px #ffffff"
            }}>
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
            </div>
            <span>3 min</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};