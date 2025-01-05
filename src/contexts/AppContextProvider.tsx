import React from "react";
import { FixedGetSolarsystemsResponse } from "@/api/stillness";
import {
  createSolarSystemsIndex,
  SolarSystemsIndex,
} from "@/tools/solarSystemsIndex";
import { AppContext } from "./AppContext";

interface AppContextProviderProps {
  children: React.ReactNode;
}

export const AppContextProvider: React.FC<AppContextProviderProps> = ({
  children,
}) => {
  const [solarSystems, setSolarSystemsIndex] =
    React.useState<SolarSystemsIndex>(createSolarSystemsIndex({}));

  const setSolarSystems = React.useCallback((data: FixedGetSolarsystemsResponse) => {
    const index = createSolarSystemsIndex(data);
    setSolarSystemsIndex(index);
  }, []);

  return (
    <AppContext.Provider value={{ solarSystems, setSolarSystems }}>
      {children}
    </AppContext.Provider>
  );
};
