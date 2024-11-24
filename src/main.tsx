import { createRoot } from 'react-dom/client'
import "./index.css"; 
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from './App.tsx'
import { useEffect } from 'react';
import i18n from './i18n.ts';
createRoot(document.getElementById("root")!).render(


  <BrowserRouter>
 
    <App />
  </BrowserRouter>
);
