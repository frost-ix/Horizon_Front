import React from "react";

export default function FindOne() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetch("board/boardFind", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("조회에 실패했습니다.");
        }
      })
      .catch((error) => {
        console.error("조회에 실패했습니다.", error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      Find Board <br />
      <input className="mt-1 bg-blue-400 hover:bg-sky-400 rounded-md p-1.5" type="submit" value="전체 찾기" />
    </form>
  );
}
