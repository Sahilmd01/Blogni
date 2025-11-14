import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { BlogCard } from './BlogCard'
import { useAppContext } from '../context/AppContext'
import { FaTimes, FaSpinner, FaChevronLeft, FaChevronRight, FaSearch } from 'react-icons/fa'

const BlogList = () => {
  const { blogs, input, setInput } = useAppContext()
  const [activeCategory, setActiveCategory] = useState('All')
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const ref = useRef(null)

  const PER_PAGE = 8
  const categories = ['All', 'Technology', 'Startup', 'Lifestyle', 'Finance', 'Travel', 'Food', 'Fashion']

  // Pure white neumorphic style
  const neumorphicStyle = (size = 15) => ({
    boxShadow: `${size}px ${size}px ${size * 2}px #d1d1d1, -${size}px -${size}px ${size * 2}px #ffffff`
  })

  // Active state style
  const activeStyle = {
    background: '#ffffff',
    boxShadow: 'inset 4px 4px 8px #d1d1d1, inset -4px -4px 8px #ffffff'
  }

  // Show loading for realistic transitions
  useEffect(() => {
    setLoading(true)
    const delay = setTimeout(() => setLoading(false), blogs.length ? 600 : 1200)
    return () => clearTimeout(delay)
  }, [blogs.length, activeCategory, input])

  // Smooth scroll to top when search or page changes
  useEffect(() => {
    if (input) {
      const timer = setTimeout(() => {
        ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [input, page])

  useEffect(() => setPage(1), [activeCategory, input])

  const sorted = [...blogs].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

  const filtered = sorted.filter(blog => {
    const q = input.toLowerCase()
    const matchSearch =
      !input ||
      blog.title.toLowerCase().includes(q) ||
      blog.category.toLowerCase().includes(q)
    const matchCategory = activeCategory === 'All' || blog.category === activeCategory
    return matchSearch && matchCategory
  })

  const total = filtered.length
  const totalPages = Math.ceil(total / PER_PAGE)
  const sliceStart = (page - 1) * PER_PAGE
  const visible = filtered.slice(sliceStart, sliceStart + PER_PAGE)

  const resetSearch = () => {
    setInput('')
    setActiveCategory('All')
    setPage(1)
  }

  const goToPage = n => {
    setPage(n)
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const pages = () => {
    if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1)
    if (page <= 3) return [1, 2, 3, 4, '...', totalPages]
    if (page >= totalPages - 2) return [1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages]
    return [1, '...', page - 1, page, page + 1, '...', totalPages]
  }

  const Skeleton = () => (
    <div 
      className="bg-white border-2 border-gray-200 rounded-2xl overflow-hidden animate-pulse"
      style={neumorphicStyle(8)}
    >
      <div className="w-full h-48 bg-gray-200" />
      <div className="p-6 space-y-4">
        <div className="h-5 bg-gray-200 rounded-xl w-3/4" />
        <div className="h-4 bg-gray-200 rounded-xl w-1/2" />
        <div className="space-y-3">
          <div className="h-3 bg-gray-200 rounded-xl w-full" />
          <div className="h-3 bg-gray-200 rounded-xl w-4/5" />
        </div>
      </div>
    </div>
  )

  return (
    <div ref={ref} className="w-full max-w-7xl mx-auto px-4 sm:px-6 pt-4">
      {/* Category Filter */}
      {!input && (
        <motion.div 
          className="flex flex-wrap justify-center gap-3 my-8 p-6 bg-white rounded-2xl border-2 border-gray-200"
          style={{ ...neumorphicStyle(12), boxShadow: `${neumorphicStyle(12).boxShadow}, inset 2px 2px 4px #ffffff` }}
        >
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => !loading && setActiveCategory(cat)}
              disabled={loading}
              className={`relative px-5 py-2.5 rounded-2xl text-sm font-bold transition-all duration-300 border-2 ${
                activeCategory === cat
                  ? 'text-gray-800 border-gray-300 bg-white'
                  : 'text-gray-600 border-gray-200 hover:border-gray-300 hover:text-gray-800 bg-white'
              } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              style={activeCategory === cat ? activeStyle : neumorphicStyle(6)}
            >
              {cat}
              {activeCategory === cat && (
                <motion.div
                  layoutId="active-cat"
                  className="absolute inset-0 rounded-2xl -z-10"
                  style={activeStyle}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
            </button>
          ))}
        </motion.div>
      )}

      {/* Search Results Header */}
      {input && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center my-8 bg-white rounded-2xl p-8 border-2 border-gray-200"
          style={{ ...neumorphicStyle(12), boxShadow: `${neumorphicStyle(12).boxShadow}, inset 2px 2px 4px #ffffff` }}
        >
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center border-2 border-gray-200" style={neumorphicStyle(4)}>
              <FaSearch className="text-gray-600 text-lg" />
            </div>
            <h2 className="text-2xl font-black text-gray-800">
              Results for: <span className="text-gray-700">"{input}"</span>
            </h2>
          </div>
          <p className="text-gray-600 mb-6 text-lg font-medium">
            {loading ? 'Searching...' : `${total} blog${total !== 1 ? 's' : ''} found`}
          </p>
          <motion.button
            onClick={resetSearch}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-white text-gray-700 rounded-2xl flex items-center gap-3 mx-auto border-2 border-gray-200 hover:border-gray-300 hover:text-gray-800 font-bold transition-all duration-300"
            style={neumorphicStyle(6)}
          >
            <div className="w-6 h-6 rounded-lg bg-white flex items-center justify-center" style={neumorphicStyle(3)}>
              <FaTimes className="w-3 h-3" />
            </div>
            Clear Search
          </motion.button>
        </motion.div>
      )}

      {/* Main Content */}
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-8"
          >
            <motion.div 
              className="flex justify-center py-12 bg-white rounded-2xl border-2 border-gray-200"
              style={{ ...neumorphicStyle(10), boxShadow: `${neumorphicStyle(10).boxShadow}, inset 2px 2px 4px #ffffff` }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center border-2 border-gray-200"
                style={neumorphicStyle(6)}
              >
                <FaSpinner className="w-8 h-8 text-gray-600" />
              </motion.div>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array(8).fill().map((_, i) => <Skeleton key={i} />)}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
              {visible.length ? (
                visible.map(blog => <BlogCard key={blog._id} blog={blog} />)
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="col-span-full text-center py-20 bg-white rounded-2xl border-2 border-gray-200"
                  style={{ ...neumorphicStyle(12), boxShadow: `${neumorphicStyle(12).boxShadow}, inset 2px 2px 4px #ffffff` }}
                >
                  <div className="text-6xl mb-6">📝</div>
                  <p className="text-gray-500 text-xl font-bold mb-6">
                    {input ? `No results for "${input}"` : 'No blogs in this category'}
                  </p>
                  {input && (
                    <motion.button
                      onClick={resetSearch}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-4 bg-white text-gray-700 rounded-2xl border-2 border-gray-200 hover:border-gray-300 hover:text-gray-800 font-black transition-all duration-300"
                      style={neumorphicStyle(6)}
                    >
                      View All Blogs
                    </motion.button>
                  )}
                </motion.div>
              )}
            </div>

            {totalPages > 1 && (
              <motion.div 
                className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-12 p-6 bg-white rounded-2xl border-2 border-gray-200"
                style={{ ...neumorphicStyle(10), boxShadow: `${neumorphicStyle(10).boxShadow}, inset 2px 2px 4px #ffffff` }}
              >
                <p className="text-gray-600 font-bold text-lg">
                  Showing <span className="text-gray-700">{sliceStart + 1}-{Math.min(sliceStart + PER_PAGE, total)}</span> of <span className="text-gray-800">{total}</span>
                </p>

                <div className="flex items-center gap-3">
                  <motion.button
                    onClick={() => page > 1 && goToPage(page - 1)}
                    disabled={page === 1}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 rounded-2xl border-2 border-gray-200 disabled:opacity-30 disabled:cursor-not-allowed hover:border-gray-300 transition-all duration-300 bg-white"
                    style={neumorphicStyle(4)}
                  >
                    <FaChevronLeft className="w-4 h-4 text-gray-600" />
                  </motion.button>

                  {pages().map((n, i) => (
                    <motion.button
                      key={i}
                      onClick={() => typeof n === 'number' && goToPage(n)}
                      disabled={n === '...'}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.9 }}
                      className={`w-12 h-12 rounded-2xl border-2 font-black transition-all duration-300 ${
                        page === n
                          ? 'text-gray-800 border-gray-300 bg-white'
                          : 'border-gray-200 hover:border-gray-300 text-gray-600 bg-white'
                      }`}
                      style={page === n ? activeStyle : neumorphicStyle(4)}
                    >
                      {n}
                    </motion.button>
                  ))}

                  <motion.button
                    onClick={() => page < totalPages && goToPage(page + 1)}
                    disabled={page === totalPages}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 rounded-2xl border-2 border-gray-200 disabled:opacity-30 disabled:cursor-not-allowed hover:border-gray-300 transition-all duration-300 bg-white"
                    style={neumorphicStyle(4)}
                  >
                    <FaChevronRight className="w-4 h-4 text-gray-600" />
                  </motion.button>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default BlogList
