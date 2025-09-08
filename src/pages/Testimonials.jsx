// src/pages/Testimonials.jsx
import { useState } from 'react'
import SectionTitle from '../components/SectionTitle'
import Card from '../components/Card'

const Testimonials = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(null)

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      name: "Wajeeha Baig",
      position: "Student of Aviation Management",
      email: "wajeehabaig666@gmail.com",
      rating: 5,
      content: "Hira created an exceptional portfolio website for me that perfectly captures my professional identity. The website is not only visually stunning but also highly responsive across all devices. She paid close attention to my requirements and delivered beyond my expectations. The user experience is seamless, and I've received numerous compliments on the design. Hira's technical expertise and creative vision are truly impressive!",
      project: "Portfolio Website"
    },
    {
      id: 2,
      name: "Omer Bin Dawood",
      position: "AI Engineer at DevNeuron",
      email: "omerbindawood@gmail.com",
      rating: 5,
      content: "Working with Hira on my PowerBI dashboard was an incredible experience. She transformed complex data into intuitive visualizations that tell a compelling story. The dashboard she created is not only aesthetically pleasing but also highly functional with interactive elements that make data analysis effortless. Her attention to detail and understanding of business intelligence principles helped me gain valuable insights from my data. I highly recommend Hira for any data visualization projects!",
      project: "PowerBI Dashboard"
    },
    {
      id: 3,
      name: "Waiz Baig",
      position: "Student at KIPS College",
      email: "waizbaig123@gmail.com",
      rating: 5,
      content: "Hira's video editing and thumbnail creation skills are outstanding! She edited my YouTube videos with professional precision and created eye-catching thumbnails using Adobe tools that significantly increased my click-through rates. Her understanding of visual storytelling and attention to detail elevated my content quality. She has a great sense of timing, color theory, and what captures audience attention. Working with her was smooth and the results exceeded my expectations!",
      project: "YouTube Content Creation"
    }
  ]

  // Function to render star ratings
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={index < rating ? "text-yellow-400" : "text-gray-300"}
      >
        ★
      </span>
    ))
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Updated Header with Gradient Underline */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 inline-block relative group">
          Testimonials
          <span className="absolute -bottom-2 left-0 w-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500 group-hover:w-full"></span>
          <span className="absolute -bottom-2 left-0 w-1/4 h-1 bg-gradient-to-r from-pink-500 to-blue-500 group-hover:animate-pulse"></span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mt-6">
          What people I've worked with have to say about my work and professionalism
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((testimonial) => (
          <Card 
            key={testimonial.id} 
            hoverEffect={true}
            className="cursor-pointer h-full"
            onClick={() => setActiveTestimonial(testimonial)}
          >
            <div className="p-6 flex flex-col h-full">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold mr-4">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm text-blue-600 dark:text-blue-400">
                    {testimonial.position}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {testimonial.email}
                  </p>
                </div>
              </div>
              
              <div className="mb-4 flex">
                {renderStars(testimonial.rating)}
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow line-clamp-4">
                "{testimonial.content}"
              </p>
              
              <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Project: <span className="font-medium">{testimonial.project}</span>
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Testimonial Modal */}
      {activeTestimonial && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-2xl w-full">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-3xl font-bold mr-6">
                    {activeTestimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {activeTestimonial.name}
                    </h3>
                    <p className="text-blue-600 dark:text-blue-400">
                      {activeTestimonial.position}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {activeTestimonial.email}
                    </p>
                    <div className="flex mt-2">
                      {renderStars(activeTestimonial.rating)}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setActiveTestimonial(null)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="mb-6">
                <p className="text-gray-600 dark:text-gray-300 text-lg italic">
                  "{activeTestimonial.content}"
                </p>
              </div>
              
              <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Project: <span className="font-medium text-gray-900 dark:text-white">{activeTestimonial.project}</span>
                </p>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}

export default Testimonials