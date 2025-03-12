"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, BrainCircuit, User, ChevronRight } from "lucide-react";
import { Button } from "@/core/components/ui/button";
import { hirex_backend } from "../../../core/utils/agentUtils";

export default function CareerChatbot() {
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi John! I'm your AI career assistant. How can I help with your career journey today?",
    },
  ]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;
    const value = inputValue;

    // Add user message
    const userMessage = { role: "user", content: inputValue };
    setMessages([...messages, userMessage]);
    setInputValue("");

    // Set loading state
    setIsLoading(true);
    const response = await hirex_backend.prompt(value);

    const assistantMessage = { role: "assistant", content: response };
    setMessages((prev) => [...prev, assistantMessage]);
    setIsLoading(false);
  };

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

          <div className="flex-1 overflow-y-auto p-4" ref={chatContainerRef}>
            <div className="space-y-4">
              {messages.map((message, index) =>
                message.role === "assistant" ? (
                  <div key={index} className="flex items-start gap-3">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 to-violet-500">
                      <BrainCircuit className="h-4 w-4 text-white" />
                    </div>
                    <div className="rounded-2xl rounded-tl-none bg-gray-800/50 p-4">
                      <p className="text-gray-100 whitespace-pre-line">
                        {message.content}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div
                    key={index}
                    className="flex items-start justify-end gap-3"
                  >
                    <div className="rounded-2xl rounded-tr-none bg-cyan-950/30 p-4">
                      <p className="text-gray-100">{message.content}</p>
                    </div>
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-cyan-400/20">
                      <User className="h-4 w-4 text-cyan-400" />
                    </div>
                  </div>
                )
              )}

              {/* Loading animation when AI is "thinking" */}
              {isLoading && (
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 to-violet-500">
                    <BrainCircuit className="h-4 w-4 text-white" />
                  </div>
                  <div className="rounded-2xl rounded-tl-none bg-gray-800/50 p-4">
                    <div className="flex items-center">
                      <motion.div
                        className="h-2 w-2 rounded-full bg-cyan-400 mr-1"
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{
                          duration: 1,
                          repeat: Number.POSITIVE_INFINITY,
                        }}
                      />
                      <motion.div
                        className="h-2 w-2 rounded-full bg-cyan-400 mr-1"
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{
                          duration: 1,
                          repeat: Number.POSITIVE_INFINITY,
                          delay: 0.2,
                        }}
                      />
                      <motion.div
                        className="h-2 w-2 rounded-full bg-cyan-400"
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{
                          duration: 1,
                          repeat: Number.POSITIVE_INFINITY,
                          delay: 0.4,
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          <div className="border-t border-white/10 p-4">
            <form onSubmit={handleSendMessage} className="relative">
              <input
                type="text"
                placeholder="Ask about your career..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={isLoading}
                className={`w-full rounded-xl border ${
                  isLoading
                    ? "border-gray-700 bg-gray-800/30 text-gray-500"
                    : "border-white/10 bg-white/5 text-white"
                } px-4 py-3 pr-12 placeholder-gray-400 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400`}
              />
              <Button
                type="submit"
                size="icon"
                disabled={isLoading}
                className={`absolute right-2 top-1/2 -translate-y-1/2 ${
                  isLoading
                    ? "bg-transparent text-gray-600"
                    : "bg-transparent hover:bg-white/10 text-cyan-400"
                }`}
              >
                <ArrowRight className="h-5 w-5" />
              </Button>
            </form>
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
                onClick={() => {
                  if (!isLoading) {
                    setInputValue(`Tell me about ${topic.toLowerCase()}`);
                  }
                }}
                disabled={isLoading}
              >
                {topic}
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
