import React, { useState , useRef , useEffect } from 'react';

import './signup.css';

const Signup = () => {
  
  //회원가입 슬라이드
  const [isSlideIndex, setSlideIndex] = useState(0);

  const form1 = useRef<HTMLInputElement | null>(null);
  const form2 = useRef<HTMLInputElement | null>(null);
  const form3 = useRef<HTMLInputElement | null>(null);
  const form4 = useRef<HTMLInputElement | null>(null);

  const slideList = useRef<HTMLInputElement | null>(null);

  const slideLen = 4;  // slide length
  const slideWidth = 400; // slide width
  const slideSpeed = 400; // slide speed
  
  useEffect(() => {
    
    //슬라이드 초기 위치 세팅
    if(slideList.current){
      slideList.current.style.width = slideWidth * (slideLen) + "px";
      slideList.current.style.transform = "translate3d(-" + (slideWidth * (isSlideIndex)) + "px, 0px, 0px)";
    }
  },[]);

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    const form = e.target;
    const id : String = form.elements.id.value;
    const password : String = form.elements.password.value;
    const password_check : String = form.elements.password_check.value;
    const name : String = form.elements.name.value;
    const studentId : Number = form.elements.studentId.value;
    const phone : Number = form.elements.phone.value;
    const email : String = form.elements.email.value;
    const photo : File = form.elements.photo.files[0]; // 선택된 파일 가져오기

    //비밀번호 확인
    if(password==password_check){
        console.log("ID : " + id + "password : " + password + "name : " + name + "studentID : " + studentId + "phone : " + phone + "email : " + email + "photo : " + photo);
    }

    // const formData = new FormData();
    // formData.append("id", id);
    // formData.append("password", password);
    // formData.append("name", name);
    // formData.append("studentId", studentId);
    // formData.append("phone", phone);
    // formData.append("email", email);
    // formData.append("photo", photo); // 파일 추가

    // try {
    //   const response = await fetch(`/signUp/signUp`, {
    //     method: "POST",
    //     body: formData,
    //   });

    //   if (response.ok) {
    //     const updatedSignUp = await response.json();
    //     console.log("사용자 정보가 업데이트되었습니다.", updatedSignUp);
    //   } else {
    //     throw new Error("회원가입 실패했습니다.");
    //   }
    // } catch (error) {
    //   console.error("업데이트에 실패했습니다.", error);
    // }
  };

  //다음 버튼 슬라이드
  const handleNext = () => {
    setSlideIndex(isSlideIndex+1);
    if(slideList.current){
      slideList.current.style.transition = slideSpeed + "ms";
      slideList.current.style.transform = "translate3d(-" + (slideWidth * (isSlideIndex + 1)) + "px, 0px, 0px)";
    }
  }

  //이전 버튼 슬라이드
  const handlePre = () => {
    setSlideIndex(isSlideIndex-1);
    if(slideList.current){
      slideList.current.style.transition = slideSpeed + "ms";
      slideList.current.style.transform = "translate3d(-" + (slideWidth * (isSlideIndex - 1)) + "px, 0px, 0px)";
    }
  }

  return (
    <div className="phone ">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
      <div className='slide_wrap'>
        <div className='slide_box'>
          <div className='slide_list clearfix' ref={slideList}>
            
              <div className="form1 slide_content" ref={form1}>
                {/* Step Progress Bar */}
                <div className="barcontainer">
                  <ul className="progressbar">
                    <li className="active"></li>
                    <li></li>
                    <li></li>
                    <li></li>
                  </ul>
                </div>
                <input type="text" name="id" className="input_text" placeholder="아이디" required />
                <br />
                <input type="password" name="password" className="input_text" placeholder="비밀번호" required />
                <br />
                <input type="password" name="password_check" className="input_text" placeholder="비밀번호 확인" required />
                <br />
                <input type="button" className='next' onClick={handleNext} value="다음" />
              </div>
              <div className="form2 slide_content" ref={form2}>
                {/* Step Progress Bar */}
                <div className="barcontainer">
                  <ul className="progressbar">
                    <li className="active"></li>
                    <li className="active"></li>
                    <li></li>
                    <li></li>
                  </ul>
                </div>
                <input type="text" name="name" className="input_text" placeholder="이름" required />
                <br />
                <input type="number" name="studentId" className="input_text" placeholder="학번" required />
                <br />
                <input type="button" className='pre' onClick={handlePre} value="이전" />
                <input type="button" className='next' onClick={handleNext} value="다음" />
              </div>
              <div className="form3 slide_content" ref={form3}>
                {/* Step Progress Bar */}
                <div className="barcontainer">
                  <ul className="progressbar">
                    <li className="active"></li>
                    <li className="active"></li>
                    <li className="active"></li>
                    <li></li>
                  </ul>
                </div>
                <input type="number" name="phone" className="input_text" placeholder="전화번호" required />
                <br />
                <input type="text" name="email" className="input_text" placeholder="이메일" required />
                <br />
                <input type="button" className='pre' onClick={handlePre} value="이전" />
                <input type="button" className='next'  onClick={handleNext} value="다음" />
              </div>
              <div className="form4 slide_content" ref={form4}>
                {/* Step Progress Bar */}
                <div className="barcontainer">
                  <ul className="progressbar">
                    <li className="active"></li>
                    <li className="active"></li>
                    <li className="active"></li>
                    <li className="active"></li>
                  </ul>
                </div>
                재학생 인증 사진:<input type="file" name="photo" />
                <br />
                <input type="button" className='pre' onClick={handlePre} value="이전" />
                <input className="submit_btn" type="submit" value="회원가입" />
              </div>
            
          </div>
        </div>
      </div>
      </form>
    </div>
  );
}

export default  Signup;