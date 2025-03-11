"use client";

import { useState } from "react";
import { ArrowLeft, Eye, Download, Save } from "lucide-react";
import { Button } from "@/core/components/ui/button";
import { LoadingOverlay } from "@/core/components/loading-overlay";
import { CVEditor } from "@/core/components/cv-generator/cv-editor";
import { CVPreview } from "@/core/components/cv-generator/cv-preview";
import { CVProvider } from "@/core/components/cv-generator/cv-context";
import { defaultCVData } from "@/core/components/cv-generator/default-data";

export default function CVGeneratorCreatepage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [jobTitle, setJobTitle] = useState("Senior Frontend Developer");

  // Function to download CV
  const downloadCV = () => {
    alert("CV download functionality would be implemented here");
    // In a real implementation, this would generate a PDF and trigger a download
  };

  return (
    <CVProvider initialData={defaultCVData}>
      <div className="min-h-screen">
        {/* Loading Overlays */}
        <LoadingOverlay
          isLoading={isGenerating}
          message="Generating your CV with AI..."
        />
        <LoadingOverlay
          isLoading={isOptimizing}
          message={`Optimizing your CV for ${jobTitle} positions...`}
        />

        {/* Main Content */}
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <div className="flex items-center gap-2">
                <a href="/dashboard/cv-generator">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-gray-400 hover:text-white"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                </a>
                <h1 className="text-2xl font-bold md:text-3xl">
                  Create New CV
                </h1>
              </div>
              <p className="mt-1 text-gray-400">
                Build a professional CV with AI assistance
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                className="border-white/10 hover:bg-white/10"
                onClick={() => setShowPreview(!showPreview)}
              >
                <Eye className="mr-2 h-4 w-4" />
                {showPreview ? "Hide Preview" : "Show Preview"}
              </Button>
              <Button
                variant="outline"
                className="border-white/10 hover:bg-white/10"
                onClick={downloadCV}
              >
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
              <Button className="bg-gradient-to-r from-cyan-400 to-violet-500 text-black hover:from-cyan-500 hover:to-violet-600">
                <Save className="mr-2 h-4 w-4" />
                Save CV
              </Button>
            </div>
          </div>

          {/* Main Grid Layout */}
          <div className="grid gap-6 lg:grid-cols-5">
            {/* Left Column - Editor */}
            <div
              className={`space-y-6 ${
                showPreview ? "lg:col-span-2" : "lg:col-span-3"
              }`}
            >
              <CVEditor
                isGenerating={isGenerating}
                setIsGenerating={setIsGenerating}
                isOptimizing={isOptimizing}
                setIsOptimizing={setIsOptimizing}
                jobTitle={jobTitle}
                setJobTitle={setJobTitle}
              />
            </div>

            {/* Right Column - Preview */}
            {showPreview && (
              <div className="lg:col-span-3">
                <CVPreview />
              </div>
            )}
          </div>
        </div>
      </div>
    </CVProvider>
  );
}
