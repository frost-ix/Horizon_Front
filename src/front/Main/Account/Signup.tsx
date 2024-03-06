import React, { useState , useRef , useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";

import './css/signup.css';

const Signup = () => {
  const navigate = useNavigate();
  
  const [isPassword, setPassword] = useState({
    password: "",
    password_check: "",
  });

  //빈칸 확인
  const [nullCheck, setnullCheck] = useState({
    id: "",
    password: "",
    name: "",
    studentId: null,
    phone: null,
    email: "",
    photo: null,
  });

  const [isWarning, setWarning] = useState({
    id: true,
    password: true,
    password_check: true,
    name: true,
    studentId: true,
    phone: true,
    email: true,
  });

  //focusing
  const id_ref = useRef<HTMLInputElement | null>(null);
  const password_ref = useRef<HTMLInputElement | null>(null);
  const password_check_ref = useRef<HTMLInputElement | null>(null);
  const name_ref = useRef<HTMLInputElement | null>(null);
  const studentId_ref = useRef<HTMLInputElement | null>(null);
  const phone_ref = useRef<HTMLInputElement | null>(null);
  const email_ref = useRef<HTMLInputElement | null>(null);

  //회원가입 슬라이드
  const [isSlideIndex, setSlideIndex] = useState(0);

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
  
  //Step Process Bar
  const [active1, setActive1] = useState("");
  const [active2, setActive2] = useState("");
  const [active3, setActive3] = useState("");
  const [active4, setActive4] = useState("");

  useEffect(() => {
    if(isSlideIndex==0){
      setActive1("active");
      setActive2("");
      setActive3("");
      setActive4("");
    }else if(isSlideIndex==1){
      setActive1("active");
      setActive2("active");
      setActive3("");
      setActive4("");
    }else if(isSlideIndex==2){
      setActive1("active");
      setActive2("active");
      setActive3("active");
      setActive4("");
    }else if(isSlideIndex==3){
      setActive1("active");
      setActive2("active");
      setActive3("active");
      setActive4("active");
    }

  },[isSlideIndex]);

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    const form = e.target;
    const id = form.elements.id.value;
    const password = form.elements.password.value;
    const password_check = form.elements.password_check.value;
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

    formData.forEach((value, key) => {
      console.log("key : " + key + " value : " + value);
    });

    //axios 파일 전송
    axios
      .post("/user/create", formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res.data);
        alert("회원가입 성공 하셨습니다!");
        //페이지 이동
        navigate('/Main');
      })
      .catch((err) => {
        console.log("err message : " + err);
        alert("회원가입 실패 하셨습니다!" + "\n" + "아이디와 비밀번호를 확인해주세요!");
      });
  };

  //다음 버튼 슬라이드
  const handleNext = () => {

    //첫 번째 슬라이드
    if(isSlideIndex==0){

      //빈 칸 확인
      if(nullCheck.id==""){
        setWarning((isWarning) => ({
          ...isWarning,
          id: false,
        }));
        id_ref.current?.focus();
        return;
      }else{
        setWarning((isWarning) => ({
          ...isWarning,
          id: true,
        }));
      }

      if(nullCheck.password==""){
        setWarning((isWarning) => ({
          ...isWarning,
          password: false,
        }));
        password_ref.current?.focus();
        return;
      }else{
        setWarning((isWarning) => ({
          ...isWarning,
          password: true,
        }));
      }

      //비밀번호 확인
      if(isPassword.password!==isPassword.password_check){
        setWarning((isWarning) => ({
          ...isWarning,
          password_check: false,
        }));
        password_check_ref.current?.focus();
        return;
      }else{
        setWarning((isWarning) => ({
          ...isWarning,
          password_check: true,
        }));
      }

    //두 번째 슬라이드
    }else if(isSlideIndex==1){

      //빈 칸 확인
      if(nullCheck.name==""){
        setWarning((isWarning) => ({
          ...isWarning,
          name: false,
        }));
        name_ref.current?.focus();
        return;
      }else{
        setWarning((isWarning) => ({
          ...isWarning,
          name: true,
        }));
      }

      //빈 칸 확인
      if(nullCheck.studentId==""||nullCheck.studentId==null){
        setWarning((isWarning) => ({
          ...isWarning,
          studentId: false,
        }));
        studentId_ref.current?.focus();
        return;
      }else{
        setWarning((isWarning) => ({
          ...isWarning,
          studentId: true,
        }));
      }
    //세 번째 슬라이드
    }else if(isSlideIndex==2){
      
      if(nullCheck.phone==""||nullCheck.phone==null){
        setWarning((isWarning) => ({
          ...isWarning,
          phone: false,
        }));
        phone_ref.current?.focus();
        return;
      }else{
        setWarning((isWarning) => ({
          ...isWarning,
          phone: true,
        }));
      }

      if(nullCheck.email==""){
        setWarning((isWarning) => ({
          ...isWarning,
          email: false,
        }));
        email_ref.current?.focus();
        return;
      }else{
        setWarning((isWarning) => ({
          ...isWarning,
          email: true,
        }));
      }

    }

    //슬라이드 이동
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

  //빈칸 확인용 
  const nullchk  = (e:any) => {
    setnullCheck({
      ...nullCheck,
      [e.target.name]: e.target.value,
    })
  }

  //패스워드 확인용
  const password = (e:any) => {
    setPassword({
      ...isPassword,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="phone">
      <h1>SIGN UP</h1>
      {/* Step Progress Bar */}
      <div className="barcontainer">
        <ul className="progressbar">
          <li className={active1}></li>
          <li className={active2}></li>
          <li className={active3}></li>
          <li className={active4}></li>
        </ul>
      </div>
      <form onSubmit={handleSubmit}>
      <div className='slide_wrap'>
        <div className='slide_box'>
          <div className='slide_list clearfix' ref={slideList}>
              <div className="form1 slide_content">
                <input type="text" name="id" className="input_text first" placeholder="아이디" onChange={nullchk} ref={id_ref} required />
                <p className='warning' style={{ display: isWarning.id ? 'none' : 'block'}}>아이디를 입력해주세요.</p>
                <br />
                <input type="password" name="password" className="input_text" placeholder="비밀번호" onChange={(e) => {password(e); nullchk(e);}} ref={password_ref} required />
                <p className='warning' style={{ display: isWarning.password ? 'none' : 'block'}}>비밀번호를 입력해주세요.</p>
                <br />
                <input type="password" name="password_check" className="input_text" placeholder="비밀번호 확인" onChange={(e) => {password(e); nullchk(e);}} ref={password_check_ref} required />
                <p className='warning' style={{ display: isWarning.password_check ? 'none' : 'block'}}>비밀번호가 일치하지 않습니다.</p>
                <br />
                <input type="button" className='next' onClick={handleNext} value="다음" />
              </div>
              <div className="form2 slide_content">
                <input type="text" name="name" className="input_text first" placeholder="이름" onChange={nullchk} ref={name_ref} required />
                <p className='warning' style={{ display: isWarning.name ? 'none' : 'block'}}>이름을 입력해주세요.</p>
                <br />
                <input type="number" name="studentId" className="input_text" placeholder="학번" onChange={nullchk} ref={studentId_ref} required />
                <p className='warning' style={{ display: isWarning.studentId ? 'none' : 'block'}}>학번을 입력해주세요.</p>
                <br />
                <input type="button" className='pre' onClick={handlePre} value="이전" />
                <input type="button" className='next' onClick={handleNext} value="다음" />
              </div>
              <div className="form3 slide_content">
                <input type="number" name="phone" className="input_text first" placeholder="전화번호" onChange={nullchk} ref={phone_ref} required />
                <p className='warning' style={{ display: isWarning.phone ? 'none' : 'block'}}>전화번호를 입력해주세요.</p>
                <br />
                <input type="text" name="email" className="input_text" placeholder="이메일" onChange={nullchk} ref={email_ref} required />
                <p className='warning' style={{ display: isWarning.email ? 'none' : 'block'}}>이메일을 입력해주세요.</p>
                <br />
                <input type="button" className='pre' onClick={handlePre} value="이전" />
                <input type="button" className='next'  onClick={handleNext} value="다음" />
              </div>
              <div className="form4 slide_content">
                <h2>재학생 인증 사진</h2>
                <img className='hems_img' src="/img/hems.png" alt="hems" />
                <br />
                예시 사진
                <br />
                <br></br>
                <input type="file" id='photo' name="photo" accept="image/*" className='photo' onChange={nullchk} required />
                <label htmlFor="photo">
                  <div className="btn-upload">사진 추가</div>
                </label>
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