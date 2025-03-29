"use client";

import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Button } from "@/core/components/ui/button";
import { useAuth } from "@/core/providers/auth-provider";
import { useEffect, useState } from "react";
import { hirex_backend } from "declarations/hirex_backend";
import { Actor } from "@dfinity/agent";
import { LoadingOverlay } from "../../../core/components/loading-overlay";
import { truncateString } from "../../../core/utils/stringUtils";
import { EmptyState } from "../../../core/components/ui/empty-state";
import { useErrorAlert } from "../../../core/components/error-alert";

// Skeleton loader for job listings
const JobSkeletonLoader = () => {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
        <div className="space-y-3 w-full">
          <div className="flex flex-wrap items-center gap-3">
            <div className="h-7 w-48 rounded-md bg-white/10 animate-pulse"></div>
            <div className="h-6 w-24 rounded-full bg-white/10 animate-pulse"></div>
          </div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <div className="h-5 w-32 rounded-md bg-white/10 animate-pulse"></div>
            <div className="h-5 w-5 rounded-full bg-white/10 animate-pulse"></div>
            <div className="h-5 w-28 rounded-md bg-white/10 animate-pulse"></div>
            <div className="h-5 w-5 rounded-full bg-white/10 animate-pulse"></div>
            <div className="h-5 w-20 rounded-md bg-white/10 animate-pulse"></div>
          </div>
          <div className="h-16 w-full rounded-md bg-white/10 animate-pulse"></div>
          <div className="flex flex-wrap gap-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-7 w-20 rounded-full bg-white/10 animate-pulse"></div>
            ))}
          </div>
        </div>
        <div className="flex flex-shrink-0 flex-wrap gap-2 md:flex-col self-center">
          <div className="h-10 w-28 rounded-md bg-white/10 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default function JobRecommendationsPage() {
  const { identity, isLoading: isAuthLoading, user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [jobRecommendations, setJobRecommendations] = useState([]);
  const [search, setSearch] = useState("");
  const { showError } = useErrorAlert();

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
        return `posted ${count} ${unit}${count > 1 ? "s" : ""} ago`;
      }
    }

    return "posted just now";
  }

  async function fetchJobs() {
    try {
      Actor.agentOf(hirex_backend).replaceIdentity(identity);

      setIsLoading(true);

      let formattedSearch;

      if (search === "") {
        formattedSearch = user.jobRoles.map((word) => word.toLowerCase().replace(/\s+/g, "%20")).join(",");
      } else {
        formattedSearch = search.toLowerCase().replace(/\s+/g, "%20");
      }

      const response = await hirex_backend.jobsRecommendation({ search: formattedSearch });
      setIsLoading(false);

      if ("ok" in response) {
        const fixedJson = response.ok.replace(/:\s*NaN/g, ": null");
        const jobs = JSON.parse(fixedJson).jobs;
        setJobRecommendations(jobs);
      } else {
        console.log("err", response.err);
        navigate("/dashboard");
      }
    } catch (err) {
      showError(err);
    }
  }

  useEffect(() => {
    if (!identity || !user) return;

    fetchJobs();
  }, [identity, user]);

  return (
    <div className="space-y-6">
      <LoadingOverlay isLoading={isAuthLoading} />
      <div className="mb-2">
        <p className="text-gray-400">Discover job opportunities matched to your profile.</p>
      </div>

      <div className="grid gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h2 className="text-xl font-semibold">Job Recommendations</h2>
              <p className="text-gray-400">Personalized job matches based on your profile and preferences</p>
            </div>
            <div className="flex w-full flex-wrap gap-3 md:w-auto">
              <div className="relative w-full md:w-auto">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search jobs..."
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                  className="w-full rounded-lg border border-white/10 bg-white/5 py-2 pl-10 pr-4 text-sm text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                />
              </div>
              <Button className="border-white/10 hover:bg-white/10" onClick={fetchJobs}>
                Search
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Job Listings */}
        <div className="space-y-4">
          {isLoading ? (
            [...Array(5)].map((_, index) => <JobSkeletonLoader key={index} />)
          ) : jobRecommendations.length === 0 ? (
            <EmptyState title="No job recommendations found" description="We couldn't find any job recommendations matching your criteria. Try adjusting your search or check back later." icon="search" actionLabel="Refresh Jobs" />
          ) : (
            jobRecommendations.map((row, index) => {
              return (
                <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 * index }} className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                  <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
                    <div className="space-y-3">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-xl font-medium">{row.title}</h3>
                        <span className="rounded-full bg-gradient-to-r from-cyan-400/20 to-violet-400/20 px-2 py-0.5 text-sm text-cyan-400">{row.match_score}% Match</span>
                      </div>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-400">
                        <span className="font-medium text-white">{row.company}</span>

                        {row.isRemote ? (
                          <>
                            <span>•</span>
                            <span>Remote</span>
                          </>
                        ) : (
                          <></>
                        )}
                        {row.job_type ? (
                          <>
                            <span>•</span>
                            <span>{row.job_type}</span>
                          </>
                        ) : (
                          <></>
                        )}
                        {row.location ? (
                          <>
                            <span>•</span>
                            <span>{row.location}</span>
                          </>
                        ) : (
                          <></>
                        )}
                        <span>•</span>
                        <span>{timeAgo(row.date_posted)}</span>
                      </div>
                      <p className="text-gray-300">{truncateString(row.description, 300)}</p>
                    </div>
                    <div className="flex flex-shrink-0 flex-wrap gap-2 md:flex-col md:items-center self-center">
                      <Button
                        className="border-white/10 hover:bg-white/10"
                        onClick={() => {
                          window.open(row.job_url, "_blank");
                        }}
                      >
                        Apply Now
                      </Button>
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
