import { motion } from "framer-motion";
import { ArrowRight, BrainCircuit, User, ChevronRight } from "lucide-react";
import { Button } from "@/core/components/ui/button";

export default function ChatbotPage() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="md:col-span-2"
      >
        <div className="flex h-[calc(100vh-12rem)] flex-col rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
          <div className="border-b border-white/10 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 to-violet-500">
                <BrainCircuit className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-medium">Career Assistant</h3>
                <p className="text-sm text-gray-400">
                  AI-powered career guidance
                </p>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 to-violet-500">
                  <BrainCircuit className="h-4 w-4 text-white" />
                </div>
                <div className="rounded-2xl rounded-tl-none bg-gray-800/50 p-4">
                  <p className="text-gray-100">
                    Hi John! I'm your AI career assistant. How can I help with
                    your career journey today?
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 p-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Ask about your career..."
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 pr-12 text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
              />
              <Button
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-transparent hover:bg-white/10"
              >
                <ArrowRight className="h-5 w-5 text-cyan-400" />
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="space-y-6"
      >
        <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          <h3 className="mb-4 text-lg font-medium">Suggested Topics</h3>
          <div className="space-y-2">
            {[
              "Interview preparation tips",
              "Salary negotiation strategies",
              "Career path planning",
              "Resume optimization",
              "Skill development advice",
            ].map((topic, index) => (
              <button
                key={index}
                className="w-full rounded-lg border border-white/10 bg-white/5 p-3 text-left text-sm hover:border-cyan-400/30 hover:bg-cyan-950/20"
              >
                {topic}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          <h3 className="mb-4 text-lg font-medium">Recent Conversations</h3>
          <div className="space-y-3">
            {[
              "Resume feedback for senior role",
              "Technical interview preparation",
              "Career transition advice",
            ].map((convo, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-3"
              >
                <span className="text-sm">{convo}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-gray-400 hover:text-white"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
