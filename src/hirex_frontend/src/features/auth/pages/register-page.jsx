import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  ChevronDown,
  Sparkles,
  User,
  Mail,
  Lock,
  Briefcase,
  Brain,
} from "lucide-react";
import { Button } from "@/core/components/ui/button";

const RegisterPage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    careerField: "",
    traits: [],
    workStyle: "",
    learningStyle: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTraitToggle = (trait) => {
    setFormData((prev) => {
      const traits = [...prev.traits];
      if (traits.includes(trait)) {
        return { ...prev, traits: traits.filter((t) => t !== trait) };
      } else {
        return { ...prev, traits: [...traits, trait] };
      }
    });
  };

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    // Redirect or show success message
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/50 backdrop-blur-xl">
        <div className="container flex h-16 items-center justify-between px-4">
          <a className="flex items-center space-x-2 font-bold" href="/">
            <BrainCircuit className="h-6 w-6 text-cyan-400" />
            <span className="text-xl">HireX</span>
          </a>

          <a href="/">
            <Button
              variant="ghost"
              className="text-gray-400 hover:bg-white/5 hover:text-white"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="container relative z-10 pt-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid min-h-[calc(100vh-8rem)] gap-8 lg:grid-cols-2">
            {/* Left Column - Graphic */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex items-center justify-center p-6"
            >
              <div className="relative">
                {/* Background Elements */}
                <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-cyan-500/20 blur-3xl"></div>
                <div className="absolute -bottom-10 -right-10 h-64 w-64 rounded-full bg-violet-500/20 blur-3xl"></div>

                {/* Main Illustration */}
                <div className="relative rounded-2xl border border-white/10 bg-gradient-to-b from-gray-900/80 to-black/80 p-8 backdrop-blur-sm">
                  <div className="mb-6 flex items-center justify-between">
                    <h3 className="text-xl font-bold text-white">
                      AI-Powered Profile Matching
                    </h3>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-400/20">
                      <BrainCircuit className="h-6 w-6 text-cyan-400" />
                    </div>
                  </div>

                  {/* Profile Visualization */}
                  <div className="mb-8 space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500/30 to-violet-500/30">
                        <User className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <div className="h-3 w-32 rounded-full bg-white/20"></div>
                        <div className="mt-2 h-2 w-24 rounded-full bg-white/10"></div>
                      </div>
                    </div>

                    {/* Personality Traits Visualization */}
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <div className="h-2 w-20 rounded-full bg-white/20"></div>
                        <div className="h-2 w-12 rounded-full bg-white/10"></div>
                      </div>

                      <div className="grid grid-cols-5 gap-2">
                        {[...Array(5)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ height: "0.5rem" }}
                            animate={{
                              height: `${0.5 + Math.random() * 2}rem`,
                              backgroundColor:
                                i % 2 === 0
                                  ? "rgba(34, 211, 238, 0.4)"
                                  : "rgba(139, 92, 246, 0.4)",
                            }}
                            transition={{
                              duration: 2,
                              repeat: Number.POSITIVE_INFINITY,
                              repeatType: "reverse",
                            }}
                            className="rounded-t-sm"
                          ></motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Job Match Visualization */}
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <div className="h-2 w-24 rounded-full bg-white/20"></div>
                        <div className="h-2 w-16 rounded-full bg-white/10"></div>
                      </div>

                      <div className="space-y-2">
                        {[...Array(3)].map((_, i) => (
                          <div key={i} className="flex items-center space-x-3">
                            <motion.div
                              initial={{ width: "30%" }}
                              animate={{ width: `${60 + Math.random() * 30}%` }}
                              transition={{
                                duration: 3,
                                repeat: Number.POSITIVE_INFINITY,
                                repeatType: "reverse",
                              }}
                              className={`h-3 rounded-full ${
                                i === 0
                                  ? "bg-cyan-400/60"
                                  : i === 1
                                  ? "bg-violet-400/60"
                                  : "bg-white/20"
                              }`}
                            ></motion.div>
                            <div className="h-2 w-12 rounded-full bg-white/10"></div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* AI Analysis Lines */}
                  <div className="absolute inset-x-0 top-1/2">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 0.7, 0] }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatDelay: 1,
                      }}
                      className="h-px w-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
                    ></motion.div>
                  </div>

                  {/* Floating Elements */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="absolute -right-6 top-1/4 rounded-lg border border-white/10 bg-black/60 p-2 backdrop-blur-sm"
                  >
                    <div className="flex items-center space-x-2">
                      <Sparkles className="h-4 w-4 text-cyan-400" />
                      <p className="text-xs text-white">Analyzing traits</p>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="absolute -left-6 bottom-1/4 rounded-lg border border-white/10 bg-black/60 p-2 backdrop-blur-sm"
                  >
                    <div className="flex items-center space-x-2">
                      <Brain className="h-4 w-4 text-violet-400" />
                      <p className="text-xs text-white">Matching jobs</p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col justify-center p-6"
            >
              <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-white sm:text-3xl">
                    Create Your Profile
                  </h2>
                  <p className="mt-2 text-gray-400">
                    Join HireX to discover AI-matched career opportunities
                  </p>
                </div>

                {/* Progress Indicator */}
                <div className="mb-8">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">Basic Info</span>
                    <span className="text-xs text-gray-400">Personality</span>
                    <span className="text-xs text-gray-400">Work Style</span>
                  </div>
                  <div className="relative mt-2 h-1 w-full rounded-full bg-gray-800">
                    <motion.div
                      initial={{ width: "0%" }}
                      animate={{ width: `${(step / 3) * 100}%` }}
                      className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-cyan-400 to-violet-500"
                    ></motion.div>
                  </div>
                </div>

                <form onSubmit={handleSubmit}>
                  {/* Step 1: Basic Information */}
                  {step === 1 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-4"
                    >
                      <div>
                        <label
                          htmlFor="name"
                          className="mb-2 block text-sm font-medium text-gray-200"
                        >
                          Full Name
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-white/10 bg-white/5 py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                            placeholder="Enter your full name"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="mb-2 block text-sm font-medium text-gray-200"
                        >
                          Email Address
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-white/10 bg-white/5 py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                            placeholder="you@example.com"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="careerField"
                          className="mb-2 block text-sm font-medium text-gray-200"
                        >
                          Career Field
                        </label>
                        <div className="relative">
                          <Briefcase className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                          <select
                            id="careerField"
                            name="careerField"
                            value={formData.careerField}
                            onChange={handleChange}
                            className="w-full appearance-none rounded-lg border border-white/10 bg-white/5 py-3 pl-10 pr-10 text-white focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                            required
                          >
                            <option value="" disabled>
                              Select your field
                            </option>
                            <option value="technology">Technology</option>
                            <option value="design">Design</option>
                            <option value="marketing">Marketing</option>
                            <option value="finance">Finance</option>
                            <option value="healthcare">Healthcare</option>
                            <option value="education">Education</option>
                            <option value="other">Other</option>
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Personality Traits */}
                  {step === 2 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-6"
                    >
                      <div>
                        <h3 className="mb-4 text-lg font-medium text-white">
                          Select Your Key Personality Traits
                        </h3>
                        <p className="mb-4 text-sm text-gray-400">
                          Choose 3-5 traits that best describe you. This helps
                          our AI match you with suitable roles.
                        </p>

                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                          {[
                            "Analytical",
                            "Creative",
                            "Detail-oriented",
                            "Leadership",
                            "Collaborative",
                            "Independent",
                            "Innovative",
                            "Adaptable",
                            "Organized",
                            "Problem-solver",
                            "Communication",
                            "Strategic",
                          ].map((trait) => (
                            <button
                              key={trait}
                              type="button"
                              onClick={() => handleTraitToggle(trait)}
                              className={`flex items-center justify-between rounded-lg border p-3 text-left text-sm transition-colors ${
                                formData.traits.includes(trait)
                                  ? "border-cyan-400 bg-cyan-950/20 text-cyan-400"
                                  : "border-white/10 bg-white/5 text-gray-300 hover:border-white/30"
                              }`}
                            >
                              <span>{trait}</span>
                              {formData.traits.includes(trait) && (
                                <CheckCircle2 className="h-4 w-4 text-cyan-400" />
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Work Preferences */}
                  {step === 3 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-6"
                    >
                      <div>
                        <h3 className="mb-2 text-lg font-medium text-white">
                          Work Style Preference
                        </h3>
                        <p className="mb-4 text-sm text-gray-400">
                          How do you prefer to work? This helps us match you
                          with compatible work environments.
                        </p>

                        <div className="space-y-3">
                          {[
                            {
                              value: "collaborative",
                              label: "Collaborative Team Environment",
                            },
                            {
                              value: "balanced",
                              label:
                                "Balanced Mix of Collaboration and Independence",
                            },
                            {
                              value: "independent",
                              label: "Independent Work with Minimal Oversight",
                            },
                            {
                              value: "flexible",
                              label:
                                "Flexible and Adaptable to Different Styles",
                            },
                          ].map((option) => (
                            <label
                              key={option.value}
                              className={`flex cursor-pointer items-center justify-between rounded-lg border p-4 transition-colors ${
                                formData.workStyle === option.value
                                  ? "border-cyan-400 bg-cyan-950/20"
                                  : "border-white/10 bg-white/5 hover:border-white/30"
                              }`}
                            >
                              <span
                                className={
                                  formData.workStyle === option.value
                                    ? "text-cyan-400"
                                    : "text-gray-300"
                                }
                              >
                                {option.label}
                              </span>
                              <input
                                type="radio"
                                name="workStyle"
                                value={option.value}
                                checked={formData.workStyle === option.value}
                                onChange={handleChange}
                                className="sr-only"
                              />
                              <div
                                className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                                  formData.workStyle === option.value
                                    ? "border-cyan-400 bg-cyan-400/20"
                                    : "border-white/30 bg-transparent"
                                }`}
                              >
                                {formData.workStyle === option.value && (
                                  <div className="h-2.5 w-2.5 rounded-full bg-cyan-400"></div>
                                )}
                              </div>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="mb-2 text-lg font-medium text-white">
                          Learning Style
                        </h3>
                        <p className="mb-4 text-sm text-gray-400">
                          How do you prefer to learn new skills? This helps us
                          recommend suitable development paths.
                        </p>

                        <div className="space-y-3">
                          {[
                            {
                              value: "visual",
                              label:
                                "Visual Learning (videos, diagrams, demonstrations)",
                            },
                            {
                              value: "practical",
                              label:
                                "Practical Learning (hands-on, projects, experimentation)",
                            },
                            {
                              value: "theoretical",
                              label:
                                "Theoretical Learning (reading, research, concepts)",
                            },
                            {
                              value: "social",
                              label:
                                "Social Learning (discussion, group work, mentorship)",
                            },
                          ].map((option) => (
                            <label
                              key={option.value}
                              className={`flex cursor-pointer items-center justify-between rounded-lg border p-4 transition-colors ${
                                formData.learningStyle === option.value
                                  ? "border-violet-400 bg-violet-950/20"
                                  : "border-white/10 bg-white/5 hover:border-white/30"
                              }`}
                            >
                              <span
                                className={
                                  formData.learningStyle === option.value
                                    ? "text-violet-400"
                                    : "text-gray-300"
                                }
                              >
                                {option.label}
                              </span>
                              <input
                                type="radio"
                                name="learningStyle"
                                value={option.value}
                                checked={
                                  formData.learningStyle === option.value
                                }
                                onChange={handleChange}
                                className="sr-only"
                              />
                              <div
                                className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                                  formData.learningStyle === option.value
                                    ? "border-violet-400 bg-violet-400/20"
                                    : "border-white/30 bg-transparent"
                                }`}
                              >
                                {formData.learningStyle === option.value && (
                                  <div className="h-2.5 w-2.5 rounded-full bg-violet-400"></div>
                                )}
                              </div>
                            </label>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="mt-8 flex justify-between">
                    {step > 1 ? (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={prevStep}
                        className="border-white/10 text-white hover:bg-white/10"
                      >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back
                      </Button>
                    ) : (
                      <div></div>
                    )}

                    {step < 3 ? (
                      <Button
                        type="button"
                        onClick={nextStep}
                        className="bg-gradient-to-r from-cyan-400 to-violet-500 text-black hover:from-cyan-500 hover:to-violet-600"
                      >
                        Continue
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        className="bg-gradient-to-r from-cyan-400 to-violet-500 text-black hover:from-cyan-500 hover:to-violet-600"
                      >
                        Create Profile
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </form>

                {/* Sign In a */}
                <div className="mt-6 text-center text-sm text-gray-400">
                  Already have an account?{" "}
                  <a
                    href="/login"
                    className="text-cyan-400 hover:text-cyan-300"
                  >
                    Sign in
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 translate-x-1/2 translate-y-1/2 rounded-full bg-violet-500/10 blur-3xl"></div>
      </div>
    </div>
  );
};

export default RegisterPage;
