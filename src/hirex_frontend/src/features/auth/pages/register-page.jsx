"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useAnimate } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BrainCircuit,
  Sparkles,
  User,
  Briefcase,
  Brain,
  Info,
} from "lucide-react";
import { Button } from "@/core/components/ui/button";
import { LoadingOverlay } from "@/core/components/loading-overlay";
import { OnboardingProgress } from "@/core/components/onboarding/onboarding-progress";
import { CareerPreferencesForm } from "@/core/components/onboarding/career-preferences-form";
import { BasicInfoForm } from "@/core/components/onboarding/basic-info-form";
import { PersonalityTraitsForm } from "@/core/components/onboarding/personality-traits-form";
import { LearningStyleForm } from "@/core/components/onboarding/learning-style-form";
import { Actor } from "@dfinity/agent";
import { useAuth } from "../../../core/providers/auth-provider";
import {
  mapOptionalToFormattedJSON,
  prepareArg,
  toUnixTimestamps,
  unixToDateString,
} from "../../../core/utils/canisterUtils";
import { hirex_backend } from "declarations/hirex_backend";
import { useNavigate } from "react-router";

const totalSteps = 13;

export default function Register() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { identity, isLoading: isAuthLoading } = useAuth();

  const [formData, setFormData] = useState({
    // Personal Data
    name: "",
    dateOfBirth: "",
    yearsOfExperience: "",
    educationLevel: "",
    personalityTraits: [],
    learningStyle: "",

    // Career Preferences
    jobRolePreferences: [],
    jobSearchStatus: "",
    roleLevel: "",
    workMode: "",
    companySize: "",
    industriesOfInterest: [],
    expectedLocation: "",
    isInitialed: false,
  });

  useEffect(() => {
    if (!identity) return; // Tunggu sampai identity tersedia

    async function fetchUser() {
      Actor.agentOf(hirex_backend).replaceIdentity(identity);
      const response = await hirex_backend.login();
      if ("ok" in response) {
        const user = mapOptionalToFormattedJSON(response.ok);
        setFormData({
          // ...formData,
          name: user.full_name ?? "",
          dateOfBirth: user.date_of_birth
            ? unixToDateString(user.date_of_birth)
            : "",
          yearsOfExperience: user.years_of_experience ?? "",
          educationLevel: user.education_level ?? "",
          personalityTraits: user.personality_traits ?? "",
          learningStyle: user.learning_style ?? "",
          jobRolePreferences: user.job_roles ?? "",
          jobSearchStatus: user.job_search_status ?? "",
          roleLevel: user.job_level ?? "",
          workMode: user.work_mode ?? "",
          companySize: user.company_size ?? "",
          industriesOfInterest: user.industries_of_interest ?? "",
          expectedLocation: user.expected_location ?? "",
          isInitialed: true,
        });
      } else {
        console.log("err", response.err);
      }
    }

    fetchUser();
  }, [identity]);

  useEffect(() => {
    if (formData.isInitialed === true) {
      setIsLoading(false);
    }
  }, [formData.isInitialed]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const nextStep = async () => {
    if (currentStep < totalSteps - 1) {
      // Validate current step before proceeding
      if (!isCurrentStepValid()) return;

      setIsLoading(true);
      const response = await hirex_backend.register(
        prepareArg(formData.name),
        prepareArg(toUnixTimestamps(formData.dateOfBirth)),
        prepareArg(formData.yearsOfExperience),
        prepareArg(formData.educationLevel),
        prepareArg(formData.personalityTraits),
        prepareArg(formData.learningStyle),
        prepareArg(formData.jobRolePreferences),
        prepareArg(formData.jobSearchStatus),
        prepareArg(formData.roleLevel),
        prepareArg(formData.workMode),
        prepareArg(formData.companySize),
        prepareArg(formData.industriesOfInterest),
        prepareArg(formData.expectedLocation),
        [0]
      );
      setIsLoading(false);

      if ("ok" in response) {
        setCurrentStep(currentStep + 1);
      } else {
        console.log("err", response.err);
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async () => {
    // hirex_backend.
    try {
      setIsLoading(true);
      const response = await hirex_backend.register(
        prepareArg(formData.name),
        prepareArg(toUnixTimestamps(formData.dateOfBirth)),
        prepareArg(formData.yearsOfExperience),
        prepareArg(formData.educationLevel),
        prepareArg(formData.personalityTraits),
        prepareArg(formData.learningStyle),
        prepareArg(formData.jobRolePreferences),
        prepareArg(formData.jobSearchStatus),
        prepareArg(formData.roleLevel),
        prepareArg(formData.workMode),
        prepareArg(formData.companySize),
        prepareArg(formData.industriesOfInterest),
        prepareArg(formData.expectedLocation),
        [1]
      );
      setIsLoading(false);
      if ("ok" in response) {
        navigate("/dashboard");
      } else {
        console.error("Error:", response.err);
      }
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  const isCurrentStepValid = () => {
    switch (currentStep) {
      case 1: // Basic Info
        return formData.name?.trim() !== "" && formData.dateOfBirth !== "";
      case 2: // Personality Traits
        return (
          formData.personalityTraits.length >= 3 &&
          formData.personalityTraits.length <= 5
        );
      case 3: // Learning Style
        return formData.learningStyle !== "";
      case 4: // Job Role Preferences
        return formData.jobRolePreferences.length > 0;
      case 5: // Job Search Status
        return formData.jobSearchStatus !== "";
      case 6: // Role Level
        return formData.roleLevel !== "";
      case 7: // Work Mode
        return formData.workMode !== "";
      case 8: // Company Size
        return formData.companySize !== "";
      case 9: // Industries of Interest
        return formData.industriesOfInterest.length > 0;
      case 10: // Years of Experience
        return formData.educationLevel !== "";
      case 11: // Years of Experience
        return formData.yearsOfExperience !== "";
      case 12: // Expected Location
        return formData.expectedLocation !== "";
      default:
        return true;
    }
  };

  return (
    <>
      <div className="min-h-screen bg-black text-white">
        <LoadingOverlay
          isLoading={isLoading || isAuthLoading}
          message={"Please wait, your application is being processed..."}
        />

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
        <main className="pt-16">
          <div className="flex min-h-[calc(100vh-4rem)]">
            {/* Left Column - Graphic */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="hidden w-1/2 bg-gradient-to-br from-gray-900 to-black p-6 lg:flex lg:items-center lg:justify-center"
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
                              animate={{
                                width: `${60 + Math.random() * 30}%`,
                              }}
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
              className="flex w-full flex-col justify-center p-6 lg:w-1/2"
            >
              <div className="mx-auto w-full max-w-xl rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-white sm:text-3xl">
                    Create Your Profile
                  </h2>
                  <p className="mt-2 text-gray-400">
                    Join HireX to discover AI-matched career opportunities
                  </p>
                </div>

                {/* Progress Indicator */}
                <OnboardingProgress
                  currentStep={currentStep}
                  totalSteps={totalSteps}
                />

                {/* Form Steps */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Introduction Step */}
                    {currentStep === 0 && (
                      <div className="space-y-6">
                        <div className="rounded-lg border border-cyan-400/20 bg-cyan-950/20 p-4">
                          <div className="flex items-start gap-3">
                            <Info className="mt-0.5 h-5 w-5 flex-shrink-0 text-cyan-400" />
                            <div>
                              <h3 className="font-medium text-cyan-400">
                                Onboarding Information
                              </h3>
                              <p className="mt-1 text-sm text-gray-300">
                                This onboarding process takes about{" "}
                                <strong>2 minutes</strong> to complete and helps
                                our AI system provide better job recommendations
                                tailored to your profile.
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h3 className="text-lg font-medium">
                            What you'll provide:
                          </h3>

                          <div className="space-y-3">
                            <div className="flex items-start gap-3">
                              <User className="mt-0.5 h-5 w-5 text-cyan-400" />
                              <div>
                                <h4 className="font-medium">
                                  Personal Information
                                </h4>
                                <p className="text-sm text-gray-400">
                                  Basic details about yourself and your
                                  background
                                </p>
                              </div>
                            </div>

                            <div className="flex items-start gap-3">
                              <Brain className="mt-0.5 h-5 w-5 text-violet-400" />
                              <div>
                                <h4 className="font-medium">
                                  Personality & Learning Style
                                </h4>
                                <p className="text-sm text-gray-400">
                                  How you work and learn best
                                </p>
                              </div>
                            </div>

                            <div className="flex items-start gap-3">
                              <Briefcase className="mt-0.5 h-5 w-5 text-cyan-400" />
                              <div>
                                <h4 className="font-medium">
                                  Career Preferences
                                </h4>
                                <p className="text-sm text-gray-400">
                                  Your ideal job roles, work environment, and
                                  industries
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                          <p className="text-sm text-gray-300">
                            Your data is securely stored and used only to
                            provide personalized job recommendations. You can
                            update your preferences anytime from your profile
                            settings.
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Basic Info Form (Step 1) */}
                    {currentStep === 1 && (
                      <BasicInfoForm
                        formData={formData}
                        handleChange={handleChange}
                      />
                    )}

                    {/* Personality Traits Form (Step 2) */}
                    {currentStep === 2 && (
                      <PersonalityTraitsForm
                        formData={formData}
                        handleChange={handleChange}
                      />
                    )}

                    {/* Learning Style Form (Step 3) */}
                    {currentStep === 3 && (
                      <LearningStyleForm
                        formData={formData}
                        handleChange={handleChange}
                      />
                    )}

                    {/* Career Preferences Forms (Steps 4-11) */}
                    {currentStep >= 4 && currentStep <= 12 && (
                      <CareerPreferencesForm
                        step={currentStep - 3}
                        formData={formData}
                        handleChange={handleChange}
                      />
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Navigation Buttons */}
                <div className="mt-8 flex justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    className="border-white/10 bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white"
                    disabled={currentStep === 0}
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>

                  {currentStep < totalSteps - 1 ? (
                    <Button
                      type="button"
                      onClick={nextStep}
                      className="bg-gradient-to-r from-cyan-400 to-violet-500 text-black hover:from-cyan-500 hover:to-violet-600"
                      disabled={currentStep > 0 && !isCurrentStepValid()}
                    >
                      {currentStep === 0 ? "Get Started" : "Continue"}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      onClick={handleSubmit}
                      className="bg-gradient-to-r from-cyan-400 to-violet-500 text-black hover:from-cyan-500 hover:to-violet-600"
                    >
                      Complete Profile
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </main>

        {/* Background Elements */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute left-1/4 top-1/4 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 h-96 w-96 translate-x-1/2 translate-y-1/2 rounded-full bg-violet-500/10 blur-3xl"></div>
        </div>
      </div>
      )}
    </>
  );
}
