import React from "react";
import Navleft from "./components/Navleft";
import Chat from "./chats/Chat";

const App = () => {
  return (
    <div className="flex">
      <Navleft />
      <Chat />
    </div>
  );
};

export default App;
