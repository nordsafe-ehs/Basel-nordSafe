import { Alert, Stack } from "@mui/material";
import { ReactNode, useState } from "react";
import { AlertContext, AlertType } from "../context/AlertContext";

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<AlertType>("error");
  const [open, setOpen] = useState(false);
  let timeoutRef: ReturnType<typeof setTimeout>;

  const showAlert = (msg: React.ReactNode, type: AlertType = "error") => {
    setMessage(msg);
    setSeverity(type);
    setOpen(true);
    timeoutRef = setTimeout(() => setOpen(false), 3000);
  };

  const closeAlert = () => {
    clearTimeout(timeoutRef);
    setOpen(false);
  };

  return (
    <AlertContext.Provider value={{ showAlert, closeAlert }}>
      {children}
      <Stack
        sx={{
          position: "fixed",
          top: "50%",
          left: "100%",
          transform: open ? "translate(-50%, -50%)" : "translate(150%, -50%)",
          zIndex: 101,
          maxWidth: 500,
          transition: "0.25s ease-out",
        }}
      >
        <Alert severity={severity} variant="filled">
          {message}
        </Alert>
      </Stack>
    </AlertContext.Provider>
  );
};
