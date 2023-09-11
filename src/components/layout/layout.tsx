import React from "react";
import Header from "./header";
import Main from "./main";
import Sidebar from "./sidebar";
import Footer from "./footer";

export default function Layout() {
  return (
    <div className="layout">
      <Header />
      <div className="contents">
        <Main />
        <Sidebar />
      </div>
      <Footer />
    </div>
  );
}
