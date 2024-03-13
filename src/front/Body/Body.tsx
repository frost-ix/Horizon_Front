import React, { useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './Body.css';

import Main from '../Main/Main';
import Post from '../Main/Board/Post';
import OneBoard from '../Main/Board/OneBoard';
import BoardList from '../Main/Board/BoardList';
import MyBoardnLikeList from '../Main/Board/MyBoardnLikeList';

import Signup from '../Main/Account/Signup';
import Login from '../Main/Account/Login';
import Myaccount from '../Main/Account/Myaccount';

import refreshTokenAxiosConfig from '../Information/refreshTokenAxios';

function Body() {
  const navigate = useNavigate();
  const autoLogin = async () => {
    try{
      const respones: AxiosResponse<{tokenVerify:boolean, accessToken:string}> = await refreshTokenAxiosConfig.post(`http://jungsonghun.iptime.org:7223/user`)
      if(respones.data.tokenVerify)
      {
        sessionStorage.setItem("accessToken",respones.data.accessToken)
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
                <Route path='/MyBoardnLikeList' element={<MyBoardnLikeList/>}/>
                
                <Route path='/myaccount' element={<Myaccount/>}/>
                {/* <Route path='/myaccount' element={<Login/>}/> */}
                <Route path='/signup' element={<Signup/>}/>
                <Route path='/login' element={<Login/>}/>

                <Route path='/account' element={<Main/>}/>
                <Route path='/book' element={<Main/>}/>
            </Routes>
    </div>
  );
}

export default Body;
