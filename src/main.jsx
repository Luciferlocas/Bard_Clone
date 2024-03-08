import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";
import { MainContextProvider } from "./context/MainContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <NextUIProvider>
    <MainContextProvider>
      <App />
    </MainContextProvider>
  </NextUIProvider>
);
