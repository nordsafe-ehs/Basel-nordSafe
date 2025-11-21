import { createContext, Dispatch, SetStateAction, useContext } from "react";

interface TriggersContextProps {
  reloadTrigger: boolean;
  setReloadTrigger: Dispatch<SetStateAction<boolean>>;
}

export const TriggersContext = createContext<TriggersContextProps | undefined>(
  undefined
);

export const useTriggers = (): TriggersContextProps => {
  const context = useContext(TriggersContext);
  if (!context)
    throw new Error("useTriggers must be used within TriggersProvider");
  return context;
};
