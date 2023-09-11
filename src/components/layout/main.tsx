import React, { useState } from "react";
import Find from "../../pages/users/find";
import FindOne from "../../pages/users/findOne";
import DeleteUser from "../../pages/users/delete";
import Update from "../../pages/users/update";
import Board from "../../pages/users/board";
import BoardFind from "../../pages/users/boardFind";

export default function Main() {
  const [activeComp, setActiveComp] = useState("");

  /***
   * Buttons Component List
   * 1. 계정 전체 조회
   * 2. 계정 단일 조회
   * 3. 계정 삭제
   * 4. 계정 이름 변경
   * 5. 게시판
   * 6. 게시판 탐색
   */
  const buttons = [
    { label: "1", name: "전체 조회", component: () => <Find /> },
    { label: "2", name: "단일 조회", component: () => <FindOne /> },
    { label: "3", name: "계정 삭제", component: () => <DeleteUser /> },
    { label: "4", name: "이름 변경", component: () => <Update /> },
    { label: "5", name: "게시판", component: () => <Board /> },
    { label: "6", name: "게시판 탐색", component: () => <BoardFind /> },
  ];

  const handleClick = (button: any) => {
    setActiveComp(button.component);
  };

  return (
    <div className="text-center">
      {buttons.map((button) => (
        <button key={button.label} onClick={() => handleClick(button)}>
          <div className="mr-4 font-semibold">{button.name}</div>
        </button>
      ))}
      {activeComp}
    </div>
  );
}
