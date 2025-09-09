// src/pages/Home.jsx
import { Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { skills } from '../data/skills'

const Home = () => {
  const canvasRef = useRef(null)
  const contentRef = useRef(null)
  const [theme, setTheme] = useState('dark')
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  
  // Detect theme change
  useEffect(() => {
    const html = document.documentElement
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          setTheme(html.classList.contains('dark') ? 'dark' : 'light')
        }
      })
    })
    
    observer.observe(html, { attributes: true })
    setTheme(html.classList.contains('dark') ? 'dark' : 'light')
    
    return () => observer.disconnect()
  }, [])
  
  // Filter out the skills we want to remove and replace Teamwork with Machine Learning
  const filteredSkills = skills.filter(skill => 
    !['Project Management', 'Automation', 'Communication'].includes(skill.name)
  ).map(skill => 
    skill.name === 'Teamwork' 
      ? { 
          ...skill, 
          name: 'Communication', 
          icon: '🗣️', 
          description: 'Clear technical communication' 
        } 
      : skill
  )

  // Core values data
  const coreValues = [
    {
      name: "Innovation",
      icon: "💡",
      description: "Constantly exploring new technologies and creative solutions to complex problems"
    },
    {
      name: "Excellence",
      icon: "⭐",
      description: "Striving for the highest quality in every project and continuous improvement"
    },
    {
      name: "Collaboration",
      icon: "🤝",
      description: "Working effectively with teams to achieve shared goals and create better outcomes"
    },
    {
      name: "Lifelong Learning",
      icon: "📚",
      description: "Continuously updating skills and knowledge in the rapidly evolving tech landscape"
    }
  ]

  // Hexagon grid animation for hero background
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    let animationFrameId
    let hexagons = []
    const colors = [
      'rgba(66, 153, 225, 0.15)', // blue
      'rgba(128, 90, 213, 0.15)', // purple
      'rgba(236, 72, 153, 0.15)', // pink
    ]
    
    const resizeCanvas = () => {
      const heroSection = document.getElementById('hero-section')
      if (heroSection) {
        canvas.width = heroSection.offsetWidth
        canvas.height = heroSection.offsetHeight
      } else {
        canvas.width = window.innerWidth
        canvas.height = 600 // Default hero height
      }
    }
    
    window.addEventListener('resize', resizeCanvas)
    resizeCanvas()
    
    class Hexagon {
      constructor(x, y, size) {
        this.x = x
        this.y = y
        this.size = size
        this.color = colors[Math.floor(Math.random() * colors.length)]
        this.alpha = 0.1 + Math.random() * 0.2
        this.pulseDirection = Math.random() > 0.5 ? 1 : -1
        this.pulseSpeed = 0.3 + Math.random() * 0.7
      }
      
      update() {
        // Pulse animation
        this.alpha += 0.005 * this.pulseDirection * this.pulseSpeed
        if (this.alpha > 0.3 || this.alpha < 0.1) {
          this.pulseDirection *= -1
        }
      }
      
      draw() {
        ctx.beginPath()
        for (let i = 0; i < 6; i++) {
          const angle = (Math.PI / 3) * i
          const x = this.x + this.size * Math.cos(angle)
          const y = this.y + this.size * Math.sin(angle)
          if (i === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }
        ctx.closePath()
        ctx.fillStyle = this.color.replace('0.15', this.alpha)
        ctx.fill()
      }
    }
    
    const initHexagons = () => {
      hexagons = []
      const size = 40
      const horizontalSpacing = size * Math.sqrt(3)
      const verticalSpacing = size * 1.5
      
      const cols = Math.ceil(canvas.width / horizontalSpacing) + 1
      const rows = Math.ceil(canvas.height / verticalSpacing) + 1
      
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = col * horizontalSpacing
          const y = row * verticalSpacing
          
          // Offset every other column
          if (col % 2 === 0) {
            hexagons.push(new Hexagon(x, y, size))
          } else {
            hexagons.push(new Hexagon(x, y + verticalSpacing / 2, size))
          }
        }
      }
    }
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      for (let i = 0; i < hexagons.length; i++) {
        hexagons[i].update()
        hexagons[i].draw()
      }
      
      animationFrameId = requestAnimationFrame(animate)
    }
    
    initHexagons()
    animate()
    
    // Clean up
    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [theme])
  
  // Floating animation for elements
  useEffect(() => {
    const elements = contentRef.current?.querySelectorAll('.float-element')
    if (!elements) return
    
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      })
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    
    const interval = setInterval(() => {
      elements.forEach((el, i) => {
        const yOffset = Math.sin(Date.now() / 1000 + i) * 5
        el.style.transform = `translateY(${yOffset}px) translateX(${(mousePosition.x - 0.5) * 10}px)`
      })
    }, 50)
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      clearInterval(interval)
    }
  }, [mousePosition])

  return (
    <div 
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
      ref={contentRef}
    >
      {/* Hero Section with Hexagon Animation */}
      <section 
        id="hero-section"
        className="relative py-16 md:py-24 overflow-hidden"
      >
        {/* Animated Background Canvas */}
        <canvas 
          ref={canvasRef}
          className="absolute inset-0 w-full h-full z-0 opacity-50"
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white dark:to-gray-900 z-1"></div>
        
        {/* Glowing orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full filter blur-3xl animate-pulse-slow delay-1000"></div>
        
        {/* Content with higher z-index */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16">
            <div className="flex-1 order-2 md:order-1 md:ml-auto md:pr-12">
              <div className="relative group float-element" style={{maxWidth: '280px', marginLeft: 'auto'}}>
                {/* Modern frame with theme-aware gradients */}
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 dark:from-blue-500 dark:via-purple-500 dark:to-pink-500 rounded-xl opacity-70 group-hover:opacity-100 transition-all duration-500 rounded-xl"></div>
                
                <div className="relative bg-white dark:bg-gray-800 rounded-lg overflow-hidden transform transition-all duration-500 group-hover:-translate-y-1 border border-gray-200 dark:border-gray-700 shadow-xl">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent z-10"></div>
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-400/10 via-transparent to-transparent dark:from-blue-500/10"></div>
                  
                  {/* Optimized square image container */}
                  <div className="relative w-84 h-82 mx-auto overflow-hidden">
                    <img
                      src="/images/profile/with-bg.jpeg"
                      alt="Hira Baig"
                      className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                      style={{objectPosition: 'center top'}}
                    />
                  </div>
                  
                  {/* Animated corner accents */}
                  <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-blue-500 opacity-70"></div>
                  <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-purple-500 opacity-70"></div>
                  <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-pink-500 opacity-70"></div>
                  <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-blue-500 opacity-70"></div>
                </div>
              </div>
            </div>
            
            <div className="flex-1 text-center md:text-left order-1 md:order-2">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4 inline-block relative float-element">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-400 pb-2">
                  Hira Baig
                </span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500 group-hover:w-full"></span>
              </h1>
              
              <h2 className="text-xl md:text-2xl mb-6 font-light float-element text-gray-600 dark:text-gray-300">
                <span className="text-blue-500 dark:text-blue-400 font-medium">Data Scientist</span> 
                <span className="mx-2 text-gray-400">|</span>
                <span className="text-purple-500 dark:text-purple-400 font-medium">AI & ML Enthusiast</span>
              </h2>
              
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl leading-relaxed float-element">
                Transforming complex data into intelligent solutions through cutting-edge AI and machine learning technologies.
              </p>
              
              <div className="flex flex-wrap gap-4 justify-center md:justify-start float-element">
                <Link
                  to="/projects"
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-lg font-medium transition-all duration-300 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-0.5 flex items-center gap-2 group"
                >
                  <span>View Projects</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
                
                <Link
                  to="/contact"
                  className="px-6 py-3 border border-blue-500 text-blue-500 dark:text-blue-400 hover:bg-blue-500/10 dark:hover:bg-blue-500/10 rounded-lg font-medium transition-all duration-300 shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 hover:-translate-y-0.5"
                >
                  Contact Me
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-16 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4 inline-block relative group">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-400">
                Skills & Expertise
              </span>
              <span className=" absolute -bottom-1 left-1/4 w-1/2 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transform origin-center transition-transform duration-500 group-hover:scale-x-125"></span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Technical proficiencies that drive innovative solutions and deliver exceptional results
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {filteredSkills.map((skill, index) => (
              <div 
                key={skill.name} 
                className="group relative rounded-xl overflow-hidden transition-all duration-300 transform hover:-translate-y-2 cursor-pointer bg-white dark:bg-gray-800/60 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-lg shadow-blue-500/10 hover:shadow-xl hover:shadow-blue-500/20 dark:shadow-blue-500/5 dark:hover:shadow-blue-500/15 p-5 text-center float-element"
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                {/* Hover gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Animated border gradient */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-[1.5px]">
                  <div className="w-full h-full bg-white dark:bg-gray-800 rounded-xl"></div>
                </div>

                <div className="relative z-10">
                  <div className="text-3xl mb-3 transform group-hover:scale-110 transition-transform duration-300">{skill.icon}</div>
                  <h3 className="font-semibold text-gray-800 dark:text-white mb-1 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors duration-300">{skill.name}</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-300 transition-colors duration-300">{skill.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-16 bg-gray-50/80 dark:bg-gray-900/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4 inline-block relative group">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-400">
                Core Values
              </span>
              <span className="absolute -bottom-1 left-1/4 w-1/2 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transform origin-center transition-transform duration-500 group-hover:scale-x-125"></span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              The principles that guide my work and approach to technology
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {coreValues.map((value, index) => (
              <div 
                key={value.name} 
                className="group relative rounded-xl overflow-hidden transition-all duration-300 transform hover:-translate-y-2 cursor-pointer bg-white dark:bg-gray-800/60 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-lg shadow-blue-500/10 hover:shadow-xl hover:shadow-blue-500/20 dark:shadow-blue-500/5 dark:hover:shadow-blue-500/15 p-5 text-center float-element"
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                {/* Hover gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Animated border gradient */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-[1.5px]">
                  <div className="w-full h-full bg-white dark:bg-gray-800 rounded-xl"></div>
                </div>

                <div className="relative z-10">
                  <div className="text-3xl mb-3 transform group-hover:scale-110 transition-transform duration-300">{value.icon}</div>
                  <h3 className="font-semibold text-gray-800 dark:text-white mb-2 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors duration-300">{value.name}</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-300 transition-colors duration-300 leading-relaxed">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home