import React from "react";

export default function board() {
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const form = e.target;
    // JWT Token 사용
    const name = "guest";
    const header = form.elements.header.value;
    const category = form.elements.category.value;
    const content = form.elements.content.value;
    // const photo = form.files;
    const photo = form.elements.photo.files[0];

    console.log(photo);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("header", header);
    formData.append("category", category);
    formData.append("content", content);
    formData.append("photo", photo);

    try {
      const response = await fetch("/image/board", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        const insertBoard = await response.json();
        console.log("게시판 업로드 완료!", insertBoard);
      } else {
        throw new Error("게시판 업로드 실패");
      }
    } catch (error) {
      console.log("게시판 업로드 실패", error);
    }
  };

  return (
    <div className="app">
      <form onSubmit={handleSubmit}>
        제목 :{" "}
        <input
          className="bg-gray-100 p-1 rounded-lg block placeholder:text-slate-400 focus:border-blue-400 focus:ring-blue-400 required"
          type="text"
          name="header"
        />
        <br />
        카테고리 :{" "}
        <select id="category">
          <option value="option1">옵션 1</option>
          <option value="option2">옵션 2</option>
          <option value="option3">옵션 3</option>
          <option value="option4">옵션 4</option>
          <option value="option5">옵션 5</option>
        </select>
        <br />
        내용 :{" "}
        <input
          className="bg-gray-100 p-1 rounded-lg block placeholder:text-slate-400 focus:border-blue-400 focus:ring-blue-400 required"
          type="text-area"
          name="content"
        />
        {/*<br /><textarea name="content"/> */}
        <br />
        게시물에 첨부할 사진 : <input type="file" name="photo" />
        {/* <input type="file" accept='image/jpg,image/png,image/jpeg,image/heic' name="photo" /> */}
        <br />
        <input
          className="mt-1 bg-blue-400 hover:bg-sky-400 rounded-md p-1.5"
          type="submit"
          value="게시물 등록"
        />
      </form>
    </div>
  );
}
