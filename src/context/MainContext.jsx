import React, { createContext, useState, useEffect } from "react";
import runChat from "../Utils/Util";

const MainContext = createContext();

export const MainContextProvider = ({ children }) => {
  const [hide, setHide] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [recent, setRecent] = useState([]);
  const [history, setHistory] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [show, setShow] = useState(false);
  const [chat, setChat] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("chatHistory");
    if (saved) {
      setHistory(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("chatHistory", JSON.stringify(history));
  }, [history]);

  const send = async () => {
    setShow(false);
    setDisabled(true);
    setRecent((prevRecent) => [
      ...prevRecent,
      { prompt, loading: true, res: null },
    ]);
    setHistory((prevHistory) => [...prevHistory, { prompt, res: null }]);
    setHistory((his) => [...his].reverse());
    setHide(true);
    try {
      const response = await runChat(prompt);
      setRecent((prevRecent) =>
        prevRecent.map((item) =>
          item.prompt === prompt
            ? { ...item, loading: false, res: response }
            : item
        )
      );
      setHistory((prevHistory) =>
        prevHistory.map((item) =>
          item.prompt === prompt ? { ...item, res: response } : item
        )
      );
    } catch (error) {
      console.log(error);
    } finally {
      setDisabled(false);
    }
  };

  const newChat = () => {
    setHide(false);
    setShow(false);
  };

  return (
    <MainContext.Provider
      value={{
        hide,
        prompt,
        send,
        setPrompt,
        recent,
        history,
        disabled,
        newChat,
        setShow,
        setChat,
        chat,
        show,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export default MainContext;
