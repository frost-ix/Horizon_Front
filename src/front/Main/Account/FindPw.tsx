import React, {useRef, useState, useEffect} from 'react';
import './css/FindPw.css';
import { useNavigate } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';

const Dashboard = () => {
  const userId = useRef<HTMLInputElement>(null);
  const [authNum, setAuthNum] = useState<number>();
  const [disabled, setDisabled] = useState(true);
  const inputAuthNum = useRef<HTMLInputElement>(null);
  const AuthButton = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  
  const emailSubmit = async (e:any) => {
    e.preventDefault();
    const form:any = e.currentTarget;
    const userId:string = form.elements.userId.value;
    const email:string = form.elements.email.value;

    const formData:any = new FormData();
    formData.append("userId", userId);
    formData.append("email", email);

    try {
      const response: AxiosResponse<any> = await axios.post('http://localhost:3100/user/email/', formData);
      if(response.status === 200){
        setDisabled(false);
        setAuthNum(response.data.authNum);
      }else{
        alert(response.data.message);
      }
      
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      // alert("불러오기 실패!")
    }
  }

  const checkNum = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    const inputNum = inputAuthNum.current?.value;
    if(inputNum == authNum && !disabled){
      alert("인증 성공");
      alert(userId.current?.value);
      navigate('/updatePw', {
        state: {
          userId: userId.current?.value,
        },
      });
    }
    else  
      alert("인증번호가 일치하지 않습니다.");
  }

  return (
    <div className='findId_box'>
      {/* <h1>비밀번호 찾기</h1> */}
      <form id="findForm" onSubmit={emailSubmit}>
        <div className='find_inputBox'>
          <input type="text" name="userId" ref={userId} placeholder="아이디" autoFocus required/>
        </div>
        <div className='find_inputBox'>
          <input type="email" name="email" placeholder="가입된 이메일" required/>
        </div>
        <input type="submit" value="인증번호 전송" />
      </form>
      <form id="findForm" method="POST" onSubmit={checkNum}>
        <div className="find_inputBox authBox" onSubmit={checkNum}>
          <input type="text" ref={inputAuthNum} placeholder='인증번호 입력' disabled={disabled} required/>
          <input type="submit" ref={AuthButton} value="인증" disabled={disabled}></input>
        </div>
      </form>
    </div>
  );
};

export default Dashboard;