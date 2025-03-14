"use client";

import { motion } from "framer-motion";
import {
  Briefcase,
  ChevronUp,
  ChevronDown,
  Plus,
  Trash,
  PlusCircle,
} from "lucide-react";
import { Button } from "@/core/components/ui/button";
import { useCV } from "@/core/components/cv-generator/cv-context";

export function ExperienceSection() {
  const {
    cvData,
    addExperience,
    updateExperience,
    removeExperience,
    addAchievement,
    updateAchievement,
    removeAchievement,
    activeSection,
    toggleSection,
  } = useCV();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm"
    >
      <button
        className="flex w-full items-center justify-between p-4"
        onClick={() => toggleSection("experience")}
      >
        <div className="flex items-center gap-2">
          <Briefcase className="h-5 w-5 text-cyan-400" />
          <h3 className="text-lg font-medium">Work Experience</h3>
        </div>
        {activeSection === "experience" ? (
          <ChevronUp className="h-5 w-5 text-gray-400" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-400" />
        )}
      </button>

      {activeSection === "experience" && (
        <div className="border-t border-white/10 p-4">
          <div className="space-y-6">
            {cvData.experience.map((exp, index) => (
              <div
                key={exp.id}
                className="rounded-lg border border-white/10 bg-white/5 p-4"
              >
                <div className="mb-4 flex items-center justify-between">
                  <h4 className="text-lg font-medium">
                    {exp.position || exp.company
                      ? `${exp.position} at ${exp.company}`
                      : `Experience ${index + 1}`}
                  </h4>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-gray-400 hover:bg-white/10 hover:text-white"
                    onClick={() => removeExperience(exp.id)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-300">
                      Company
                    </label>
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e) =>
                        updateExperience(exp.id, "company", e.target.value)
                      }
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-300">
                      Position
                    </label>
                    <input
                      type="text"
                      value={exp.position}
                      onChange={(e) =>
                        updateExperience(exp.id, "position", e.target.value)
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
                      value={exp.location}
                      onChange={(e) =>
                        updateExperience(exp.id, "location", e.target.value)
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
                        value={exp.startDate}
                        onChange={(e) =>
                          updateExperience(exp.id, "startDate", e.target.value)
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
                        value={exp.endDate}
                        onChange={(e) =>
                          updateExperience(exp.id, "endDate", e.target.value)
                        }
                        disabled={exp.current}
                        className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 disabled:opacity-50"
                        style={{ colorScheme: "dark" }}
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="mb-1 flex items-center gap-2 text-sm font-medium text-gray-300">
                      <input
                        type="checkbox"
                        checked={exp.current}
                        onChange={(e) =>
                          updateExperience(exp.id, "current", e.target.checked)
                        }
                        className="rounded border-white/10 bg-white/5 text-cyan-400 focus:ring-cyan-400"
                      />
                      Current Position
                    </label>
                  </div>

                  <div className="md:col-span-2">
                    <label className="mb-1 block text-sm font-medium text-gray-300">
                      Description
                    </label>
                    <textarea
                      value={exp.description}
                      onChange={(e) =>
                        updateExperience(exp.id, "description", e.target.value)
                      }
                      rows={3}
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="mb-1 block text-sm font-medium text-gray-300">
                      Key Achievements
                    </label>

                    <div className="space-y-2">
                      {exp.achievements.map((achievement, achievementIndex) => (
                        <div key={achievementIndex} className="flex gap-2">
                          <input
                            type="text"
                            value={achievement}
                            onChange={(e) =>
                              updateAchievement(
                                exp.id,
                                achievementIndex,
                                e.target.value
                              )
                            }
                            className="flex-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                            placeholder="Describe a key achievement..."
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-10 w-10 text-gray-400 hover:bg-white/10 hover:text-white"
                            onClick={() =>
                              removeAchievement(exp.id, achievementIndex)
                            }
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}

                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-2 bg-gradient-to-r from-cyan-400 to-violet-500 text-black hover:from-cyan-500 hover:to-violet-600 text-white"
                        onClick={() => addAchievement(exp.id)}
                      >
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add Achievement
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <Button
              variant="outline"
              className="w-full bg-gradient-to-r from-cyan-400 to-violet-500 text-black hover:from-cyan-500 hover:to-violet-600 text-white"
              onClick={addExperience}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Work Experience
            </Button>
          </div>
        </div>
      )}
    </motion.div>
  );
}
