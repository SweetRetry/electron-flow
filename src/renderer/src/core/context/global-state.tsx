import { FinalConnectionState, XYPosition } from "@xyflow/react";
import { createContext, ReactNode, useContext, useState } from "react";

const GlobalStateContext = createContext<{
  connectionState: FinalConnectionState | null;
  setConnectionState: (connectionState: FinalConnectionState | null) => void;
  commandPosition: XYPosition | null;
  setCommandPosition: (position: XYPosition) => void;
}>({
  connectionState: null,
  setConnectionState: () => {},
  commandPosition: null,
  setCommandPosition: () => {},
});

export const GlobalStateProvider = ({ children }: { children: ReactNode }) => {
  const [connectionState, setConnectionState] = useState<FinalConnectionState | null>(null);
  const [commandPosition, setCommandPosition] = useState<XYPosition | null>(null);

  return (
    <GlobalStateContext.Provider
      value={{
        connectionState,
        setConnectionState,
        commandPosition,
        setCommandPosition,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error("useGlobalState must be used within a GlobalStateProvider");
  }
  return context;
};
