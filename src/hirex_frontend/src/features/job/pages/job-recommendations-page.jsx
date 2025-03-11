"use client";

import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Button } from "@/core/components/ui/button";

export default function JobRecommendationsPage() {
  return (
    <div className="space-y-6">
      <div className="mb-2">
        <p className="text-gray-400">
          Discover job opportunities matched to your profile.
        </p>
      </div>

      <div className="grid gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
        >
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h2 className="text-xl font-semibold">Job Recommendations</h2>
              <p className="text-gray-400">
                Personalized job matches based on your profile and preferences
              </p>
            </div>
            <div className="flex w-full flex-wrap gap-3 md:w-auto">
              <div className="relative w-full md:w-auto">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search jobs..."
                  className="w-full rounded-lg border border-white/10 bg-white/5 py-2 pl-10 pr-4 text-sm text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                />
              </div>
              <Button
                variant="outline"
                className="border-white/10 hover:bg-white/10"
              >
                Filters
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Job Listings */}
        <div className="space-y-4">
          {[...Array(5)].map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
            >
              <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-xl font-medium">
                      {
                        [
                          "Senior Frontend Developer",
                          "UX/UI Designer",
                          "Product Manager",
                          "Data Scientist",
                          "Marketing Specialist",
                        ][index % 5]
                      }
                    </h3>
                    <span className="rounded-full bg-gradient-to-r from-cyan-400/20 to-violet-400/20 px-2 py-0.5 text-sm text-cyan-400">
                      {95 - index * 3}% Match
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-400">
                    <span className="font-medium text-white">
                      {
                        [
                          "TechCorp Inc.",
                          "Creative Solutions",
                          "Innovate Labs",
                          "Data Insights",
                          "Brand Builders",
                        ][index % 5]
                      }
                    </span>
                    <span>•</span>
                    <span>
                      {
                        [
                          "Remote",
                          "New York, NY",
                          "San Francisco, CA",
                          "Austin, TX",
                          "Chicago, IL",
                        ][index % 5]
                      }
                    </span>
                    <span>•</span>
                    <span>Full-time</span>
                    <span>•</span>
                    <span>Posted {index + 1} days ago</span>
                  </div>
                  <p className="text-gray-300">
                    {
                      [
                        "We're looking for a Senior Frontend Developer with experience in React, Next.js, and modern JavaScript frameworks.",
                        "Join our team as a UX/UI Designer to create beautiful and intuitive user experiences for our products.",
                        "As a Product Manager, you'll lead the development of innovative products from conception to launch.",
                        "We need a Data Scientist to help us extract insights from our data and build predictive models.",
                        "Looking for a Marketing Specialist to develop and execute marketing strategies for our products.",
                      ][index % 5]
                    }
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      ["React", "Next.js", "TypeScript", "Tailwind CSS"],
                      ["Figma", "UI Design", "User Research", "Prototyping"],
                      [
                        "Product Strategy",
                        "Agile",
                        "User Stories",
                        "Roadmapping",
                      ],
                      [
                        "Python",
                        "Machine Learning",
                        "SQL",
                        "Data Visualization",
                      ],
                      ["Content Marketing", "SEO", "Social Media", "Analytics"],
                    ][index % 5].map((skill, i) => (
                      <span
                        key={i}
                        className="rounded-full bg-white/10 px-3 py-1 text-xs text-gray-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-shrink-0 flex-wrap gap-2 md:flex-col">
                  <Button className="bg-gradient-to-r from-cyan-400 to-violet-500 text-black hover:from-cyan-500 hover:to-violet-600">
                    Apply Now
                  </Button>
                  <Button
                    variant="outline"
                    className="border-white/10 hover:bg-white/10"
                  >
                    Save Job
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
