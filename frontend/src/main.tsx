import { ThemeProvider } from "@mui/material";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.tsx";
import "./i18n.ts"
import "./index.css";
import { AlertProvider } from "./providers/AlertProvider.tsx";
import { TriggersProvider } from "./providers/TriggersProvider.tsx";
import theme from "./theme.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <ThemeProvider theme={theme}>
        <AlertProvider>
          <TriggersProvider>
            <App />
          </TriggersProvider>
        </AlertProvider>
      </ThemeProvider>
    </Router>
  </StrictMode>
);
