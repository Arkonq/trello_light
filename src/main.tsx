import { StrictMode } from "react";
import { type Container, createRoot } from "react-dom/client";
import App from "./app/App.tsx";

createRoot(document.getElementById("root") as Container).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
