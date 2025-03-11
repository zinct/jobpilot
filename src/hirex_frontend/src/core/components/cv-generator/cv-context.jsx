import { createContext, useContext, useState } from "react";

// Create context
const CVContext = createContext(null);

// Context provider
export function CVProvider({ children, initialData }) {
  const [cvData, setCvData] = useState(initialData);
  const [template, setTemplate] = useState("modern");
  const [colorScheme, setColorScheme] = useState("gradient");
  const [fontSize, setFontSize] = useState("medium");
  const [activeSection, setActiveSection] = useState("personalInfo");
  const [aiSuggestions, setAiSuggestions] = useState([]);

  // Function to update CV data
  const updateCvData = (section, data) => {
    setCvData((prev) => ({
      ...prev,
      [section]: data,
    }));
  };

  // Function to update personal info
  const updatePersonalInfo = (field, value) => {
    setCvData((prev) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value,
      },
    }));
  };

  // Function to add a new experience
  const addExperience = () => {
    const newExp = {
      id: `exp${Date.now()}`,
      company: "",
      position: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
      achievements: [""],
    };

    setCvData((prev) => ({
      ...prev,
      experience: [...prev.experience, newExp],
    }));
  };

  // Function to update an experience
  const updateExperience = (id, field, value) => {
    setCvData((prev) => ({
      ...prev,
      experience: prev.experience.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      ),
    }));
  };

  // Function to remove an experience
  const removeExperience = (id) => {
    setCvData((prev) => ({
      ...prev,
      experience: prev.experience.filter((exp) => exp.id !== id),
    }));
  };

  // Function to add an achievement to an experience
  const addAchievement = (expId) => {
    setCvData((prev) => ({
      ...prev,
      experience: prev.experience.map((exp) =>
        exp.id === expId
          ? { ...exp, achievements: [...exp.achievements, ""] }
          : exp
      ),
    }));
  };

  // Function to update an achievement
  const updateAchievement = (expId, index, value) => {
    setCvData((prev) => ({
      ...prev,
      experience: prev.experience.map((exp) =>
        exp.id === expId
          ? {
              ...exp,
              achievements: exp.achievements.map((a, i) =>
                i === index ? value : a
              ),
            }
          : exp
      ),
    }));
  };

  // Function to remove an achievement
  const removeAchievement = (expId, index) => {
    setCvData((prev) => ({
      ...prev,
      experience: prev.experience.map((exp) =>
        exp.id === expId
          ? {
              ...exp,
              achievements: exp.achievements.filter((_, i) => i !== index),
            }
          : exp
      ),
    }));
  };

  // Function to add a new education
  const addEducation = () => {
    const newEdu = {
      id: `edu${Date.now()}`,
      institution: "",
      degree: "",
      location: "",
      startDate: "",
      endDate: "",
      description: "",
    };

    setCvData((prev) => ({
      ...prev,
      education: [...prev.education, newEdu],
    }));
  };

  // Function to update an education
  const updateEducation = (id, field, value) => {
    setCvData((prev) => ({
      ...prev,
      education: prev.education.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu
      ),
    }));
  };

  // Function to remove an education
  const removeEducation = (id) => {
    setCvData((prev) => ({
      ...prev,
      education: prev.education.filter((edu) => edu.id !== id),
    }));
  };

  // Function to add a new project
  const addProject = () => {
    const newProj = {
      id: `proj${Date.now()}`,
      title: "",
      description: "",
      technologies: [],
      link: "",
    };

    setCvData((prev) => ({
      ...prev,
      projects: [...prev.projects, newProj],
    }));
  };

  // Function to update a project
  const updateProject = (id, field, value) => {
    setCvData((prev) => ({
      ...prev,
      projects: prev.projects.map((proj) =>
        proj.id === id ? { ...proj, [field]: value } : proj
      ),
    }));
  };

  // Function to remove a project
  const removeProject = (id) => {
    setCvData((prev) => ({
      ...prev,
      projects: prev.projects.filter((proj) => proj.id !== id),
    }));
  };

  // Function to add a new certification
  const addCertification = () => {
    const newCert = {
      id: `cert${Date.now()}`,
      name: "",
      issuer: "",
      date: "",
      link: "",
    };

    setCvData((prev) => ({
      ...prev,
      certifications: [...prev.certifications, newCert],
    }));
  };

  // Function to update a certification
  const updateCertification = (id, field, value) => {
    setCvData((prev) => ({
      ...prev,
      certifications: prev.certifications.map((cert) =>
        cert.id === id ? { ...cert, [field]: value } : cert
      ),
    }));
  };

  // Function to remove a certification
  const removeCertification = (id) => {
    setCvData((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((cert) => cert.id !== id),
    }));
  };

  // Function to toggle section collapse
  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  // Get color class based on selected color scheme
  const getColorClass = () => {
    switch (colorScheme) {
      case "gradient":
        return "from-cyan-400 to-violet-500";
      case "blue":
        return "from-blue-400 to-blue-600";
      case "green":
        return "from-green-400 to-green-600";
      case "purple":
        return "from-purple-400 to-purple-600";
      case "monochrome":
        return "from-gray-400 to-gray-600";
      default:
        return "from-cyan-400 to-violet-500";
    }
  };

  // Get font size class
  const getFontSizeClass = () => {
    switch (fontSize) {
      case "small":
        return "text-sm";
      case "medium":
        return "text-base";
      case "large":
        return "text-lg";
      default:
        return "text-base";
    }
  };

  // Generate CV with AI
  const generateWithAI = (setIsGenerating) => {
    setIsGenerating(true);

    // Simulate AI generation
    setTimeout(() => {
      // Update with AI-generated content
      setCvData({
        ...cvData,
        personalInfo: {
          ...cvData.personalInfo,
          summary:
            "Results-driven Senior Frontend Developer with 8+ years of experience crafting high-performance, responsive web applications. Expertise in React, Next.js, and modern JavaScript frameworks with a strong focus on code quality and user experience. Proven track record of leading development teams and delivering complex projects on time and within budget.",
        },
        experience: cvData.experience.map((exp) => ({
          ...exp,
          description:
            exp.id === "exp1"
              ? "Led the frontend development team for the company's flagship SaaS platform, focusing on performance optimization, accessibility, and scalable architecture. Implemented CI/CD pipelines and established coding standards that improved overall code quality."
              : exp.description,
          achievements:
            exp.id === "exp1"
              ? [
                  "Reduced page load time by 40% through code splitting, lazy loading, and optimized asset delivery",
                  "Implemented a component library with Storybook that increased development speed by 30% and ensured UI consistency",
                  "Led a team of 5 developers to deliver a major platform redesign that increased user engagement by 25%",
                  "Introduced automated testing that reduced production bugs by 60% and improved release confidence",
                ]
              : exp.achievements,
        })),
      });

      // Generate AI suggestions
      setAiSuggestions([
        "Consider adding quantifiable achievements to your Digital Solutions experience",
        "Your technical skills section could be organized by proficiency level",
        "Add a brief description of technologies used in your education projects",
        "Consider adding volunteer work or open source contributions to showcase community involvement",
      ]);

      setIsGenerating(false);
    }, 3000);
  };

  // Optimize CV for a job
  const optimizeForJob = (jobTitle, company, setIsOptimizing) => {
    if (!jobTitle) {
      alert("Please enter a job title to optimize for");
      return;
    }

    setIsOptimizing(true);

    // Simulate AI optimization
    setTimeout(() => {
      // Update with optimized content for the job
      setCvData({
        ...cvData,
        personalInfo: {
          ...cvData.personalInfo,
          title: jobTitle,
          summary: `Innovative ${jobTitle} with 8+ years of experience specializing in building scalable, high-performance web applications. Expert in React, Next.js, and modern frontend architecture with a proven track record of delivering exceptional user experiences. Passionate about clean code, performance optimization, and mentoring junior developers.`,
        },
        skills: [
          "React",
          "Next.js",
          "TypeScript",
          "JavaScript",
          "HTML5",
          "CSS3",
          "Tailwind CSS",
          "Redux",
          "Performance Optimization",
          "Responsive Design",
          "UI/UX",
          "RESTful APIs",
          "GraphQL",
          "Jest",
          "CI/CD",
          "Webpack",
        ],
      });

      // Generate AI suggestions specific to the job
      setAiSuggestions([
        `Highlight your experience with performance optimization, which is key for a ${jobTitle} role`,
        `Emphasize team leadership and mentoring experience for this senior position`,
        `Consider reorganizing your skills to put React and Next.js first as they're most relevant`,
        `Add more detail about architecture decisions you've made in previous roles`,
      ]);

      setIsOptimizing(false);
    }, 3000);
  };

  return (
    <CVContext.Provider
      value={{
        cvData,
        setCvData,
        updateCvData,
        updatePersonalInfo,
        addExperience,
        updateExperience,
        removeExperience,
        addAchievement,
        updateAchievement,
        removeAchievement,
        addEducation,
        updateEducation,
        removeEducation,
        addProject,
        updateProject,
        removeProject,
        addCertification,
        updateCertification,
        removeCertification,
        template,
        setTemplate,
        colorScheme,
        setColorScheme,
        fontSize,
        setFontSize,
        activeSection,
        setActiveSection,
        toggleSection,
        getColorClass,
        getFontSizeClass,
        aiSuggestions,
        setAiSuggestions,
        generateWithAI,
        optimizeForJob,
      }}
    >
      {children}
    </CVContext.Provider>
  );
}

// Custom hook to use the CV context
export function useCV() {
  const context = useContext(CVContext);
  if (!context) {
    throw new Error("useCV must be used within a CVProvider");
  }
  return context;
}
