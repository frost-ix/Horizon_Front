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
      찾을 유저의 학번을 입력하세요
      <input
        className="bg-gray-100 p-1 rounded-lg block placeholder:text-slate-400 focus:border-blue-400 focus:ring-blue-400 required"
        placeholder="헉번을 입력 해주세요"
        type="text"
        name="studentId"
      />
      <input className="mt-1 bg-blue-400 hover:bg-sky-400 rounded-md p-1.5" type="submit" value="한명 찾기" />
    </form>
  );
}
