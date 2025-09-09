// src/pages/Contact.jsx
import { useState } from 'react'
import SectionTitle from '../components/SectionTitle'
import { useTheme } from '../context/ThemeContext'

const Contact = () => {
  const { isDark } = useTheme()
  const [activePopup, setActivePopup] = useState(null)

  const contactMethods = [
    {
      id: 1,
      name: "Email",
      value: "hirabaig1357@gmail.com",
      link: "mailto:hirabaig1357@gmail.com",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      color: "bg-blue-500",
      hoverColor: "group-hover:bg-blue-600"
    },
    {
      id: 2,
      name: "Phone",
      value: "+92 334-0529629",
      link: "tel:+923340529629",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      color: "bg-green-500",
      hoverColor: "group-hover:bg-green-600"
    },
    {
      id: 3,
      name: "LinkedIn",
      value: "Hira Baig",
      link: "https://www.linkedin.com/in/hira-baig-195b13338/",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
      ),
      color: "bg-blue-700",
      hoverColor: "group-hover:bg-blue-800"
    },
    {
      id: 4,
      name: "Website",
      value: "hirabaig.com",
      link: "https://hira-baig-portfolio-website.netlify.app/",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      ),
      color: "bg-purple-500",
      hoverColor: "group-hover:bg-purple-600"
    }
  ]

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Custom Title with Animated Underline */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 inline-block relative group">
          Get In Touch
          <span className="absolute -bottom-2 left-0 w-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500 group-hover:w-full"></span>
          <span className="absolute -bottom-2 left-0 w-1/4 h-1 bg-gradient-to-r from-pink-500 to-blue-500 group-hover:animate-pulse"></span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mt-6">
          If you have any inquiries, collaboration proposals, or professional opportunities, feel free to reach out. 
          I am always open to meaningful discussions, networking, and exploring new opportunities in technology, data science, and beyond.
        </p>
      </div>
      
      {/* Contact Methods - Horizontal Layout */}
      <div className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactMethods.map((method) => (
            <a 
              key={method.id} 
              href={method.link} 
              target={method.name === "Email" || method.name === "Phone" ? "_self" : "_blank"}
              rel="noopener noreferrer"
              className={`group relative rounded-xl overflow-hidden transition-all duration-300 transform hover:-translate-y-2 
                ${isDark 
                  ? 'bg-gradient-to-b from-gray-800/80 to-gray-900/80 border border-gray-700' 
                  : 'bg-gradient-to-b from-white/80 to-gray-100/80 border border-gray-200'
                } 
                shadow-lg
                ${isDark 
                  ? 'shadow-blue-500/10 shadow-pink-500/5 hover:shadow-blue-500/30 hover:shadow-pink-500/20' 
                  : 'shadow-blue-400/20 shadow-purple-400/10 hover:shadow-blue-400/30 hover:shadow-purple-400/20'
                }`}
            >
              <div className="p-6 flex flex-col items-center text-center h-full">
                <div className={`${method.color} ${method.hoverColor} rounded-full p-3 text-white mb-4 transition-all duration-300 transform group-hover:scale-110`}>
                  {method.icon}
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {method.name}
                </h3>
                
                <p className="text-blue-600 dark:text-blue-400 group-hover:text-blue-800 dark:group-hover:text-blue-300 transition-colors duration-300 font-medium break-words">
                  {method.value}
                </p>
              </div>
              
              {/* Gradient Hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Gradient border effect on hover */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              <div className="absolute inset-0 rounded-xl border border-transparent group-hover:border-blue-500/30 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all duration-300"></div>
            </a>
          ))}
        </div>
      </div>
      
      {/* Additional Information - Updated with gradient effects */}
      <div className={`rounded-2xl p-8 mb-12 text-center relative overflow-hidden
        ${isDark 
          ? 'bg-gradient-to-b from-gray-800/80 to-gray-900/80 border border-gray-700 shadow-blue-500/10 shadow-pink-500/5' 
          : 'bg-gradient-to-b from-white/80 to-gray-100/80 border border-gray-200 shadow-blue-400/20 shadow-purple-400/10'
        } shadow-lg transition-all duration-300 hover:shadow-blue-500/30 hover:shadow-pink-500/20`}>
        
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
        
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 relative z-10">
          Looking forward to connecting with you!
        </h3>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto relative z-10">
          I typically respond to emails within 24 hours. For urgent matters, feel free to reach out on WhatsApp or give me a call.
        </p>
      </div>
      
      {/* Social Media Links - Updated with gradient effects */}
      <div className={`rounded-2xl p-8 relative overflow-hidden
        ${isDark 
          ? 'bg-gradient-to-b from-gray-800/80 to-gray-900/80 border border-gray-700 shadow-blue-500/10 shadow-pink-500/5' 
          : 'bg-gradient-to-b from-white/80 to-gray-100/80 border border-gray-200 shadow-blue-400/20 shadow-purple-400/10'
        } shadow-lg transition-all duration-300 hover:shadow-blue-500/30 hover:shadow-pink-500/20`}>
        
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
        
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center relative z-10">
          Follow Me On
        </h3>
        
        <div className="flex justify-center space-x-8 relative z-10">
          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/hira-baig-195b13338/"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative"
          >
            <div className={`h-16 w-16 rounded-full flex items-center justify-center text-white transition-all duration-300 transform hover:scale-110 border
              ${isDark 
                ? 'bg-gradient-to-r from-blue-700 to-blue-800 border-blue-600 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50' 
                : 'bg-gradient-to-r from-blue-600 to-blue-700 border-blue-500 shadow-lg shadow-blue-400/30 hover:shadow-blue-400/50'
              }`}
            >
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </div>
            <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
              LinkedIn
            </span>
          </a>
          
          {/* GitHub - Fixed SVG */}
          <a
            href="https://github.com/hiramustafabaig"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative"
          >
            <div className={`h-16 w-16 rounded-full flex items-center justify-center text-white transition-all duration-300 transform hover:scale-110 border
              ${isDark 
                ? 'bg-gradient-to-r from-gray-800 to-gray-900 border-gray-700 shadow-lg shadow-gray-500/30 hover:shadow-gray-500/50' 
                : 'bg-gradient-to-r from-gray-700 to-gray-800 border-gray-600 shadow-lg shadow-gray-400/30 hover:shadow-gray-400/50'
              }`}
            >
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </div>
            <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
              GitHub
            </span>
          </a>

          {/* Instagram */}
          {/* <a
            href="https://instagram.com/whos_hira_"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative"
          >
            <div className={`h-16 w-16 rounded-full flex items-center justify-center text-white transition-all duration-300 transform hover:scale-110 border
              ${isDark 
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 border-purple-500 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50' 
                : 'bg-gradient-to-r from-purple-500 to-pink-500 border-purple-400 shadow-lg shadow-purple-400/30 hover:shadow-purple-400/50'
              }`}
            >
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </div>
            <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
              Instagram
            </span>
          </a> */}
        </div>
      </div>
    </div>
  )
}

export default Contact