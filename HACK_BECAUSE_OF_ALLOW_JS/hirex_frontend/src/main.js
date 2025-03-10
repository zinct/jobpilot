import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./core/style/global.css";
import App from "./App.jsx";
createRoot(document.getElementById("root")).render(<StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>);
