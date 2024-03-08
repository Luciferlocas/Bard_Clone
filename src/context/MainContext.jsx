import React, { createContext, useState } from "react";
import runChat from "../utils/Util";

const MainContext = createContext();

export const MainContextProvider = ({ children }) => {
  const sent = async () => await runChat("What is react?");

  sent();
  return <MainContext.Provider value={{}}>{children}</MainContext.Provider>;
};

export default MainContext;
