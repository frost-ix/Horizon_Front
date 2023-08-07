import React from "react";
import InsertUser from "./../pages/users/insert";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <p className="text-2xl font-semibold mb-4">회원가입</p>
      <InsertUser />
      <br />
    </div>
  );
}
