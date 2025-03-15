import { motion } from "framer-motion";
import { FileText, Briefcase, BookOpen, ArrowRight, ChevronRight, Plus, Calendar } from "lucide-react";
import { Button } from "@/core/components/ui/button";

const upcomingEvents = [
  {
    title: "Interview with TechCorp Inc.",
    date: "Tomorrow, 2:00 PM",
    type: "Interview",
  },
  {
    title: "Resume Review Session",
    date: "Friday, 11:00 AM",
    type: "Appointment",
  },
];

const recentJobs = [
  {
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    match: 94,
    location: "Remote",
    posted: "2 days ago",
  },
  {
    title: "UX/UI Designer",
    company: "Creative Solutions",
    match: 87,
    location: "New York, NY",
    posted: "1 day ago",
  },
  {
    title: "Product Manager",
    company: "Innovate Labs",
    match: 82,
    location: "San Francisco, CA",
    posted: "3 days ago",
  },
];

const DashboardPage = () => {
  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* CV Generator Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-400/20">
                <FileText className="h-5 w-5 text-cyan-400" />
              </div>
              <h3 className="text-lg font-medium">CV Generator</h3>
            </div>
            <span className="rounded-full bg-cyan-400/20 px-2 py-1 text-xs text-cyan-400">AI-Powered</span>
          </div>
          <p className="mb-4 text-gray-400">Create professional resumes tailored to specific job opportunities.</p>
          <Button className="w-full justify-between bg-gradient-to-r from-cyan-400 to-violet-500 text-black hover:from-cyan-500 hover:to-violet-600">
            Create New CV
            <ArrowRight className="h-4 w-4" />
          </Button>
        </motion.div>

        {/* Job Recommendations Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-400/20">
                <Briefcase className="h-5 w-5 text-violet-400" />
              </div>
              <h3 className="text-lg font-medium">Job Matches</h3>
            </div>
            <span className="rounded-full bg-violet-400/20 px-2 py-1 text-xs text-violet-400">12 New</span>
          </div>
          <p className="mb-4 text-gray-400">Personalized job recommendations based on your profile.</p>
          <Button className="w-full justify-between bg-gradient-to-r from-violet-400 to-cyan-400 text-black hover:from-violet-500 hover:to-cyan-500">
            View Job Matches
            <ArrowRight className="h-4 w-4" />
          </Button>
        </motion.div>

        {/* Course Recommendations Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-400/20">
                <BookOpen className="h-5 w-5 text-cyan-400" />
              </div>
              <h3 className="text-lg font-medium">Learning Paths</h3>
            </div>
            <span className="rounded-full bg-cyan-400/20 px-2 py-1 text-xs text-cyan-400">5 Courses</span>
          </div>
          <p className="mb-4 text-gray-400">Recommended courses to enhance your skills and career prospects.</p>
          <Button className="w-full justify-between bg-gradient-to-r from-cyan-400 to-violet-500 text-black hover:from-cyan-500 hover:to-violet-600">
            Explore Courses
            <ArrowRight className="h-4 w-4" />
          </Button>
        </motion.div>

        {/* Recent Job Matches */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-medium">Recent Job Matches</h3>
            <Button variant="ghost" className="text-sm text-cyan-400 hover:bg-white/5 hover:text-cyan-300">
              View All
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-4">
            {recentJobs.map((job, index) => (
              <div key={index} className="flex flex-col justify-between gap-2 rounded-lg border border-white/10 bg-white/5 p-4 sm:flex-row sm:items-center">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">{job.title}</h4>
                    <span className="rounded-full bg-gradient-to-r from-cyan-400/20 to-violet-400/20 px-2 py-0.5 text-xs text-cyan-400">{job.match}% Match</span>
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-x-3 text-sm text-gray-400">
                    <span>{job.company}</span>
                    <span>•</span>
                    <span>{job.location}</span>
                    <span>•</span>
                    <span>{job.posted}</span>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/10">
                  View Details
                </Button>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Upcoming Events */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }} className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-medium">Upcoming Events</h3>
            <Button variant="outline" size="sm" className="h-8 gap-1 border-white/10 text-xs hover:bg-white/10">
              <Plus className="h-3 w-3" />
              Add Event
            </Button>
          </div>
          <div className="space-y-4">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="rounded-lg border border-white/10 bg-white/5 p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium">{event.title}</h4>
                    <div className="mt-1 flex items-center gap-2 text-sm text-gray-400">
                      <Calendar className="h-3 w-3" />
                      <span>{event.date}</span>
                    </div>
                  </div>
                  <span className="rounded-full bg-violet-400/20 px-2 py-1 text-xs text-violet-400">{event.type}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default DashboardPage;
