import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Outlet } from "react-router";
import "./core/style/global.css";
import HomePage from "@/features/main/pages/home-page";
import RegisterPage from "@/features/auth/pages/register-page";
import { AuthProvider, useAuth } from "@/core/providers/auth-provider";
import { LoadingOverlay } from "@/core/components/loading-overlay";

import React from "react";
import DashboardLayout from "./core/components/layouts/dashboard-layout";
import DashboardPage from "./features/dashboard/pages/dashboard-page";
import CVGeneratorPage from "./features/cv/cv-generator-page";
import CVGeneratorCreatepage from "./features/cv/cv-generator-create-page";
import ChatbotPage from "./features/chatbot/pages/chatbot-page";
import JobRecommendationsPage from "./features/job/pages/job-recommendations-page";
import CourseRecommendationsPage from "./features/course/pages/course-recommendations-page";
import ProfilePage from "./features/profile/pages/profile-page";

const AppLayout = () => {
  const { isLoading } = useAuth();

  return (
    <>
      <LoadingOverlay
        isLoading={isLoading}
        message={"Please wait, your application is being processed..."}
      />
      <Outlet />
    </>
  );
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
            <Route
              path="cv-generator/create"
              element={<CVGeneratorCreatepage />}
            />
            <Route path="profile" element={<ProfilePage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
