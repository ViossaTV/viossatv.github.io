import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import "./style/index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { P404 } from "./app/P404.tsx";
import { useLocation } from "react-router-dom";

const CustomRoute = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();
  const pathname = location.pathname;

  // List of file extensions that indicate assets
  const assetExtensions = [
    ".fbx",
    ".png",
    ".jpg",
    ".jpeg",
    ".gif",
    ".js",
    ".css",
    ".glb",
  ];

  // Check if the path ends with one of these extensions
  const isAsset = assetExtensions.some((ext) => pathname.endsWith(ext));

  if (isAsset) {
    // If it's an asset, don't render the route
    window.location.href = pathname;
    return null;
  }

  // Otherwise, render the provided element
  return children;
};

createRoot(document.body).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />

      <Route
        path="*"
        element={
          <CustomRoute>
            <P404 />
          </CustomRoute>
        }
      />
    </Routes>
  </BrowserRouter>
);
