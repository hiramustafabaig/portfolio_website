// src/pages/Blogs.jsx
import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext'; 

const Blogs = () => {
  const { isDark } = useTheme();
  const [expandedPost, setExpandedPost] = useState(null);
  const [email, setEmail] = useState('');

  const blogPosts = [
    {
      id: 1,
      title: "The Power of Data Science: Transforming Industries",
      author: "Hira Baig",
      date: "July 32, 2024",
      excerpt: "Data science has emerged as a transformative force in modern industries, revolutionizing the way businesses operate and make decisions...",
      image: "/images/blogs/datascience.jpg", 
      readTime: "5 min read",
      pdfPath: "/The Power of Data Science by Hira Baig.pdf",
      content: `
        <p>Data science has emerged as a transformative force in modern industries, revolutionizing the way businesses operate and make decisions. By harnessing the power of vast amounts of data, organizations can uncover hidden patterns, predict future trends, and optimize their operations. This blog delves into how data science is reshaping various sectors, demonstrating its profound impact across different domains.</p>
        
        <h3>Revolutionizing Healthcare</h3>
        <p>In the healthcare sector, data science has made remarkable strides. Advanced analytics enable personalized medicine by tailoring treatments to individual patients based on their unique genetic makeup and medical history. Predictive models are used to foresee disease outbreaks, manage chronic conditions, and improve patient care.</p>
        
        <h3>Transforming Finance</h3>
        <p>The financial industry has been significantly transformed by data science. Algorithms analyze market trends in real-time, enabling more informed investment decisions. Risk assessment models have become more sophisticated, allowing financial institutions to evaluate creditworthiness with greater accuracy.</p>
        
        <h3>Optimizing Retail and E-commerce</h3>
        <p>Retailers are leveraging data science to enhance customer experiences and optimize operations. Recommendation engines analyze customer behavior to suggest products tailored to individual preferences, increasing sales and customer satisfaction.</p>
      `
    },
    {
      id: 2,
      title: "The Evolution of Operating Systems in the Age of Artificial Intelligence",
      author: "Hira Baig",
      date: "March 22, 2025",
      excerpt: "The rapid advancement of Artificial Intelligence (AI), Machine Learning (ML), and Data Science has necessitated a fundamental transformation in operating system (OS) architectures...",
      image: "/images/blogs/os.webp", 
      readTime: "7 min read",
      pdfPath: "/The Evolution of Operating Systems in the Age of Artificial Intelligence by Hira Baig.pdf",
      content: `
        <p>The rapid advancement of Artificial Intelligence (AI), Machine Learning (ML), and Data Science has necessitated a fundamental transformation in operating system (OS) architectures. Traditional OS models, designed for general-purpose computing, are increasingly inadequate for handling AI-driven workloads that demand real-time processing, parallel computing capabilities, and intelligent automation.</p>
        
        <h3>Transformation of Operating Systems by AI, ML, and Data Science</h3>
        <p>The integration of AI, ML, and Data Science into computing has necessitated significant transformations in OS design and functionality.</p>
        
        <h3>Real-Time Processing</h3>
        <p>Modern AI applications require real-time processing capabilities that traditional operating systems were not designed to handle. Next-generation OS architectures incorporate specialized schedulers that prioritize AI workloads, minimize latency, and ensure timely execution of critical tasks.</p>
        
        <h3>Parallel Computing Capabilities</h3>
        <p>AI and ML algorithms excel when they can leverage parallel processing across multiple cores and accelerators. Contemporary operating systems have evolved to better manage heterogeneous computing resources, including GPUs, TPUs, and other specialized AI chips.</p>
      `
    }
  ];

  const toggleExpand = (postId) => {
    setExpandedPost(expandedPost === postId ? null : postId);
  };

  const downloadPDF = (pdfPath, title) => {
    // Create a temporary anchor element
    const link = document.createElement('a');
    link.href = pdfPath;
    link.download = title + '.pdf';
    
    // Append to the document, trigger click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      alert('Please enter your email address.');
      return;
    }
    
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }
    
    // Show success message
    alert(`Thank you for subscribing with ${email}! You'll receive updates on new articles.`);
    
    // Clear the email field
    setEmail('');
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-gray-900 text-gray-100' : 'bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900'}`}>
      <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Updated Header with Gradient Underline */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 inline-block relative group p-2">
            Articles and Blogs
            <span className="absolute -bottom-2 left-0 w-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500 group-hover:w-full"></span>
            <span className="absolute -bottom-2 left-0 w-1/4 h-1 bg-gradient-to-r from-pink-500 to-blue-500 group-hover:animate-pulse"></span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mt-6">
            Insights on data science, AI, and technology trends transforming industries
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogPosts.map((post) => (
            <div key={post.id} className="group">
              <article className={`relative rounded-xl overflow-hidden transition-all duration-300 transform hover:-translate-y-2 
                ${isDark 
                  ? 'bg-gradient-to-b from-gray-800/80 to-gray-900/80 border border-gray-700' 
                  : 'bg-gradient-to-b from-white/80 to-gray-100/80 border border-gray-200'
                } 
                shadow-lg
                ${isDark 
                  ? 'shadow-blue-500/10 shadow-pink-500/5 hover:shadow-blue-500/30 hover:shadow-pink-500/20' 
                  : 'shadow-blue-400/20 shadow-purple-400/10 hover:shadow-blue-400/30 hover:shadow-purple-400/20'
                }`}>
                
                {/* Gradient Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Gradient border effect on hover */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                <div className="absolute inset-0 rounded-xl border border-transparent group-hover:border-blue-500/30 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all duration-300"></div>

                {/* Blog Image */}
                <div className="relative overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 transform group-hover:scale-105 ${
                      isDark 
                        ? 'bg-gradient-to-r from-blue-700 to-purple-700 text-blue-200' 
                        : 'bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800'
                    }`}>
                      Data Science
                    </span>
                  </div>
                </div>

                <div className="p-6 relative z-10">
                  {/* Date and Read Time */}
                  <div className="flex justify-between items-center mb-3">
                    <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {post.date}
                    </span>
                    <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {post.readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                    {post.title}
                  </h2>

                  {/* Author */}
                  <div className="flex items-center mb-4">
                    <div className="flex-shrink-0">
                      <div className={`h-8 w-8 rounded-full flex items-center justify-center font-bold transition-all duration-300 transform group-hover:scale-110
                        ${isDark 
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' 
                          : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                        }`}>
                        HB
                      </div>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium">Hira Baig</p>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        Data Scientist & AI Researcher
                      </p>
                    </div>
                  </div>

                  {/* Excerpt */}
                  <p className={`mb-4 leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    {post.excerpt}
                  </p>

                  {/* Expanded Content */}
                  {expandedPost === post.id && (
                    <div className={`prose max-w-none mb-4 ${isDark ? 'prose-invert' : ''}`} 
                         dangerouslySetInnerHTML={{ __html: post.content }} />
                  )}

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                    <button
                      onClick={() => toggleExpand(post.id)}
                      className={`inline-flex items-center px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 transform hover:scale-105
                        ${isDark 
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 hover:shadow-lg hover:shadow-blue-500/25' 
                          : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 hover:shadow-lg hover:shadow-blue-400/25'
                        }`}
                    >
                      {expandedPost === post.id ? 'Collapse' : 'View Blog'}
                      <svg className={`ml-2 h-4 w-4 transition-transform duration-300 ${expandedPost === post.id ? 'rotate-180' : ''}`} 
                           fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                              d={expandedPost === post.id ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
                      </svg>
                    </button>

                    <button 
                      onClick={() => downloadPDF(post.pdfPath, post.title)}
                      className={`inline-flex items-center px-4 py-2 rounded-md text-sm font-medium border transition-all duration-300 transform hover:scale-105
                      ${isDark 
                        ? 'border-gray-600 text-gray-300 hover:bg-gradient-to-r hover:from-gray-700 hover:to-gray-800 hover:text-white hover:shadow-lg hover:shadow-gray-500/25' 
                        : 'border-gray-300 text-gray-600 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 hover:text-blue-600 hover:shadow-lg hover:shadow-gray-400/25'
                      }`}>
                      Download PDF
                      <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>

        {/* Subscription Section with Hover Effects */}
        <div className={`mt-16 text-center p-8 rounded-2xl relative overflow-hidden transition-all duration-300
          ${isDark 
            ? 'bg-gradient-to-b from-gray-800/80 to-gray-900/80 border border-gray-700 shadow-blue-500/10 shadow-pink-500/5 hover:shadow-blue-500/30 hover:shadow-pink-500/20' 
            : 'bg-gradient-to-b from-white/80 to-gray-100/80 border border-gray-200 shadow-blue-400/20 shadow-purple-400/10 hover:shadow-blue-400/30 hover:shadow-purple-400/20'
          }`}>
          
          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
          
          <h3 className="text-2xl font-bold mb-4 relative z-10">Stay Updated with More Articles</h3>
          <p className="mb-6 max-w-2xl mx-auto relative z-10 text-gray-600 dark:text-gray-300">
            Get notified when new articles are published. No spam, just quality content.
          </p>
          
          <form onSubmit={handleSubscribe} className="flex max-w-md mx-auto relative z-10">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className={`flex-1 min-w-0 block w-full px-4 py-3 rounded-l-lg border transition-all duration-300
                ${isDark 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500' 
                  : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                }`}
            />
            <button
              type="submit"
              className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-r-lg transition-all duration-300 transform hover:scale-105
                ${isDark 
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 hover:shadow-lg hover:shadow-blue-500/25' 
                  : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 hover:shadow-lg hover:shadow-blue-400/25'
                }`}
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Blogs;