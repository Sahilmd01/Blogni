import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'motion/react'
import { BlogCard } from './BlogCard';
import { useAppContext } from '../context/AppContext';
import { FaTimes } from 'react-icons/fa';

const BlogList = () => {
 const[menu, setMenu] = useState("All");
 const{blogs, input, setInput} = useAppContext();
 const blogListRef = useRef(null);

 // Blog categories - moved from assets
 const blogCategories = ["All", "Technology","Startup", "Lifestyle", "Finance","Travel", "Food", "Fashion"];

 // Sort blogs by creation date (newest first)
 const sortedBlogs = [...blogs].sort((a, b) => {
   return new Date(b.createdAt) - new Date(a.createdAt);
 });

 const filteredBlogs = () => {
   if(input === ''){
    return sortedBlogs;
   } 
   return sortedBlogs.filter((blog) => 
    blog.title.toLowerCase().includes(input.toLowerCase()) || 
    blog.category.toLowerCase().includes(input.toLowerCase())
   )
 }

 // Scroll to blog list when search input changes
 useEffect(() => {
   if (input !== '') {
     setTimeout(() => {
       blogListRef.current?.scrollIntoView({ 
         behavior: 'smooth',
         block: 'start'
       });
     }, 100);
   }
 }, [input]);

 // Clear search function
 const clearSearch = () => {
   setInput('');
   setMenu('All');
 };

 // Get the final list of blogs to display
 const displayBlogs = () => {
   const searchFiltered = filteredBlogs();
   
   if (input !== '') {
     return searchFiltered;
   }
   
   return searchFiltered.filter((blog) => 
     menu === "All" ? true : blog.category === menu
   );
 }

  return (
    <div ref={blogListRef} className="w-full">
        {/* Only show category filter when not searching */}
        {input === '' && (
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 lg:gap-6 my-6 sm:my-8 md:my-10 px-2 sm:px-4">
            {blogCategories.map((item) => (
                <div key={item} className="relative">
                    <button 
                      onClick={() => setMenu(item)}
                      className={`cursor-pointer text-gray-500 text-xs sm:text-sm md:text-base px-2 sm:px-3 py-1 sm:py-1.5 transition-all duration-200 ${
                        menu === item ? 'text-white font-semibold' : 'hover:text-gray-700'
                      }`}
                    >
                        {item} 
                        {menu === item && (
                          <motion.div 
                            layoutId='underline'  
                            transition={{type: 'spring', stiffness: 500, damping:30}}
                            className="absolute left-0 right-0 top-0 h-6 sm:h-7 -z-10 rounded-full blog-list-items"
                          ></motion.div>
                        )}
                    </button>
                </div>
            ))}
          </div>
        )}

        {/* Search results header */}
        {input !== '' && (
          <div className="text-center my-6 sm:my-8 md:my-10 px-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-700 break-words">
              Search Results for: "{input}"
            </h2>
            <p className="text-gray-500 mt-1 sm:mt-2 text-sm sm:text-base">
              Found {displayBlogs().length} result(s)
            </p>
            
            {/* Clear Search Button */}
            <motion.button
              onClick={clearSearch}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-3 sm:mt-4 px-4 sm:px-6 py-1.5 sm:py-2 bg-gradient-to-r from-gray-400 to-gray-500 text-white rounded-full flex items-center gap-1 sm:gap-2 mx-auto hover:from-gray-500 hover:to-gray-600 transition-all duration-300 shadow-lg text-xs sm:text-sm"
            >
              <FaTimes className="w-3 h-3 sm:w-4 sm:h-4" />
              Clear Search
            </motion.button>
          </div>
        )}

        {/* Blog Grid */}
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 
        md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8 
        mb-16 sm:mb-20 md:mb-24 px-3 xs:px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24
        ">
          {displayBlogs().length > 0 ? (
            displayBlogs().map((blog) => 
              <BlogCard key={blog._id} blog={blog} />
            )
          ) : (
            <div className="col-span-full text-center py-8 sm:py-12 md:py-16 px-4">
              <p className="text-gray-500 text-base sm:text-lg md:text-xl break-words">
                {input !== '' 
                  ? `No results found for "${input}"` 
                  : "No blogs available in this category"
                }
              </p>
            </div>
          )}
        </div>
    
    </div>
  )
}

export default BlogList