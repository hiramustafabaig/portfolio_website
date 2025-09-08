// src/pages/About.jsx
import { useTheme } from '../context/ThemeContext'
import { education } from '../data/education'
import { certificates } from '../data/certificates'
import { hobbies } from '../data/hobbies'

const About = () => {
  const { isDark } = useTheme()

  // Updated hobbies data with requested changes
  const updatedHobbies = hobbies.map(hobby => {
    if (hobby.name === "Chess") {
      return {
        ...hobby,
        name: "Cricket",
        icon: "🏏",
        description: "Enjoy playing and watching cricket matches, especially T20 format"
      }
    } else if (hobby.name === "Music") {
      return {
        ...hobby,
        name: "Singing",
        icon: "🎤",
        description: "Passionate about singing various genres, from classical to contemporary"
      }
    } else if (hobby.name === "Gaming") {
      return {
        ...hobby,
        name: "Crafting",
        icon: "✂️",
        description: "Creating handmade crafts, DIY projects, and artistic creations"
      }
    }
    return hobby
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* About Me Section */}
      <section className="mb-16">
        {/* Main About Me Heading */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 inline-block relative group pb-2">
            About Me
            <span className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500 group-hover:w-full"></span>
            <span className="absolute bottom-0 left-0 w-1/4 h-1 bg-gradient-to-r from-pink-500 to-blue-500 group-hover:animate-pulse"></span>
          </h1>
          {/* About Me Description */}
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Discover my journey, passions, and the experiences that have shaped my career in technology and data science.
          </p>
        </div>

        {/* My Journey Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 inline-block relative group pb-3">
            My Journey
            <span className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500 group-hover:w-full"></span>
            <span className="absolute bottom-0 left-0 w-1/4 h-1 bg-gradient-to-r from-pink-500 to-blue-500 group-hover:animate-pulse"></span>
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <p className="text-gray-600 dark:text-gray-300 mb-4 text-lg">
              Hi, I am <span className="font-bold text-blue-600 dark:text-blue-400">Hira Baig</span>, a student at <span className="font-bold text-blue-600 dark:text-blue-400">COMSATS University Islamabad</span>. 
              I am a passionate <span className="font-bold text-blue-600 dark:text-blue-400">Data Scientist</span>, <span className="font-bold text-blue-600 dark:text-blue-400">MERN Stack Developer</span>, and <span className="font-bold text-blue-600 dark:text-blue-400">AI/ML Enthusiast</span> with a unique background in pre-medical studies.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Transitioning into the world of computing was not easy, yet through resilience and optimism, I turned challenges into opportunities for growth.
              My journey began during my university years, where the initial semesters were tough, but with hard work and consistency, I gradually built a strong foundation in programming, data science, and web development.
              Over time, I developed expertise in both frontend and backend development, alongside data science and machine learning.
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              I am particularly enthusiastic about <span className="font-bold">Generative AI</span>, <span className="font-bold">Deep Learning</span>, and building intelligent systems that merge innovation with real-world impact.
              My passion lies in creating data-driven projects and AI models that solve complex problems while ensuring practical value.
              Beyond coding, I enjoy exploring emerging technologies, contributing to collaborative projects, and sharing knowledge through technical discussions and workshops.
            </p>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="mb-16">
        {/* Education Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 inline-block relative group pb-2">
            Education
            <span className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500 group-hover:w-full"></span>
            <span className="absolute bottom-0 left-0 w-1/4 h-1 bg-gradient-to-r from-pink-500 to-blue-500 group-hover:animate-pulse"></span>
          </h2>
          {/* Education Description */}
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            My academic journey and qualifications that have provided the foundation for my technical expertise.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {education.map((edu) => (
            <div key={edu.id} className="group relative rounded-xl overflow-hidden transition-all duration-300 transform hover:-translate-y-2 cursor-pointer bg-gradient-to-b from-white/80 to-gray-100/80 dark:from-gray-800/80 dark:to-gray-900/80 border border-gray-200 dark:border-gray-700 shadow-lg shadow-blue-400/20 shadow-purple-400/10 hover:shadow-blue-400/30 hover:shadow-purple-400/20 dark:shadow-blue-500/10 dark:shadow-pink-500/5 dark:hover:shadow-blue-500/30 dark:hover:shadow-pink-500/20">
              
              {/* Gradient Hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Gradient border effect on hover */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              <div className="absolute inset-0 rounded-xl border border-transparent group-hover:border-blue-500/30 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all duration-300"></div>

              {/* Institution Image */}
              <div className="relative overflow-hidden h-48">
                <img
                  src={edu.image}
                  alt={edu.institution}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzY0NjQ2NCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9IjAuMzVlbSI+RWR1Y2F0aW9uIEluc3RpdHV0ZTwvdGV4dD48L3N2Zz4=';
                  }}
                />
              </div>

              <div className="p-6 relative z-10">
                {/* Degree and Period */}
                <div className="mb-4">
                  <h3 className="text-lg font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                    {edu.degree}
                  </h3>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'} mb-2`}>
                    {edu.period}
                  </p>
                </div>

                {/* Institution */}
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                    {edu.institution}
                  </h4>
                </div>

                {/* Description */}
                <p className={`text-sm mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {edu.description}
                </p>

                {/* Completion Badge */}
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${isDark ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'}`}>
                    Completed
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Certifications Section */}
      <section className="mb-16">
        {/* Awards & Certifications Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 inline-block relative group pb-2">
            Awards & Certifications
            <span className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500 group-hover:w-full"></span>
            <span className="absolute bottom-0 left-0 w-1/4 h-1 bg-gradient-to-r from-pink-500 to-blue-500 group-hover:animate-pulse"></span>
          </h2>
          {/* Awards & Certifications Description */}
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Recognitions and credentials I've earned through dedicated learning and professional development.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificates.map((cert) => (
            <div key={cert.id} className="group relative rounded-xl overflow-hidden transition-all duration-300 transform hover:-translate-y-2 cursor-pointer bg-gradient-to-b from-white/80 to-gray-100/80 dark:from-gray-800/80 dark:to-gray-900/80 border border-gray-200 dark:border-gray-700 shadow-lg shadow-blue-400/20 shadow-purple-400/10 hover:shadow-blue-400/30 hover:shadow-purple-400/20 dark:shadow-blue-500/10 dark:shadow-pink-500/5 dark:hover:shadow-blue-500/30 dark:hover:shadow-pink-500/20">
              
              {/* Gradient Hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Gradient border effect on hover */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              <div className="absolute inset-0 rounded-xl border border-transparent group-hover:border-blue-500/30 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all duration-300"></div>

              {/* Certificate Image */}
              <div className="relative overflow-hidden h-48">
                <img 
                  src={cert.image} 
                  alt={cert.title}
                  className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzY0NjQ2NCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9IjAuMzVlbSI+Q2VydGlmaWNhdGU8L3RleHQ+PC9zdmc+';
                  }}
                />
              </div>

              {/* Certificate Details */}
              <div className="p-6 relative z-10">
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                  {cert.title}
                </h3>
                <p className="text-blue-600 dark:text-blue-400 font-semibold text-sm mb-2">
                  {cert.issuer}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                  {cert.date}
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {cert.description}
                </p>
                
                {/* Certificate Badge */}
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${isDark ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800'}`}>
                    Certified
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Hobbies & Interests Section */}
      <section>
        {/* Hobbies & Interests Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 inline-block relative group pb-2">
            Hobbies & Interests
            <span className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500 group-hover:w-full"></span>
            <span className="absolute bottom-0 left-0 w-1/4 h-1 bg-gradient-to-r from-pink-500 to-blue-500 group-hover:animate-pulse"></span>
          </h2>
          {/* Hobbies & Interests Description */}
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Activities and pursuits that inspire creativity and bring balance to my professional life.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {updatedHobbies.map((hobby) => (
            <div key={hobby.id} className="group relative rounded-xl overflow-hidden transition-all duration-300 transform hover:-translate-y-2 cursor-pointer bg-gradient-to-b from-white/80 to-gray-100/80 dark:from-gray-800/80 dark:to-gray-900/80 border border-gray-200 dark:border-gray-700 shadow-lg shadow-blue-400/20 shadow-purple-400/10 hover:shadow-blue-400/30 hover:shadow-purple-400/20 dark:shadow-blue-500/10 dark:shadow-pink-500/5 dark:hover:shadow-blue-500/30 dark:hover:shadow-pink-500/20 p-6 text-center">
              
              {/* Gradient Hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Gradient border effect on hover */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              <div className="absolute inset-0 rounded-xl border border-transparent group-hover:border-blue-500/30 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all duration-300"></div>

              <div className="relative z-10">
                <div className="text-4xl mb-4">{hobby.icon}</div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">{hobby.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{hobby.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default About