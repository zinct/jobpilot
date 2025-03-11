import { useState } from "react";
import { useCV } from "./cv-context";
import { AITools } from "@/core/components/cv-generator/sections/ai-tools";
import { PersonalInfoSection } from "@/core/components/cv-generator/sections/personal-info-section";
import { ExperienceSection } from "@/core/components/cv-generator/sections/experience-section";
import { EducationSection } from "@/core/components/cv-generator/sections/education-section";
import { SkillsSection } from "@/core/components/cv-generator/sections/skills-section";
import { ProjectsSection } from "@/core/components/cv-generator/sections/projects-section";
import { CertificationsSection } from "@/core/components/cv-generator/sections/certifications-section";
import { TemplateSettings } from "@/core/components/cv-generator/sections/template-settings";

export function CVEditor({
  isGenerating,
  setIsGenerating,
  isOptimizing,
  setIsOptimizing,
  jobTitle,
  setJobTitle,
}) {
  const [company, setCompany] = useState("");
  const { generateWithAI, optimizeForJob } = useCV();

  const handleGenerateWithAI = () => {
    generateWithAI(setIsGenerating);
  };

  const handleOptimizeForJob = () => {
    optimizeForJob(jobTitle, company, setIsOptimizing);
  };

  return (
    <>
      {/* AI Tools Section */}
      <AITools
        isGenerating={isGenerating}
        onGenerate={handleGenerateWithAI}
        isOptimizing={isOptimizing}
        onOptimize={handleOptimizeForJob}
        jobTitle={jobTitle}
        setJobTitle={setJobTitle}
        company={company}
        setCompany={setCompany}
      />

      {/* Template Settings */}
      <TemplateSettings />

      {/* CV Sections */}
      <div className="space-y-4">
        <PersonalInfoSection />
        <ExperienceSection />
        <EducationSection />
        <SkillsSection />
        <ProjectsSection />
        <CertificationsSection />
      </div>
    </>
  );
}
