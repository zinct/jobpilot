"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Clock,
  Plus,
  X,
  Save,
  User,
  Code,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/core/components/ui/button";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("skills");
  const [selectedSkills, setSelectedSkills] = useState([
    "JavaScript",
    "React",
    "Next.js",
    "TypeScript",
    "CSS",
    "HTML",
  ]);
  const [selectedPreferences, setSelectedPreferences] = useState({
    workEnvironment: "hybrid",
    workHours: "flexible",
    teamSize: "medium",
    companySize: "startup",
    industry: ["technology", "finance"],
  });

  // Personal info state
  const [personalInfo, setPersonalInfo] = useState({
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    title: "Senior Frontend Developer",
    bio: "Experienced frontend developer with a passion for creating beautiful, responsive user interfaces.",
    website: "johnsmith.dev",
    github: "github.com/johnsmith",
    linkedin: "linkedin.com/in/johnsmith",
    twitter: "twitter.com/johnsmith",
  });

  // Form validation state
  const [errors, setErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleAddSkill = (skill) => {
    if (!selectedSkills.includes(skill)) {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleRemoveSkill = (skill) => {
    setSelectedSkills(selectedSkills.filter((s) => s !== skill));
  };

  const handleIndustryToggle = (industry) => {
    if (selectedPreferences.industry.includes(industry)) {
      setSelectedPreferences({
        ...selectedPreferences,
        industry: selectedPreferences.industry.filter((i) => i !== industry),
      });
    } else {
      setSelectedPreferences({
        ...selectedPreferences,
        industry: [...selectedPreferences.industry, industry],
      });
    }
  };

  // Handle personal info change
  const handlePersonalInfoChange = (field, value) => {
    setPersonalInfo({
      ...personalInfo,
      [field]: value,
    });
  };

  // Handle personal info form submission
  const handlePersonalInfoSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    // Validate form
    const newErrors = {};
    if (!personalInfo.name) newErrors.name = "Name is required";
    if (!personalInfo.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(personalInfo.email))
      newErrors.email = "Email is invalid";
    if (!personalInfo.phone) newErrors.phone = "Phone number is required";
    if (!personalInfo.location) newErrors.location = "Location is required";
    if (!personalInfo.title) newErrors.title = "Job title is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Form is valid
      alert("Personal information updated successfully!");
    }
  };

  return (
    <div className="space-y-6">
      <div className="mb-2">
        <h1 className="text-2xl font-bold md:text-3xl">
          Complete Your Profile
        </h1>
        <p className="mt-1 text-gray-400">
          Finish setting up your profile to get better job matches and
          personalized recommendations.
        </p>
      </div>

      {/* Progress Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
      >
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h2 className="text-xl font-semibold">Profile Completion</h2>
            <p className="text-gray-400">
              You're almost there! Complete the remaining sections.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative h-12 w-12">
              <svg className="h-12 w-12 -rotate-90 transform">
                <circle
                  cx="24"
                  cy="24"
                  r="20"
                  fill="none"
                  stroke="#1f2937"
                  strokeWidth="4"
                />
                <circle
                  cx="24"
                  cy="24"
                  r="20"
                  fill="none"
                  stroke="url(#gradient)"
                  strokeWidth="4"
                  strokeDasharray="125.6"
                  strokeDashoffset="31.4" // 75% complete
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient
                    id="gradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#22d3ee" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-sm font-medium">
                75%
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-white/10 bg-white/5 p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Personal Info</span>
              <CheckCircle2 className="h-5 w-5 text-green-500" />
            </div>
          </div>
          <div className="rounded-lg border border-cyan-400/20 bg-cyan-950/20 p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-cyan-400">
                Skills & Preferences
              </span>
              <Clock className="h-5 w-5 text-amber-500" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Profile Sections Navigation */}
      <div className="flex flex-wrap gap-2 border-b border-white/10 pb-4">
        <Button
          variant={activeTab === "personal" ? "default" : "outline"}
          className={
            activeTab === "personal"
              ? "bg-gradient-to-r from-cyan-400 to-violet-500 text-black hover:from-cyan-500 hover:to-violet-600"
              : "border-white/10 text-white hover:bg-white/10"
          }
          onClick={() => setActiveTab("personal")}
        >
          <User className="mr-2 h-4 w-4" />
          Personal Info
        </Button>
        <Button
          variant={activeTab === "skills" ? "default" : "outline"}
          className={
            activeTab === "skills"
              ? "bg-gradient-to-r from-cyan-400 to-violet-500 text-black hover:from-cyan-500 hover:to-violet-600"
              : "border-white/10 text-white hover:bg-white/10"
          }
          onClick={() => setActiveTab("skills")}
        >
          <Code className="mr-2 h-4 w-4" />
          Skills & Preferences
        </Button>
      </div>

      {/* Personal Info Section */}
      {activeTab === "personal" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          <form
            onSubmit={handlePersonalInfoSubmit}
            className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
          >
            <h3 className="mb-6 text-xl font-semibold">Personal Information</h3>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={personalInfo.name}
                  onChange={(e) =>
                    handlePersonalInfoChange("name", e.target.value)
                  }
                  className={`w-full rounded-lg border ${
                    errors.name ? "border-red-500" : "border-white/10"
                  } bg-white/5 px-3 py-2 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400`}
                  required
                />
                {errors.name && (
                  <p className="mt-1 flex items-center text-xs text-red-500">
                    <AlertCircle className="mr-1 h-3 w-3" /> {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Job Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={personalInfo.title}
                  onChange={(e) =>
                    handlePersonalInfoChange("title", e.target.value)
                  }
                  className={`w-full rounded-lg border ${
                    errors.title ? "border-red-500" : "border-white/10"
                  } bg-white/5 px-3 py-2 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400`}
                  required
                />
                {errors.title && (
                  <p className="mt-1 flex items-center text-xs text-red-500">
                    <AlertCircle className="mr-1 h-3 w-3" /> {errors.title}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={personalInfo.email}
                  onChange={(e) =>
                    handlePersonalInfoChange("email", e.target.value)
                  }
                  className={`w-full rounded-lg border ${
                    errors.email ? "border-red-500" : "border-white/10"
                  } bg-white/5 px-3 py-2 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400`}
                  required
                />
                {errors.email && (
                  <p className="mt-1 flex items-center text-xs text-red-500">
                    <AlertCircle className="mr-1 h-3 w-3" /> {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Phone <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={personalInfo.phone}
                  onChange={(e) =>
                    handlePersonalInfoChange("phone", e.target.value)
                  }
                  className={`w-full rounded-lg border ${
                    errors.phone ? "border-red-500" : "border-white/10"
                  } bg-white/5 px-3 py-2 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400`}
                  required
                />
                {errors.phone && (
                  <p className="mt-1 flex items-center text-xs text-red-500">
                    <AlertCircle className="mr-1 h-3 w-3" /> {errors.phone}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Location <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={personalInfo.location}
                  onChange={(e) =>
                    handlePersonalInfoChange("location", e.target.value)
                  }
                  className={`w-full rounded-lg border ${
                    errors.location ? "border-red-500" : "border-white/10"
                  } bg-white/5 px-3 py-2 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400`}
                  required
                />
                {errors.location && (
                  <p className="mt-1 flex items-center text-xs text-red-500">
                    <AlertCircle className="mr-1 h-3 w-3" /> {errors.location}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Website
                </label>
                <input
                  type="url"
                  value={personalInfo.website}
                  onChange={(e) =>
                    handlePersonalInfoChange("website", e.target.value)
                  }
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                  placeholder="https://yourwebsite.com"
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Professional Bio
                </label>
                <textarea
                  value={personalInfo.bio}
                  onChange={(e) =>
                    handlePersonalInfoChange("bio", e.target.value)
                  }
                  rows={4}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                  placeholder="Tell us about yourself and your professional background..."
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  GitHub Profile
                </label>
                <input
                  type="text"
                  value={personalInfo.github}
                  onChange={(e) =>
                    handlePersonalInfoChange("github", e.target.value)
                  }
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                  placeholder="github.com/username"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  LinkedIn Profile
                </label>
                <input
                  type="text"
                  value={personalInfo.linkedin}
                  onChange={(e) =>
                    handlePersonalInfoChange("linkedin", e.target.value)
                  }
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                  placeholder="linkedin.com/in/username"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Twitter Profile
                </label>
                <input
                  type="text"
                  value={personalInfo.twitter}
                  onChange={(e) =>
                    handlePersonalInfoChange("twitter", e.target.value)
                  }
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                  placeholder="twitter.com/username"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                className="border-white/10 hover:bg-white/10"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-gradient-to-r from-cyan-400 to-violet-500 text-black hover:from-cyan-500 hover:to-violet-600"
              >
                <Save className="mr-2 h-4 w-4" />
                Save Personal Info
              </Button>
            </div>

            {formSubmitted && Object.keys(errors).length === 0 && (
              <div className="mt-4 rounded-lg border border-green-400/30 bg-green-950/20 p-4">
                <div className="flex items-center">
                  <CheckCircle2 className="mr-2 h-5 w-5 text-green-400" />
                  <p className="text-green-400">
                    Personal information updated successfully!
                  </p>
                </div>
              </div>
            )}
          </form>
        </motion.div>
      )}

      {/* Skills & Preferences Section */}
      {activeTab === "skills" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="space-y-8"
        >
          {/* Skills Section */}
          <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <h3 className="mb-4 text-lg font-medium">Technical Skills</h3>
            <p className="mb-6 text-gray-400">
              Add your technical skills to help us match you with relevant job
              opportunities.
            </p>

            <div className="mb-6 flex flex-wrap gap-2">
              {selectedSkills.map((skill) => (
                <div
                  key={skill}
                  className="flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-950/50 to-violet-950/50 px-3 py-1.5 text-sm"
                >
                  <span>{skill}</span>
                  <button
                    onClick={() => handleRemoveSkill(skill)}
                    className="flex h-4 w-4 items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
              <button
                className="flex items-center gap-1 rounded-full border border-dashed border-white/20 bg-white/5 px-3 py-1.5 text-sm text-gray-400 hover:border-cyan-400/30 hover:text-cyan-400"
                onClick={() => {
                  const skill = prompt("Enter a new skill:");
                  if (skill && skill.trim() !== "") {
                    handleAddSkill(skill.trim());
                  }
                }}
              >
                <Plus className="h-3 w-3" />
                Add Skill
              </button>
            </div>

            <h4 className="mb-3 text-sm font-medium text-gray-300">
              Suggested Skills
            </h4>
            <div className="flex flex-wrap gap-2">
              {[
                "Docker",
                "AWS",
                "GraphQL",
                "Node.js",
                "SQL",
                "MongoDB",
                "Redux",
                "Git",
                "CI/CD",
                "Testing",
              ].map(
                (skill) =>
                  !selectedSkills.includes(skill) && (
                    <button
                      key={skill}
                      onClick={() => handleAddSkill(skill)}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-gray-300 hover:border-cyan-400/30 hover:bg-cyan-950/20 hover:text-cyan-400"
                    >
                      {skill}
                    </button>
                  )
              )}
            </div>
          </div>

          {/* Work Preferences */}
          <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <h3 className="mb-4 text-lg font-medium">Work Preferences</h3>
            <p className="mb-6 text-gray-400">
              Tell us about your ideal work environment to help us find the best
              matches for you.
            </p>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Work Environment
                </label>
                <div className="space-y-2">
                  {["remote", "onsite", "hybrid"].map((option) => (
                    <label
                      key={option}
                      className={`flex cursor-pointer items-center justify-between rounded-lg border p-3 transition-colors ${
                        selectedPreferences.workEnvironment === option
                          ? "border-cyan-400 bg-cyan-950/20"
                          : "border-white/10 bg-white/5 hover:border-white/30"
                      }`}
                    >
                      <span
                        className={
                          selectedPreferences.workEnvironment === option
                            ? "text-cyan-400"
                            : "text-gray-300"
                        }
                      >
                        {option.charAt(0).toUpperCase() + option.slice(1)}
                      </span>
                      <input
                        type="radio"
                        name="workEnvironment"
                        value={option}
                        checked={selectedPreferences.workEnvironment === option}
                        onChange={() =>
                          setSelectedPreferences({
                            ...selectedPreferences,
                            workEnvironment: option,
                          })
                        }
                        className="sr-only"
                      />
                      <div
                        className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                          selectedPreferences.workEnvironment === option
                            ? "border-cyan-400 bg-cyan-400/20"
                            : "border-white/30 bg-transparent"
                        }`}
                      >
                        {selectedPreferences.workEnvironment === option && (
                          <div className="h-2.5 w-2.5 rounded-full bg-cyan-400"></div>
                        )}
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Work Hours
                </label>
                <div className="space-y-2">
                  {["standard", "flexible", "shift-based"].map((option) => (
                    <label
                      key={option}
                      className={`flex cursor-pointer items-center justify-between rounded-lg border p-3 transition-colors ${
                        selectedPreferences.workHours === option
                          ? "border-cyan-400 bg-cyan-950/20"
                          : "border-white/10 bg-white/5 hover:border-white/30"
                      }`}
                    >
                      <span
                        className={
                          selectedPreferences.workHours === option
                            ? "text-cyan-400"
                            : "text-gray-300"
                        }
                      >
                        {option === "standard"
                          ? "Standard (9-5)"
                          : option === "flexible"
                          ? "Flexible Hours"
                          : "Shift-based"}
                      </span>
                      <input
                        type="radio"
                        name="workHours"
                        value={option}
                        checked={selectedPreferences.workHours === option}
                        onChange={() =>
                          setSelectedPreferences({
                            ...selectedPreferences,
                            workHours: option,
                          })
                        }
                        className="sr-only"
                      />
                      <div
                        className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                          selectedPreferences.workHours === option
                            ? "border-cyan-400 bg-cyan-400/20"
                            : "border-white/30 bg-transparent"
                        }`}
                      >
                        {selectedPreferences.workHours === option && (
                          <div className="h-2.5 w-2.5 rounded-full bg-cyan-400"></div>
                        )}
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Team Size
                </label>
                <div className="space-y-2">
                  {["small", "medium", "large"].map((option) => (
                    <label
                      key={option}
                      className={`flex cursor-pointer items-center justify-between rounded-lg border p-3 transition-colors ${
                        selectedPreferences.teamSize === option
                          ? "border-violet-400 bg-violet-950/20"
                          : "border-white/10 bg-white/5 hover:border-white/30"
                      }`}
                    >
                      <span
                        className={
                          selectedPreferences.teamSize === option
                            ? "text-violet-400"
                            : "text-gray-300"
                        }
                      >
                        {option === "small"
                          ? "Small (< 10 people)"
                          : option === "medium"
                          ? "Medium (10-50 people)"
                          : "Large (50+ people)"}
                      </span>
                      <input
                        type="radio"
                        name="teamSize"
                        value={option}
                        checked={selectedPreferences.teamSize === option}
                        onChange={() =>
                          setSelectedPreferences({
                            ...selectedPreferences,
                            teamSize: option,
                          })
                        }
                        className="sr-only"
                      />
                      <div
                        className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                          selectedPreferences.teamSize === option
                            ? "border-violet-400 bg-violet-400/20"
                            : "border-white/30 bg-transparent"
                        }`}
                      >
                        {selectedPreferences.teamSize === option && (
                          <div className="h-2.5 w-2.5 rounded-full bg-violet-400"></div>
                        )}
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Company Size
                </label>
                <div className="space-y-2">
                  {["startup", "midsize", "enterprise"].map((option) => (
                    <label
                      key={option}
                      className={`flex cursor-pointer items-center justify-between rounded-lg border p-3 transition-colors ${
                        selectedPreferences.companySize === option
                          ? "border-violet-400 bg-violet-950/20"
                          : "border-white/10 bg-white/5 hover:border-white/30"
                      }`}
                    >
                      <span
                        className={
                          selectedPreferences.companySize === option
                            ? "text-violet-400"
                            : "text-gray-300"
                        }
                      >
                        {option === "startup"
                          ? "Startup (< 50 employees)"
                          : option === "midsize"
                          ? "Mid-size (50-500 employees)"
                          : "Enterprise (500+ employees)"}
                      </span>
                      <input
                        type="radio"
                        name="companySize"
                        value={option}
                        checked={selectedPreferences.companySize === option}
                        onChange={() =>
                          setSelectedPreferences({
                            ...selectedPreferences,
                            companySize: option,
                          })
                        }
                        className="sr-only"
                      />
                      <div
                        className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                          selectedPreferences.companySize === option
                            ? "border-violet-400 bg-violet-400/20"
                            : "border-white/30 bg-transparent"
                        }`}
                      >
                        {selectedPreferences.companySize === option && (
                          <div className="h-2.5 w-2.5 rounded-full bg-violet-400"></div>
                        )}
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Industry Preferences */}
          <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <h3 className="mb-4 text-lg font-medium">Industry Preferences</h3>
            <p className="mb-6 text-gray-400">
              Select the industries you're interested in working in (select
              multiple if applicable).
            </p>

            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
              {[
                "technology",
                "finance",
                "healthcare",
                "education",
                "retail",
                "manufacturing",
                "media",
                "government",
                "nonprofit",
                "consulting",
                "entertainment",
                "transportation",
              ].map((industry) => (
                <button
                  key={industry}
                  type="button"
                  onClick={() => handleIndustryToggle(industry)}
                  className={`flex items-center justify-between rounded-lg border p-3 text-left text-sm transition-colors ${
                    selectedPreferences.industry.includes(industry)
                      ? "border-cyan-400 bg-cyan-950/20 text-cyan-400"
                      : "border-white/10 bg-white/5 text-gray-300 hover:border-white/30"
                  }`}
                >
                  <span>
                    {industry.charAt(0).toUpperCase() + industry.slice(1)}
                  </span>
                  {selectedPreferences.industry.includes(industry) && (
                    <CheckCircle2 className="h-4 w-4 text-cyan-400" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Career Goals */}
          <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <h3 className="mb-4 text-lg font-medium">Career Goals</h3>
            <p className="mb-6 text-gray-400">
              Tell us about your career aspirations to help us provide better
              guidance.
            </p>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="shortTerm"
                  className="mb-2 block text-sm font-medium"
                >
                  Short-term Goals (1-2 years)
                </label>
                <textarea
                  id="shortTerm"
                  rows={3}
                  className="w-full rounded-lg border border-white/10 bg-white/5 p-3 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                  placeholder="e.g., Become a senior developer, learn new technologies..."
                ></textarea>
              </div>

              <div>
                <label
                  htmlFor="longTerm"
                  className="mb-2 block text-sm font-medium"
                >
                  Long-term Goals (3-5 years)
                </label>
                <textarea
                  id="longTerm"
                  rows={3}
                  className="w-full rounded-lg border border-white/10 bg-white/5 p-3 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                  placeholder="e.g., Move into management, start a company..."
                ></textarea>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end space-x-4">
            <Button
              variant="outline"
              className="border-white/10 hover:bg-white/10"
            >
              Cancel
            </Button>
            <Button className="bg-gradient-to-r from-cyan-400 to-violet-500 text-black hover:from-cyan-500 hover:to-violet-600">
              <Save className="mr-2 h-4 w-4" />
              Save Profile
            </Button>
          </div>
        </motion.div>
      )}

      {/* Placeholder for other tabs */}
      {activeTab !== "skills" && activeTab !== "personal" && (
        <div className="flex h-64 items-center justify-center rounded-xl border border-white/10 bg-white/5 p-6">
          <div className="text-center text-gray-400">
            <CheckCircle2 className="mx-auto mb-4 h-12 w-12 text-green-500" />
            <h3 className="text-xl font-medium text-white">Section Complete</h3>
            <p className="mt-2">
              This section of your profile is already complete.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
