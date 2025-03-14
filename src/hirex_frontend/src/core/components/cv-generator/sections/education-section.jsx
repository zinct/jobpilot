"use client";

import { motion } from "framer-motion";
import {
  GraduationCap,
  ChevronUp,
  ChevronDown,
  Plus,
  Trash,
} from "lucide-react";
import { Button } from "@/core/components/ui/button";
import { useCV } from "@/core/components/cv-generator/cv-context";

export function EducationSection() {
  const {
    cvData,
    addEducation,
    updateEducation,
    removeEducation,
    activeSection,
    toggleSection,
  } = useCV();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm"
    >
      <button
        className="flex w-full items-center justify-between p-4"
        onClick={() => toggleSection("education")}
      >
        <div className="flex items-center gap-2">
          <GraduationCap className="h-5 w-5 text-cyan-400" />
          <h3 className="text-lg font-medium">Education</h3>
        </div>
        {activeSection === "education" ? (
          <ChevronUp className="h-5 w-5 text-gray-400" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-400" />
        )}
      </button>

      {activeSection === "education" && (
        <div className="border-t border-white/10 p-4">
          <div className="space-y-6">
            {cvData.education.map((edu, index) => (
              <div
                key={edu.id}
                className="rounded-lg border border-white/10 bg-white/5 p-4"
              >
                <div className="mb-4 flex items-center justify-between">
                  <h4 className="text-lg font-medium">
                    {edu.degree || edu.institution
                      ? `${edu.degree} at ${edu.institution}`
                      : `Education ${index + 1}`}
                  </h4>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-gray-400 hover:bg-white/10 hover:text-white"
                    onClick={() => removeEducation(edu.id)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-300">
                      Institution
                    </label>
                    <input
                      type="text"
                      value={edu.institution}
                      onChange={(e) =>
                        updateEducation(edu.id, "institution", e.target.value)
                      }
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-300">
                      Degree
                    </label>
                    <input
                      type="text"
                      value={edu.degree}
                      onChange={(e) =>
                        updateEducation(edu.id, "degree", e.target.value)
                      }
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-300">
                      Location
                    </label>
                    <input
                      type="text"
                      value={edu.location}
                      onChange={(e) =>
                        updateEducation(edu.id, "location", e.target.value)
                      }
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-300">
                        Start Date
                      </label>
                      <input
                        type="month"
                        value={edu.startDate}
                        onChange={(e) =>
                          updateEducation(edu.id, "startDate", e.target.value)
                        }
                        className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                        style={{ colorScheme: "dark" }}
                      />
                    </div>

                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-300">
                        End Date
                      </label>
                      <input
                        type="month"
                        value={edu.endDate}
                        onChange={(e) =>
                          updateEducation(edu.id, "endDate", e.target.value)
                        }
                        className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                        style={{ colorScheme: "dark" }}
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="mb-1 block text-sm font-medium text-gray-300">
                      Description
                    </label>
                    <textarea
                      value={edu.description}
                      onChange={(e) =>
                        updateEducation(edu.id, "description", e.target.value)
                      }
                      rows={3}
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                    />
                  </div>
                </div>
              </div>
            ))}

            <Button
              variant="outline"
              className="w-full bg-gradient-to-r from-cyan-400 to-violet-500 hover:from-cyan-500 hover:to-violet-600 text-white"
              onClick={addEducation}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Education
            </Button>
          </div>
        </div>
      )}
    </motion.div>
  );
}
