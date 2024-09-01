import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import "./style/index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { P404 } from "./app/P404.tsx";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const IgnorePaths = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();
  const pathname = location.pathname;

  // Paths to ignore
  const ignoredPaths = ["/kart.io"];

  useEffect(() => {
    const shouldIgnore = ignoredPaths.some((ignoredPath) =>
      pathname.startsWith(ignoredPath)
    );

    if (shouldIgnore) {
      // Redirect the browser to let the static server handle the request
      window.location.href = pathname;
    }
  }, [pathname]);

  return children;
};

createRoot(document.body).render(
  <BrowserRouter>
    <IgnorePaths>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="*" element={<P404 />} />
      </Routes>
    </IgnorePaths>
  </BrowserRouter>
);
