import React, { useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './Body.css';
import { LoginSessionDispatch } from '../../Redux/Login/ReduxLoginSessionDispatch'

import Main from '../Main/Main';
import Post from '../Main/Board/Post';
import OneBoard from '../Main/Board/OneBoard';
import BoardList from '../Main/Board/BoardList';

import Signup from '../Main/Account/Signup';
import Login from '../Main/Account/Login';
import Myaccount from '../Main/Account/Myaccount';

function Body() {
  const navigate = useNavigate();
  const autoLogin = async () => {
    try{
      const respones: AxiosResponse<any> = await axios
      .post(`http://jungsonghun.iptime.org:7223/user`,{"refreshToken" : localStorage.getItem("refreshToken")})
      if(respones.data.success)
      {
        sessionStorage.setItem("accessToken",respones.data.accessToken)
        LoginSessionDispatch("정송훈","wjdthdgns1")
      }else{
        navigate('/login')
      }
    }
    catch (error) {
      console.error('autoLoginError', error);
    }
  }

  useEffect(()=>{
    if(localStorage.getItem("refreshToken"))
    {
      autoLogin()
    }else{
      navigate('/login')
    }
  },[])

  return (
    <div className="Body">
            <Routes>
                <Route path='/' element={<Main/>}/>
                <Route path='/board' element={<BoardList/>}/>
                <Route path='/oneboard' element={<OneBoard/>}/>
                <Route path='/post' element={<Post/>}/>
                
                {/* <Route path='/myaccount' element={<Myaccount/>}/> */}
                <Route path='/myaccount' element={<Login/>}/>
                <Route path='/signup' element={<Signup/>}/>
                <Route path='/login' element={<Login/>}/>

                <Route path='/account' element={<Main/>}/>
                <Route path='/book' element={<Main/>}/>
            </Routes>
    </div>
  );
}

export default Body;
