import React, { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { AiOutlineDownload } from 'react-icons/ai';


const TemplateOne = ({ data }) => {
  console.log("TemplateOne received data:", data);

  const resumeRef = useRef(); 

  const handleDownloadPDF = () => {
    const input = resumeRef.current;
    
    html2canvas(input, { scale: 3, useCORS: true }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png"); 
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210; 
      const pageHeight = 267; 
      const imgHeight = (canvas.height * imgWidth) / canvas.width; 

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight, "", "FAST");

      heightLeft -= pageHeight;
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight, "", "FAST");
        heightLeft -= pageHeight;
      }

      pdf.save("My_Resume.pdf");
    });
  };

  return (
    <div className="w-full h-full flex flex-col  items-center">
      <div ref={resumeRef} className="w-90 md:w-130 lg:w-120 shadow-lg m-auto min-h-120 max-h-auto mt-10 flex bg-[#f7fdf8] flex-col">
        
        <div className="flex w-full">
          <div className="flex flex-col text-black justify-start  items-start h-auto bg-[#386381] w-2/5 px-4 py-6 overflow-hidden gap-4">
            <div className="border-b-2 border-white w-full pb-3">
              <div className="flex justify-center items-center mb-2">
                <img src={data.profileImage || ""} alt="Profile" className="object-cover mb-3 border-3 border-[#49413a] w-35 h-35" />
              </div>
                <div className="w-full mb-3">
              <p className="text-[14px] font-bold text-white">About Me</p>
              <p className="text-[11px] break-words w-full text-white">
                {data.summary || "Your summary goes here..."}
              </p>
            </div>

              <p className="text-[12px] break-words text-white"><span className='font-bold'>Address:</span> {data.address || "123 Main Street"}</p>
              <p className="text-[12px] break-words text-white"><span className='font-bold'>Phone:</span> {data.phone || "N/A"}</p>
              <p className="text-[12px] break-words text-white"><span className='font-bold'>Email:</span> {data.email || "N/A"}</p>
              <p className="text-[12px] break-words text-white"><span className='font-bold'>Job Title:</span> {data.linkedin || "N/A"}</p>
            </div>

            <div className="w-full text-white">
              <p className="text-[14px] font-bold">Skills</p> 
              <ul className="list-disc text-white pl-4 text-[11px]">
                {data.skills && data.skills.length > 0 ? data.skills.map((skill, index) => <li key={index}>{skill}</li>) : <li>No skills added</li>}
              </ul>
            </div>

          </div>

          <div className="bg-[#F7FDF8] flex flex-col justify-start h-auto w-3/5 px-2 pl-4 py-6 gap-6">
            <h1 className="text-left text-2xl break font-bold">{data.fullName || 'Your Name'}</h1>
            
              <div>
              <p className="text-[14px] font-bold">Certifications</p>
              {data.certifications && data.certifications.length > 0 ? (
                data.certifications.map((cert, index) => (
                  <div key={index} className="text-[11px]">
                    <strong>Degree</strong> - {cert.name || "Certification Name"} <br />
                    {cert.startYear || "Start Year"} - {cert.endYear || "End Year"}
                    <strong className='font-bold block'>Issuer:</strong> {cert.issuer || "Issuer Name"}
                  </div>
                ))
              ) : (
                <p className="text-[11px]">No education details added</p>
              )}
            </div>

            <div>
              <p className="text-[14px] font-bold">Experience</p>
              {data.experiences && data.experiences.length > 0 ? (
                data.experiences.map((exp, index) => (
                  <div key={index} className="text-[11px] break-words">
                    <strong>Company Name:</strong> {exp.companyName || 'Company name'}<br />
                    <strong>Dates:</strong> {exp.startDate} - {exp.endDate} <br />
                    <strong className='font-bold'>Contributions:</strong> {exp.roles || "No contributions listed"}
                    <hr className='mb-3 mt-3 w-full bg-[#000080] h-[1px]'/>
                  </div>
                ))
              ) : (
                <p className="text-[11px]">No experience added</p>
              )}
            </div>

          
            
          </div>
          
        </div>
        
           
      </div>

      <button 
        onClick={handleDownloadPDF} 
        className="flex items-center justify-between w-40 mt-4 bg-purple-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
      >
        Download PDF<AiOutlineDownload className="mr-2" />
      </button>
    </div>
  );
};

export default TemplateOne;
