// src/components/Card.jsx
const Card = ({ children, className = "", hoverEffect = false, ...props }) => {
  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-all duration-300 ${
        hoverEffect ? "hover:shadow-lg hover:-translate-y-1" : ""
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

export default Card