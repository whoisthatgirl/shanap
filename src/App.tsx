import React from "react";
import "./i18n";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import RestPassword from "./components/RestPassword";
import Login from "./components/Login";
import Registration from "./components/Registration";
import WelcomePage from "./components/Welcom";

const App: React.FC = () => {
  return (
    <>
  

      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/resetPassword" element={<RestPassword />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/registration" element={<Registration />} />

      </Routes>
    </>
  );
};

export default App;
