

import React from 'react';
import { motion } from 'framer-motion';
import { FaTwitter, FaLinkedin, FaGithub, FaInstagram, FaEnvelope, FaCode, FaPenFancy, FaCoffee, FaMapMarkerAlt, FaCalendarAlt, FaGraduationCap } from 'react-icons/fa';

const About = () => {
  const skills = [
    { name: 'Web Development', level: 90 },
    { name: 'React.js', level: 85 },
    { name: 'JavaScript', level: 88 },
    { name: 'UI/UX Design', level: 75 },
    { name: 'Content Writing', level: 80 },
    { name: 'Technical Blogging', level: 85 }
  ];

  const interests = [
    { icon: <FaCode className="w-5 h-5" />, name: 'Coding' },
    { icon: <FaPenFancy className="w-5 h-5" />, name: 'Writing' },
    { icon: <FaCoffee className="w-5 h-5" />, name: 'Coffee' },
    { icon: <FaCode className="w-5 h-5" />, name: 'Open Source' }
  ];

  const socialLinks = [
    { icon: <FaTwitter className="w-4 h-4" />, url: '#', name: 'Twitter' },
    { icon: <FaLinkedin className="w-4 h-4" />, url: '#', name: 'LinkedIn' },
    { icon: <FaGithub className="w-4 h-4" />, url: '#', name: 'GitHub' },
    { icon: <FaInstagram className="w-4 h-4" />, url: '#', name: 'Instagram' },
    { icon: <FaEnvelope className="w-4 h-4" />, url: '#', name: 'Email' }
  ];

  const neumorphicStyle = (size = 15) => ({
    boxShadow: `${size}px ${size}px ${size * 2}px #d1d1d1, -${size}px -${size}px ${size * 2}px #ffffff`
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      {/* Header Section */}
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl sm:text-6xl font-black text-gray-800 mb-6">About Me</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-gray-50 rounded-[2rem] p-8 border-2 border-gray-200 sticky top-24" style={neumorphicStyle(15)}>
              {/* Profile Image */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="w-48 h-48 rounded-[2rem] border-4 border-gray-200 overflow-hidden" style={neumorphicStyle(8)}>
                    <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-6xl font-black">
                      SM
                    </div>
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-12 h-12 rounded-2xl bg-green-500 border-4 border-gray-50 flex items-center justify-center" style={neumorphicStyle(4)}>
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Personal Info */}
              <div className="text-center mb-6">
                <h2 className="text-2xl font-black text-gray-800 mb-2">Sahil MD</h2>
                <p className="text-gray-600 font-medium mb-4">Full Stack Developer & Writer</p>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Passionate about creating digital experiences and sharing knowledge through writing.
                </p>
              </div>

              {/* Personal Details */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3 text-gray-600">
                  <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center border-2 border-gray-200" style={neumorphicStyle(4)}>
                    <FaMapMarkerAlt className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Location</p>
                    <p className="text-xs">Bangalore, India</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-gray-600">
                  <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center border-2 border-gray-200" style={neumorphicStyle(4)}>
                    <FaCalendarAlt className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Experience</p>
                    <p className="text-xs">5+ Years</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-gray-600">
                  <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center border-2 border-gray-200" style={neumorphicStyle(4)}>
                    <FaGraduationCap className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Education</p>
                    <p className="text-xs">Computer Science</p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex justify-center gap-3">
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

          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="lg:col-span-2"
          >
            {/* Story Section */}
            <div className="bg-gray-50 rounded-[2rem] p-8 border-2 border-gray-200 mb-8" style={{...neumorphicStyle(15), boxShadow: `${neumorphicStyle(15).boxShadow}, inset 2px 2px 4px #ffffff`}}>
              <h3 className="text-2xl font-black text-gray-800 mb-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-black">
                  01
                </div>
                My Story
              </h3>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Welcome to Blogni! I'm Sahil MD, a passionate full-stack developer and technical writer 
                  with over 5 years of experience in the tech industry. My journey began with a curiosity 
                  about how things work, which eventually led me to the world of programming and digital creation.
                </p>
                <p>
                  Through Blogni, I aim to share my knowledge, experiences, and insights about web development, 
                  programming best practices, and the latest technologies. I believe in the power of sharing 
                  knowledge and helping others grow in their coding journey.
                </p>
                <p>
                  When I'm not coding or writing, you can find me exploring new technologies, contributing to 
                  open-source projects, or enjoying a good cup of coffee while planning my next blog post.
                </p>
              </div>
            </div>

            {/* Skills Section */}
            <div className="bg-gray-50 rounded-[2rem] p-8 border-2 border-gray-200 mb-8" style={{...neumorphicStyle(15), boxShadow: `${neumorphicStyle(15).boxShadow}, inset 2px 2px 4px #ffffff`}}>
              <h3 className="text-2xl font-black text-gray-800 mb-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center text-white text-sm font-black">
                  02
                </div>
                Skills & Expertise
              </h3>
              <div className="space-y-4">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="space-y-2"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-700">{skill.name}</span>
                      <span className="text-sm text-gray-500">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3" style={neumorphicStyle(2)}>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: index * 0.2 }}
                        className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600"
                      ></motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Interests Section */}
            <div className="bg-gray-50 rounded-[2rem] p-8 border-2 border-gray-200" style={{...neumorphicStyle(15), boxShadow: `${neumorphicStyle(15).boxShadow}, inset 2px 2px 4px #ffffff`}}>
              <h3 className="text-2xl font-black text-gray-800 mb-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white text-sm font-black">
                  03
                </div>
                Interests & Hobbies
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {interests.map((interest, index) => (
                  <motion.div
                    key={interest.name}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="bg-gray-50 rounded-2xl p-4 border-2 border-gray-200 text-center group hover:border-blue-300 transition-all duration-300"
                    style={neumorphicStyle(6)}
                  >
                    <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center mx-auto mb-3 border-2 border-gray-200 group-hover:border-blue-400 group-hover:text-blue-600 transition-all" style={neumorphicStyle(4)}>
                      {interest.icon}
                    </div>
                    <p className="font-semibold text-gray-700">{interest.name}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="text-center"
        >
          <div className="bg-gray-50 rounded-[2rem] p-8 border-2 border-gray-200 max-w-4xl mx-auto" style={{...neumorphicStyle(15), boxShadow: `${neumorphicStyle(15).boxShadow}, inset 2px 2px 4px #ffffff`}}>
            <h3 className="text-2xl font-black text-gray-800 mb-4">Let's Connect!</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Interested in collaborating or have questions about my work? Feel free to reach out - 
              I'm always open to discussing new projects and ideas.
            </p>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 px-8 py-4 bg-gray-50 text-gray-700 font-black rounded-2xl border-2 border-gray-200 hover:border-blue-400 hover:text-blue-600 transition-all duration-300"
              style={neumorphicStyle(8)}
            >
              <FaEnvelope className="w-5 h-5" />
              Get In Touch
            </motion.a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;