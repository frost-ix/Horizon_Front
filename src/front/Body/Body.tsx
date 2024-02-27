import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './Body.css';

import Main from '../Main/Main';
import Post from '../Main/Board/Post';
import OneBoard from '../Main/Board/OneBoard';
import BoardList from '../Main/Board/BoardList';

import Signup from '../Main/Account/Signup';
import Login from '../Main/Account/Login';

function Body() {
  return (
    <div className="Body">
            <Routes>
                <Route path='/' element={<Main/>}/>
                <Route path='/board' element={<BoardList/>}/>
                <Route path='/oneboard' element={<OneBoard/>}/>
                <Route path='/post' element={<Post/>}/>

                {/* <Route path='/myaccount' element={<Main/>}/> */}
                <Route path='/myaccount' element={<Signup/>}/>
                {/* <Route path='/myaccount' element={<Login/>}/> */}


                <Route path='/account' element={<Main/>}/>
                <Route path='/book' element={<Main/>}/>
            </Routes>
    </div>
  );
}

export default Body;
