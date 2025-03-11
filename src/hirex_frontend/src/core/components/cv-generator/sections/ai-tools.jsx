"use client";

import { motion } from "framer-motion";
import { Sparkles, RefreshCw, Loader2, BrainCircuit } from "lucide-react";
import { Button } from "@/core/components/ui/button";
import { useCV } from "@/core/components/cv-generator/cv-context";

export function AITools({
  isGenerating,
  onGenerate,
  isOptimizing,
  onOptimize,
  jobTitle,
  setJobTitle,
  company,
  setCompany,
}) {
  const { aiSuggestions } = useCV();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 to-violet-500">
          <BrainCircuit className="h-5 w-5 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-semibold">AI Assistant</h2>
          <p className="text-gray-400">
            Let AI help you create and optimize your CV
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-gray-300">
            Generate Content
          </h3>
          <Button
            className="w-full justify-between bg-gradient-to-r from-cyan-400 to-violet-500 text-black hover:from-cyan-500 hover:to-violet-600"
            onClick={onGenerate}
            disabled={isGenerating}
          >
            <div className="flex items-center">
              <Sparkles className="mr-2 h-4 w-4" />
              <span>Generate with AI</span>
            </div>
            {isGenerating && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
          </Button>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-medium text-gray-300">
            Optimize for Job
          </h3>
          <div className="flex gap-2">
            <input
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="Job Title (e.g. Frontend Developer)"
              className="flex-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
            />
            <Button
              variant="outline"
              className="border-white/10 hover:bg-white/10"
              onClick={onOptimize}
              disabled={isOptimizing}
            >
              {isOptimizing ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4" />
              )}
            </Button>
          </div>
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Company (Optional)"
            className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
          />
        </div>
      </div>

      {/* AI Suggestions */}
      {aiSuggestions.length > 0 && (
        <div className="mt-4 space-y-2">
          <h3 className="text-sm font-medium text-gray-300">AI Suggestions</h3>
          <div className="rounded-lg border border-cyan-400/20 bg-cyan-950/20 p-3">
            <ul className="space-y-2">
              {aiSuggestions.map((suggestion, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <Sparkles className="mt-0.5 h-4 w-4 flex-shrink-0 text-cyan-400" />
                  <span>{suggestion}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </motion.div>
  );
}
