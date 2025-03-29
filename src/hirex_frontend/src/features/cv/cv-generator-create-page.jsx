"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, Eye, Download, Sparkles, BarChart, Loader2, SaveIcon, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/core/components/ui/button";
import { CVEditor } from "@/core/components/cv-generator/cv-editor";
import { CVPreview } from "@/core/components/cv-generator/cv-preview";
import { CVProvider } from "@/core/components/cv-generator/cv-context";
import { useRef } from "react";
import { useNavigate, useParams } from "react-router";
import { Actor } from "@dfinity/agent";
import { useAuth } from "@/core/providers/auth-provider";
import { LoadingOverlay } from "@/core/components/loading-overlay";
import { extractOptValue } from "@/core/utils/canisterUtils";
import { hirex_backend } from "declarations/hirex_backend";
import { defaultCVData } from "../../core/components/cv-generator/default-data";
import { useCV } from "../../core/components/cv-generator/cv-context";
import { jsonStringify, optValue } from "../../core/utils/canisterUtils";
import { useErrorAlert } from "../../core/components/error-alert";

const getScoreColor = (score) => {
  if (score < 50) return "text-red-500";
  if (score < 80) return "text-yellow-500";
  return "text-green-500";
};

const getStrokeColor = (score) => {
  if (score < 50) return "#ef4444";
  if (score < 80) return "#eab308";
  return "#22c55e";
};

const radius = 40;
const circumference = 2 * Math.PI * radius;

// Calculate the dashoffset based on the score
const calculateDashoffset = (score) => {
  return circumference * (1 - score / 100);
};

