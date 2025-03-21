"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Code, ChevronUp, ChevronDown, Plus, Trash, PlusCircle, Check } from "lucide-react";
import { Button } from "@/core/components/ui/button";
import { useCV } from "../cv-context";

export function SkillsSection() {
  const { cvData, updateCvData, activeSection, toggleSection } = useCV();
  const [newSkill, setNewSkill] = useState("");
  const [newLanguage, setNewLanguage] = useState({ language: "", proficiency: "" });

  // Common skills for suggestions - matching the onboarding page
  const commonSkills = ["JavaScript", "TypeScript", "React", "Next.js", "Node.js", "HTML", "CSS", "Tailwind CSS", "Python", "Java", "C#", "SQL", "MongoDB", "GraphQL", "Git", "Docker", "AWS", "Azure", "Firebase", "Redux", "Vue.js", "Angular"];

  // Proficiency levels for languages
  const proficiencyLevels = ["Native", "Fluent", "Advanced", "Intermediate", "Basic"];

  // Handle skill toggle - similar to onboarding page
  const handleSkillToggle = (skill) => {
    const currentSkills = [...cvData.skills];
    if (currentSkills.includes(skill)) {
      updateCvData(
        "skills",
        currentSkills.filter((s) => s !== skill)
      );
    } else {
      updateCvData("skills", [...currentSkills, skill]);
    }
  };

  // Add custom skill
  const addCustomSkill = () => {
    if (newSkill.trim() !== "" && !cvData.skills.includes(newSkill.trim())) {
      updateCvData("skills", [...cvData.skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  // Add language with validation
  const addLanguage = () => {
    if (newLanguage.language.trim() !== "" && newLanguage.proficiency.trim() !== "") {
      const newLanguageEntry = {
        id: `lang-${Date.now()}`,
        language: newLanguage.language.trim(),
        proficiency: newLanguage.proficiency.trim(),
      };

      // Create a new array with the new language added
      const updatedLanguages = [...cvData.languages, newLanguageEntry];

      // Update the context with the new array
      updateCvData("languages", updatedLanguages);

      // Reset the form
      setNewLanguage({ language: "", proficiency: "" });
    }
  };

  // Remove language
  const removeLanguage = (id) => {
    updateCvData(
      "languages",
      cvData.languages.filter((lang) => lang.id !== id)
    );
  };

  // Update language field
  const updateLanguageField = (id, field, value) => {
    updateCvData(
      "languages",
      cvData.languages.map((lang) => (lang.id === id ? { ...lang, [field]: value } : lang))
    );
  };

  // Handle key press for form submission
  const handleKeyPress = (e, action) => {
    if (e.key === "Enter") {
      e.preventDefault();
      action();
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
      <button className="flex w-full items-center justify-between p-4" onClick={() => toggleSection("skills")}>
        <div className="flex items-center gap-2">
          <Code className="h-5 w-5 text-cyan-400" />
          <h3 className="text-lg font-medium">Skills & Languages</h3>
        </div>
        {activeSection === "skills" ? <ChevronUp className="h-5 w-5 text-gray-400" /> : <ChevronDown className="h-5 w-5 text-gray-400" />}
      </button>

      {activeSection === "skills" && (
        <div className="border-t border-white/10 p-4">
          <div className="space-y-6">
            {/* Skills Section - Styled like onboarding page */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">Technical Skills</label>

              {/* Selected Skills */}
              {cvData.skills.length > 0 && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Your Selected Skills:</label>
                  <div className="flex flex-wrap gap-2">
                    {cvData.skills.map((skill) => (
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

              {/* Common Skills Grid */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Common Skills:</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {commonSkills.map((skill) => (
                    <button key={skill} type="button" onClick={() => handleSkillToggle(skill)} className={`flex items-center justify-between rounded-lg border p-2 text-left text-sm transition-colors ${cvData.skills.includes(skill) ? "border-cyan-400 bg-cyan-950/20 text-cyan-400" : "border-white/10 bg-white/5 text-gray-300 hover:border-white/30"}`}>
                      <span>{skill}</span>
                      {cvData.skills.includes(skill) && <Check className="h-4 w-4 text-cyan-400" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Skill Input */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-300 mb-2">Add Custom Skill:</label>
                <div className="flex gap-2">
                  <input type="text" value={newSkill} onChange={(e) => setNewSkill(e.target.value)} onKeyPress={(e) => handleKeyPress(e, addCustomSkill)} className="flex-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400" placeholder="Enter a skill not listed above" />
                  <Button onClick={addCustomSkill} className="h-10 w-10 text-gray-400 hover:bg-white/10 hover:text-white">
                    Add
                  </Button>
                </div>
              </div>
            </div>

            {/* Languages Section */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">Languages</label>

              <div className="mb-4 space-y-2">
                {cvData.languages.map((lang) => (
                  <div key={lang.id} className="flex gap-2">
                    <div className="flex flex-1 gap-2">
                      <input type="text" value={lang.language} onChange={(e) => updateLanguageField(lang.id, "language", e.target.value)} className="flex-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400" placeholder="Language" />
                      <select value={lang.proficiency} onChange={(e) => updateLanguageField(lang.id, "proficiency", e.target.value)} className="flex-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400">
                        <option value="">Select proficiency</option>
                        {proficiencyLevels.map((level) => (
                          <option key={level} value={level}>
                            {level}
                          </option>
                        ))}
                      </select>
                    </div>
                    <Button variant="ghost" size="icon" className="h-10 w-10 text-gray-400 hover:bg-white/10 hover:text-white" onClick={() => removeLanguage(lang.id)}>
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                ))}

                {/* New Language Input */}
                <div className="flex gap-2">
                  <div className="flex flex-1 gap-2">
                    <input
                      type="text"
                      value={newLanguage.language}
                      onChange={(e) => setNewLanguage({ ...newLanguage, language: e.target.value })}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          document.getElementById("proficiency-select").focus();
                        }
                      }}
                      placeholder="Language"
                      className="flex-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                    />
                    <select id="proficiency-select" value={newLanguage.proficiency} onChange={(e) => setNewLanguage({ ...newLanguage, proficiency: e.target.value })} onKeyPress={(e) => handleKeyPress(e, addLanguage)} className="flex-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400">
                      <option value="">Select proficiency</option>
                      {proficiencyLevels.map((level) => (
                        <option key={level} value={level}>
                          {level}
                        </option>
                      ))}
                    </select>
                  </div>
                  <Button size="icon" className="h-10 w-10 text-gray-400 hover:bg-white/10 hover:text-white" onClick={addLanguage}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
