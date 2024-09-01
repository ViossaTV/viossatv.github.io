import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ReactElement } from "react";
import App from "./app/App";
import { P404 } from "./app/P404";
import "./style/index.css";
import { createRoot } from "react-dom/client";

const KartRoute: React.FC<{ element: ReactElement }> = ({ element }) => {
  const location = useLocation();
  const pathname = location.pathname;

  // Check if the path matches /kart.io/Username
  if (pathname.startsWith("/kart.io/") && pathname.split("/").length === 3) {
    // Render null to avoid rendering React Router's P404
    return null;
  }

  return element;
};

createRoot(document.body).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/kart.io/*" element={<KartRoute element={<P404 />} />} />
      <Route path="*" element={<P404 />} />
    </Routes>
  </BrowserRouter>
);
