"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, User, Briefcase, GraduationCap, Code, Award, FileText, Sparkles } from "lucide-react";
import { Button } from "@/core/components/ui/button";
import { LoadingOverlay } from "@/core/components/loading-overlay";

export default function CVGeneratorBuilderPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    // Personal Info
    personalInfo: {
      name: "",
      title: "",
      email: "",
      phone: "",
      location: "",
      website: "",
      summary: "",
    },
    // Experience
    experience: [
      {
        id: "exp1",
        company: "",
        position: "",
        location: "",
        startDate: "",
        endDate: "",
        current: false,
        description: "",
      },
    ],
    // Education
    education: [
      {
        id: "edu1",
        institution: "",
        degree: "",
        field: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ],
    // Skills
    skills: [],
    // Projects
    projects: [
      {
        id: "proj1",
        title: "",
        description: "",
        technologies: [],
        link: "",
      },
    ],
    // Certifications
    certifications: [
      {
        id: "cert1",
        name: "",
        issuer: "",
        date: "",
        link: "",
      },
    ],
  });

  const totalSteps = 6; // Total number of steps in the form

  // Add a new state to track which field is being improved by AI
  const [improvingField, setImprovingField] = useState({ section: null, id: null, field: null });

  // Handle form field changes
  const handleChange = (section, field, value, id = null) => {
    if (id) {
      // For arrays like experience, education, projects, certifications
      setFormData((prev) => ({
        ...prev,
        [section]: prev[section].map((item) => (item.id === id ? { ...item, [field]: value } : item)),
      }));
    } else if (section === "skills") {
      // Special handling for skills array
      setFormData((prev) => ({
        ...prev,
        skills: value,
      }));
    } else if (section === "personalInfo") {
      // For nested objects like personalInfo
      setFormData((prev) => ({
        ...prev,
        personalInfo: {
          ...prev.personalInfo,
          [field]: value,
        },
      }));
    } else {
      // For direct fields
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  // Add new item to arrays (experience, education, projects, certifications)
  const addItem = (section) => {
    const newId = `${section.slice(0, 4)}${Date.now()}`;

    let newItem = {};

    switch (section) {
      case "experience":
        newItem = {
          id: newId,
          company: "",
          position: "",
          location: "",
          startDate: "",
          endDate: "",
          current: false,
          description: "",
        };
        break;
      case "education":
        newItem = {
          id: newId,
          institution: "",
          degree: "",
          field: "",
          startDate: "",
          endDate: "",
          description: "",
        };
        break;
      case "projects":
        newItem = {
          id: newId,
          title: "",
          description: "",
          technologies: [],
          link: "",
        };
        break;
      case "certifications":
        newItem = {
          id: newId,
          name: "",
          issuer: "",
          date: "",
          link: "",
        };
        break;
      default:
        return;
    }

    setFormData((prev) => ({
      ...prev,
      [section]: [...prev[section], newItem],
    }));
  };

  // Remove item from arrays
  const removeItem = (section, id) => {
    // Don't remove if it's the only item
    if (formData[section].length <= 1) return;

    setFormData((prev) => ({
      ...prev,
      [section]: prev[section].filter((item) => item.id !== id),
    }));
  };

  // Handle skill selection
  const handleSkillToggle = (skill) => {
    setFormData((prev) => {
      const currentSkills = [...prev.skills];
      if (currentSkills.includes(skill)) {
        return {
          ...prev,
          skills: currentSkills.filter((s) => s !== skill),
        };
      } else {
        return {
          ...prev,
          skills: [...currentSkills, skill],
        };
      }
    });
  };

  // Handle technologies for projects
  const handleTechToggle = (projectId, tech) => {
    setFormData((prev) => ({
      ...prev,
      projects: prev.projects.map((project) => {
        if (project.id === projectId) {
          const currentTechs = [...project.technologies];
          if (currentTechs.includes(tech)) {
            return {
              ...project,
              technologies: currentTechs.filter((t) => t !== tech),
            };
          } else {
            return {
              ...project,
              technologies: [...currentTechs, tech],
            };
          }
        }
        return project;
      }),
    }));
  };

  // Add a function to handle AI improvement of text
  const handleAIImprove = (section, field, id = null, currentText = "") => {
    // Set the field as currently being improved
    setImprovingField({ section, id, field });

    // Simulate AI processing with a timeout
    setTimeout(() => {
      // Generate improved text based on the field type
      let improvedText = "";

      if (field === "summary") {
        improvedText = "Dedicated and innovative professional with extensive experience in developing scalable solutions. Proven track record of leading cross-functional teams to deliver high-quality products on time and within budget. Passionate about leveraging cutting-edge technologies to solve complex business challenges.";
      } else if (field === "description" && section === "experience") {
        improvedText = "• Led development of a mission-critical application that increased operational efficiency by 35%\n• Collaborated with cross-functional teams to implement new features that drove 28% growth in user engagement\n• Optimized database queries resulting in 40% faster load times\n• Mentored junior developers and conducted code reviews to ensure high code quality";
      } else if (field === "description" && section === "education") {
        improvedText = "Completed coursework in advanced algorithms, data structures, and software engineering principles. Participated in research projects focused on machine learning applications. Received academic honors for outstanding performance in computer science courses.";
      } else if (field === "description" && section === "projects") {
        improvedText = "Designed and developed a full-stack application using React, Node.js, and MongoDB. Implemented responsive UI with Tailwind CSS and integrated third-party APIs for enhanced functionality. Deployed using CI/CD pipeline with automated testing, resulting in a robust and maintainable codebase.";
      }

      // Update the form data with the improved text
      if (id) {
        // For arrays like experience, education, projects
        handleChange(section, field, improvedText, id);
      } else if (section === "personalInfo") {
        // For nested objects like personalInfo
        handleChange(section, field, improvedText);
      }

      // Reset the improving field state
      setImprovingField({ section: null, id: null, field: null });
    }, 2000); // 2 second delay to simulate AI processing
  };

  // Navigate to next step
  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      if (!isStepValid()) return;

      setIsLoading(true);
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
        setIsLoading(false);
      }, 300);
    } else {
      // Final step - submit and redirect
      handleSubmit();
    }
  };

  // Navigate to previous step
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Validate current step
  const isStepValid = () => {
    switch (currentStep) {
      case 0: // Personal Info
        return formData.personalInfo.name.trim() !== "" && formData.personalInfo.email.trim() !== "";
      case 1: // Experience
        return formData.experience.every((exp) => exp.company.trim() !== "" && exp.position.trim() !== "");
      case 2: // Education
        return formData.education.every((edu) => edu.institution.trim() !== "" && edu.degree.trim() !== "");
      case 3: // Skills
        return formData.skills.length > 0;
      case 4: // Projects
        return formData.projects.every((proj) => proj.title.trim() !== "");
      case 5: // Certifications
        return true; // Optional section
      default:
        return true;
    }
  };

  // Submit form and redirect
  const handleSubmit = () => {
    setIsLoading(true);

    // In a real app, you would save this data to a database or state management
    // For now, we'll simulate a delay and then redirect
    setTimeout(() => {
      // Store data in localStorage for demo purposes
      localStorage.setItem("cvData", JSON.stringify(formData));

      // Redirect to CV generator create page
      // router.push("/dashboard/cv-generator/create");
    }, 1000);
  };

  // Calculate progress percentage
  const progressPercentage = ((currentStep + 1) / totalSteps) * 100;

  // Common skills for suggestions
  const commonSkills = ["JavaScript", "TypeScript", "React", "Next.js", "Node.js", "HTML", "CSS", "Tailwind CSS", "Python", "Java", "C#", "SQL", "MongoDB", "GraphQL", "Git", "Docker", "AWS", "Azure", "Firebase", "Redux", "Vue.js", "Angular", "Express", "Django", "Flask", "PHP", "Laravel", "Ruby", "Ruby on Rails", "Swift", "Kotlin", "Flutter", "React Native", "UI/UX Design", "Figma", "Adobe XD", "Photoshop", "Illustrator", "Project Management", "Agile", "Scrum", "Communication", "Leadership", "Problem Solving", "Teamwork"];

  // Common technologies for projects
  const commonTechnologies = ["React", "Next.js", "TypeScript", "JavaScript", "Node.js", "Express", "MongoDB", "PostgreSQL", "MySQL", "Firebase", "AWS", "Docker", "GraphQL", "REST API", "Redux", "Context API", "Tailwind CSS", "SCSS", "Material UI", "Chakra UI", "Jest", "React Testing Library", "Cypress", "GitHub Actions"];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Loading Overlay */}
      <LoadingOverlay isLoading={isLoading} message={currentStep === totalSteps - 1 ? "Creating your CV..." : "Saving your information..."} />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="backdrop-blur-sm max-w-3xl mx-auto">
          <div className="flex h-16 items-center">
            <div className="flex items-center gap-4">
              <a
                href="#"
                onClick={() => {
                  router.push("/dashboard/cv-generator");
                }}
              >
                <Button variant="ghost" size="sm" className="text-gray-400 hover:bg-white/5 hover:text-white  px-0">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
              </a>
              <h1 className="text-xl font-semibold text-white">CV Builder Form</h1>
            </div>
          </div>
        </header>

        {/* Progress Bar */}
        <div className="mb-8 max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">
              Step {currentStep + 1} of {totalSteps}
            </span>
            <span className="text-sm text-gray-400">{Math.round(progressPercentage)}% Complete</span>
          </div>
          <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
            <motion.div initial={{ width: "0%" }} animate={{ width: `${progressPercentage}%` }} className="h-full bg-gradient-to-r from-cyan-400 to-violet-500 rounded-full"></motion.div>
          </div>
        </div>

        {/* Form Container */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-6 md:p-8">
            {/* Form Title */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold mb-2">Create Your CV</h1>
              <p className="text-gray-400">Let's gather all the information needed to create your professional CV.</p>
            </div>

            {/* Form Steps */}
            <AnimatePresence mode="wait">
              <motion.div key={currentStep} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} className="mb-8">
                {/* Step 1: Personal Information */}
                {currentStep === 0 && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-400/20">
                        <User className="h-4 w-4 text-cyan-400" />
                      </div>
                      <h2 className="text-xl font-semibold">Personal Information</h2>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-300">Full Name *</label>
                        <input type="text" value={formData.personalInfo.name} onChange={(e) => handleChange("personalInfo", "name", e.target.value)} className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400" placeholder="John Doe" required />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-300">Professional Title *</label>
                        <input type="text" value={formData.personalInfo.title} onChange={(e) => handleChange("personalInfo", "title", e.target.value)} className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400" placeholder="Frontend Developer" required />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-300">Email Address *</label>
                        <input type="email" value={formData.personalInfo.email} onChange={(e) => handleChange("personalInfo", "email", e.target.value)} className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400" placeholder="john.doe@example.com" required />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-300">Phone Number</label>
                        <input type="tel" value={formData.personalInfo.phone} onChange={(e) => handleChange("personalInfo", "phone", e.target.value)} className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400" placeholder="+1 (555) 123-4567" />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-300">Location</label>
                        <input type="text" value={formData.personalInfo.location} onChange={(e) => handleChange("personalInfo", "location", e.target.value)} className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400" placeholder="New York, NY" />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-300">Website/Portfolio</label>
                        <input type="url" value={formData.personalInfo.website} onChange={(e) => handleChange("personalInfo", "website", e.target.value)} className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400" placeholder="https://yourportfolio.com" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-300">Professional Summary</label>
                      <div className="relative">
                        <textarea value={formData.personalInfo.summary} onChange={(e) => handleChange("personalInfo", "summary", e.target.value)} rows={4} className={`w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 ${improvingField.section === "personalInfo" && improvingField.field === "summary" ? "opacity-50" : ""}`} placeholder="A brief summary of your professional background and career goals..." disabled={improvingField.section === "personalInfo" && improvingField.field === "summary"}></textarea>
                        {improvingField.section === "personalInfo" && improvingField.field === "summary" ? (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="flex items-center space-x-2 bg-black/50 px-3 py-1 rounded-full">
                              <div className="animate-spin h-4 w-4 border-2 border-cyan-400 border-t-transparent rounded-full"></div>
                              <span className="text-sm text-cyan-400">Improving with AI...</span>
                            </div>
                          </div>
                        ) : (
                          <button type="button" onClick={() => handleAIImprove("personalInfo", "summary", null, formData.personalInfo.summary)} className="absolute right-3 bottom-3 flex items-center space-x-1 bg-gradient-to-r from-cyan-500 to-violet-500 text-white px-2 py-1 rounded-md text-xs hover:from-cyan-600 hover:to-violet-600 transition-colors">
                            <Sparkles className="h-3 w-3" />
                            <span>AI Improve</span>
                          </button>
                        )}
                      </div>
                      <p className="text-xs text-gray-400">Tip: Keep your summary concise (3-5 sentences) and highlight your key strengths and experience.</p>
                    </div>

                    {/* Validation Message */}
                    {(formData.personalInfo.name.trim() === "" || formData.personalInfo.email.trim() === "") && (
                      <div className="rounded-lg border border-amber-400/20 bg-amber-950/20 p-3">
                        <p className="text-sm text-amber-400">Please fill in all required fields marked with * to continue.</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Step 2: Work Experience */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-400/20">
                        <Briefcase className="h-4 w-4 text-cyan-400" />
                      </div>
                      <h2 className="text-xl font-semibold">Work Experience</h2>
                    </div>

                    {formData.experience.map((exp, index) => (
                      <div key={exp.id} className="space-y-4 p-4 border border-white/10 rounded-lg bg-white/5">
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium">Experience {index + 1}</h3>
                          {formData.experience.length > 1 && (
                            <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300 hover:bg-red-950/20" onClick={() => removeItem("experience", exp.id)}>
                              Remove
                            </Button>
                          )}
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-300">Company/Organization *</label>
                            <input type="text" value={exp.company} onChange={(e) => handleChange("experience", "company", e.target.value, exp.id)} className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400" placeholder="Acme Inc." required />
                          </div>

                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-300">Job Title *</label>
                            <input type="text" value={exp.position} onChange={(e) => handleChange("experience", "position", e.target.value, exp.id)} className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400" placeholder="Senior Developer" required />
                          </div>

                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-300">Location</label>
                            <input type="text" value={exp.location} onChange={(e) => handleChange("experience", "location", e.target.value, exp.id)} className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400" placeholder="San Francisco, CA" />
                          </div>

                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-300">Start Date</label>
                            <input type="date" value={exp.startDate} onChange={(e) => handleChange("experience", "startDate", e.target.value, exp.id)} className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400" />
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <label className="block text-sm font-medium text-gray-300">End Date</label>
                              <label className="flex items-center text-sm text-gray-300">
                                <input type="checkbox" checked={exp.current} onChange={(e) => handleChange("experience", "current", e.target.checked, exp.id)} className="mr-2 rounded border-white/10 bg-white/5 text-cyan-400 focus:ring-cyan-400" />
                                Current Position
                              </label>
                            </div>
                            <input type="date" value={exp.endDate} onChange={(e) => handleChange("experience", "endDate", e.target.value, exp.id)} disabled={exp.current} className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 disabled:opacity-50" />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-300">Job Description</label>
                          <div className="relative">
                            <textarea value={exp.description} onChange={(e) => handleChange("experience", "description", e.target.value, exp.id)} rows={3} className={`w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 ${improvingField.section === "experience" && improvingField.id === exp.id && improvingField.field === "description" ? "opacity-50" : ""}`} placeholder="Describe your responsibilities, achievements, and the technologies you used..." disabled={improvingField.section === "experience" && improvingField.id === exp.id && improvingField.field === "description"}></textarea>
                            {improvingField.section === "experience" && improvingField.id === exp.id && improvingField.field === "description" ? (
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="flex items-center space-x-2 bg-black/50 px-3 py-1 rounded-full">
                                  <div className="animate-spin h-4 w-4 border-2 border-cyan-400 border-t-transparent rounded-full"></div>
                                  <span className="text-sm text-cyan-400">Improving with AI...</span>
                                </div>
                              </div>
                            ) : (
                              <button type="button" onClick={() => handleAIImprove("experience", "description", exp.id, exp.description)} className="absolute right-3 bottom-3 flex items-center space-x-1 bg-gradient-to-r from-cyan-500 to-violet-500 text-white px-2 py-1 rounded-md text-xs hover:from-cyan-600 hover:to-violet-600 transition-colors">
                                <Sparkles className="h-3 w-3" />
                                <span>AI Improve</span>
                              </button>
                            )}
                          </div>
                          <p className="text-xs text-gray-400">Tip: Use bullet points and quantify your achievements when possible.</p>
                        </div>
                      </div>
                    ))}

                    <Button variant="outline" className="w-full border-none bg-gradient-to-r from-cyan-400 to-violet-500 text-black hover:from-cyan-500 hover:to-violet-600 text-white" onClick={() => addItem("experience")}>
                      + Add Another Experience
                    </Button>

                    {/* Validation Message */}
                    {!formData.experience.every((exp) => exp.company.trim() !== "" && exp.position.trim() !== "") && (
                      <div className="rounded-lg border border-amber-400/20 bg-amber-950/20 p-3">
                        <p className="text-sm text-amber-400">Please fill in all required fields marked with * for each experience.</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Step 3: Education */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-400/20">
                        <GraduationCap className="h-4 w-4 text-violet-400" />
                      </div>
                      <h2 className="text-xl font-semibold">Education</h2>
                    </div>

                    {formData.education.map((edu, index) => (
                      <div key={edu.id} className="space-y-4 p-4 border border-white/10 rounded-lg bg-white/5">
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium">Education {index + 1}</h3>
                          {formData.education.length > 1 && (
                            <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300 hover:bg-red-950/20" onClick={() => removeItem("education", edu.id)}>
                              Remove
                            </Button>
                          )}
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-300">Institution/School *</label>
                            <input type="text" value={edu.institution} onChange={(e) => handleChange("education", "institution", e.target.value, edu.id)} className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400" placeholder="University of Technology" required />
                          </div>

                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-300">Degree *</label>
                            <input type="text" value={edu.degree} onChange={(e) => handleChange("education", "degree", e.target.value, edu.id)} className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400" placeholder="Bachelor of Science" required />
                          </div>

                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-300">Field of Study</label>
                            <input type="text" value={edu.field} onChange={(e) => handleChange("education", "field", e.target.value, edu.id)} className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400" placeholder="Computer Science" />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label className="block text-sm font-medium text-gray-300">Start Date</label>
                              <input type="date" value={edu.startDate} onChange={(e) => handleChange("education", "startDate", e.target.value, edu.id)} className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400" />
                            </div>

                            <div className="space-y-2">
                              <label className="block text-sm font-medium text-gray-300">End Date</label>
                              <input type="date" value={edu.endDate} onChange={(e) => handleChange("education", "endDate", e.target.value, edu.id)} className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400" />
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-300">Description</label>
                          <div className="relative">
                            <textarea value={edu.description} onChange={(e) => handleChange("education", "description", e.target.value, edu.id)} rows={2} className={`w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 ${improvingField.section === "education" && improvingField.id === edu.id && improvingField.field === "description" ? "opacity-50" : ""}`} placeholder="Relevant coursework, achievements, or activities..." disabled={improvingField.section === "education" && improvingField.id === edu.id && improvingField.field === "description"}></textarea>
                            {improvingField.section === "education" && improvingField.id === edu.id && improvingField.field === "description" ? (
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="flex items-center space-x-2 bg-black/50 px-3 py-1 rounded-full">
                                  <div className="animate-spin h-4 w-4 border-2 border-cyan-400 border-t-transparent rounded-full"></div>
                                  <span className="text-sm text-cyan-400">Improving with AI...</span>
                                </div>
                              </div>
                            ) : (
                              <button type="button" onClick={() => handleAIImprove("education", "description", edu.id, edu.description)} className="absolute right-3 bottom-3 flex items-center space-x-1 bg-gradient-to-r from-cyan-500 to-violet-500 text-white px-2 py-1 rounded-md text-xs hover:from-cyan-600 hover:to-violet-600 transition-colors">
                                <Sparkles className="h-3 w-3" />
                                <span>AI Improve</span>
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}

                    <Button variant="outline" className="w-full border-none bg-gradient-to-r from-cyan-400 to-violet-500 text-black hover:from-cyan-500 hover:to-violet-600 text-white" onClick={() => addItem("education")}>
                      + Add Another Education
                    </Button>

                    {/* Validation Message */}
                    {!formData.education.every((edu) => edu.institution.trim() !== "" && edu.degree.trim() !== "") && (
                      <div className="rounded-lg border border-amber-400/20 bg-amber-950/20 p-3">
                        <p className="text-sm text-amber-400">Please fill in all required fields marked with * for each education entry.</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Step 4: Skills */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-400/20">
                        <Code className="h-4 w-4 text-cyan-400" />
                      </div>
                      <h2 className="text-xl font-semibold">Skills</h2>
                    </div>

                    <div className="space-y-4">
                      <p className="text-gray-400">Select the skills that best represent your expertise. These will be highlighted on your CV.</p>

                      {/* Selected Skills */}
                      {formData.skills.length > 0 && (
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-300 mb-2">Your Selected Skills:</label>
                          <div className="flex flex-wrap gap-2">
                            {formData.skills.map((skill) => (
                              <span key={skill} className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-cyan-950/50 border border-cyan-400/30 text-cyan-400 text-sm">
                                {skill}
                                <button type="button" onClick={() => handleSkillToggle(skill)} className="ml-1 text-cyan-400/70 hover:text-cyan-400">
                                  ×
                                </button>
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Skill Suggestions */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Common Skills:</label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                          {commonSkills.map((skill) => (
                            <button key={skill} type="button" onClick={() => handleSkillToggle(skill)} className={`flex items-center justify-between rounded-lg border p-2 text-left text-sm transition-colors ${formData.skills.includes(skill) ? "border-cyan-400 bg-cyan-950/20 text-cyan-400" : "border-white/10 bg-white/5 text-gray-300 hover:border-white/30"}`}>
                              <span>{skill}</span>
                              {formData.skills.includes(skill) && <Check className="h-4 w-4 text-cyan-400" />}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Custom Skill Input */}
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-300 mb-2">Add Custom Skill:</label>
                        <div className="flex gap-2">
                          <input type="text" id="customSkill" className="flex-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400" placeholder="Enter a skill not listed above" />
                          <Button
                            onClick={() => {
                              const input = document.getElementById("customSkill");
                              if (input.value.trim()) {
                                handleSkillToggle(input.value.trim());
                                input.value = "";
                              }
                            }}
                            className="bg-gradient-to-r from-cyan-400 to-violet-500 text-black hover:from-cyan-500 hover:to-violet-600"
                          >
                            Add
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Validation Message */}
                    {formData.skills.length === 0 && (
                      <div className="rounded-lg border border-amber-400/20 bg-amber-950/20 p-3">
                        <p className="text-sm text-amber-400">Please select at least one skill to continue.</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Step 5: Projects */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-400/20">
                        <Code className="h-4 w-4 text-violet-400" />
                      </div>
                      <h2 className="text-xl font-semibold">Projects</h2>
                    </div>

                    {formData.projects.map((project, index) => (
                      <div key={project.id} className="space-y-4 p-4 border border-white/10 rounded-lg bg-white/5">
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium">Project {index + 1}</h3>
                          {formData.projects.length > 1 && (
                            <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300 hover:bg-red-950/20" onClick={() => removeItem("projects", project.id)}>
                              Remove
                            </Button>
                          )}
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-300">Project Title *</label>
                            <input type="text" value={project.title} onChange={(e) => handleChange("projects", "title", e.target.value, project.id)} className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400" placeholder="E-commerce Website" required />
                          </div>

                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-300">Project Link</label>
                            <input type="url" value={project.link} onChange={(e) => handleChange("projects", "link", e.target.value, project.id)} className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400" placeholder="https://github.com/yourusername/project" />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-300">Project Description</label>
                          <div className="relative">
                            <textarea value={project.description} onChange={(e) => handleChange("projects", "description", e.target.value, project.id)} rows={3} className={`w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 ${improvingField.section === "projects" && improvingField.id === project.id && improvingField.field === "description" ? "opacity-50" : ""}`} placeholder="Describe the project, your role, and the impact it had..." disabled={improvingField.section === "projects" && improvingField.id === project.id && improvingField.field === "description"}></textarea>
                            {improvingField.section === "projects" && improvingField.id === project.id && improvingField.field === "description" ? (
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="flex items-center space-x-2 bg-black/50 px-3 py-1 rounded-full">
                                  <div className="animate-spin h-4 w-4 border-2 border-cyan-400 border-t-transparent rounded-full"></div>
                                  <span className="text-sm text-cyan-400">Improving with AI...</span>
                                </div>
                              </div>
                            ) : (
                              <button type="button" onClick={() => handleAIImprove("projects", "description", project.id, project.description)} className="absolute right-3 bottom-3 flex items-center space-x-1 bg-gradient-to-r from-cyan-500 to-violet-500 text-white px-2 py-1 rounded-md text-xs hover:from-cyan-600 hover:to-violet-600 transition-colors">
                                <Sparkles className="h-3 w-3" />
                                <span>AI Improve</span>
                              </button>
                            )}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-300 mb-2">Technologies Used:</label>
                          <div className="flex flex-wrap gap-2 mb-2">
                            {project.technologies.map((tech) => (
                              <span key={tech} className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-violet-950/50 border border-violet-400/30 text-violet-400 text-sm">
                                {tech}
                                <button type="button" onClick={() => handleTechToggle(project.id, tech)} className="ml-1 text-violet-400/70 hover:text-violet-400">
                                  ×
                                </button>
                              </span>
                            ))}
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                            {commonTechnologies.slice(0, 12).map((tech) => (
                              <button key={tech} type="button" onClick={() => handleTechToggle(project.id, tech)} className={`flex items-center justify-between rounded-lg border p-2 text-left text-sm transition-colors ${project.technologies.includes(tech) ? "border-violet-400 bg-violet-950/20 text-violet-400" : "border-white/10 bg-white/5 text-gray-300 hover:border-white/30"}`}>
                                <span>{tech}</span>
                                {project.technologies.includes(tech) && <Check className="h-4 w-4 text-violet-400" />}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}

                    <Button variant="outline" className="w-full border-none bg-gradient-to-r from-cyan-400 to-violet-500 text-black hover:from-cyan-500 hover:to-violet-600 text-white" onClick={() => addItem("projects")}>
                      + Add Another Project
                    </Button>

                    {/* Validation Message */}
                    {!formData.projects.every((proj) => proj.title.trim() !== "") && (
                      <div className="rounded-lg border border-amber-400/20 bg-amber-950/20 p-3">
                        <p className="text-sm text-amber-400">Please fill in all required fields marked with * for each project.</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Step 6: Certifications */}
                {currentStep === 5 && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-400/20">
                        <Award className="h-4 w-4 text-cyan-400" />
                      </div>
                      <h2 className="text-xl font-semibold">Certifications</h2>
                    </div>

                    <p className="text-gray-400">Add any relevant certifications or professional qualifications. This step is optional.</p>

                    {formData.certifications.map((cert, index) => (
                      <div key={cert.id} className="space-y-4 p-4 border border-white/10 rounded-lg bg-white/5">
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium">Certification {index + 1}</h3>
                          <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300 hover:bg-red-950/20" onClick={() => removeItem("certifications", cert.id)}>
                            Remove
                          </Button>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-300">Certification Name</label>
                            <input type="text" value={cert.name} onChange={(e) => handleChange("certifications", "name", e.target.value, cert.id)} className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400" placeholder="AWS Certified Solutions Architect" />
                          </div>

                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-300">Issuing Organization</label>
                            <input type="text" value={cert.issuer} onChange={(e) => handleChange("certifications", "issuer", e.target.value, cert.id)} className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400" placeholder="Amazon Web Services" />
                          </div>

                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-300">Date Issued</label>
                            <input type="date" value={cert.date} onChange={(e) => handleChange("certifications", "date", e.target.value, cert.id)} className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400" />
                          </div>

                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-300">Credential URL</label>
                            <input type="url" value={cert.link} onChange={(e) => handleChange("certifications", "link", e.target.value, cert.id)} className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400" placeholder="https://www.credential.net/..." />
                          </div>
                        </div>
                      </div>
                    ))}

                    <Button variant="outline" className="w-full border-none bg-gradient-to-r from-cyan-400 to-violet-500 text-black hover:from-cyan-500 hover:to-violet-600 text-white" onClick={() => addItem("certifications")}>
                      + Add Another Certification
                    </Button>

                    <div className="rounded-lg border border-cyan-400/20 bg-cyan-950/20 p-4">
                      <div className="flex items-start gap-3">
                        <FileText className="h-5 w-5 text-cyan-400 mt-0.5" />
                        <div>
                          <h3 className="font-medium text-cyan-400">Ready to Create Your CV</h3>
                          <p className="mt-1 text-sm text-gray-300">You've completed all the necessary information. Click "Create CV" to generate your professional resume.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-between">
              {currentStep === 0 ? (
                <div></div>
              ) : (
                <Button type="button" variant="outline" onClick={prevStep} className="border-white/10 bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white" disabled={currentStep === 0}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
              )}

              <Button type="button" onClick={nextStep} className="bg-gradient-to-r from-cyan-400 to-violet-500 text-black hover:from-cyan-500 hover:to-violet-600 " disabled={currentStep > 0 && !isStepValid()}>
                {currentStep < totalSteps - 1 ? (
                  <>
                    Continue
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                ) : (
                  <>
                    Create CV
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
