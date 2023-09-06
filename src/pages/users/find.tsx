import React from "react";

export default function FindOne() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetch("/user/find", {
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
      .then((findUser) => {
        console.log("사용자 정보가 조회되었습니다.", findUser);
      })
      .catch((error) => {
        console.error("조회에 실패했습니다.", error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      Find User <br />
      <input className="mt-1 bg-blue-400 hover:bg-sky-400 rounded-md p-1.5" type="submit" value="전체 찾기" />
      
    </form>
  );
}
