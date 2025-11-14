import React, { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { FaArrowRight, FaBook, FaEye, FaTags, FaChartLine } from 'react-icons/fa'

const HeroSection = () => {
  const [currentFeature, setCurrentFeature] = useState(0)

  const neumorphicStyle = (size = 15) => ({
    boxShadow: `${size}px ${size}px ${size * 2}px #d1d1d1, -${size}px -${size}px ${size * 2}px #ffffff`
  })

  const features = [
    { icon: <FaBook className="w-6 h-6" />, title: "In-Depth Analysis", description: "Comprehensive articles breaking down complex topics" },
    { icon: <FaChartLine className="w-6 h-6" />, title: "Trending Insights", description: "Stay updated with latest tech and innovation" },
    { icon: <FaTags className="w-6 h-6" />, title: "Expert Perspectives", description: "Unique viewpoints from years of experience" }
  ]

  const scrollToBlogList = () => {
    document.getElementById('blog-list-section')?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [features.length])

  return (
    <div className="min-h-screen bg-gray-50 pt-16 sm:pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center py-8 lg:py-12 xl:py-24">

          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6 lg:space-y-8 order-2 lg:order-1"
          >
            <motion.h1
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-gray-800 leading-tight"
            >
              Exploring{' '}
              <span className="text-blue-600">Technology</span>
              <br />
              &{' '}
              <span className="text-purple-600">Innovation</span>
            </motion.h1>

            <motion.p
              className="text-lg sm:text-xl text-gray-600 leading-relaxed"
            >
              Deep dives into web development, startup strategies, and the future of technology.
            </motion.p>

            {/* Author Info */}
            <motion.div
              className="flex items-center gap-4 p-4 bg-white rounded-2xl w-full max-w-md"
              style={neumorphicStyle(8)}
            >
              <img
                src="/profile-pic.jpg"
                alt="Author"
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-gray-200"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-gray-800 text-sm sm:text-base">Sahil MD</h3>
                <p className="text-gray-600 text-xs sm:text-sm truncate">Developer & Tech Writer</p>
              </div>
            </motion.div>

            <motion.button
              onClick={scrollToBlogList}
              whileHover={{ scale: 1.05 }}
              className="px-6 py-3 sm:px-8 sm:py-4 bg-white text-gray-800 font-bold rounded-2xl border-2 border-gray-200 flex items-center gap-3 group w-full max-w-xs"
              style={neumorphicStyle(8)}
            >
              <span className="text-sm sm:text-base">Explore Articles</span>
              <FaArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:text-blue-500 transition-colors flex-shrink-0" />
            </motion.button>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 w-full max-w-2xl">
              {[
                { number: "67+", label: "Articles", icon: <FaBook className="w-3 h-3 sm:w-4 sm:h-4" /> },
                { number: "12K+", label: "Readers", icon: <FaEye className="w-3 h-3 sm:w-4 sm:h-4" /> },
                { number: "28+", label: "Categories", icon: <FaTags className="w-3 h-3 sm:w-4 sm:h-4" /> },
                { number: "96%", label: "Engagement", icon: <FaChartLine className="w-3 h-3 sm:w-4 sm:h-4" /> }
              ].map((stat) => (
                <div key={stat.label} className="p-3 sm:p-4 bg-white rounded-2xl text-center" style={neumorphicStyle(6)}>
                  <div className="flex items-center justify-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                    {stat.icon}
                    <div className="text-base sm:text-lg font-black text-gray-800">{stat.number}</div>
                  </div>
                  <div className="text-xs text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6 flex flex-col items-center order-1 lg:order-2"
          >
            <div className="flex justify-center items-center gap-3 sm:gap-4 w-full overflow-x-auto no-scrollbar pb-2">
              {[
                "/hero-video.mp4",
                "/hero-video2.mp4"
              ].map((videoSrc, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-3xl flex justify-center items-center flex-shrink-0"
                  style={{ ...neumorphicStyle(10), padding: '0.3rem' }}
                >
                  <div
                    className="w-32 h-48 xs:w-36 xs:h-56 sm:w-44 sm:h-64 md:w-56 md:h-80 lg:w-64 lg:h-96 xl:w-72 xl:h-[432px] rounded-3xl overflow-hidden"
                    style={neumorphicStyle(6)}
                  >
                    <video
                      src={videoSrc}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover rounded-3xl"
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Feature Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 w-full max-w-sm lg:max-w-md" style={neumorphicStyle(12)}>
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-white flex items-center justify-center flex-shrink-0" style={neumorphicStyle(6)}>
                    {features[currentFeature].icon}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-xl sm:text-2xl font-black text-gray-800 mb-1 sm:mb-2 leading-tight">
                      {features[currentFeature].title}
                    </h3>
                    <p className="text-gray-600 text-sm sm:text-base">{features[currentFeature].description}</p>
                  </div>
                </div>

                <div className="flex gap-2 justify-center">
                  {features.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentFeature(index)}
                      className={`w-6 h-1 sm:w-8 sm:h-2 rounded-full transition-all ${index === currentFeature ? 'bg-gray-700' : 'bg-gray-300'
                        }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection