"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  BrainCircuit,
  FileText,
  Briefcase,
  BookOpen,
  MessageSquare,
  Bell,
  User,
  Settings,
  LogOut,
  Search,
} from "lucide-react";
import { Button } from "@/core/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/core/components/ui/dropdown-menu";
import { Outlet, useLocation, useNavigate } from "react-router";
import { useAuth } from "../../providers/auth-provider";
import { LoadingOverlay } from "../loading-overlay";
import { hirex_backend } from "../../../../../declarations/hirex_backend";
import { Actor } from "@dfinity/agent";

export default function DashboardLayout() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { isLoading, logout, identity } = useAuth();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, []);

  const isActive = (path) => {
    return location.pathname === path;
  };

  function handleChangePage(item) {
    navigate(item.path);
  }

  useEffect(() => {
    if (!identity) return;

    async function fetchUser() {
      Actor.agentOf(hirex_backend).replaceIdentity(identity);
      const response = await hirex_backend.login();
      if ("ok" in response) {
        // const user = mapOptionalToFormattedJSON(response.ok);
        // console.log(user);
      } else {
        console.log("err", response.err);
      }
    }

    fetchUser();
  }, [identity]);

  const menuItems = [
    {
      path: "/dashboard",
      name: "Overview",
      icon: <BrainCircuit className="h-6 w-6" />,
    },
    {
      path: "/dashboard/cv-generator",
      name: "CV Generator",
      icon: <FileText className="h-6 w-6" />,
    },
    {
      path: "/dashboard/job-recommendations",
      name: "Job Recommendations",
      icon: <Briefcase className="h-6 w-6" />,
    },
    {
      path: "/dashboard/course-recommendations",
      name: "Course Recommendations",
      icon: <BookOpen className="h-6 w-6" />,
    },
    {
      path: "/dashboard/career-chatbot",
      name: "Career Chatbot",
      icon: <MessageSquare className="h-6 w-6" />,
    },
  ];

  return (
    <>
      {isLoading ? (
        <LoadingOverlay
          isLoading={isLoading}
          message={"Please wait, your application is being processed..."}
        />
      ) : (
        <div className="min-h-screen bg-black text-white">
          {/* Mobile Menu Toggle */}
          <div className="fixed left-4 top-4 z-50 block md:hidden">
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 border-white/10 bg-black/50 backdrop-blur-md hover:bg-white/10"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <div className="flex flex-col gap-1.5">
                <div
                  className={`h-0.5 w-5 bg-white transition-all ${
                    isMobileMenuOpen ? "translate-y-2 rotate-45" : ""
                  }`}
                ></div>
                <div
                  className={`h-0.5 w-5 bg-white transition-all ${
                    isMobileMenuOpen ? "opacity-0" : "opacity-100"
                  }`}
                ></div>
                <div
                  className={`h-0.5 w-5 bg-white transition-all ${
                    isMobileMenuOpen ? "-translate-y-2 -rotate-45" : ""
                  }`}
                ></div>
              </div>
            </Button>
          </div>

          {/* Sidebar */}
          <aside
            className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-white/10 bg-gradient-to-b from-gray-900 to-black transition-transform duration-300 md:translate-x-0 ${
              isMobileMenuOpen
                ? "translate-x-0"
                : "-translate-x-full md:translate-x-0"
            }`}
          >
            {/* Logo */}
            <div className="flex h-20 items-center border-b border-white/10 px-6">
              <a href="/" className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 to-violet-500">
                  <BrainCircuit className="h-5 w-5 text-white" />
                </div>
                <span className="text-2xl font-bold">HireX</span>
              </a>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-1 overflow-y-auto p-4">
              <div className="mb-6 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
                Main Menu
              </div>

              {menuItems.map((item) => (
                <a
                  key={item.path}
                  href="#"
                  onClick={() => handleChangePage(item)}
                  className={`group relative mb-2 flex items-center gap-3 rounded-xl px-4 py-3 text-md font-medium transition-all ${
                    isActive(item.path)
                      ? "bg-gradient-to-r from-cyan-500/20 to-violet-500/20 text-white"
                      : "text-gray-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {/* Active indicator */}
                  {isActive(item.path) && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute left-0 top-0 h-full w-1 rounded-r-full bg-gradient-to-b from-cyan-400 to-violet-500"
                    />
                  )}

                  {/* Icon with gradient when active */}
                  <div
                    className={`${
                      isActive(item.path)
                        ? "text-gradient-to-r from-cyan-400 to-violet-500"
                        : "text-gray-400 group-hover:text-white"
                    }`}
                  >
                    {item.icon}
                  </div>

                  <span>{item.name}</span>
                </a>
              ))}

              <div className="my-6 border-t border-white/10 pt-6">
                <div className="mb-6 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Account
                </div>

                <a
                  href="/dashboard/profile"
                  className="group mb-2 flex items-center gap-3 rounded-xl px-4 py-3 text-lg font-medium text-gray-400 transition-all hover:bg-white/5 hover:text-white"
                >
                  <User className="h-6 w-6 text-gray-400 group-hover:text-white" />
                  <span>Profile</span>
                </a>
              </div>
            </nav>

            {/* User Profile */}
            <div className="border-t border-white/10 p-4">
              <div className="flex items-center gap-3 rounded-xl bg-white/5 p-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-violet-500">
                  <span className="text-lg font-medium text-white">JS</span>
                </div>
                <div className="flex-1 overflow-hidden">
                  <h4 className="truncate font-medium">John Smith</h4>
                  <p className="truncate text-sm text-gray-400">
                    john.smith@example.com
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 rounded-full text-gray-400 hover:bg-white/10 hover:text-white"
                  asChild
                >
                  <a href="/" onClick={logout}>
                    <LogOut className="h-5 w-5" />
                  </a>
                </Button>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="md:pl-72 pt-10">
            {/* Header */}
            <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-white/10 bg-black/80 px-4 backdrop-blur-md md:h-20 md:px-6">
              <div className="ml-10 md:ml-0">
                <h1 className="text-xl font-bold md:text-2xl">
                  {menuItems.find((item) => isActive(item.path))?.name ||
                    "Dashboard"}
                </h1>
              </div>

              <div className="flex items-center gap-4">
                <div className="relative hidden md:block">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-64 rounded-full border border-white/10 bg-white/5 py-2 pl-10 pr-4 text-sm text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                  />
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="relative text-gray-400 hover:text-white"
                    >
                      <Bell className="h-6 w-6" />
                      <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-cyan-400 text-xs text-black">
                        3
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-80 border-white/10 bg-gray-900 text-white"
                  >
                    <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-white/10" />
                    <div className="max-h-80 overflow-y-auto">
                      {[1, 2, 3].map((i) => (
                        <DropdownMenuItem
                          key={i}
                          className="flex cursor-pointer flex-col items-start py-3 hover:bg-white/5"
                        >
                          <div className="flex w-full items-start justify-between">
                            <span className="font-medium">
                              New job match found
                            </span>
                            <span className="text-xs text-gray-400">
                              {i}h ago
                            </span>
                          </div>
                          <span className="mt-1 text-sm text-gray-400">
                            A new job matching your profile has been found.
                          </span>
                        </DropdownMenuItem>
                      ))}
                    </div>
                    <DropdownMenuSeparator className="bg-white/10" />
                    <DropdownMenuItem className="cursor-pointer justify-center text-center text-sm text-cyan-400 hover:bg-white/5">
                      View all notifications
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </header>

            {/* Page Content */}
            <main className="min-h-[calc(100vh-5rem)] p-4 md:p-6">
              <Outlet />
            </main>
          </div>
        </div>
      )}
    </>
  );
}
