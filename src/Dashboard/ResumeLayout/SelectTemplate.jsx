import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useResume } from '../../context/ResumeContext';
import TemplateOne from '../../assets/Template1.png';
import TemplateTwo from '../../assets/Template2.jpeg';
import TemplateThree from '../../assets/Template3.jpeg';

import Header from '../../components/custom/Header';

const templates = [
  { id: 1, name: 'Modern', component: 'TemplateOne', image: TemplateOne },
  { id: 2, name: 'Classic', component: 'TemplateTwo', image: TemplateTwo },
  { id: 3, name: 'Creative', component: 'TemplateThree', image: TemplateThree },
];

const SelectTemplate = () => {
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
      <div className="min-h-screen px-4 py-10 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex flex-col items-center">
        <h1 className="text-xl mt-30 sm:mt-25 lg:mt-20 sm:text-3xl md:text-4xl font-bold text-center mb-2">
          Choose Your <span className="text-purple-600">Resume</span> Template
        </h1>
        <p className="text-md sm:text-lg text-gray-700 text-center mb-10">
          Get your resume up and ready with our beautiful templates.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
          {templates.map((template) => (
            <div
              key={template.id}
              className="cursor-pointer object-cover bg-white rounded-lg shadow-md hover:scale-105 transition transform duration-300"
              onClick={() => handleSelect(template)}
            >
              <img
                src={template.image}
                alt={template.name}
                className="w-full aspect-video object-contain rounded-t-lg"
              />
              <div className="p-4 text-center font-semibold">{template.name}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SelectTemplate;
