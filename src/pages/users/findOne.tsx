import React from "react";
export default function FindData() {
  const handleSubmit = (e: any) => {
    const form = e.currentTarget;
    const userId = form.elements.studentId.value;

    fetch(`/user/find/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("찾기에 실패했습니다.");
        }
      })
      .then((findUser) => {
        console.log("사용자 정보가 조회되었습니다.", findUser);
      })
      .catch((error) => {
        console.error("조회에 실패했습니다.", error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      찾을 유저의 id를 입력하세요
      <input
        className="bg-gray-100 p-1 rounded-lg block placeholder:text-slate-400 focus:border-blue-400 focus:ring-blue-400 required"
        placeholder="아이디를 입력 해주세요"
        type="text"
        name="studentId"
      />
    </form>
  );
}
