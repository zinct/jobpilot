"use client";

import { motion } from "framer-motion";
import { Code, ChevronUp, ChevronDown, Plus, X } from "lucide-react";
import { Button } from "@/core/components/ui/button";
import { useCV } from "@/core/components/cv-generator/cv-context";

export function SkillsSection() {
  const { cvData, updateCvData, activeSection, toggleSection } = useCV();

  const addSkill = () => {
    const skill = prompt("Enter a new skill:");
    if (skill && skill.trim() !== "") {
      updateCvData("skills", [...cvData.skills, skill.trim()]);
    }
  };

  const removeSkill = (index) => {
    updateCvData(
      "skills",
      cvData.skills.filter((_, i) => i !== index)
    );
  };

  const addLanguage = () => {
    const language = prompt("Enter language:");
    const proficiency = prompt(
      "Enter proficiency (e.g. Native, Fluent, Intermediate, Basic):"
    );

    if (
      language &&
      language.trim() !== "" &&
      proficiency &&
      proficiency.trim() !== ""
    ) {
      updateCvData("languages", [
        ...cvData.languages,
        {
          language: language.trim(),
          proficiency: proficiency.trim(),
        },
      ]);
    }
  };

  const removeLanguage = (index) => {
    updateCvData(
      "languages",
      cvData.languages.filter((_, i) => i !== index)
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm"
    >
      <button
        className="flex w-full items-center justify-between p-4"
        onClick={() => toggleSection("skills")}
      >
        <div className="flex items-center gap-2">
          <Code className="h-5 w-5 text-cyan-400" />
          <h3 className="text-lg font-medium">Skills & Languages</h3>
        </div>
        {activeSection === "skills" ? (
          <ChevronUp className="h-5 w-5 text-gray-400" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-400" />
        )}
      </button>

      {activeSection === "skills" && (
        <div className="border-t border-white/10 p-4">
          <div className="space-y-6">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Technical Skills
              </label>

              <div className="mb-4 flex flex-wrap gap-2">
                {cvData.skills.map((skill, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-950/50 to-violet-950/50 px-3 py-1.5 text-sm"
                  >
                    <span>{skill}</span>
                    <button
                      onClick={() => removeSkill(index)}
                      className="flex h-4 w-4 items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}

                <button
                  className="flex items-center gap-1 rounded-full border border-dashed border-white/20 bg-white/5 px-3 py-1.5 text-sm text-gray-400 hover:border-cyan-400/30 hover:text-cyan-400"
                  onClick={addSkill}
                >
                  <Plus className="h-3 w-3" />
                  Add Skill
                </button>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Languages
              </label>

              <div className="mb-4 space-y-2">
                {cvData.languages.map((lang, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-3 py-2"
                  >
                    <div>
                      <span className="font-medium">{lang.language}</span>
                      <span className="ml-2 text-sm text-gray-400">
                        ({lang.proficiency})
                      </span>
                    </div>
                    <button
                      onClick={() => removeLanguage(index)}
                      className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}

                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2 bg-gradient-to-r from-cyan-400 to-violet-500 hover:from-cyan-500 hover:to-violet-600 text-white"
                  onClick={addLanguage}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Language
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
