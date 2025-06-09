import React from "react";
import { useResume } from "../../context/ResumeContext";
import TemplateOne from "../Templates/TemplateOne";
import TemplateTwo from "../Templates/TemplateTwo";
import TemplateThree from "../Templates/TemplateThree";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const ResumePage = () => {
  const { formData, template } = useResume();
  const navigate = useNavigate();

  if (!formData) {
    // If no form data, redirect back to form or template selection
    navigate("/dashboard/select-template");
    return null;
  }

  const TemplateComponents = [
    TemplateOne,
    TemplateTwo,
    TemplateThree,
  ];

  const SelectedTemplate = TemplateComponents[template];

  return (
    <div className="p-10 max-w-5xl mx-auto">
      <Button onClick={() => navigate(-2)} className="mb-5">
        Back to Edit
      </Button>

      {SelectedTemplate ? (
        <SelectedTemplate data={formData} />
      ) : (
        <p>Please select a template.</p>
      )}
    </div>
  );
};

export default ResumePage;
