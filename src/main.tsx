import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import "./style/index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { P404 } from "./app/P404.tsx";

createRoot(document.body).render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />} />

            <Route path="*" element={<P404 />} />
        </Routes>
    </BrowserRouter>
);
