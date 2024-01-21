import React from "react";

export default function signup() {
  const handleSubmit = async (e:any) => {
    e.preventDefault();

    const form = e.target;
    const id = form.elements.id.value;
    const password = form.elements.password.value;
    const name = form.elements.name.value;
    const studentId = form.elements.studentId.value;
    const phone = form.elements.phone.value;
    const email = form.elements.email.value;
    const photo = form.elements.photo.files[0]; // 선택된 파일 가져오기

    const formData = new FormData();
    formData.append("id", id);
    formData.append("password", password);
    formData.append("name", name);
    formData.append("studentId", studentId);
    formData.append("phone", phone);
    formData.append("email", email);
    formData.append("photo", photo); // 파일 추가

    try {
      const response = await fetch(`/signUp/signUp`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const updatedSignUp = await response.json();
        console.log("사용자 정보가 업데이트되었습니다.", updatedSignUp);
      } else {
        throw new Error("회원가입 실패했습니다.");
      }
    } catch (error) {
      console.error("업데이트에 실패했습니다.", error);
    }
  };

  return (
    <div className="app">
      <div>
        <form onSubmit={handleSubmit}>
          아이디:<input type="text" name="id" />
          <br />
          패스워드:<input type="text" name="password" />
          <br />
          이름:<input type="text" name="name" />
          <br />
          학번:<input type="number" name="studentId" />
          <br />
          전화번호:<input type="number" name="phone" />
          <br />
          이메일:<input type="text" name="email" />
          <br />
          재학생 인증 사진:<input type="file" name="photo" />
          <br />
          <input className="mt-1 bg-blue-400 hover:bg-sky-400 rounded-md p-1.5" type="submit" value="회원가입" />
        </form>
      </div>
    </div>
  );
}