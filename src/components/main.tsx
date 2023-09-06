import React from "react";
import Find from "./../pages/users/find";
import FindOne from "./../pages/users/findOne";
import DeleteUser from "../pages/users/delete";
import Update from "./../pages/users/update";
import Board from "./../pages/users/board"

export default function Main() {
  return (
    <div className="main">
      <p className="text-center text-2xl font-semibold">main</p>
      <Find />
      {/* <h3>FindOne</h3> */}
      <FindOne />
      <br />
      <h3>Delete</h3>
      <DeleteUser />
      <br />
      <h3>Update</h3>
      <Update />
      <br />
      <h3>Board</h3>
      <Board />
    </div>
  );
}
