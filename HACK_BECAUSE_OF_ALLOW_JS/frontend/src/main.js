import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./App";
import "./app.css";
ReactDOM.createRoot(document.getElementById("root")).render(<BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}/>
    </Routes>
  </BrowserRouter>);
