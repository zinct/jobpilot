"use client";

import { motion } from "framer-motion";
import { FolderGit2, ChevronUp, ChevronDown, Plus, Trash, Check } from "lucide-react";
import { Button } from "@/core/components/ui/button";
import { useCV } from "../cv-context";
import { useState } from "react";

export function ProjectsSection() {
  const { cvData, addProject, updateProject, removeProject, activeSection, toggleSection } = useCV();
  const [customTech, setCustomTech] = useState("");

  // Common technologies for suggestions
  const commonTechnologies = ["React", "Next.js", "TypeScript", "JavaScript"];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }} className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
      <button className="flex w-full items-center justify-between p-4" onClick={() => toggleSection("projects")}>
        <div className="flex items-center gap-2">
          <FolderGit2 className="h-5 w-5 text-cyan-400" />
          <h3 className="text-lg font-medium">Projects</h3>
        </div>
        {activeSection === "projects" ? <ChevronUp className="h-5 w-5 text-gray-400" /> : <ChevronDown className="h-5 w-5 text-gray-400" />}
      </button>

      {activeSection === "projects" && (
        <div className="border-t border-white/10 p-4">
          <div className="space-y-6">
            {cvData.projects.map((project, index) => (
              <div key={project.id} className="rounded-lg border border-white/10 bg-white/5 p-4">
                <div className="mb-4 flex items-center justify-between">
                  <h4 className="text-lg font-medium">{project.title || `Project ${index + 1}`}</h4>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:bg-white/10 hover:text-white" onClick={() => removeProject(project.id)}>
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-300">Project Title</label>
                    <input type="text" value={project.title} onChange={(e) => updateProject(project.id, "title", e.target.value)} className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400" />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-300">Project Link</label>
                    <input type="url" value={project.link} onChange={(e) => updateProject(project.id, "link", e.target.value)} className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400" />
                  </div>

                  <div className="md:col-span-2">
                    <label className="mb-1 block text-sm font-medium text-gray-300">Description</label>
                    <textarea value={project.description} onChange={(e) => updateProject(project.id, "description", e.target.value)} rows={3} className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400" />
                  </div>

                  <div className="space-y-2">
                    <label className="mb-1 block text-sm font-medium text-gray-300">Technologies Used</label>

                    {/* Selected Technologies */}
                    {project.technologies.length > 0 && (
                      <div className="mb-3">
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech) => (
                            <span key={tech} className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-cyan-950/50 border border-cyan-400/30 text-cyan-400 text-sm">
                              {tech}
                              <button
                                type="button"
                                onClick={() => {
                                  const updatedTechnologies = project.technologies.filter((t) => t !== tech);
                                  updateProject(project.id, "technologies", updatedTechnologies);
                                }}
                                className="ml-1 text-cyan-400/70 hover:text-cyan-400"
                              >
                                ×
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Custom Technology Input */}
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={customTech}
                        onChange={(e) => setCustomTech(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && customTech.trim()) {
                            e.preventDefault();
                            if (!project.technologies.includes(customTech.trim())) {
                              updateProject(project.id, "technologies", [...project.technologies, customTech.trim()]);
                            }
                            setCustomTech("");
                          }
                        }}
                        className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                        placeholder="Add custom technology..."
                      />
                      <Button
                        onClick={() => {
                          if (customTech.trim() && !project.technologies.includes(customTech.trim())) {
                            updateProject(project.id, "technologies", [...project.technologies, customTech.trim()]);
                            setCustomTech("");
                          }
                        }}
                        className="text-gray-400 hover:bg-white/10 hover:text-white"
                      >
                        Add
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <Button className="w-full border-dashed border-white/20 hover:bg-white/5" onClick={addProject}>
              <Plus className="mr-2 h-4 w-4" />
              Add Project
            </Button>
          </div>
        </div>
      )}
    </motion.div>
  );
}
