import React from "react";

export default function InsertUser() {
  const handleSubmit = (e: any) => {
    e.preventDefault();

    const form = e.currentTarget;
    const studentId = form.elements.studentId.value;
    const name = form.elements.name.value;
    const id = form.elements.id.value;
    const password = form.elements.password.value;

    console.log(name, id, password, studentId);
    fetch("/user/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ studentId, name, id, password }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("생성에 실패했습니다.");
        }
      })
      .then((createdUser) => {
        console.log("사용자가 생성되었습니다.", createdUser);
      })
      .catch((error) => {
        console.error("생성에 실패했습니다.", error);
      });
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="textField mb-2">
        <label htmlFor="name" id="textField" className="block ml-2 mb-2 text-base font-medium text-gray-800">
          이름
        </label>
        <input
          className="bg-gray-100 p-1 rounded-lg w-full block placeholder:text-slate-400 focus:border-blue-400 focus:ring-blue-400 required"
          placeholder="이름을 입력 해주세요"
          type="text"
          name="name"
        />
      </div>
      <div className="textField mb-2">
        <label htmlFor="name" id="textField" className="block ml-2 mb-2 text-base font-medium text-gray-800">
          학번
        </label>
        <input
          className="bg-gray-100 p-1 rounded-lg w-full block placeholder:text-slate-400 focus:border-blue-400 focus:ring-blue-400 required"
          placeholder="학번을 입력 해주세요"
          type="number"
          name="studentId"
        />
      </div>
      <div className="textField mb-2">
        <label htmlFor="name" id="textField" className="block ml-2 mb-2 text-base font-medium text-gray-800">
          아이디
        </label>
        <input
          className="bg-gray-100 p-1 rounded-lg w-full block placeholder:text-slate-400 focus:border-blue-400 focus:ring-blue-400 required"
          placeholder="아이디를 입력 해주세요"
          type="text"
          name="id"
        />
      </div>
      <div className="textField mb-2">
        <label htmlFor="name" id="textField" className="block ml-2 mb-2 text-base font-medium text-gray-800">
          비밀번호
        </label>
        <input
          className="bg-gray-100 p-1 rounded-lg w-full block placeholder:text-slate-400 focus:border-blue-400 focus:ring-blue-400 required"
          placeholder="비밀번호를 입력 해주세요"
          type="password"
          name="password"
        />
      </div>
      <input className="float-left mt-1 bg-blue-400 hover:bg-sky-400 rounded-md p-1.5" type="submit" value="생성하기" />
      <br />
    </form>
  );
}
