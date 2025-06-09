import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useResume } from '../../context/ResumeContext';
import TemplateOne from '../../assets/Template1.png';
import TemplateTwo from '../../assets/Template2.jpeg';
import TemplateThree from '../../assets/Template3.jpeg';

import Header from '../../components/custom/Header';

const templates = [
  { id: 1, name: 'Modern', component: 'TemplateOne', image: TemplateOne  },
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
   
    <div className="p-6 flex flex-col bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 items-center px-4 py-8">
      <h1 className="text-4xl font-bold mt-25 mb-3">Choose Your <span className='text-purple-600'>Resume</span> Template</h1>
      <p className="text-lg text-gray-700 mb-10">Get your resume up and reasy with our beautiful templates.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-15">
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
     </>
  );
};

export default SelectTemplate;
