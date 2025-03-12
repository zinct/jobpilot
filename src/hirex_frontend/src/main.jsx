import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Outlet } from "react-router";
import "./core/style/global.css";
import HomePage from "@/features/main/pages/home-page";
import RegisterPage from "@/features/auth/pages/register-page";
import { AuthProvider, useAuth } from "@/core/providers/auth-provider";

import React from "react";
import DashboardLayout from "./core/components/layouts/dashboard-layout";
import DashboardPage from "./features/dashboard/pages/dashboard-page";
import CVGeneratorPage from "./features/cv/cv-generator-page";
import CVGeneratorCreatepage from "./features/cv/cv-generator-create-page";
import ChatbotPage from "./features/chatbot/pages/chatbot-page";
import JobRecommendationsPage from "./features/job/pages/job-recommendations-page";
import CourseRecommendationsPage from "./features/course/pages/course-recommendations-page";
import ProfilePage from "./features/profile/pages/profile-page";
import LoginPage from "./features/auth/pages/login-page";

const AppLayout = () => {
  return <Outlet />;
};

export default AppLayout;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Layout untuk halaman umum */}
          <Route path="/" element={<AppLayout />}>
            <Route index element={<HomePage />} />
            <Route path="get-started" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
          </Route>

          {/* Layout untuk dashboard */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="career-chatbot" element={<ChatbotPage />} />
            <Route
              path="job-recommendations"
              element={<JobRecommendationsPage />}
            />
            <Route
              path="course-recommendations"
              element={<CourseRecommendationsPage />}
            />
            <Route path="cv-generator" element={<CVGeneratorPage />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>
          <Route
            path="/dashboard/cv-generator/create"
            element={<CVGeneratorCreatepage />}
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
