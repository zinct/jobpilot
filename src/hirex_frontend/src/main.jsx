import { AuthProvider, useAuth } from "@/core/providers/auth-provider";
import RegisterPage from "@/features/auth/pages/register-page";
import HomePage from "@/features/main/pages/home-page";
import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Outlet, Route, Routes, useNavigate } from "react-router";
import "./core/style/global.css";

import DashboardLayout from "./core/components/layouts/dashboard-layout";
import LoginPage from "./features/auth/pages/login-page";
import ChatbotPage from "./features/chatbot/pages/chatbot-page";
import CVGeneratorBuilderPage from "./features/cv/cv-generator-builder-page";
import CVGeneratorCreatepage from "./features/cv/cv-generator-create-page";
import CVGeneratorPage from "./features/cv/cv-generator-page";
import DashboardPage from "./features/dashboard/pages/dashboard-page";
import JobRecommendationsPage from "./features/job/pages/job-recommendations-page";
import ProfilePage from "./features/profile/pages/profile-page";
import DummyPage, { UserDummyPage } from "./features/main/pages/dummy-page";
import { ErrorAlertProvider, setupErrorListener, useErrorAlert } from "./core/components/error-alert";
import CVAnalysisPage from "./features/cv/cv-analysis-page";

const ResumeGeneratorLayout = () => {
  const { identity, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading === false && identity === null) navigate("/get-started");
  }, [identity, isLoading]);

  return <Outlet />;
};

function ErrorEventListener({ children }) {
  const { showError } = useErrorAlert();

  useEffect(() => {
    // Set up the global error event listener
    return setupErrorListener(showError);
  }, [showError]);

  return children;
}

export default ResumeGeneratorLayout;

function App() {
  const [page, setPage] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => setPage(window.location.pathname);
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigate = (path) => {
    window.history.pushState({}, "", path);
    setPage(path);
  };

  return (
    <ErrorAlertProvider>
      <ErrorEventListener>
        <AuthProvider>
          <>
            {page === "/" && <HomePage navigate={navigate} />}
            {page === "/get-started" && <LoginPage navigate={navigate} />}
            {page === "/register" && <RegisterPage navigate={navigate} />}
            {page === "/dashboard" && (
              <DashboardLayout navigate={navigate} location={page}>
                <DashboardPage navigate={navigate} />
              </DashboardLayout>
            )}
            {page === "/dashboard/cv-generator" && (
              <DashboardLayout navigate={navigate} location={page}>
                <CVGeneratorPage navigate={navigate} />
              </DashboardLayout>
            )}
          </>
        </AuthProvider>
      </ErrorEventListener>
    </ErrorAlertProvider>
  );
}
// <Routes>
//   {/* Layout untuk halaman umum */}
//   <Route index element={<HomePage />} />
//   <Route path="get-started" element={<LoginPage />} />
//   <Route path="register" element={<RegisterPage />} />
//   <Route path="dummy" element={<DummyPage />} />
//   <Route path="dummy-user" element={<UserDummyPage />} />

//   {/* Layout untuk dashboard */}
//   <Route path="/dashboard" element={<DashboardLayout />}>
//     <Route index element={<DashboardPage />} />
//     <Route path="career-chatbot" element={<ChatbotPage />} />
//     <Route path="job-recommendations" element={<JobRecommendationsPage />} />
//     <Route path="cv-analysis" element={<CVAnalysisPage />} />
//     <Route path="cv-generator" element={<CVGeneratorPage />} />
//     <Route path="profile" element={<ProfilePage />} />
//   </Route>

//   <Route path="/dashboard" element={<ResumeGeneratorLayout />}>
//     <Route path="cv-generator/create/:id" element={<CVGeneratorCreatepage />} />
//     <Route path="cv-generator/builder/:id" element={<CVGeneratorBuilderPage />} />
//   </Route>
// </Routes>;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <h1 className="text-red-500 pt-10" style={{ fontSize: "4rem", position: "absolute", zIndex: 9999 }}>
        Im sorry due to file size limitations on ICP Ninja. Please run the frontend locally through my GitHub. Thank you
      </h1>
      <App />
    </BrowserRouter>
  </StrictMode>
);
