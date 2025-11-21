import { createContext, useContext } from "react";

export type AlertType = "success" | "error";

interface AlertContextProps {
  showAlert: (message: React.ReactNode, severity?: AlertType) => void ;
  closeAlert: () => void;
}

export const AlertContext = createContext<AlertContextProps | undefined>(
  undefined
);

export const useAlert = (): AlertContextProps => {
  const context = useContext(AlertContext);
  if (!context) throw new Error("useAlert must be used within AlertProvider");
  
  return context;
};
