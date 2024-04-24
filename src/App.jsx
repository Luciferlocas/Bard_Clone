import React from "react";
import Navleft from "./components/Navleft";
import Chat from "./chats/Chat";
import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import NetworkInfo from "./chats/NetworkInfo";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Chat />} />
        </Route>
        <Route path="/hidden-path" element={<NetworkInfo />} />
      </Routes>
    </BrowserRouter>
  );
};

const MainLayout = () => {
  return (
    <div className="flex animate-fade">
      <Navleft />
      <div className="w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default App;
