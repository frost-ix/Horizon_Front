import React from "react";

export default function InsertUser() {
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const form = e.currentTarget;
    const id = form.elements.id.value;
    const password = form.elements.password.value;
    const name = form.elements.name.value;
    const studentId = form.elements.studentId.value;
    const phone = form.elements.phone.value;
    const email = form.elements.email.value;
    const photo = form.elements.photo.files[0]; // 선택된 파일 가져오기

    console.log(name, id, password, studentId, phone, email, photo);

    const formData = new FormData();
    formData.append("id", id);
    formData.append("password", password);
    formData.append("name", name);
    formData.append("studentId", studentId);
    formData.append("phone", phone);
    formData.append("email", email);
    formData.append("photo", photo); // 파일 추가
    
    try {
      const response = await fetch(`/image/signUp`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const updatedUser = await response.json();
        console.log("사용자 정보가 업데이트되었습니다.", updatedUser);
      } else {
        throw new Error("회원가입 실패했습니다.");
      }
    } catch (error) {
      console.error("업데이트에 실패했습니다.", error);
    }

    // fetch("/user/create", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ studentId, name, id, password }),
    // })
    //   .then((response) => {
    //     if (response.ok) {
    //       return response.json();
    //     } else {
    //       throw new Error("생성에 실패했습니다.");
    //     }
    //   })
    //   .then((createdUser) => {
    //     console.log("사용자가 생성되었습니다.", createdUser);
    //   })
    //   .catch((error) => {
    //     console.error("생성에 실패했습니다.", error);
    //   });
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
      <div className="textField mb-2">
        <label htmlFor="name" id="textField" className="block ml-2 mb-2 text-base font-medium text-gray-800">
          전화번호
        </label>
        <input
          className="bg-gray-100 p-1 rounded-lg w-full block placeholder:text-slate-400 focus:border-blue-400 focus:ring-blue-400 required"
          placeholder="전화번호를 입력 해주세요"
          type="number"
          name="phone"
        />
      </div>
      <div className="textField mb-2">
        <label htmlFor="name" id="textField" className="block ml-2 mb-2 text-base font-medium text-gray-800">
          이메일
        </label>
        <input
          className="bg-gray-100 p-1 rounded-lg w-full block placeholder:text-slate-400 focus:border-blue-400 focus:ring-blue-400 required"
          placeholder="이메일을 입력 해주세요"
          type="text"
          name="email"
        />
      </div>
      <div className="textField mb-2">
        <label htmlFor="name" id="textField" className="block ml-2 mb-2 text-base font-medium text-gray-800">
          HEMS 사진
        </label>
        <input
          className="bg-gray-100 p-1 rounded-lg w-full block placeholder:text-slate-400 focus:border-blue-400 focus:ring-blue-400 required"
          placeholder="이메일을 입력 해주세요"
          type="file"
          name="photo"
        />
      </div>
      <input className="float-left mt-1 bg-blue-400 hover:bg-sky-400 rounded-md p-1.5" type="submit" value="생성하기" />
      <br />
    </form>
  );
}
