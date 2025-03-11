"use client";

import { motion } from "framer-motion";
import { Palette, Type } from "lucide-react";
import { useCV } from "@/core/components/cv-generator/cv-context";
import {
  templateOptions,
  colorSchemeOptions,
  fontSizeOptions,
} from "@/core/components/cv-generator/default-data";

export function TemplateSettings() {
  const {
    template,
    setTemplate,
    colorScheme,
    setColorScheme,
    fontSize,
    setFontSize,
  } = useCV();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
    >
      <div className="flex items-center gap-3 mb-4">
        <h2 className="text-xl font-semibold">Template Settings</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
            <Palette className="h-4 w-4" /> Template
          </label>
          <select
            value={template}
            onChange={(e) => setTemplate(e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
          >
            {templateOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
            <Palette className="h-4 w-4" /> Color Scheme
          </label>
          <select
            value={colorScheme}
            onChange={(e) => setColorScheme(e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
          >
            {colorSchemeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
            <Type className="h-4 w-4" /> Font Size
          </label>
          <select
            value={fontSize}
            onChange={(e) => setFontSize(e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
          >
            {fontSizeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </motion.div>
  );
}
