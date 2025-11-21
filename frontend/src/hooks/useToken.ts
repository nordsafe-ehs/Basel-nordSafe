import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { ActiveProject } from "../types/Sidebar";
import { Token } from "../types/Token";

export const useToken = () => {
  const [token, _setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  // const [activeProject, _setActiveProject] = useState<ActiveProject | null>(

  //   localStorage.getItem("activeProject")
  //     ? JSON.parse(localStorage.getItem("activeProject")!)
  //     : null
    
  // );
  const [activeProject, _setActiveProject] = useState<ActiveProject | null>(
    () => {
      const stored = localStorage.getItem("activeProject");
      if (!stored || stored === "undefined") return null;

      try {
        return JSON.parse(stored);
      } catch (err) {
        console.error("Failed to parse activeProject:", err);
        return null;
      }
    }
  );

  const { pathname } = useLocation();

  useEffect(() => {
    const storedToken = localStorage.getItem("token") || null;
    _setToken(storedToken);
    const storedActiveProject = localStorage.getItem("token") || null;
    _setToken(storedActiveProject);
  }, [pathname]);

  const setToken = (newToken: string | null) => {
    if (newToken) {
      localStorage.setItem("token", newToken);
    } else {
      localStorage.removeItem("token");
    }
    _setToken(newToken);
  };
  const setActiveProject = (newActiveProject: ActiveProject | null) => {
    if (newActiveProject) {
      localStorage.setItem("activeProject", JSON.stringify(newActiveProject));
    } else {
      localStorage.removeItem("activeProject");
    }
    _setActiveProject(newActiveProject);
  };

  const decodedToken = useMemo<Token>(() => {
    if (!token) return {} as Token;
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => `%${("00" + c.charCodeAt(0).toString(16)).slice(-2)}`)
        .join("")
    );

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { iat, ...rest } = JSON.parse(jsonPayload);

    return rest;
  }, [token]);

  return { token, setToken, decodedToken, setActiveProject, activeProject };
};
