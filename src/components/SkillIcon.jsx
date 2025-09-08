// src/components/SkillIcon.jsx
const SkillIcon = ({ name, icon, description, className = "" }) => {
  return (
    <div className={`group relative bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${className}`}>
      <div className="text-center">
        <div className="w-12 h-12 mx-auto mb-4 text-primary-600 dark:text-primary-400 group-hover:scale-110 transition-transform text-4xl">
          {icon}
        </div>
        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
          {name}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {description}
        </p>
      </div>
      
      {/* Hover effect background */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-purple-600 opacity-0 group-hover:opacity-5 rounded-xl transition-opacity duration-300"></div>
    </div>
  )
}

export default SkillIcon