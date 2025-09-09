// src/pages/Projects.jsx
import { useState } from 'react'
import Popup from '../components/Popup'

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null)

  // Projects data
  const projects = [
    {
      id: 1,
      title: "HealthRisk AI - Diabetes Risk Assessment",
      description: "Python-based AI system that predicts diabetes risk levels (low/medium/high) based on health parameters. Users input BP, BMI, glucose levels, symptoms, and can upload reports. Provides personalized weekly health plans.",
      technologies: ["Python", "Machine Learning", "AI", "Flask", "Pandas", "Scikit-learn"],
      category: "AI & Healthcare",
      status: "Completed",
      image: "/images/projects/HealthRiskAI.jpg"
    },
    {
      id: 2,
      title: "Voting Management System",
      description: "Java OOP application with admin and voter roles. Features secure vote casting, encryption, voter eligibility checks, and real-time result statistics. Admin panel for comprehensive oversight.",
      technologies: ["Java", "OOP", "Encryption", "MySQL", "Swing GUI"],
      category: "Secure System",
      status: "Completed",
      image: "/images/projects/VotingManagementSystem.webp"
    },
    {
      id: 3,
      title: "Hostel Management System",
      description: "C++ DSA application for room booking (single/double/triple), rent payment plans, meal plans, and laundry services. Supports installment payments and facility management.",
      technologies: ["C++", "Data Structures", "File Handling", "OOP"],
      category: "Management System",
      status: "Completed",
      image: "/images/projects/HostelManagementSystem.jpeg"
    },
    {
      id: 4,
      title: "Career AI - Career Path Advisor",
      description: "Web app that suggests optimal career paths based on skills, interests, and education. Provides skill gap analysis, learning resources (videos, books, articles), and personalized study plans.",
      technologies: ["React", "Node.js", "AI", "MongoDB", "Express" , "SQL"],
      category: "Career Development",
      status: "Ongoing",
      image: "/images/projects/CareerAI.png"
    },
    {
      id: 5,
      title: "Ecommerce Power BI Dashboard",
      description: "Interactive sales analytics dashboard with visualizations of city-wise sales performance, trends, and percentage statistics. Features clean data modeling and intuitive UI.",
      technologies: ["Power BI", "Data Visualization", "DAX", "Data Modeling", "SQL"],
      category: "Data Analytics",
      status: "Completed",
      image: "/images/projects/EcommerceDashboardPowerBI.png"
    }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Updated Header with proper spacing between heading and underline */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 inline-block relative group pb-4">
          My Projects
          <span className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500 group-hover:w-full"></span>
          <span className="absolute bottom-0 left-0 w-1/4 h-1 bg-gradient-to-r from-pink-500 to-blue-500 group-hover:animate-pulse"></span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mt-8">
          I have worked on a diverse range of projects that have strengthened my command over various programming languages
           and enhanced my expertise with tools widely used in Data Science and Machine Learning. Currently, I am engaged in several
            ongoing projects that continue to expand my skills and knowledge in the field.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <div
            key={project.id}
            className="group relative rounded-xl overflow-hidden transition-all duration-300 transform hover:-translate-y-2 cursor-pointer bg-gradient-to-b from-white/80 to-gray-100/80 dark:from-gray-800/80 dark:to-gray-900/80 border border-gray-200 dark:border-gray-700 shadow-lg shadow-blue-400/20 shadow-purple-400/10 hover:shadow-blue-400/30 hover:shadow-purple-400/20 dark:shadow-blue-500/10 dark:shadow-pink-500/5 dark:hover:shadow-blue-500/30 dark:hover:shadow-pink-500/20"
            onClick={() => setSelectedProject(project)}
          >
            {/* Gradient Hover effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* Gradient border effect on hover */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            <div className="absolute inset-0 rounded-xl border border-transparent group-hover:border-blue-500/30 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all duration-300"></div>

            {/* Project Image */}
            <div className="h-48 relative overflow-hidden">
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity"></div>
              <div className="absolute bottom-4 left-4">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                  project.status === 'Completed' 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                    : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                }`}>
                  {project.status}
                </span>
              </div>
            </div>
            
            <div className="p-6 relative z-10">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {project.title}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                {project.description}
              </p>
              
              <div className="mb-3">
                <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                  {project.category}
                </span>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {project.technologies.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full transition-all duration-300 transform group-hover:scale-105"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 3 && (
                  <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-sm rounded-full">
                    +{project.technologies.length - 3}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <Popup
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        project={selectedProject}
      />
    </div>
  )
}

export default Projects