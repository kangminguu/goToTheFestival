import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import PageRouter from "./Router.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <PageRouter />
    </StrictMode>
);
