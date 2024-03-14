import React, { useState, useEffect } from "react";
import { Link, useNavigate,Outlet } from 'react-router-dom';
import './css/Book.css';


function Book() {
  const navigate = useNavigate();

  useEffect(()=>{
    if(sessionStorage.getItem("accessToken"))
    {
    //   myDataAxios();
    }else{
      alert("로그인 후 이용하실 수 있습니다.")
      navigate('/login')
    }
  },[])

  return (
    <div className="Book">
        하 디자인 어떻게 해야할지도 모르겠다 띠방
    </div>
  );
}

export default Book;
