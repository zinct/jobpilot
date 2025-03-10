import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  BrainCircuit,
  BookOpen,
  MessageSquare,
  FileText,
  Wallet,
} from "lucide-react";
import { Button } from "./core/components/ui/button";
import { useEffect } from "react";
import { hirex_backend } from "declarations/hirex_backend";

function App() {
  async function handleSubmit() {
    console.log(hirex_backend);
    const principal = await hirex_backend.whoami();
    console.log("principal", principal);
  }
  
  return (
    <>
      <div className="min-h-screen bg-black text-white">
        {/* Navigation */}
        <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/50 backdrop-blur-xl">
          <div className="container flex h-16 items-center justify-between px-4">
            <a className="flex items-center space-x-2 font-bold" href="/">
              <BrainCircuit className="h-6 w-6 text-cyan-400" />
              <span className="text-xl">HireX</span>
            </a>

            {/* Navigation Links */}
            <nav className="hidden space-x-8 md:flex">
              <a
                className="text-sm text-gray-200 transition-colors hover:text-cyan-400"
                href="#features"
              >
                Features
              </a>
              <a
                className="text-sm text-gray-200 transition-colors hover:text-cyan-400"
                href="#blockchain"
              >
                Blockchain
              </a>
              <a
                className="text-sm text-gray-200 transition-colors hover:text-cyan-400"
                href="#testimonials"
              >
                Testimonials
              </a>
              <a
                className="text-sm text-gray-200 transition-colors hover:text-cyan-400"
                href="#pricing"
              >
                Pricing
              </a>
            </nav>

            {/* Auth Buttons */}
            <div className="flex items-center" onClick={handleSubmit}>
              <Button
                variant="outline"
                className="hover:border-cyan-400 hover:text-cyan-400 bg-cyan-400/10 text-cyan-300"
              >
                Get Started
              </Button>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
          {/* Animated Elements */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Curved Lines */}
            <svg
              className="absolute h-full w-full"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="grad1" x1="1" y1="0" x2="0" y2="0">
                  <stop offset="0%" stopColor="#22d3ee" stopOpacity="0" />
                  <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="grad2" x1="1" y1="0" x2="0" y2="0">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0" />
                  <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                </linearGradient>
              </defs>
              {/* Top Curves */}
              <motion.path
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{
                  duration: 2,
                  ease: "easeInOut",
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                  repeatDelay: 1,
                }}
                d="M 100 100 Q 300 0 500 100 T 900 100"
                fill="none"
                stroke="url(#grad1)"
                strokeWidth="1"
              />
              <motion.path
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{
                  duration: 2,
                  ease: "easeInOut",
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                  repeatDelay: 1,
                  delay: 0.5,
                }}
                d="M 0 200 Q 200 100 400 200 T 800 200"
                fill="none"
                stroke="url(#grad2)"
                strokeWidth="1"
              />
              {/* Bottom Curves */}
              <motion.path
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{
                  duration: 2,
                  ease: "easeInOut",
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                  repeatDelay: 1,
                  delay: 1,
                }}
                d="M 100 600 Q 300 500 500 600 T 900 600"
                fill="none"
                stroke="url(#grad1)"
                strokeWidth="1"
              />
            </svg>

            {/* Straight Lines */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="absolute inset-0"
            >
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ x: "100%", opacity: 0 }}
                  animate={{
                    x: "-100%",
                    opacity: [0, 0.7, 0.7, 0],
                  }}
                  transition={{
                    duration: 2.5,
                    delay: i * 0.2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "loop",
                    ease: "linear",
                  }}
                  className="absolute right-0"
                  style={{
                    top: `${15 + i * 10}%`,
                    height: "1px",
                    width: "100%",
                    background: `linear-gradient(90deg, transparent, ${
                      i % 2 === 0 ? "#22d3ee" : "#8b5cf6"
                    }60, transparent)`,
                  }}
                />
              ))}
            </motion.div>
          </div>

          {/* Animated Background */}
          <div className="absolute inset-0 z-[1]">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2 }}
              className="absolute -left-1/4 top-1/4 h-96 w-96 rounded-full bg-cyan-500/30 blur-3xl"
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2, delay: 0.5 }}
              className="absolute -right-1/4 top-1/2 h-96 w-96 rounded-full bg-violet-500/30 blur-3xl"
            />
          </div>

          {/* Content */}
          <div className="container relative z-[3] px-4">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="mx-auto max-w-3xl space-y-8 text-center lg:text-left"
              >
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                  AI-Powered Career Advancement
                </h1>
                <p className="mx-auto max-w-2xl text-muted text-gray-400 sm:text-xl lg:mx-0">
                  Our platform leverages AI and blockchain technology to
                  revolutionize how professionals discover opportunities,
                  develop skills, and advance their careers
                </p>
                <div className="flex flex-wrap justify-center gap-4 lg:justify-start">
                  <Button className="bg-gradient-to-r from-cyan-400 to-violet-500 text-lg text-black hover:from-cyan-500 hover:to-violet-600">
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </motion.div>

              {/* CV Visualization */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="hidden lg:block"
              >
                <div className="relative mx-auto max-w-md">
                  {/* CV Document */}
                  <div className="rounded-lg border border-white/20 bg-gradient-to-b from-gray-800/80 to-gray-900/80 p-6 shadow-2xl backdrop-blur-sm">
                    {/* CV Header with AI Analysis */}
                    <div className="mb-6 flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-white">
                          Professional Resume
                        </h3>
                        <p className="text-sm text-cyan-400">AI-Optimized</p>
                      </div>
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-400/20">
                        <BrainCircuit className="h-6 w-6 text-cyan-400" />
                      </div>
                    </div>

                    {/* AI Analysis Indicators */}
                    <div className="mb-6 rounded-md border border-cyan-400/30 bg-cyan-950/20 p-3">
                      <div className="mb-2 flex items-center">
                        <div className="mr-2 h-2 w-2 rounded-full bg-cyan-400"></div>
                        <p className="text-sm font-medium text-cyan-400">
                          AI Match Score: 94%
                        </p>
                      </div>
                      <p className="text-xs text-gray-300">
                        Optimized for Senior Developer positions
                      </p>
                    </div>

                    {/* CV Content with Highlights */}
                    <div className="space-y-4">
                      {/* Experience Section */}
                      <div>
                        <h4 className="mb-2 font-medium text-white">
                          Experience
                        </h4>
                        <div className="space-y-3">
                          <div className="rounded-md bg-white/5 p-3">
                            <div className="flex justify-between">
                              <p className="font-medium text-white">
                                Senior Developer
                              </p>
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: [0, 1, 1, 0] }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                  repeatDelay: 3,
                                }}
                                className="rounded-sm bg-cyan-400/20 px-2 py-0.5 text-xs text-cyan-400"
                              >
                                AI Highlighted
                              </motion.div>
                            </div>
                            <p className="text-sm text-gray-400">
                              TechCorp Inc. • 2020-Present
                            </p>
                            <p className="mt-1 text-xs text-gray-300">
                              Led development of cloud-based solutions...
                            </p>
                          </div>
                          <div className="rounded-md bg-white/5 p-3">
                            <p className="font-medium text-white">
                              Web Developer
                            </p>
                            <p className="text-sm text-gray-400">
                              Digital Solutions • 2018-2020
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Skills Section */}
                      <div>
                        <h4 className="mb-2 font-medium text-white">Skills</h4>
                        <div className="flex flex-wrap gap-2">
                          {[
                            "JavaScript",
                            "React",
                            "Node.js",
                            "Cloud",
                            "AI/ML",
                          ].map((skill, index) => (
                            <motion.span
                              key={index}
                              initial={{ opacity: 0.7 }}
                              animate={{
                                opacity:
                                  index === 0 || index === 4
                                    ? [0.7, 1, 0.7]
                                    : 0.7,
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                repeatDelay: 1,
                              }}
                              className={`rounded-full px-3 py-1 text-xs ${
                                index === 0 || index === 4
                                  ? "border border-cyan-400/50 bg-cyan-950/30 text-cyan-400"
                                  : "bg-white/10 text-gray-300"
                              }`}
                            >
                              {skill}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* AI Scanning Effect */}
                    <motion.div
                      initial={{ top: 0 }}
                      animate={{ top: "100%" }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "loop",
                        repeatDelay: 5,
                      }}
                      className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
                      style={{ opacity: 0.7 }}
                    />
                  </div>

                  {/* AI Analysis Floating Elements */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="absolute -right-10 -top-10 rounded-lg border border-white/10 bg-black/60 p-3 backdrop-blur-sm"
                  >
                    <div className="flex items-center space-x-2">
                      <div className="h-2 w-2 rounded-full bg-cyan-400"></div>
                      <p className="text-xs text-white">Analyzing skills</p>
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="absolute -bottom-5 -left-5 rounded-lg border border-white/10 bg-black/60 p-3 backdrop-blur-sm"
                  >
                    <div className="flex items-center space-x-2">
                      <div className="h-2 w-2 rounded-full bg-violet-400"></div>
                      <p className="text-xs text-white">Job matching</p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section
          id="features"
          className="relative z-10 border-t border-white/10 bg-black py-24"
        >
          <div className="container px-4">
            <div className="mb-16 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Our AI-Powered Solutions
              </h2>
              <p className="mt-4 text-gray-400">
                Experience career development that works for you
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-colors hover:border-cyan-400/50"
              >
                <BrainCircuit className="mb-4 h-12 w-12 text-cyan-400" />
                <h3 className="mb-2 text-xl font-bold">AI Job Matching</h3>
                <p className="text-gray-400">
                  Smart job recommendations personalized to your profile,
                  skills, and career preferences.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-colors hover:border-violet-400/50"
              >
                <BookOpen className="mb-4 h-12 w-12 text-violet-400" />
                <h3 className="mb-2 text-xl font-bold">
                  Course Recommendations
                </h3>
                <p className="text-gray-400">
                  Tailored learning paths and course suggestions based on your
                  career goals and skill gaps.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-colors hover:border-cyan-400/50"
              >
                <MessageSquare className="mb-4 h-12 w-12 text-cyan-400" />
                <h3 className="mb-2 text-xl font-bold">Career Chatbot</h3>
                <p className="text-gray-400">
                  AI-powered assistant providing career advice, interview tips,
                  and professional guidance.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-colors hover:border-violet-400/50"
              >
                <FileText className="mb-4 h-12 w-12 text-violet-400" />
                <h3 className="mb-2 text-xl font-bold">AI CV Maker</h3>
                <p className="text-gray-400">
                  Resume-building tool that generates optimized CVs tailored to
                  specific job opportunities.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* AI Assistant Demo Section */}
        <section className="relative z-10 border-t border-white/10 bg-black py-24">
          <div className="container px-4">
            <div className="grid gap-12 lg:grid-cols-2">
              {/* Left Column */}
              <div className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl">
                    Experience Our AI Career Assistant
                  </h2>
                  <p className="mt-4 text-xl text-gray-400">
                    Get personalized career advice, interview tips, and
                    professional guidance from our AI-powered chatbot.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="space-y-4"
                >
                  {[
                    "Resume optimization suggestions",
                    "Interview preparation and practice",
                    "Career path planning and guidance",
                    "Skill development recommendations",
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle2 className="h-6 w-6 text-cyan-400" />
                      <span className="text-lg text-gray-200">{feature}</span>
                    </div>
                  ))}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <Button className="group relative bg-white text-black hover:bg-gray-100">
                    Try Full Version
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </motion.div>
              </div>

              {/* Right Column - Chat Interface */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="rounded-2xl border border-white/10 bg-gradient-to-b from-gray-900 to-black p-6"
              >
                <div className="mb-6 space-y-2">
                  <h3 className="text-xl font-semibold text-white">
                    Career Assistant
                  </h3>
                  <p className="text-sm text-gray-400">
                    AI-powered career guidance
                  </p>
                </div>

                <div className="mb-4 rounded-xl bg-gray-800/50 p-4">
                  <p className="text-gray-100">
                    Hi there! I'm your AI career assistant. How can I help with
                    your career journey today?
                  </p>
                </div>

                <div className="relative">
                  <input
                    type="text"
                    placeholder="Ask about your career..."
                    className="w-full rounded-xl border border-white/10 bg-gray-800/30 px-4 py-3 pr-12 text-white placeholder-gray-400 backdrop-blur-sm focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                  />
                  <Button
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-transparent hover:bg-white/10"
                  >
                    <ArrowRight className="h-5 w-5 text-cyan-400" />
                  </Button>
                </div>
                <p className="mt-3 text-sm text-gray-500">
                  This is a demo. Try asking about resume tips, interview
                  preparation, or career paths.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Blockchain Section */}
        <section className="relative z-10 border-t border-white/10 bg-black py-24">
          <div className="container px-4">
            <div className="mb-16 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Blockchain Integration
              </h2>
              <p className="mt-4 text-gray-400">
                Secure, transparent, and decentralized career management
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-colors hover:border-cyan-400/50"
              >
                <Wallet className="mb-4 h-12 w-12 text-cyan-400" />
                <h3 className="mb-2 text-xl font-bold">
                  Decentralized Identity
                </h3>
                <p className="text-gray-400">
                  Own your professional identity with blockchain-based
                  credentials that you control.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-colors hover:border-violet-400/50"
              >
                <CheckCircle2 className="mb-4 h-12 w-12 text-violet-400" />
                <h3 className="mb-2 text-xl font-bold">Proof-of-Skill</h3>
                <p className="text-gray-400">
                  Verifiable skill credentials that prove your expertise through
                  blockchain verification.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-colors hover:border-cyan-400/50"
              >
                <FileText className="mb-4 h-12 w-12 text-cyan-400" />
                <h3 className="mb-2 text-xl font-bold">
                  Credential Validation
                </h3>
                <p className="text-gray-400">
                  Transparent validation of job credentials and certifications
                  through immutable records.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative z-10 border-t border-white/10 bg-black py-24">
          <div className="container px-4">
            <div className="mx-auto max-w-3xl rounded-2xl border border-white/10 bg-gradient-to-r from-cyan-950/50 to-violet-950/50 p-8 text-center backdrop-blur-sm md:p-12 lg:p-16">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Ready to Transform Your Career?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-gray-400">
                Join thousands of professionals who trust HireX to advance their
                careers through AI and blockchain technology.
              </p>
              <ul className="mx-auto mt-8 flex max-w-xl flex-col gap-4 text-left">
                <li className="flex items-center space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-cyan-400" />
                  <span>Personalized job recommendations</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-cyan-400" />
                  <span>Skill-based learning paths</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle2 className="h-5 w-5 text-cyan-400" />
                  <span>Blockchain-verified credentials</span>
                </li>
              </ul>
              <Button className="mt-8 bg-gradient-to-r from-cyan-400 to-violet-500 text-lg text-black hover:from-cyan-500 hover:to-violet-600">
                Create Your Profile
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/10 bg-black py-8">
          <div className="container flex flex-col items-center justify-between space-y-4 px-4 md:flex-row md:space-y-0">
            <div className="flex items-center space-x-2">
              <BrainCircuit className="h-6 w-6 text-cyan-400" />
              <span className="font-bold">HireX</span>
            </div>
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} HireX. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a className="text-sm text-gray-400 hover:text-cyan-400" href="#">
                Privacy
              </a>
              <a className="text-sm text-gray-400 hover:text-cyan-400" href="#">
                Terms
              </a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default App;
