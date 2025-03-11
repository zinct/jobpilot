"use client";

import { motion } from "framer-motion";
import { Plus, FileText } from "lucide-react";
import { Button } from "@/core/components/ui/button";
import { useNavigate } from "react-router";

export default function CVGeneratorPage() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="mb-2">
        <p className="text-gray-400">
          Create and optimize your professional resume with AI.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm md:col-span-2"
        >
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h2 className="text-xl font-semibold">AI Resume Builder</h2>
              <p className="text-gray-400">
                Create professional resumes tailored to specific job
                opportunities
              </p>
            </div>
            <Button
              className="bg-gradient-to-r from-cyan-400 to-violet-500 text-black hover:from-cyan-500 hover:to-violet-600"
              onClick={() => {
                navigate("/dashboard/cv-generator/create");
              }}
            >
              <Plus className="mr-2 h-4 w-4" />
              Create New Resume
            </Button>
          </div>
        </motion.div>

        {/* CV Templates */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
        >
          <h3 className="mb-4 text-lg font-medium">Resume Templates</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {["Professional", "Creative", "Technical", "Executive"].map(
              (template, index) => (
                <div
                  key={index}
                  className="group cursor-pointer rounded-lg border border-white/10 bg-white/5 p-4 transition-colors hover:border-cyan-400/50"
                >
                  <div className="mb-3 aspect-[3/4] rounded-md bg-gradient-to-b from-gray-800 to-gray-900"></div>
                  <h4 className="font-medium group-hover:text-cyan-400">
                    {template}
                  </h4>
                  <p className="text-sm text-gray-400">Modern design</p>
                </div>
              )
            )}
          </div>
        </motion.div>

        {/* CV Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
        >
          <h3 className="mb-4 text-lg font-medium">Your Resumes</h3>
          <div className="space-y-4">
            <div className="flex flex-col justify-between gap-3 rounded-lg border border-white/10 bg-white/5 p-4 sm:flex-row sm:items-center">
              <div>
                <h4 className="font-medium">Senior Developer Resume</h4>
                <p className="text-sm text-gray-400">
                  Last updated: 2 days ago
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="border-white/10 hover:bg-white/10"
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/10"
                >
                  Download
                </Button>
              </div>
            </div>
            <div className="flex flex-col justify-between gap-3 rounded-lg border border-white/10 bg-white/5 p-4 sm:flex-row sm:items-center">
              <div>
                <h4 className="font-medium">UX Designer Resume</h4>
                <p className="text-sm text-gray-400">
                  Last updated: 1 week ago
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="border-white/10 hover:bg-white/10"
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/10"
                >
                  Download
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* AI Resume Optimization */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm md:col-span-2"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 to-violet-500">
              <FileText className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-medium">AI Resume Optimization</h3>
              <p className="text-gray-400">
                Let our AI analyze and improve your resume for specific job
                positions
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-lg border border-white/10 bg-white/5 p-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h4 className="font-medium">Resume Analysis</h4>
                <p className="text-sm text-gray-400">
                  Upload your existing resume for AI analysis and optimization
                </p>
              </div>
              <Button className="bg-gradient-to-r from-cyan-400 to-violet-500 text-black hover:from-cyan-500 hover:to-violet-600">
                Upload Resume
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
