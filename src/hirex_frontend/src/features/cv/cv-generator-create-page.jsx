"use client";

import { useState } from "react";
import { ArrowLeft, Eye, Download, Sparkles, Edit, AlertTriangle, BarChart } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/core/components/ui/button";
import { CVEditor } from "@/core/components/cv-generator/cv-editor";
import { CVPreview } from "@/core/components/cv-generator/cv-preview";
import { CVProvider } from "@/core/components/cv-generator/cv-context";
import { defaultCVData } from "@/core/components/cv-generator/default-data";
import { useNavigate } from "react-router";

export default function CVGeneratorCreatepage() {
  const navigate = useNavigate();
  const [isGenerating, setIsGenerating] = useState(false);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [resolvedIssues, setResolvedIssues] = useState([]);
  const [jobTitle, setJobTitle] = useState("Senior Frontend Developer");
  const [activeTab, setActiveTab] = useState("preview");
  const [activeAnalysisTab, setActiveAnalysisTab] = useState("analysis");

  // Function to download CV
  const downloadCV = () => {
    alert("CV download functionality would be implemented here");
  };

  return (
    <div className="min-h-screen w-full bg-black text-white px-10">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-white/10 bg-black/90 backdrop-blur-sm">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <a
              href="#"
              onClick={() => {
                navigate("/dashboard/cv-generator");
              }}
            >
              <Button variant="ghost" size="sm" className="text-gray-400 hover:bg-white/5 hover:text-white">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            </a>
            <h1 className="text-xl font-semibold text-white">CV Generator</h1>
          </div>
          <div className="flex items-center gap-3">
            <Button className="bg-gradient-to-r from-cyan-400 to-violet-500 text-black hover:from-cyan-500 hover:to-violet-600">
              {isOptimizing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Optimizing...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  One Click Optimizer
                </>
              )}
            </Button>
            <Button variant="outline" className="border-white/10 text-white hover:bg-white/10">
              {isDownloading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
              Download Resume
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex px-6">
          <button onClick={() => setActiveTab("preview")} className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition-colors ${activeTab === "preview" ? "border-cyan-400 text-cyan-400" : "border-transparent text-gray-400 hover:border-gray-700 hover:text-white"}`}>
            <Eye className="h-4 w-4" />
            Preview
          </button>
          <button onClick={() => setActiveTab("analysis")} className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition-colors ${activeTab === "analysis" ? "border-cyan-400 text-cyan-400" : "border-transparent text-gray-400 hover:border-gray-700 hover:text-white"}`}>
            <BarChart className="h-4 w-4" />
            Resume Analysis
            <span className="ml-2 rounded bg-green-600/20 px-2 py-0.5 text-xs font-medium text-green-400">84%</span>
          </button>
        </div>
      </header>

      <CVProvider initialData={defaultCVData}>
        <div className="min-h-screen">
          {/* Main Content */}
          <div className="space-y-6">
            {/* Main Grid Layout */}
            <div className="grid gap-6 lg:grid-cols-5">
              {/* Left Column - Editor */}
              <div className={`space-y-6 lg:col-span-2 *:lg:col-span-3`}>
                {activeTab === "preview" ? (
                  <CVEditor isGenerating={isGenerating} setIsGenerating={setIsGenerating} isOptimizing={isOptimizing} setIsOptimizing={setIsOptimizing} jobTitle={jobTitle} setJobTitle={setJobTitle} />
                ) : (
                  <div className="mx-auto max-w-5xl space-y-6 p-8">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                      <div className="flex items-center gap-6">
                        <div className="relative h-24 w-24">
                          <svg className="h-24 w-24 -rotate-90 transform">
                            <circle cx="48" cy="48" r="40" fill="none" stroke="#1f2937" strokeWidth="8" />
                            <circle cx="48" cy="48" r="40" fill="none" stroke="#22c55e" strokeWidth="8" strokeDasharray="251.2" strokeDashoffset="40.2" strokeLinecap="round" />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-2xl font-bold">84%</span>
                          </div>
                        </div>
                        <div>
                          <h2 className="text-xl font-semibold">Resume Analysis</h2>
                          <p className="mt-2 text-gray-400">Aim for a higher score for an optimized resume which follows best practices.</p>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                      <h3 className="mb-6 text-lg font-medium">PENGALAMAN KERJA</h3>

                      <div className="mb-4 flex border-b border-white/10 pb-2">
                        <button onClick={() => setActiveAnalysisTab("analysis")} className={`px-4 py-2 text-sm font-medium ${activeAnalysisTab === "analysis" ? "border-b-2 border-cyan-400 text-white" : "text-gray-400 hover:text-white"}`}>
                          Analysis
                          <span className="ml-2 rounded-full bg-red-400/10 px-2 py-0.5 text-xs text-red-400">{3 - resolvedIssues.length}</span>
                        </button>
                        <button onClick={() => setActiveAnalysisTab("guidance")} className={`px-4 py-2 text-sm font-medium ${activeAnalysisTab === "guidance" ? "border-b-2 border-cyan-400 text-white" : "text-gray-400 hover:text-white"}`}>
                          Guidance
                        </button>
                      </div>

                      {activeAnalysisTab === "analysis" && (
                        <div className="space-y-4">
                          {!resolvedIssues.includes("issue1") && (
                            <div className="rounded-lg border border-orange-400/20 bg-orange-950/20 p-4">
                              <div className="flex items-start justify-between">
                                <div className="flex gap-3">
                                  <div className="mt-1 rounded-full bg-orange-400/20 p-1">
                                    <AlertTriangle className="h-4 w-4 text-orange-400" />
                                  </div>
                                  <div>
                                    <h5 className="font-medium">Bullet Points Missing in Backend Developer Lead | Kontrak at Bawaslu RI</h5>
                                    <p className="mt-1 text-sm text-gray-400">Bullet points are a great way to split lengthy information into more manageable sections, making it easier to read and understand.</p>
                                  </div>
                                </div>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="border-orange-400/30 text-orange-400 hover:bg-orange-400/10"
                                  onClick={() => {
                                    handleResolveIssue("issue1");
                                    setActiveTab("builder");
                                  }}
                                >
                                  Resolve
                                </Button>
                              </div>
                            </div>
                          )}

                          {!resolvedIssues.includes("issue2") && (
                            <div className="rounded-lg border border-red-400/20 bg-red-950/20 p-4">
                              <div className="flex items-start justify-between">
                                <div className="flex gap-3">
                                  <div className="mt-1 rounded-full bg-red-400/20 p-1">
                                    <AlertTriangle className="h-4 w-4 text-red-400" />
                                  </div>
                                  <div>
                                    <h5 className="font-medium">Company Location Missing in Flutter Developer at PT Milenial Elite Teknologi (Me-tech.id)</h5>
                                    <p className="mt-1 text-sm text-gray-400">Company Location gives context and helps recruiters to understand the location of your current and previous work experiences.</p>
                                  </div>
                                </div>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="border-red-400/30 text-red-400 hover:bg-red-400/10"
                                  onClick={() => {
                                    handleResolveIssue("issue2");
                                    setActiveTab("builder");
                                  }}
                                >
                                  Resolve
                                </Button>
                              </div>
                            </div>
                          )}

                          {!resolvedIssues.includes("issue3") && (
                            <div className="rounded-lg border border-red-400/20 bg-red-950/20 p-4">
                              <div className="flex items-start justify-between">
                                <div className="flex gap-3">
                                  <div className="mt-1 rounded-full bg-red-400/20 p-1">
                                    <AlertTriangle className="h-4 w-4 text-red-400" />
                                  </div>
                                  <div>
                                    <h5 className="font-medium">Company Location Missing in Mobile Developer Intern at Motion Innovation Laboratory</h5>
                                    <p className="mt-1 text-sm text-gray-400">Company Location gives context and helps recruiters to understand the location of your current and previous work experiences.</p>
                                  </div>
                                </div>
                                <Button variant="outline" size="sm" className="border-red-400/30 text-red-400 hover:bg-red-400/10">
                                  Resolve
                                </Button>
                              </div>
                            </div>
                          )}

                          {resolvedIssues.length > 0 && resolvedIssues.length < 3 && (
                            <div className="rounded-lg border border-green-400/20 bg-green-950/20 p-4">
                              <div className="flex items-start gap-3">
                                <div className="mt-1 rounded-full bg-green-400/20 p-1">
                                  <CheckCircle className="h-4 w-4 text-green-400" />
                                </div>
                                <div>
                                  <h5 className="font-medium">
                                    {resolvedIssues.length} issue
                                    {resolvedIssues.length > 1 ? "s" : ""} resolved
                                  </h5>
                                  <p className="mt-1 text-sm text-gray-400">Great job! You've improved your resume. Keep going to resolve all issues.</p>
                                </div>
                              </div>
                            </div>
                          )}

                          {resolvedIssues.length === 3 && (
                            <div className="rounded-lg border border-green-400/20 bg-green-950/20 p-4">
                              <div className="flex items-start gap-3">
                                <div className="mt-1 rounded-full bg-green-400/20 p-1">
                                  <CheckCircle className="h-4 w-4 text-green-400" />
                                </div>
                                <div>
                                  <h5 className="font-medium">All issues resolved!</h5>
                                  <p className="mt-1 text-sm text-gray-400">Congratulations! Your resume is now optimized and ready to be downloaded.</p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {activeAnalysisTab === "guidance" && (
                        <div className="space-y-4">
                          <div className="rounded-lg border border-cyan-400/20 bg-cyan-950/20 p-4">
                            <div className="flex items-start gap-3">
                              <div className="mt-1 rounded-full bg-cyan-400/20 p-1">
                                <Sparkles className="h-4 w-4 text-cyan-400" />
                              </div>
                              <div>
                                <h5 className="font-medium">Use Action Verbs</h5>
                                <p className="mt-1 text-sm text-gray-400">Start your bullet points with strong action verbs like "Developed," "Implemented," or "Led" to make your achievements more impactful.</p>
                              </div>
                            </div>
                          </div>

                          <div className="rounded-lg border border-cyan-400/20 bg-cyan-950/20 p-4">
                            <div className="flex items-start gap-3">
                              <div className="mt-1 rounded-full bg-cyan-400/20 p-1">
                                <Sparkles className="h-4 w-4 text-cyan-400" />
                              </div>
                              <div>
                                <h5 className="font-medium">Quantify Achievements</h5>
                                <p className="mt-1 text-sm text-gray-400">Include numbers and percentages to quantify your achievements. For example, "Increased website performance by 40%" is more impactful than "Improved website performance."</p>
                              </div>
                            </div>
                          </div>

                          <div className="rounded-lg border border-cyan-400/20 bg-cyan-950/20 p-4">
                            <div className="flex items-start gap-3">
                              <div className="mt-1 rounded-full bg-cyan-400/20 p-1">
                                <Sparkles className="h-4 w-4 text-cyan-400" />
                              </div>
                              <div>
                                <h5 className="font-medium">Tailor to Job Description</h5>
                                <p className="mt-1 text-sm text-gray-400">Customize your resume for each job application by highlighting relevant skills and experiences that match the job description.</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </div>
                )}
              </div>

              {/* Right Column - Preview */}
              <div className="lg:col-span-3">
                <CVPreview />
              </div>
            </div>
          </div>
        </div>
      </CVProvider>
    </div>
  );
}
