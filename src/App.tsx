// import logo from "./logo.svg";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Main from "./components/main";
import Header from "./components/header";
import Sidebar from "./components/sidebar";
import Footer from "./components/footer";

export default function App() {
  return (
    <div className="app font-sans h-screen w-screen">
      <div id="content" className="mt-5 flex flex-col h-screen">
        <div className="header">
          <Header />
        </div>
        <div id="main" className="mt-10">
          <div id="left">
            <Main />
          </div>
          <div id="right">
            <Sidebar />
          </div>
        </div>
        <div id="footer" className="bg-slate-100">
          <Footer />
        </div>
      </div>
    </div>
  );
}
