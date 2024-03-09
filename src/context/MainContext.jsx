import React, { createContext, useState } from "react";
import runChat from "../Utils/Util";

const MainContext = createContext();

export const MainContextProvider = ({ children }) => {
  const [hide, setHide] = useState(false);
  const [res, setRes] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [recent, setRecent] = useState([]);
  const [history, setHistory] = useState([]);
  const [disabled, setDisabled] = useState(false);

  const send = async () => {
    setDisabled(true);
    setRecent((prevRecent) => [...prevRecent, { prompt, loading: true }]);
    setHistory((prevHistory) => [...prevHistory, prompt]);
    setHistory((his) => [...his].reverse());
    setHide(true);
    try {
      const response = await runChat(prompt);
      setRes((prevRes) => [...prevRes, response]);
      setRecent((prevRecent) =>
        prevRecent.map((item) =>
          item.prompt === prompt ? { ...item, loading: false } : item
        )
      );
    } catch (error) {
      console.log(error);
    } finally {
      setDisabled(false);
    }
  };

  return (
    <MainContext.Provider
      value={{ hide, prompt, res, send, setPrompt, recent, history, disabled }}
    >
      {children}
    </MainContext.Provider>
  );
};

export default MainContext;
