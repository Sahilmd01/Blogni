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
    <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden animate-pulse">
      <div className="w-full h-48 bg-gray-200" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-3 bg-gray-200 rounded w-1/2" />
        <div className="space-y-2">
          <div className="h-3 bg-gray-200 rounded w-full" />
          <div className="h-3 bg-gray-200 rounded w-4/5" />
        </div>
      </div>
    </div>
  )

  return (
    <div ref={ref} className="w-full max-w-7xl mx-auto px-4 sm:px-6">
      {/* Category Filter */}
      {!input && (
        <div className="flex flex-wrap justify-center gap-2 my-8">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => !loading && setActiveCategory(cat)}
              disabled={loading}
              className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === cat
                  ? 'text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
              } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {cat}
              {activeCategory === cat && (
                <motion.div
                  layoutId="active-cat"
                  className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full -z-10"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      )}

      {/* Search Results Header */}
      {input && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center my-8 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-6 border border-gray-200"
        >
          <div className="flex justify-center items-center gap-3 mb-3">
            <FaSearch className="text-gray-400 text-lg" />
            <h2 className="text-xl font-semibold text-gray-800">
              Results for: <span className="text-blue-600">"{input}"</span>
            </h2>
          </div>
          <p className="text-gray-600 mb-4">
            {loading ? 'Searching...' : `${total} blog${total !== 1 ? 's' : ''} found`}
          </p>
          <motion.button
            onClick={resetSearch}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-2 bg-white border border-gray-300 text-gray-700 rounded-full flex items-center gap-2 mx-auto hover:bg-gray-50 transition-colors shadow-sm"
          >
            <FaTimes className="w-4 h-4" />
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
            <div className="flex justify-center py-8">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              >
                <FaSpinner className="w-8 h-8 text-blue-500" />
              </motion.div>
            </div>
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
                <div className="col-span-full text-center py-16">
                  <div className="text-gray-400 text-6xl mb-4">📝</div>
                  <p className="text-gray-500 text-lg mb-4">
                    {input ? `No results for "${input}"` : 'No blogs in this category'}
                  </p>
                  {input && (
                    <button
                      onClick={resetSearch}
                      className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
                    >
                      View All Blogs
                    </button>
                  )}
                </div>
              )}
            </div>

            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12 px-4">
                <p className="text-gray-600 text-sm">
                  Showing {sliceStart + 1}-{Math.min(sliceStart + PER_PAGE, total)} of {total}
                </p>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => page > 1 && goToPage(page - 1)}
                    disabled={page === 1}
                    className="p-2 rounded-lg border border-gray-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                  >
                    <FaChevronLeft className="w-4 h-4" />
                  </button>

                  {pages().map((n, i) => (
                    <button
                      key={i}
                      onClick={() => typeof n === 'number' && goToPage(n)}
                      disabled={n === '...'}
                      className={`w-10 h-10 rounded-lg border text-sm font-medium transition-colors ${
                        page === n
                          ? 'bg-blue-500 text-white border-blue-500'
                          : 'border-gray-300 hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      {n}
                    </button>
                  ))}

                  <button
                    onClick={() => page < totalPages && goToPage(page + 1)}
                    disabled={page === totalPages}
                    className="p-2 rounded-lg border border-gray-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                  >
                    <FaChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default BlogList
