import React from "react";
import Navleft from "./components/Navleft";
import Chat from "./chats/Chat";

const App = () => {
  return (
    <div className="flex animate-fade">
      <Navleft />
      <Chat />
    </div>
  );
};

export default App;
