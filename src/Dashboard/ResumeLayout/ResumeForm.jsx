import React, { useState, useEffect } from "react";
import { useForm, useFieldArray, useWatch } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useResume } from '../../context/ResumeContext';
import TemplateOne from '../Templates/TemplateOne';
import TemplateTwo from "../Templates/TemplateTwo";
import TemplateThree from "../Templates/TemplateThree";
import { Button } from "@/components/ui/button";
import { FaUserCircle, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Header from "@/components/custom/Header";
import { useNavigate } from "react-router-dom";

// Validation schema for step 1: personal information
const StepOneSchema = yup.object().shape({
  fullName: yup.string().required("Full name is required"),
  email: yup.string().email("Invalid email format").required("Email is required"),
  address: yup.string().required("Address is required"),
  phone: yup.string().matches(/^\d{10,}$/, "Phone number must be at least 10 digits"),
  linkedin: yup.string().required("Please fill in your job title"),
  summary: yup.string().required("Please fill in your summary")

});

// Validation schema for step 2: work experience
const StepTwoSchema = yup.object().shape({
  experiences: yup.array()
    .of(yup.object().shape({
      companyName: yup.string().required("Must include your company name"),
      startDate: yup.date().required("Start date is required"),
      endDate: yup.date()
        .required("End date is required")
        .min(yup.ref("startDate"), "End date must be after start date"),
      roles: yup.string().required("Please fill in your roles"),
    }))
    .max(3, "You can only add up to 3 work experiences"),
});

// Validation schema for step 3: skills
const StepThreeSchema = yup.object().shape({
  skills: yup.array()
    .of(yup.string().required("Skill is required"))
    .max(10, "You can only add up to 10 skills"),
});

// Validation schema for step 4: certifications
const StepFourSchema = yup.object().shape({
  certifications: yup.array()
    .of(yup.object().shape({
      name: yup.string().required("Certification name is required"),
      startYear: yup.date().required("Start date is required"),
      endYear: yup.date().required("End date is required"),
      issuer: yup.string().required("Issuer is required"),
    }))
    .max(3, "You can only add up to 3 certifications"),
});

const ResumeForm = () => {
  const navigate = useNavigate();
  const { template, setTemplate, setFormData } = useResume();

  // Step control and UI state
  const [step, setStep] = useState(1);
  const [profileImage, setProfileImage] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [colorPalette, setColorPalette] = useState("default");

  // Warn user before closing tab (e.g. unsaved changes)
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = ''; // Required for Chrome
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  // Determine which schema to use based on current step
  const validateSchema = step === 1 ? StepOneSchema
    : step === 2 ? StepTwoSchema
    : step === 3 ? StepThreeSchema
    : StepFourSchema;

  // Initialize form with validation and default values
  const { register, handleSubmit, control, watch, formState: { errors }, setValue, getValues } = useForm({
    resolver: yupResolver(validateSchema),
    defaultValues: {
      experiences: [{ companyName: "", startDate: "", endDate: "", roles: "" }],
      certifications: [{ name: "", date: "", issuer: "" }],
      skills: [""],
    },
  });

  // Handle final submission after last step
  const onFinalSubmit = (data) => {
    setFormData(data);
    navigate("/dashboard/resume-page");
  };

  // Manage dynamic fields
  const { fields, append, remove } = useFieldArray({ control, name: "experiences" });
  const { fields: skillFields, append: appendSkill, remove: removeSkill } = useFieldArray({ control, name: "skills" });
  const { fields: certFields, append: appendCert, remove: removeCert } = useFieldArray({ control, name: "certifications" });

  // Skill suggestions (autocomplete logic)
  const handleInputChange = (e) => {
    const input = e.target.value;
    if (input) {
      const filteredSkills = skills.filter(skill => skill.toLowerCase().includes(input.toLowerCase()));
      setSuggestions(filteredSkills);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (skill) => {
    const currentSkills = getValues("skills");
    const skillIndex = currentSkills.findIndex((s) => s === "");

    if (skillIndex >= 0) {
      setValue(`skills.${skillIndex}`, skill);
    }

    setSuggestions([]);
  };

  // Load template from localStorage on mount
  useEffect(() => {
    const storedTemplate = localStorage.getItem("selectedTemplate");
    if (storedTemplate) {
      setTemplate(storedTemplate);
    }
  }, [setTemplate]);

  const formValues = watch(); // Watch form values in real-time

  // Save form data temporarily
  const onSubmit = (data) => {
    console.log("Form Data:", data);
    setFormData(data);
  };

  // Move to next step
  const onNext = (data) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setStep((prev) => prev + 1);
  };

  // Go to previous step
  const onPrev = () => {
    setStep((prev) => prev - 1);
  };

  // Mapping template names to components
  const TemplateComponents = {
    TemplateOne,
    TemplateTwo,
    TemplateThree
  };
  const SelectedTemplate = TemplateComponents[template]; // Chosen template component

  // Convert uploaded profile image to base64
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Add new skill input field
  const handleAddSkill = () => {
    if (getValues("skills").length < 12) {
      appendSkill("");
    } else {
      alert("You can only add up to 12 skills.");
    }
  };

  

    return (
      <>
      <Header/>
      <div className="scrollbar-thin scrollbar-thumb-purple-600 scrollbar-track-transparent overflow-x-hidden bg-center bg-cover w-full h-full min-h-screen  flex flex-col items-center justify-center">
      
        <div className="flex-col sm-w-80 md:w-150 md:min-w-130  lg:min-w-170  lg:w-280 xl:w-300 xl:max-w-400 md:max-w-500 space-y-6 sm:flex-col md:flex-col lg:flex-row m-auto  flex items-center justify-evenly">
          <div className="w-fit mt-1 mb-1 h-auto">
          <div className="flex mt-15 mb-10 justify-center items-center">
        
              <div className="mt-[-10px]">
          
            
          </div>
          {step === 1 && (
          <div className="pl-5 flex w-full m-auto mt-5 h-auto justify-start  gap-5 items-center ">
            <Button className='cursor-pointer bg-purple-600 text-white' onClick= {()=>navigate('/dashboard/select-template')}><FaArrowLeft size={4} />Templates</Button>
          
          </div>

        )}
            {step === 2 && (
          <div className="pl-5 flex w-full m-auto h-auto justify-start  gap-5 items-center ">
            <Button className='cursor-pointer bg-purple-600 text-white' onClick={onPrev}><FaArrowLeft size={4} /></Button>
          
              <Button className=' cursor-pointer bg-purple-600' onClick={handleSubmit(onNext)}>Next<FaArrowRight size={5} /> </Button>
            
          </div>

        )}
        {step === 3 && (
          <div className="pl-5 flex w-full m-auto h-auto justify-start  gap-5 items-center">
            <Button className='cursor-pointer bg-purple-600 text-white' onClick={onPrev}><FaArrowLeft size={4} /></Button>
          
              <Button className='cursor-pointer bg-purple-600' onClick={handleSubmit(onNext)}>Next<FaArrowRight size={5} /> </Button>
          </div>
        )}

      {step === 4 && (
    <div className="pl-5 flex w-full justify-start gap-5 items-center">
      <Button className="cursor-pointer bg-purple-600 text-white" onClick={onPrev}>
        <FaArrowLeft size={14} />
      </Button>
      <Button className="cursor-pointer bg-purple-600" onClick={handleSubmit((data) => {
        onNext(data); // Save data and go to Step 5 (preview)
      })}>
        Preview Resume
      </Button>
    </div>
  )}


        </div>
  {step !== 5 && (
        <form
    onSubmit={handleSubmit(onSubmit)}
    style={{ borderTop: "6px solid #7C3AED" }}
    className="
      w-90 max-w-6xl md:w-180 lg:w-135 lg:min-w-130
      mx-auto bg-white rounded-lg shadow-lg
      px-3 py-6 md:px-6 
      flex flex-col gap-4
    "
  >
              {step === 1 && (
                <>
                <h1 className="text-2xl text-center font-semibold">Personal Information</h1>
                  <label htmlFor="profileImage" className="mt-2 text-lg">
                    Upload Profile Picture
                  </label>
                 <div className="relative w-20 h-20 flex rounded-full overflow-hidden border-4 border-purple-600">
  <input
    type="file"
    accept="image/*"
    onChange={handleImageUpload}
    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
  />
  {profileImage ? (
    <img
      src={profileImage}
      alt="Profile"
      className="object-cover w-full h-full"
    />
  ) : (
    <FaUserCircle className="text-purple-600 w-full h-full" />
  )}
</div>

                  <label htmlFor="fullName">Full Name</label>
                  <input
                    type="text"
                    {...register("fullName")}
                    className=" p-1 pl-2 border-2 border-gray-300 rounded-lg"/>
                  <p className="text-red-500 text-sm">{errors.fullName?.message}</p>

                  <div className="flex w-full justify-evenly gap-3 items-center">
                    <div className="h-auto w-full flex flex-col justify-center">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        {...register("email")}
                        className="outline-none rounded-lg p-1 w-full border-2 border-gray-300 "
                      />
                      <p className="text-red-500 text-sm">{errors.email?.message}</p>
                    </div>
                    <div className="h-auto w-full flex flex-col justify-center">
                      <label htmlFor="address">Address</label>
                      <input
                        type="text"
                        {...register("address")}
                        className="outline-none w-full border-2 border-gray-300 rounded-lg p-1"
                      />
                      <p className="text-red-500 text-sm">{errors.address?.message}</p>
                    </div>
                  </div>

                  <div className="flex w-full justify-evenly gap-3 items-center">
                    <div className="h-auto w-full flex flex-col justify-center">
                      <label htmlFor="phone">Phone</label>
                      <input
                        type="text"
                        {...register("phone")}
                        className="w-full outline-none p-1 border-2 border-gray-300 rounded-lg"
                      />
                      <p className="text-red-500 text-sm">{errors.phone?.message}</p>
                    </div>
                    <div className="h-auto w-full flex flex-col justify-center">
                      <label htmlFor="linkedin">Job title</label>
                      <input
                        type="text"
                        {...register("linkedin")}
                        className="w-full outline-none p-1 border-2 border-gray-300 rounded-lg"
                      />
                      <p className="text-red-500 text-sm">{errors.linkedin?.message}</p>
                    </div>
                  </div>

                  <label htmlFor="summary">Write a brief summary about your role</label>
                <textarea
    rows="3"
    {...register("summary")}
    className="w-full border-2 border-gray-300 p-2 rounded-lg"
  />

                  <Button className="cursor-pointer bg-white border-2 border-purple-600 text-purple-600 my-4 hover:bg-purple-600 hover:text-white " text="Continue" onClick={handleSubmit(onNext)}>Continue</Button>
                </>
              )}


              {step === 2 && (
                <>
                <div className="h-130 overflow-y-scroll scrollbar-thin ">
                  <h1 className="text-2xl mt-5 text-center font-semibold">Work Experience</h1>

                  {fields.map((item, index) => (
                    <div key={item.id} className="mb-1 p-4 border-none ">
                      <label  htmlFor={`experiences[${index}].companyName`}>Company Name</label>
                      <input
                        type="text"
                        {...register(`experiences.${index}.companyName`)}
                        className="w-full border-2  border-gray-300 mb-4 mt-2 p-1 rounded-lg"
                      />
                      <p className="text-red-500 text-sm">
                        {errors.experiences?.[index]?.companyName?.message}
                      </p>

                      <div className="flex w-full justify-between gap-6">
                        <div className="w-full">
                          <label className="mb-20 " htmlFor={`experiences${index}.startDate`}>Start Date</label>
                          <input
                            type="date"
                            {...register(`experiences.${index}.startDate`)}
                            className="w-full border-2   border-gray-300 mb-4 mt-2 p-1 rounded-lg"
                          />
                          <p className="text-red-500 text-sm">
                            {errors.experiences?.[index]?.startDate?.message}
                          </p>
                        </div>

                        <div className="w-full">
                          <label htmlFor={`experiences[${index}].endDate`}>End Date</label>
                          <input
                            type="date"
                            {...register(`experiences.${index}.endDate`)}
                            className="w-full  mb-4 mt-2 border-2  border-gray-300 p-1 rounded-lg"
                          />
                          <p className="text-red-500 text-sm">
                            {errors.experiences?.[index]?.endDate?.message}
                          </p>
                        </div>
                      </div>

                      <label htmlFor={`experiences[${index}].roles`}>Your Contributions</label>
                      <textarea
                        maxLength={100}
                        rows="3"
                        {...register(`experiences.${index}.roles`)}
                        className="w-full mb-2 mt-2 border-gray-300 border-2 p-2 rounded-lg"
                      />
  <div className="flex flex-row-reverse mt-5 justify-end items-center gap-2">
                      <button
                        type="button"
                        className="hover:bg-purple-600 cursor-pointer hover:text-white rounded-md border-2 border-purple-600 text-purple-600 w-25 py-1  "
                        onClick={() => remove(index)}
                      >
                        - Remove
                      </button>
                      <button
                    type="button"
                    className=" hover:bg-purple-600 cursor-pointer hover:text-white    border-purple-600 text-purple-600 border-2 w-25 py-1 rounded-md"
                    onClick={() => append({ companyName: "", startDate: "", endDate: "", roles: "" })}
                  >
                    + Add
                  </button>
                  </div>
                    </div>
                  ))}
                  </div>
                </>
              )}
{step === 3 && (
  <div className="h-120 overflow-y-scroll scrollbar-thin">
    <h1 className="text-3xl font-bold text-center text-purple-700 mb-2">Skills</h1>
    <p className="text-center text-gray-600 mb-6">
      Add your top professional skills
    </p>

    <div className="space-y-4">
      {skillFields.map((item, index) => (
        <div
          key={item.id}
          className="bg-gray-50 p-4 rounded-lg border border-gray-200 "
        >
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Skill {index + 1}
          </label>
          <input
            type="text"
            {...register(`skills.${index}`)}
            onChange={handleInputChange}
            placeholder="e.g. JavaScript, Project Management"
            className="w-full border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:outline-none rounded-md p-2"
          />
          {errors.skills?.[index]?.message && (
            <p className="text-red-500 text-sm mt-1">
              {errors.skills[index].message}
            </p>
          )}
        </div>
      ))}
    </div>

    {/* Add / Remove Buttons */}
    <div className="flex justify-center gap-4 mt-6">
      <button
        type="button"
        onClick={handleAddSkill}
        className="flex items-center cursor-pointer gap-2 px-3 py-2 border border-purple-600 text-purple-600 rounded-md hover:bg-purple-600 hover:text-white transition"
      >
        <span className="text-xl font-semibold">+</span> Add Skill
      </button>

      <button
        type="button"
        onClick={() => {
          if (skillFields.length > 0) removeSkill(skillFields.length - 1);
        }}
        disabled={skillFields.length === 0}
        className={`flex items-center gap-2 px-4 py-1 rounded-md border transition ${
          skillFields.length === 0
            ? "border-gray-300 text-gray-300 cursor-not-allowed"
            : "border-purple-600 cursor-pointer text-purple-600 hover:bg-purple-600 hover:text-white"
        }`}
      >
        <span className="text-xl font-semibold">−</span> Remove
      </button>
    </div>
  </div>
)}

  {step === 4 && (
    <>
      <div className="h-120 overflow-y-scroll scrollbar-thin ">
        <h1 className="text-2xl mb-4 text-center mt-4 font-semibold">Certifications</h1>

        {certFields.map((item, index) => (
          <div key={item.id} className="mb-4 p-4 border-none relative bg-white rounded-md">
            <label>Name</label>
            <input
              type="text"
              {...register(`certifications.${index}.name`)}
              className="w-full mt-2 mb-3 border-gray-300 border-2 rounded-lg outline-none p-2"
            />
            <p className="text-red-500 text-sm">{errors.certifications?.[index]?.name?.message}</p>

            <div className="w-full flex justify-between gap-2 mt-2">
              <div className="flex flex-col w-full">
                <label className="mb-2">Start Year</label>
                <input
                  type="date"
                  {...register(`certifications.${index}.startYear`)}
                  className="w-full border-gray-300 border-2 rounded-lg outline-none p-1"
                />
                <p className="text-red-500 text-sm">{errors.certifications?.[index]?.startYear?.message}</p>
              </div>

              <div className="flex flex-col w-full">
                <label className="mb-2">End Year</label>
                <input
                  type="date"
                  {...register(`certifications.${index}.endYear`)}
                  className="w-full p-1 mb-4 border-gray-300 border-2 rounded-lg outline-none"
                />
                <p className="text-red-500 text-sm">{errors.certifications?.[index]?.endYear?.message}</p>
              </div>
            </div>

            <label>Issuer</label>
            <input
              type="text"
              {...register(`certifications.${index}.issuer`)}
              className="w-full p-1 mt-2 border-gray-300 border-2 rounded-lg outline-none"
            />
            <p className="text-red-500 text-sm">{errors.certifications?.[index]?.issuer?.message}</p>
          </div>
        ))}

        {/* Button Row */}
        <div className="pl-5 flex justify-start items-center gap-4  mt-4">
          {/* Add Button */}
          <button
            type="button"
            onClick={() =>
              appendCert({ name: "", startYear: "", endYear: "", issuer: "" })
            }
            className="border-2 border-purple-600 text-purple-600 w-25 py-1 cursor-pointer rounded-md hover:bg-purple-600 hover:text-white"
          >
            + Add
          </button>

          {/* Remove Button */}
          <button
            type="button"
            onClick={() => {
              if (certFields.length > 0) removeCert(certFields.length - 1);
            }}
            disabled={certFields.length === 0}
            className={`cursor-pointer flex border-2 w-25 justify-center rounded-md py-1 transition ${
              certFields.length === 0
                  ? "border-gray-300 text-gray-300 cursor-not-allowed"
                : "border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white"
            }`}
          >
            − Remove
          </button>
        </div>
      </div>
    </>
  )}
 </form>
  )}
          </div>
          <div className="w-full rounded-lg pt-3 pb-2 h-auto flex flex-col justify-center items-center">
  {step === 5 && (
    <div className="flex md:md-w-full w-full lg:w-200 m-auto mt-20 justify-between gap-5 items-center">
      <Button className="cursor-pointer bg-purple-600 text-white" onClick={onPrev}>
        <FaArrowLeft size={14} />   Edit Resume
      </Button>
    <h1 className="text-md md:text-lg lg:text-2xl text-center font-semibold">Your Resume Preview</h1>
    <div className="flex gap-2">
      
      <Button className="cursor-pointer bg-purple-600 text-white">
        Share
      </Button>
    </div>
    </  div>
  )}
            {SelectedTemplate && (
              <SelectedTemplate
                data={{ ...formValues, profileImage, colorPalette }} 
              />
            )}
          </div>
        </div>
      </div>
      </>
    );
  };

  export default ResumeForm;
