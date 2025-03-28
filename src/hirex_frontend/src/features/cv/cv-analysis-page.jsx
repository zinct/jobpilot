"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Upload, FileText, Check, AlertCircle, X, Download, BarChart, AlertTriangle, CheckCircle, Sparkles, RefreshCw, Loader2 } from "lucide-react";
import { Button } from "@/core/components/ui/button";
import * as pdfjsLib from "pdfjs-dist";
import { GlobalWorkerOptions } from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker?url";
import { hirex_backend } from "declarations/hirex_backend";
import { Actor } from "@dfinity/agent";
import { useAuth } from "../../core/providers/auth-provider";
import { LoadingOverlay } from "../../core/components/loading-overlay";

GlobalWorkerOptions.workerSrc = pdfWorker;

export default function ResumeAnalysisPage() {
  const { identity, isLoading: isAuthLoading } = useAuth();

  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [jsonOutput, setJsonOutput] = useState(null);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);
  const [isAnalyzed, setIsAnalyzed] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [strength, setStrength] = useState(false);
  const [suggestion, setSuggestion] = useState(false);
  const [weakness, setWeakness] = useState(false);
  // Handle drag events
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) setIsDragging(true);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];
    validateAndProcessFile(droppedFile);
  };

  // Handle file input change
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    validateAndProcessFile(selectedFile);
  };

  const validateAndProcessFile = (selectedFile) => {
    setError(null);

    // Check if file exists
    if (!selectedFile) {
      return;
    }

    // Validate file type
    if (selectedFile.type !== "application/pdf") {
      setError("Please upload a PDF file");
      return;
    }

    // Validate file size (max 10MB)
    if (selectedFile.size > 10 * 1024 * 1024) {
      setError("File size exceeds 10MB limit");
      return;
    }

    setFile(selectedFile);
    extractTextFromPDF(selectedFile);
  };

  const extractTextFromPDF = async (file) => {
    setIsProcessing(true);

    try {
      if (file && file.type === "application/pdf") {
        const reader = new FileReader();

        reader.onerror = () => {
          setError("Failed to read file");
          setIsProcessing(false);
        };

        reader.onload = async () => {
          try {
            const pdfData = new Uint8Array(reader.result);
            const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;
            let extractedText = "";

            for (let i = 1; i <= pdf.numPages; i++) {
              const page = await pdf.getPage(i);
              const textContent = await page.getTextContent();
              const pageText = textContent.items.map((item) => item.str).join(" ");
              extractedText += pageText + "\n";
            }

            if (extractedText.trim() === "" || !extractedText) throw Error("Sorry, the resume format cannot be read by the system or there is an incorrect format.");

            setJsonOutput(extractedText);
          } catch (err) {
            setError(err.message);
          } finally {
            setIsProcessing(false);
          }
        };

        reader.readAsArrayBuffer(file);
      }
    } catch (err) {
      setError("Unexpected error occurred");
      setIsProcessing(false);
    }
  };

  // Handle file removal
  const handleRemoveFile = () => {
    setFile(null);
    setJsonOutput(null);
    setError(null);
    setIsAnalyzed(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Handle analyze resume

  const handleAnalyzeResume = async () => {
    if (!jsonOutput) return;

    setIsAnalyzing(true);
    Actor.agentOf(hirex_backend).replaceIdentity(identity);

    const retryAnalyzeResume = async (responseType, retries = 3) => {
      for (let i = 0; i < retries; i++) {
        try {
          const response = await hirex_backend.analyzeResume({
            resume: jsonOutput,
            responseType,
          });

          return JSON.parse(response.ok);
        } catch (error) {
          console.error(`Error parsing ${responseType}, attempt ${i + 1}:`, error);
          if (i === retries - 1) return null; // Jika gagal semua, return null
        }
      }
    };

    const [strengthResponse, weaknessResponse, suggestionResponse] = await Promise.all([retryAnalyzeResume("Strengths"), retryAnalyzeResume("Weaknesses"), retryAnalyzeResume("Suggestions")]);

    setStrength(strengthResponse || []);
    setWeakness(weaknessResponse || []);
    setSuggestion(suggestionResponse || []);

    setIsAnalyzing(false);
    setIsAnalyzed(true);
  };

  return (
    <div className="min-h-screen w-full bg-black text-white">
      <LoadingOverlay isLoading={isAuthLoading} message={"Your page is being initializing..."} />
      {/* Header */}
      <header className="sticky top-0 z-30 ">
        <div className="flex items-center justify-between">
          {file && jsonOutput && !isAnalyzed && (
            <Button onClick={handleAnalyzeResume} className="bg-gradient-to-r from-cyan-400 to-violet-500 text-black hover:from-cyan-500 hover:to-violet-600" disabled={isAnalyzing}>
              {isAnalyzing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <BarChart className="mr-2 h-4 w-4" />
                  Analyze Resume
                </>
              )}
            </Button>
          )}
        </div>
      </header>

      <div className="p-6">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Upload Section */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <h2 className="text-lg font-medium mb-4">Upload Resume</h2>

            {!file ? (
              <div className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${isDragging ? "border-cyan-400 bg-cyan-400/10" : "border-white/20 hover:border-cyan-400/50 hover:bg-white/5"}`} onDragEnter={handleDragEnter} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop} onClick={() => fileInputRef.current.click()}>
                <input type="file" ref={fileInputRef} onChange={handleFileChange} accept=".pdf" className="hidden" />
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-4 text-sm font-medium text-gray-200">Drag and drop your PDF file here, or click to browse</p>
                <p className="mt-2 text-xs text-gray-400">PDF files only, max 10MB</p>
              </div>
            ) : (
              <div className="border border-white/10 rounded-lg p-4 bg-white/5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <FileText className="h-8 w-8 text-cyan-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">{file.name}</p>
                      <p className="text-xs text-gray-400">{(file.size / 1024).toFixed(2)} KB</p>
                    </div>
                  </div>
                  <button onClick={handleRemoveFile} className="p-1 rounded-full text-gray-400 hover:text-white hover:bg-white/10">
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {isProcessing && (
                  <div className="mt-4">
                    <div className="w-full bg-gray-700 rounded-full h-2.5">
                      <div className="bg-gradient-to-r from-cyan-400 to-violet-500 h-2.5 rounded-full animate-pulse w-full"></div>
                    </div>
                    <p className="text-xs text-gray-400 mt-2">Processing PDF...</p>
                  </div>
                )}

                {jsonOutput && !isProcessing && !error && (
                  <div className="mt-4 p-3 bg-green-900/20 border border-green-500/20 rounded-md">
                    <div className="flex">
                      <Check className="h-5 w-5 text-green-500" />
                      <p className="ml-2 text-sm text-green-400">PDF processed successfully!</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {error && (
              <div className="mt-4 p-3 bg-red-900/20 border border-red-500/20 rounded-md">
                <div className="flex">
                  <AlertCircle className="h-5 w-5 text-red-500" />
                  <p className="ml-2 text-sm text-red-400">{error}</p>
                </div>
              </div>
            )}

            {/* Instructions */}
            <div className="mt-6 bg-white/5 border border-white/10 rounded-lg p-4">
              <h3 className="text-sm font-medium text-white mb-2">Instructions</h3>
              <ul className="text-xs text-gray-400 space-y-1 list-disc pl-5">
                <li>Upload a PDF version of your resume</li>
                <li>The system will extract all text content</li>
                <li>Click "Analyze Resume" to get insights</li>
                <li>Review the analysis to improve your resume</li>
              </ul>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            {!isAnalyzed ? (
              <>
                <h2 className="text-lg font-medium mb-3">Analysis Result</h2>
                <div className="border border-white/10 rounded-lg p-8 text-center h-64 flex items-center justify-center bg-white/5">
                  <p className="text-gray-400">Upload a Resume to see a analysis result</p>
                </div>
              </>
            ) : (
              <>
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="mb-3 flex items-center font-medium text-green-300">
                      <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Strengths
                    </h2>
                  </div>
                  <ul className="ml-7 list-disc space-y-2 text-white">
                    {strength.map((row, index) => (
                      <li key={`row-${index}`}>{row}</li>
                    ))}
                  </ul>
                </div>
                <div className="mt-8">
                  <h2 className="mb-3 flex items-center font-medium text-amber-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    Weaknesses
                  </h2>
                  <ul className="ml-7 list-disc space-y-2 text-white">
                    {weakness.map((row, index) => (
                      <li key={`weakness-${index}`}>{row}</li>
                    ))}
                  </ul>
                </div>
                <div className="mt-8">
                  <h3 className="mb-3 flex items-center font-medium text-blue-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Suggestions
                  </h3>
                  <ul className="ml-7 list-disc space-y-2 text-white">
                    {suggestion.map((row, index) => (
                      <li key={`suggestion-${index}`}>{row}</li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
