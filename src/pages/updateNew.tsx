// import React from "react";
// export default function updateUser() {
//   return (
//     <div>
//       <form action="/user/update" method="PUT">
//         수정할 유저의 id를 입력하세요 : <input type="number" name="studentId" />
//         <br />
//         수정할 이름을 작성해주세요 : <input type="text" name="name" />
//         <br />
//         <input type="submit" value="sendd" />
//       </form>
//     </div>
//   );
// }

// import React from "react";
// export default function updateUser() {
//   return (
//     <div>
//       <form action="/user/update" method="POST">
//         수정할 유저의 id를 입력하세요 : <input type="number" name="studentId" />
//         <br />
//         수정할 이름을 작성해주세요 : <input type="text" name="name" />
//         <br />
//         <input type="submit" value="sendd" />
//       </form>
//     </div>
//   );
// }

import React from "react";

export default function UpdateUser() {
  const handleSubmit = (e:any) => {
    e.preventDefault();

    const form = e.target;
    const userId = form.elements.studentId.value;
    const name = form.elements.name.value;

    fetch(`/user/update/${userId}`, {
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
    <div>
      <form onSubmit={handleSubmit}>
        수정할 유저의 id를 입력하세요 :{" "}
        <input type="number" name="studentId" />
        <br />
        수정할 이름을 작성해주세요 : <input type="text" name="name" />
        <br />
        <input type="submit" value="send" />
      </form>
    </div>
  );
}