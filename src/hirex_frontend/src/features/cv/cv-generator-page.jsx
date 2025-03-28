"use client";

import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Button } from "@/core/components/ui/button";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { LoadingOverlay } from "../../core/components/loading-overlay";
import { useAuth } from "../../core/providers/auth-provider";
import { hirex_backend } from "../../../../declarations/hirex_backend";
import { Actor } from "@dfinity/agent";
import { EmptyState } from "../../core/components/ui/empty-state";
import { useErrorAlert } from "../../core/components/error-alert";

const ResumeSkeletonLoader = () => {
  return (
    <div className="flex flex-col justify-between gap-3 rounded-lg border border-white/10 bg-white/5 p-4 sm:flex-row sm:items-center">
      <div className="w-full">
        <div className="h-5 w-48 rounded-md bg-white/10 animate-pulse mb-2"></div>
        <div className="h-4 w-36 rounded-md bg-white/10 animate-pulse"></div>
      </div>
      <div className="flex flex-wrap gap-2">
        <div className="h-8 w-16 rounded-md bg-white/10 animate-pulse"></div>
        <div className="h-8 w-24 rounded-md bg-white/10 animate-pulse"></div>
      </div>
    </div>
  );
};

export default function CVGeneratorPage() {
  const navigate = useNavigate();
  const { identity, isLoading: isAuthLoading, user } = useAuth();
  const { showError } = useErrorAlert();

  const [isLoading, setIsLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [resumes, setResumes] = useState([]);

  async function handleCreate() {
    try {
      Actor.agentOf(hirex_backend).replaceIdentity(identity);

      setIsCreating(true);
      const response = await hirex_backend.createResume();
      setIsCreating(false);

      if ("ok" in response) {
        const id = Number(response.ok);
        navigate("/dashboard/cv-generator/builder/" + id);
      } else {
        throw Error(response.err);
      }
    } catch (err) {
      showError(err);
    }
  }

  function timeAgo(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);

    const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
      second: 1,
    };

    for (const [unit, value] of Object.entries(intervals)) {
      const count = Math.floor(seconds / value);
      if (count >= 1) {
        return `Edited ${count} ${unit}${count > 1 ? "s" : ""} ago`;
      }
    }

    return "Edited just now";
  }

  async function fetchResume() {
    try {
      setIsLoading(true);
      Actor.agentOf(hirex_backend).replaceIdentity(identity);
      const response = await hirex_backend.resumes();
      setIsLoading(false);
      if ("ok" in response) {
        setResumes(
          response.ok.map((row) => {
            const label = row.personalInfo[0]?.title[0] ? row.personalInfo[0]?.title[0] : user.fullName[0];
            return { id: row.id, label: "Resume: " + label, date: timeAgo(Date(row.updatedAt)) };
          })
        );
      } else {
        throw Error(response.err);
      }
    } catch (err) {
      showError(err);
    }
  }

  useEffect(() => {
    if (!identity) return;

    fetchResume();
  }, [identity]);

  return (
    <div className="space-y-6">
      <LoadingOverlay isLoading={isAuthLoading || isCreating} message={"Please wait, your application is being processed..."} />

      <div className="mb-2">
        <p className="text-gray-400">Create and optimize your professional resume with AI.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm md:col-span-2">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h2 className="text-xl font-semibold">AI Resume Builder</h2>
              <p className="text-gray-400">Create professional resumes tailored to specific job opportunities</p>
            </div>
            <Button className="bg-gradient-to-r from-cyan-400 to-violet-500 text-black hover:from-cyan-500 hover:to-violet-600" onClick={handleCreate}>
              <Plus className="mr-2 h-4 w-4" />
              Create New Resume
            </Button>
          </div>
        </motion.div>

        {/* CV Preview */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm md:col-span-2">
          <h3 className="mb-4 text-lg font-medium">Your Resumes</h3>
          <div className="space-y-4">
            {isLoading ? (
              [...Array(2)].map((_, index) => <ResumeSkeletonLoader key={index} />)
            ) : resumes.length === 0 ? (
              <EmptyState title="No resumes found" description="We couldn't find any resumes. Try create a new one." icon="search" />
            ) : (
              resumes.map((row) => (
                <div key={row.id} className="flex flex-col justify-between gap-3 rounded-lg border border-white/10 bg-white/5 p-4 sm:flex-row sm:items-center">
                  <div>
                    <h4 className="font-medium">{row.label}</h4>
                    <p className="text-sm text-gray-400">{row.date}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      size="sm"
                      className="border-white/10 hover:bg-white/10"
                      onClick={() => {
                        navigate("/dashboard/cv-generator/create/" + row.id);
                      }}
                    >
                      Detail
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </motion.div>

        {/* AI Resume Optimization */}
        {/* <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm md:col-span-2">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 to-violet-500">
              <FileText className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-medium">AI Resume Optimization</h3>
              <p className="text-gray-400">Let our AI analyze and improve your resume for specific job positions</p>
            </div>
          </div>

          <div className="mt-6 rounded-lg border border-white/10 bg-white/5 p-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h4 className="font-medium">Resume Analysis</h4>
                <p className="text-sm text-gray-400">Upload your existing resume for AI analysis and optimization</p>
              </div>
              <Button className="bg-gradient-to-r from-cyan-400 to-violet-500 text-black hover:from-cyan-500 hover:to-violet-600">Upload Resume</Button>
            </div>
          </div>
        </motion.div> */}
      </div>
    </div>
  );
}
