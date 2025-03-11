"use client";

import { motion } from "framer-motion";
import { User, ChevronUp, ChevronDown } from "lucide-react";
import { useCV } from "@/core/components/cv-generator/cv-context";

export function PersonalInfoSection() {
  const { cvData, updatePersonalInfo, activeSection, toggleSection } = useCV();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm"
    >
      <button
        className="flex w-full items-center justify-between p-4"
        onClick={() => toggleSection("personalInfo")}
      >
        <div className="flex items-center gap-2">
          <User className="h-5 w-5 text-cyan-400" />
          <h3 className="text-lg font-medium">Personal Information</h3>
        </div>
        {activeSection === "personalInfo" ? (
          <ChevronUp className="h-5 w-5 text-gray-400" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-400" />
        )}
      </button>

      {activeSection === "personalInfo" && (
        <div className="border-t border-white/10 p-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-300">
                Full Name
              </label>
              <input
                type="text"
                value={cvData.personalInfo.name}
                onChange={(e) => updatePersonalInfo("name", e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-300">
                Job Title
              </label>
              <input
                type="text"
                value={cvData.personalInfo.title}
                onChange={(e) => updatePersonalInfo("title", e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-300">
                Email
              </label>
              <input
                type="email"
                value={cvData.personalInfo.email}
                onChange={(e) => updatePersonalInfo("email", e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-300">
                Phone
              </label>
              <input
                type="tel"
                value={cvData.personalInfo.phone}
                onChange={(e) => updatePersonalInfo("phone", e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-300">
                Location
              </label>
              <input
                type="text"
                value={cvData.personalInfo.location}
                onChange={(e) => updatePersonalInfo("location", e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-300">
                Website
              </label>
              <input
                type="url"
                value={cvData.personalInfo.website}
                onChange={(e) => updatePersonalInfo("website", e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-medium text-gray-300">
                Professional Summary
              </label>
              <textarea
                value={cvData.personalInfo.summary}
                onChange={(e) => updatePersonalInfo("summary", e.target.value)}
                rows={4}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
              />
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
