import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./terminal.css";
import App from "./PortfolioTerminal.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
