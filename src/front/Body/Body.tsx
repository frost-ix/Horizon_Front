import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './Body.css';

import Main from '../Main/Main';
import Post from '../Main/Board/Post';
import OneBoard from '../Main/Board/OneBoard';
import BoardList from '../Main/Board/BoardList';

import Signup from '../Main/Account/Signup';

function Body() {
  return (
    <div className="Body">
            <Routes>
                <Route path='/' element={<Main/>}/>
                <Route path='/board' element={<BoardList/>}/>
                <Route path='/oneboard' element={<OneBoard/>}/>
                <Route path='/post' element={<Post/>}/>

                <Route path='/myaccount' element={<Signup/>}/>
                
                <Route path='/account' element={<Main/>}/>
                <Route path='/book' element={<Main/>}/>
            </Routes>
    </div>
  );
}

export default Body;
