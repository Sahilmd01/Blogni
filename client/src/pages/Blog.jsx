import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaWhatsapp, FaTelegramPlane, FaCopy, FaArrowLeft, FaClock, FaComment } from 'react-icons/fa'
import Moment from 'moment'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Loader from '../components/Loader'
import { useAppContext } from '../context/AppContext'

const Blog = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { axios } = useAppContext()

  const [data, setData] = useState(null)
  const [comment, setComment] = useState([])
  const [name, setName] = useState('')
  const [content, setContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const fetchBlogData = async () => {
    try {
      const { data } = await axios.get(`/api/blog/${id}`)
      data.success ? setData(data.blog) : toast.error(data.message)
    } catch (error) {
      toast.error(error.message)
    }
  }

  const fetchComments = async () => {
    try {
      const { data } = await axios.post(`/api/blog/comments`, { blogId: id })
      data.success ? setComment(data.comments) : toast.error(data.message)
    } catch (error) {
      toast.error(error.message)
    }
  }

  const addComment = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const { data } = await axios.post(`/api/blog/add-comment`, { blog: id, name, content })
      if (data.success) {
        toast.success(data.message)
        setName('')
        setContent('')
        fetchComments()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const shareOnSocialMedia = (platform) => {
    const url = window.location.href
    const title = data?.title || 'Check out this amazing blog post'
    const text = data?.subTitle?.replace(/<[^>]*>/g, '') || 'Interesting read worth sharing'

    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(title)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title + ' - ' + text)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(title + ' ' + url)}`,
      telegram: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`
    }

    if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400')
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      toast.success('Link copied to clipboard!')
    } catch (err) {
      toast.error('Failed to copy link')
    }
  }

  useEffect(() => {
    fetchBlogData()
    fetchComments()
  }, [id])

  if (!data) return <Loader />

  const socialIcons = [
    { platform: 'facebook', icon: <FaFacebookF className="w-3 h-3 sm:w-4 sm:h-4" /> },
    { platform: 'twitter', icon: <FaTwitter className="w-3 h-3 sm:w-4 sm:h-4" /> },
    { platform: 'linkedin', icon: <FaLinkedinIn className="w-3 h-3 sm:w-4 sm:h-4" /> },
    { platform: 'whatsapp', icon: <FaWhatsapp className="w-3 h-3 sm:w-4 sm:h-4" /> },
    { platform: 'telegram', icon: <FaTelegramPlane className="w-3 h-3 sm:w-4 sm:h-4" /> }
  ]

  const neumorphicStyle = (size = 15) => ({
    boxShadow: `${size}px ${size}px ${size * 2}px #d1d1d1, -${size}px -${size}px ${size * 2}px #ffffff`
  })

  return (
    <div className='min-h-screen bg-gray-50'>
      <Navbar />

<motion.div 
  initial={{ opacity: 0, x: -20 }} 
  animate={{ opacity: 1, x: 0 }} 
  className="container mx-auto px-3 sm:px-4 lg:px-6 pt-28 sm:pt-24"
>
  <motion.button 
    whileHover={{ scale: 1.02, x: -2 }} 
    whileTap={{ scale: 0.95 }} 
    onClick={() => navigate(-1)}
    className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-gray-50 text-gray-700 font-semibold rounded-lg sm:rounded-xl mb-4 sm:mb-6 border border-gray-200 hover:border-blue-300 transition-all duration-300 w-fit text-xs sm:text-sm"
    style={{ ...neumorphicStyle(6), boxShadow: `${neumorphicStyle(6).boxShadow}, inset 1px 1px 2px #ffffff` }}
  >
    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-md bg-gray-50 flex items-center justify-center" style={neumorphicStyle(2)}>
      <FaArrowLeft className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-gray-600" />
    </div>
    Back to Blogs
  </motion.button>
</motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 40 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.7 }} 
        className="container mx-auto px-3 sm:px-4 lg:px-6 mb-8 sm:mb-12"
      >
        <div 
          className="bg-gray-50 rounded-2xl sm:rounded-[2rem] p-6 sm:p-8 lg:p-10 border-2 border-gray-200" 
          style={{ ...neumorphicStyle(10), boxShadow: `${neumorphicStyle(10).boxShadow}, inset 2px 2px 4px #ffffff` }}
        >
          <div className="text-center max-w-5xl mx-auto">
            {/* Category and Date */}
            <div className="flex flex-col xs:flex-row items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-8">
              <motion.span 
                initial={{ opacity: 0, scale: 0.8 }} 
                animate={{ opacity: 1, scale: 1 }} 
                transition={{ delay: 0.2 }}
                className="px-4 py-1.5 sm:px-5 sm:py-2.5 bg-gray-50 text-gray-700 font-bold rounded-xl sm:rounded-2xl border-2 border-gray-200 flex items-center gap-2 text-xs sm:text-sm" 
                style={neumorphicStyle(6)}
              >
                <span className="w-2 h-2 sm:w-3 sm:h-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></span>
                {data.category || "Technology"}
              </motion.span>

              <div className="flex items-center gap-2 sm:gap-3 text-gray-500 font-medium text-xs sm:text-sm">
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-lg bg-gray-50 flex items-center justify-center" style={neumorphicStyle(3)}>
                  <FaClock className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                </div>
                {Moment(data.createdAt).format('MMMM Do YYYY')}
              </div>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-gray-800 mb-6 sm:mb-8 leading-tight tracking-tight break-words px-2">
              {data.title}
            </h1>

            {/* Subtitle */}
            <div className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed mb-8 sm:mb-12 max-w-4xl mx-auto font-medium break-words">
              <div dangerouslySetInnerHTML={{ __html: data.subTitle }} />
            </div>

            {/* Author and Share Section */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-gray-50 border-2 border-gray-200" style={neumorphicStyle(6)}>
              {/* Author Info */}
              <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto justify-center sm:justify-start">
                <img
                  src="/logo.svg"
                  alt="Sahil MD Logo"
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover shadow-md"
                />
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                  <p className="font-bold text-gray-800 text-sm sm:text-base text-center sm:text-left">SAHIL MD</p>
                  <p className="text-xs sm:text-sm text-gray-500 text-center sm:text-left">
                    • Posted {Moment(data.createdAt).fromNow()}
                  </p>
                </div>
              </div>

              {/* Share Buttons */}
              <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-center sm:justify-end">
                <span className="text-xs sm:text-sm font-semibold text-gray-600 hidden xs:block">Share:</span>
                <div className="flex gap-1 sm:gap-2">
                  {socialIcons.map(({ platform, icon }) => (
                    <motion.button 
                      key={platform} 
                      whileHover={{ scale: 1.1, y: -2 }} 
                      whileTap={{ scale: 0.9 }} 
                      onClick={() => shareOnSocialMedia(platform)}
                      className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-lg sm:rounded-xl flex items-center justify-center border-2 border-gray-200 bg-gray-50 hover:border-blue-300 transition-colors text-xs"
                      style={neumorphicStyle(3)}
                    >
                      {icon}
                    </motion.button>
                  ))}
                  <motion.button 
                    whileHover={{ scale: 1.1, y: -2 }} 
                    whileTap={{ scale: 0.9 }} 
                    onClick={copyToClipboard}
                    className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-lg sm:rounded-xl flex items-center justify-center border-2 border-gray-200 bg-gray-50 hover:border-green-300 transition-colors"
                    style={neumorphicStyle(3)}
                  >
                    <FaCopy className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 text-gray-600" />
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content Area */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.7, delay: 0.2 }} 
        className="container mx-auto px-3 sm:px-4 lg:px-6 mb-12 sm:mb-20"
      >
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8">
          {/* Blog Content */}
          <div className="flex-1">
            {/* Blog Image */}
            <motion.div 
              whileHover={{ scale: 1.01 }} 
              className="relative mb-6 sm:mb-8 rounded-xl sm:rounded-[2rem] overflow-hidden border-2 border-gray-200" 
              style={neumorphicStyle(10)}
            >
              <div 
                className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl sm:rounded-[2rem]" 
                style={{ boxShadow: "inset 4px 4px 8px #d1d1d1, inset -4px -4px 8px #ffffff" }}
              ></div>
              <img 
                src={data.image} 
                alt="Blog cover" 
                className="relative z-10 w-full h-auto object-cover rounded-xl sm:rounded-[2rem] transition-transform duration-700 hover:scale-105" 
              />
            </motion.div>

            {/* Blog Description */}
            <motion.div 
              className="bg-gray-50 rounded-xl sm:rounded-[2rem] p-6 sm:p-8 lg:p-10 border-2 border-gray-200 mb-6 sm:mb-8 break-words" 
              style={{ ...neumorphicStyle(10), boxShadow: `${neumorphicStyle(10).boxShadow}, inset 2px 2px 4px #ffffff` }}
            >
              <article className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
                <div 
                  className="rich-text text-gray-700 leading-relaxed text-base sm:text-lg break-words" 
                  dangerouslySetInnerHTML={{ __html: data.description }} 
                />
              </article>
            </motion.div>
          </div>

          {/* Comments Sidebar */}
          <div className="lg:w-80 xl:w-96">
            <motion.div 
              initial={{ opacity: 0, x: 20 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ delay: 0.4 }}
              className="bg-gray-50 rounded-xl sm:rounded-[2rem] p-6 sm:p-8 border-2 border-gray-200 lg:sticky lg:top-24" 
              style={{ ...neumorphicStyle(10), boxShadow: `${neumorphicStyle(10).boxShadow}, inset 2px 2px 4px #ffffff` }}
            >
              {/* Comments Header */}
              <div className="flex items-center justify-between mb-6 sm:mb-8">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-lg sm:rounded-xl bg-gray-50 flex items-center justify-center border-2 border-gray-200" style={neumorphicStyle(3)}>
                    <FaComment className="w-4 h-4 sm:w-4.5 sm:h-4.5 lg:w-5 lg:h-5 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-black text-gray-800">Discussion</h3>
                    <p className="text-xs sm:text-sm text-gray-500">{comment.length} comments</p>
                  </div>
                </div>
              </div>

              {/* Comments List */}
              <div className="space-y-3 sm:space-y-4 max-h-80 sm:max-h-96 overflow-y-auto pr-2 custom-scrollbar mb-6 sm:mb-8">
                {comment.length > 0 ? comment.map((item, index) => (
                  <motion.div 
                    key={index} 
                    initial={{ opacity: 0, x: 20 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    transition={{ delay: index * 0.1 }}
                    className="p-3 sm:p-4 rounded-xl sm:rounded-2xl border-2 border-gray-200 bg-white group hover:border-blue-300 transition-all break-words" 
                    style={neumorphicStyle(4)}
                  >
                    <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                      <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-lg sm:rounded-xl bg-gradient-to-br from-gray-500 to-gray-700 flex items-center justify-center text-white font-bold text-xs sm:text-sm flex-shrink-0" style={neumorphicStyle(2)}>
                        {item.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-gray-800 text-sm sm:text-base truncate">{item.name}</p>
                        <p className="text-xs text-gray-500">{Moment(item.createdAt).fromNow()}</p>
                      </div>
                    </div>
                    <p className="text-gray-700 text-xs sm:text-sm leading-relaxed break-words whitespace-pre-wrap">{item.content}</p>
                  </motion.div>
                )) : (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    className="text-center py-6 sm:py-8 rounded-xl sm:rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50"
                  >
                    <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">💬</div>
                    <p className="text-gray-500 font-medium text-sm sm:text-base">No comments yet</p>
                    <p className="text-gray-400 text-xs sm:text-sm mt-1">Be the first to share your thoughts!</p>
                  </motion.div>
                )}
              </div>

              {/* Add Comment Form */}
              <div className="pt-6 sm:pt-8 border-t-2 border-gray-200">
                <h4 className="font-black text-gray-800 mb-3 sm:mb-4 text-base sm:text-lg">Join the discussion</h4>
                <form onSubmit={addComment} className="space-y-3 sm:space-y-4">
                  <input 
                    onChange={(e) => setName(e.target.value)} 
                    value={name} 
                    type="text" 
                    placeholder="Your name" 
                    required
                    className="w-full p-3 sm:p-4 border-2 border-gray-200 rounded-xl sm:rounded-2xl outline-none focus:border-blue-400 bg-white font-medium text-sm sm:text-base break-words"
                    style={{ boxShadow: "inset 3px 3px 6px #d1d1d1, inset -3px -3px 6px #ffffff" }} 
                  />

                  <textarea 
                    onChange={(e) => setContent(e.target.value)} 
                    value={content} 
                    placeholder="Share your thoughts..." 
                    required
                    className="w-full p-3 sm:p-4 border-2 border-gray-200 rounded-xl sm:rounded-2xl outline-none focus:border-blue-400 bg-white font-medium text-sm sm:text-base h-24 sm:h-28 resize-none break-words"
                    style={{ boxShadow: "inset 3px 3px 6px #d1d1d1, inset -3px -3px 6px #ffffff" }}
                  />

                  <motion.button 
                    type="submit" 
                    disabled={isSubmitting} 
                    whileHover={{ scale: 1.02 }} 
                    whileTap={{ scale: 0.95 }}
                    className="w-full py-3 sm:py-4 bg-gray-50 text-gray-700 font-black rounded-xl sm:rounded-2xl border-2 border-gray-200 hover:border-blue-400 hover:text-blue-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base" 
                    style={neumorphicStyle(4)}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center gap-2 sm:gap-3">
                        <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-gray-600 border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-xs sm:text-sm">Posting...</span>
                      </div>
                    ) : 'Post Comment'}
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <Footer />
    </div>
  )
}

export default Blog