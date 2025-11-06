import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { UrlProvider } from "./context/UrlContext";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UrlProvider>
      <App />
    </UrlProvider>
  </StrictMode>
);
