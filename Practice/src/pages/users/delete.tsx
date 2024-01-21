import React from "react";

export default function DeleteUser() {
  const handleSubmit = (e: any) => {
    const form = e.currentTarget;
    const userId = form.elements.studentId.value;
    if (userId === "") {
      alert("삭제할 유저의 id를 입력해주세요.");
      return;
    } else {
      console.log(userId);

      fetch(`/user/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            console.log("삭제되었습니다.");
          } else {
            throw new Error("삭제에 실패했습니다.");
          }
        })
        .catch((error) => {
          console.error("삭제에 실패했습니다.", error);
        });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      삭제할 유저의 id를 입력하세요 <br />
      <input
        className="bg-gray-100 p-1 rounded-lg block placeholder:text-slate-400 focus:border-blue-400 focus:ring-blue-400 required"
        placeholder="아이디를 입력 해주세요"
        type="text"
        name="studentId"
      />
      <input className="mt-1 bg-blue-400 hover:bg-sky-400 rounded-md p-1.5" type="submit" value="삭제" />
    </form>
  );
}
