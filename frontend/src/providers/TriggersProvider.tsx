import { ReactNode, useState } from "react";
import { TriggersContext } from "../context/TriggersContext";

export const TriggersProvider = ({ children }: { children: ReactNode }) => {
  const [reloadTrigger, setReloadTrigger] = useState(false);

  return (
    <TriggersContext.Provider
      value={{
        reloadTrigger,
        setReloadTrigger,
      }}
    >
      {children}
    </TriggersContext.Provider>
  );
};
