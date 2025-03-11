"use client";

import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Button } from "@/core/components/ui/button";

export default function CourseRecommendationsPage() {
  return (
    <div className="space-y-6">
      <div className="mb-2">
        <p className="text-gray-400">
          Recommended courses to enhance your skills.
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
              <h2 className="text-xl font-semibold">Course Recommendations</h2>
              <p className="text-gray-400">
                Personalized learning paths to enhance your skills
              </p>
            </div>
            <div className="flex w-full flex-wrap gap-3 md:w-auto">
              <div className="relative w-full md:w-auto">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search courses..."
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

        {/* Skill Gap Analysis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
        >
          <h3 className="mb-4 text-lg font-medium">Skill Gap Analysis</h3>
          <p className="mb-4 text-gray-400">
            Based on your profile and target roles, we recommend focusing on
            these skills:
          </p>

          <div className="space-y-4">
            {[
              { skill: "React Advanced Patterns", current: 65, target: 90 },
              { skill: "TypeScript", current: 50, target: 85 },
              { skill: "System Design", current: 40, target: 80 },
            ].map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{item.skill}</span>
                  <span className="text-sm text-gray-400">
                    {item.current}% / {item.target}%
                  </span>
                </div>
                <div className="relative h-2 w-full rounded-full bg-gray-800">
                  <div
                    className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-cyan-400 to-violet-500"
                    style={{ width: `${item.current}%` }}
                  ></div>
                  <div
                    className="absolute top-0 h-full w-px bg-white"
                    style={{ left: `${item.target}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Course Listings */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + 0.1 * index }}
              className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="rounded-full bg-gradient-to-r from-cyan-400/20 to-violet-400/20 px-2 py-0.5 text-xs text-cyan-400">
                  {95 - index * 3}% Relevance
                </span>
                <span className="text-xs text-gray-400">
                  {["Beginner", "Intermediate", "Advanced"][index % 3]}
                </span>
              </div>
              <h3 className="mb-2 text-lg font-medium">
                {
                  [
                    "Advanced React Patterns",
                    "TypeScript Masterclass",
                    "System Design for Frontend",
                    "UI/UX Design Fundamentals",
                    "Data Structures & Algorithms",
                    "API Design Best Practices",
                  ][index % 6]
                }
              </h3>
              <p className="mb-4 text-sm text-gray-400">
                {
                  [
                    "Learn advanced React patterns and techniques to build scalable applications.",
                    "Master TypeScript and build type-safe applications with confidence.",
                    "Learn how to design and architect frontend systems at scale.",
                    "Master the fundamentals of UI/UX design and create beautiful interfaces.",
                    "Understand data structures and algorithms for technical interviews.",
                    "Design RESTful and GraphQL APIs that developers love to use.",
                  ][index % 6]
                }
              </p>
              <div className="mb-4 flex items-center justify-between text-sm">
                <span className="text-gray-400">
                  {
                    [
                      "Frontend Masters",
                      "Udemy",
                      "Coursera",
                      "Pluralsight",
                      "edX",
                      "LinkedIn Learning",
                    ][index % 6]
                  }
                </span>
                <span className="text-gray-400">
                  {[8, 12, 6, 10, 15, 4][index % 6]} hours
                </span>
              </div>
              <Button className="w-full bg-gradient-to-r from-cyan-400 to-violet-500 text-black hover:from-cyan-500 hover:to-violet-600">
                Enroll Now
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
