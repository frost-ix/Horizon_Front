import React from "react";
export default function UpdateUser() {
  const handleSubmit = (e: any) => {
    const form = e.currentTarget;
    const userId = form.elements.studentId.value;
    const name = form.elements.name.value;

    fetch(`/user/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("업데이트에 실패했습니다.");
        }
      })
      .then((updatedUser) => {
        console.log("사용자 정보가 업데이트되었습니다.", updatedUser);
      })
      .catch((error) => {
        console.error("업데이트에 실패했습니다.", error);
      });
  };
  return (
    <form onSubmit={handleSubmit}>
      수정할 유저의 id를 입력하세요
      <input
        className="bg-gray-100 p-1 rounded-lg block placeholder:text-slate-400 focus:border-blue-400 focus:ring-blue-400 required"
        placeholder="아이디를 입력 해주세요"
        type="text"
        name="studentId"
      />
      <br />
      수정할 이름을 작성해주세요 :
      <input
        className="bg-gray-100 p-1 rounded-lg block placeholder:text-slate-400 focus:border-blue-400 focus:ring-blue-400 required"
        placeholder="이름을 입력 해주세요"
        type="text"
        name="name"
      />
      <br />
      <input className="mt-1 bg-blue-400 hover:bg-sky-400 rounded-md p-1.5" type="submit" value="수정" />
    </form>
  );
}
