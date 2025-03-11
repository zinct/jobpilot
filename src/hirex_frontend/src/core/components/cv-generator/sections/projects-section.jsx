"use client";

import { motion } from "framer-motion";
import { FolderGit2, ChevronUp, ChevronDown, Plus, Trash } from "lucide-react";
import { Button } from "@/core/components/ui/button";
import { useCV } from "@/core/components/cv-generator/cv-context";

export function ProjectsSection() {
  const {
    cvData,
    addProject,
    updateProject,
    removeProject,
    activeSection,
    toggleSection,
  } = useCV();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm"
    >
      <button
        className="flex w-full items-center justify-between p-4"
        onClick={() => toggleSection("projects")}
      >
        <div className="flex items-center gap-2">
          <FolderGit2 className="h-5 w-5 text-cyan-400" />
          <h3 className="text-lg font-medium">Projects</h3>
        </div>
        {activeSection === "projects" ? (
          <ChevronUp className="h-5 w-5 text-gray-400" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-400" />
        )}
      </button>

      {activeSection === "projects" && (
        <div className="border-t border-white/10 p-4">
          <div className="space-y-6">
            {cvData.projects.map((project, index) => (
              <div
                key={project.id}
                className="rounded-lg border border-white/10 bg-white/5 p-4"
              >
                <div className="mb-4 flex items-center justify-between">
                  <h4 className="text-lg font-medium">
                    {project.title || `Project ${index + 1}`}
                  </h4>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-gray-400 hover:bg-white/10 hover:text-white"
                    onClick={() => removeProject(project.id)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-300">
                      Project Title
                    </label>
                    <input
                      type="text"
                      value={project.title}
                      onChange={(e) =>
                        updateProject(project.id, "title", e.target.value)
                      }
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-300">
                      Project Link
                    </label>
                    <input
                      type="url"
                      value={project.link}
                      onChange={(e) =>
                        updateProject(project.id, "link", e.target.value)
                      }
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="mb-1 block text-sm font-medium text-gray-300">
                      Description
                    </label>
                    <textarea
                      value={project.description}
                      onChange={(e) =>
                        updateProject(project.id, "description", e.target.value)
                      }
                      rows={3}
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="mb-1 block text-sm font-medium text-gray-300">
                      Technologies Used
                    </label>
                    <input
                      type="text"
                      value={project.technologies.join(", ")}
                      onChange={(e) =>
                        updateProject(
                          project.id,
                          "technologies",
                          e.target.value
                            .split(",")
                            .map((tech) => tech.trim())
                            .filter((tech) => tech !== "")
                        )
                      }
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                      placeholder="React, Node.js, MongoDB, etc. (comma separated)"
                    />
                  </div>
                </div>
              </div>
            ))}

            <Button
              variant="outline"
              className="w-full border-dashed border-white/20 hover:bg-white/5"
              onClick={addProject}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Project
            </Button>
          </div>
        </div>
      )}
    </motion.div>
  );
}