export default function CVGeneratorCreatepage() {
  const { id } = useParams();
  const { identity, isLoading: isAuthLoading } = useAuth();
  const navigate = useNavigate();

  const [isGenerating, setIsGenerating] = useState(false);

  const [resolvedIssues, setResolvedIssues] = useState([]);
  const [jobTitle, setJobTitle] = useState("Senior Frontend Developer");
  const [activeTab, setActiveTab] = useState("preview");
  const [activeAnalysisTab, setActiveAnalysisTab] = useState("analysis");
  const [isLoading, setIsLoading] = useState(true);
  const [isOptimizing, setIsOptimizing] = useState(false);

  const [defaultResumeData, setDefaultResumeData] = useState(null);

  // Resume Analysis
  const [isAnalyzed, setIsAnalyzed] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisData, setAnalysisData] = useState([]);
  const [resumeScore, setResumeScore] = useState(null);
  const [isReanalyzing, setIsReanalyzing] = useState(false);
  const { showError } = useErrorAlert();
  const cvPreviewRef = useRef(null);

  // Add this function before the return statement
  const handleAnalyzeResume = async () => {
    try {
      Actor.agentOf(hirex_backend).replaceIdentity(identity);

      if (isAnalyzed) {
        setIsReanalyzing(true);
      } else {
        setIsAnalyzing(true);
      }

      const retryRequest = async (fn, retries = 3) => {
        for (let i = 0; i < retries; i++) {
          try {
            const response = await fn();
            return JSON.parse(response.ok); // Parsing di sini
          } catch (error) {
            console.error(`Error in attempt ${i + 1}:`, error);
            if (i === retries - 1) throw error; // Jika sudah mencoba 3x, lempar error
          }
        }
      };

      const [analysisDataResponse, resumeScoreResponse] = await Promise.all([
        retryRequest(() => hirex_backend.analyzeResumeJSON(jsonStringify(defaultResumeData))),
        retryRequest(async () => {
          const response = await hirex_backend.resumeScore(jsonStringify(defaultResumeData));
          return { ok: response.ok };
        }),
      ]);

      if (isAnalyzed) {
        setIsReanalyzing(false);
      } else {
        setIsAnalyzing(false);
      }

      setAnalysisData([...analysisDataResponse]);
      setResumeScore(Number(resumeScoreResponse));

      setIsAnalyzed(true);
    } catch (err) {
      showError(err);
    }
  };

  function handleResumeDataChange(newResumeData) {
    setDefaultResumeData(newResumeData);
  }

  async function fetchResume() {
    Actor.agentOf(hirex_backend).replaceIdentity(identity);
    const response = await hirex_backend.resume({ resumeId: Number(id) });
    setIsLoading(false);
    if ("ok" in response) {
      try {
        setDefaultResumeData({
          personalInfo: extractOptValue(response.ok.personalInfo) ?? formData.personalInfo,
          experience: extractOptValue(response.ok.experience) ?? [],
          education: extractOptValue(response.ok.education) ?? [],
          certifications: extractOptValue(response.ok.certifications) ?? [],
          projects: extractOptValue(response.ok.projects) ?? [],
          skills: extractOptValue(response.ok.skills) ?? [],
          languages: extractOptValue(response.ok.languages) ?? [],
        });
      } catch (err) {
        setDefaultResumeData(defaultCVData);
      }
    } else {
      console.log("err", response.err);
      navigate("/dashboard");
    }
  }

  useEffect(() => {
    if (!identity) return;

    fetchResume();
  }, [identity]);

  useEffect(() => {
    if (defaultResumeData) setIsLoading(false);
  }, [defaultResumeData]);

  return isLoading || isAuthLoading ? (
    <LoadingOverlay isLoading={isLoading || isAuthLoading} message={"Creating your CV..."} />
  ) : (
    <div className="min-h-screen w-full bg-black text-white px-10">
      <CVProvider initialData={defaultResumeData} onDataChange={handleResumeDataChange}>
        <CVGeneratorHeader setActiveTab={setActiveTab} activeTab={activeTab} cvPreviewRef={cvPreviewRef} resumeScore={resumeScore} />
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
                    {!isAnalyzed ? (
                      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex flex-col items-center justify-center space-y-6 rounded-xl border border-white/10 bg-white/5 p-12 backdrop-blur-sm">
                        {isAnalyzing ? (
                          <div className="flex flex-col items-center justify-center space-y-6 py-8">
                            <Loader2 className="h-12 w-12 animate-spin text-cyan-400" />
                            <div className="text-center">
                              <h2 className="text-xl font-semibold mb-2">Analyzing your resume...</h2>
                              <p className="text-gray-400">This will only take a moment</p>
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className="text-center">
                              <h2 className="text-2xl font-semibold mb-3">Resume Analysis</h2>
                              <p className="text-gray-400 mb-6">Get detailed insights and improvement suggestions for your resume</p>
                            </div>
                            <Button onClick={handleAnalyzeResume} className="text-gray-400 hover:bg-white/10 hover:text-white px-8 py-6 text-lg">
                              <BarChart className="mr-2 h-5 w-5" />
                              Analyze this resume
                            </Button>
                          </>
                        )}
                      </motion.div>
                    ) : (
                      <>
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                          <div className="flex items-center gap-6">
                            <div className="relative h-24 w-24">
                              {isReanalyzing ? (
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <Loader2 className="h-12 w-12 animate-spin text-cyan-400" />
                                </div>
                              ) : (
                                <>
                                  <svg className="h-24 w-24 -rotate-90 transform">
                                    <circle cx="48" cy="48" r="40" fill="none" stroke="#1f2937" strokeWidth="8" />
                                    <circle cx="48" cy="48" r="40" fill="none" stroke={getStrokeColor(resumeScore)} strokeWidth="8" strokeDasharray="251.2" strokeDashoffset={calculateDashoffset(resumeScore)} strokeLinecap="round" />
                                  </svg>
                                  <div className="absolute inset-0 flex items-center justify-center">
                                    <span className={`text-2xl font-bold ${getScoreColor(resumeScore)}`}>{resumeScore}%</span>
                                  </div>
                                </>
                              )}
                            </div>
                            <div>
                              <h2 className="text-xl font-semibold">Resume Analysis</h2>
                              <p className="mt-2 text-gray-400">Aim for a higher score for an optimized resume which follows best practices.</p>
                            </div>
                            <Button className="border-white/10 text-white hover:bg-white/10" onClick={handleAnalyzeResume} disabled={isReanalyzing}>
                              {isReanalyzing ? (
                                <>
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                  Reanalyzing...
                                </>
                              ) : (
                                <>
                                  <RefreshCw className="mr-2 h-4 w-4" />
                                  Reanalyze
                                </>
                              )}
                            </Button>
                          </div>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                          <div className="mb-4 flex border-b border-white/10 pb-2">
                            <button onClick={() => setActiveAnalysisTab("analysis")} className={`px-4 py-2 text-sm font-medium ${activeAnalysisTab === "analysis" ? "border-b-2 border-cyan-400 text-white" : "text-gray-400 hover:text-white"}`}>
                              Analysis
                              <span className="ml-2 rounded-full bg-red-400/10 px-2 py-0.5 text-xs text-red-400">{analysisData.length - resolvedIssues.length}</span>
                            </button>
                          </div>

                          {activeAnalysisTab === "analysis" && (
                            <div className="space-y-4">
                              {analysisData.map((row, index) => (
                                <div className="rounded-lg border border-cyan-400/20 bg-cyan-950/20 p-4" key={index}>
                                  <div className="flex items-start gap-3">
                                    <div className="mt-1 rounded-full bg-cyan-400/20 p-1">
                                      <Sparkles className="h-4 w-4 text-cyan-400" />
                                    </div>
                                    <div>
                                      <h5 className="font-medium">{row.title}</h5>
                                      <p className="mt-1 text-sm text-gray-400">{row.description}</p>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </motion.div>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Right Column - Preview */}
              <div className="lg:col-span-3">
                <CVPreview ref={cvPreviewRef} />
              </div>
            </div>
          </div>
        </div>
      </CVProvider>
    </div>
  );
}

export function CVGeneratorHeader({ setActiveTab, activeTab, cvPreviewRef, resumeScore }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { cvData } = useCV();
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { identity } = useAuth();

  const downloadCV = () => {
    setIsDownloading(true);

    import("html2pdf.js")
      .then((html2pdfModule) => {
        const html2pdf = html2pdfModule.default;

        const previewRef = cvPreviewRef.current;
        if (!previewRef) {
          console.error("CV preview reference not properly set up");
          setIsDownloading(false);
          return;
        }

        const element = previewRef.prepareForPDF();
        if (!element) {
          console.error("Failed to prepare CV for PDF generation");
          setIsDownloading(false);
          return;
        }

        const tempContainer = document.createElement("div");
        tempContainer.style.position = "absolute";
        tempContainer.style.left = "-9999px";
        tempContainer.style.top = "-9999px";
        tempContainer.appendChild(element);
        document.body.appendChild(tempContainer);

        const opt = {
          margin: [0, 0, 0, 0],
          image: { type: "jpeg", quality: 1.0 },
          html2canvas: {
            scale: 2,
            useCORS: true,
            logging: false,
            removeContainer: true,
            letterRendering: true,
            allowTaint: true,
            backgroundColor: "#ffffff",
            windowHeight: element.scrollHeight,
          },
          jsPDF: {
            unit: "mm",
            format: "a4",
            orientation: "portrait",
            precision: 16,
            compress: true,
            putOnlyUsedFonts: true,
            floatPrecision: 16,
          },
        };

        html2pdf()
          .from(element)
          .set(opt)
          .outputPdf("blob")
          .then((blob) => {
            const pdfUrl = URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = pdfUrl;
            a.download = "Your resume.pdf";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);

            document.body.removeChild(tempContainer);
            setIsDownloading(false);
          })
          .catch((error) => {
            console.error("Error generating PDF:", error);
            if (document.body.contains(tempContainer)) {
              document.body.removeChild(tempContainer);
            }
            setIsDownloading(false);
          });
      })
      .catch((error) => {
        console.error("Error loading html2pdf:", error);
        setIsDownloading(false);
      });
  };

  async function handleSave() {
    setIsSaving(true);
    Actor.agentOf(hirex_backend).replaceIdentity(identity);

    const response = await hirex_backend.updateResume({
      resumeId: Number(id),
      personalInfo: optValue(cvData.personalInfo),
      experience: optValue(cvData.experience),
      projects: optValue(cvData.projects),
      certifications: optValue(cvData.certifications),
      education: optValue(cvData.education),
      languages: optValue(cvData.languages),
      skills: optValue(cvData.skills),
    });
    setIsSaving(false);
    console.log("response", response);

    if ("ok" in response) {
    } else {
      console.log("err", response.err);
    }
  }

  return (
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
          <Button className="text-gray-400 hover:bg-white/10 hover:text-white" onClick={handleSave}>
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving data...
              </>
            ) : (
              <>
                <SaveIcon className="mr-2 h-4 w-4" />
                Save Resume
              </>
            )}
          </Button>
          <Button className="text-gray-400 hover:bg-white/10 hover:text-white" onClick={downloadCV} disabled={isDownloading}>
            {isDownloading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating PDF...
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Download Resume
              </>
            )}
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
          {resumeScore ? <span className={`ml-2 rounded bg-green-600/20 px-2 py-0.5 text-xs font-medium ${getScoreColor(resumeScore)}`}>{resumeScore}%</span> : <></>}
        </button>
      </div>
    </header>
  );
}
