import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./Login.css";
// import "./Login_origin.css";

// fontawesome 
import "https://kit.fontawesome.com/344577fb7a.js";

export default function Login() {
  /***
   * @description 현재 시간을 불러오는 구간
   * 1s 마다 갱신
   * @enum {number} year
   * @enum {number} month
   * @enum {number} date
   * @enum {string} today
   */
  const [locale, setLocale] = useState("");
  useEffect(() => {
    // const interval: NodeJS.Timer = setInterval(() => {
    /*** 제 환경에서는 에러나서 이렇게 해뒀어요 */
    const interval: NodeJS.Timeout = setInterval(() => {
      const year: number = new Date().getFullYear();
      const month: number = new Date().getMonth() + 1;
      const date: number = new Date().getDate();
      const today: string = year + "년 " + month + "월 " + date + "일";
      setLocale(today);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  /***
   * @description 로그인 비동기 처리 구간
   * @param {React.FormEvent<HTMLFormElement>} element
   * @returns {void} alert
   * @async connect server's router (await)
   */
  const handleLogin = async (element: React.FormEvent<HTMLFormElement>) => {
    element.preventDefault();
    const userID: string = element.currentTarget.userID.value;
    const userPW: string = element.currentTarget.userPW.value;
    console.log("userID : " + userID + "\n" + "userPW : " + userPW);
    // axios
    //   .post("http://localhost:3001/login", {
    //     userID: userID,
    //     userPW: userPW,
    //   })
    //   .then((res) => {
    //     alert("로그인 성공 하셨습니다!" + "\n" + "환영합니다!" );
    //   })
    //   .catch((err) => {
    //     alert("로그인 실패 하셨습니다!" + "\n" + "아이디와 비밀번호를 확인해주세요!");
    //   });
  };

  /*** 아이디 저장 체크 */
  const idSave = useRef<HTMLLabelElement>(null);
  const idSaveSpan = useRef<HTMLLabelElement>(null);

  const [idUrl, setIdUrl] = useState("img/check_before.svg");
  const setId = ({target} : {target:HTMLInputElement}) => {
    // alert(target.checked);
    const checkState: boolean = target.checked;
    if(checkState){
      setIdUrl('img/check_after.svg')
      idSaveSpan.current?.style.setProperty('font-weight', '700');
    }
    else{
      setIdUrl('img/check_before.svg');
      idSaveSpan.current?.style.setProperty('font-weight', '400');
    }
  }

  /*** 비밀번호 보기  */
  const viewPW = useRef<HTMLLabelElement>(null);
  const viewPWSpan = useRef<HTMLSpanElement>(null);
  const [pwUrl, setPwUrl] = useState("img/check_before.svg");
  const userPW = useRef<HTMLInputElement>(null);

  const setPw = ({target} : {target : HTMLInputElement}) => {
    // alert(target.checked);
    const checkState: boolean = target.checked;
    if(checkState){
      setPwUrl('img/check_after.svg')
      viewPWSpan.current?.style.setProperty('font-weight', '700');
      userPW.current?.setAttribute('type', 'text');
    }
    else{
      setPwUrl('img/check_before.svg');
      viewPWSpan.current?.style.setProperty('font-weight', '400');
      userPW.current?.setAttribute('type', 'password');
    }
  }

  return (
    <div className="loginBox">
      <h1>LOGIN</h1>
      <form id="loginForm" onSubmit={handleLogin}>
        <div id="locale">{locale}</div>
        <input type="text" name="userID" id="userID" placeholder="아이디" autoFocus/>
        <input type="password" name="userPW" id="userPW" ref={userPW} placeholder="비밀번호" />
        <label htmlFor="remember" id="label_box" ref={idSave} style={{backgroundImage: `url('${idUrl}')`}}>
          <span ref={idSaveSpan}>아이디 저장</span>
          {/* <input type="checkbox" id="remember" onChange={(e) => setSave(e)} />  */}
          <input type="checkbox" id="remember" style={{visibility: "hidden"}} onChange={(e) => setId(e)}/> 
        </label>
        <label htmlFor="viewPW" id="label_box" ref={viewPW} style={{backgroundImage: `url('${pwUrl}')`}}>
          <span ref={viewPWSpan}>비밀번호 보기</span>
          <input type="checkbox" id="viewPW" style={{visibility: "hidden"}} onChange={(e) => setPw(e)}/> 
        </label>
        <input type="submit" id="loginSubmit" value="로그인" />
      </form>
      <div id="a_box">
        <a href="#">
          아이디 찾기
        </a>
        <span>|</span>
        <a href="#">
          비밀번호 찾기
        </a>
        <span>|</span>
        <a href="/signIn" id="signIn">
          회원가입
        </a>
      </div>
    </div>
  );
}
