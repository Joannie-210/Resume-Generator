

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useResume } from './../context/ResumeContext';
import TemplateOne from './../assets/Template1.png';
import TemplateThree from './../assets/Template3.jpeg';
import Header from './../components/custom/Header';


const templates = [
  { id: 1, name: 'Modern', component: 'TemplateOne', image: TemplateOne  },
  { id: 2, name: 'Creative', component: 'TemplateThree', image: TemplateThree },
  
];

const Dashboard = () => {
  const navigate = useNavigate();
  const { setTemplate } = useResume();

  const handleSelect = (template) => {
    setTemplate(template.component);
    localStorage.setItem('selectedTemplate', template.component);
    navigate('/dashboard/resume-form');
  };

  return (
    <>
    <Header />
   
    <div className="p-6 flex flex-col bg-white  items-center px-4 py-8">
      <h1 className="text-3xl sm:text-4xl text-center font-bold mt-25 mb-3">Choose Your <span className='text-purple-600'>Resume</span> Template</h1>
      <p className="text-lg text-gray-700 mb-10">Get your resume up and reasy with our beautiful templates.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-15">
        {templates.map((template) => (
          <div
            key={template.id}
            className="w-80 shadow-md cursor-pointer hover:opacity-70 hover:scale-105 transition"
            onClick={() => handleSelect(template)}
          >
            <img src={template.image} alt={template.name} className="w-full h-100 object-contain" />
           
          </div>
        ))}
      </div>
    </div>
    <footer className="bg-gradient-to-tr mt-10 from-purple-100 to-blue-100 text-gray-800 pt-16 pb-8 px-6 md:px-20">
  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
    
    {/* Logo & Description */}
    <div>
      <h4 className="text-2xl font-bold text-purple-700">Resumate</h4>
      <p className="mt-4 text-gray-600 text-sm">
        Build job-winning resumes effortlessly with AI-powered guidance and stunning templates.
      </p>
    </div>

    {/* Navigation */}
    <div>
      <h3 className="text-lg font-semibold mb-4">Company</h3>
      <ul className="space-y-2 text-sm text-gray-600">
        <li><a href="#">About Us</a></li>
        <li><a href="#">Careers</a></li>
        <li><a href="#">Blog</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
    </div>

    {/* Quick Links */}
    <div>
      <h3 className="text-lg font-semibold mb-4">Resources</h3>
      <ul className="space-y-2 text-sm text-gray-600">
        <li><a href="#">FAQs</a></li>
        <li><a href="#">Templates</a></li>
        <li><a href="#">Privacy Policy</a></li>
        <li><a href="#">Terms of Service</a></li>
      </ul>
    </div>

    {/* Newsletter */}
    <div>
      <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
      <p className="text-sm text-gray-600 mb-4">Subscribe to our newsletter for tips and updates.</p>
      <form className="flex flex-col sm:flex-row gap-2">
        <input
          type="email"
          placeholder="Enter your email"
          className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 w-full"
        />
        <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition">
          Subscribe
        </button>
      </form>
    </div>

  </div>

  {/* Divider */}
  <div className="border-t border-gray-300 mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500">
    {/* Copyright */}
    <p>&copy; {new Date().getFullYear()} Resumate. All rights reserved.</p>

    {/* Social Icons */}
    <div className="flex space-x-4 mt-4 sm:mt-0">
      <a href="#" className="hover:text-purple-700 transition">
        <i className="fab fa-facebook-f"></i>
      </a>
      <a href="#" className="hover:text-purple-700 transition">
        <i className="fab fa-twitter"></i>
      </a>
      <a href="#" className="hover:text-purple-700 transition">
        <i className="fab fa-linkedin-in"></i>
      </a>
      <a href="#" className="hover:text-purple-700 transition">
        <i className="fab fa-github"></i>
      </a>
    </div>
  </div>
</footer>
     </>
  );
};

export default Dashboard;
