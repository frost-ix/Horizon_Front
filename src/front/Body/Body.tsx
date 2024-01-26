import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './Body.css';

import Main from '../Main/Main';
import Post from '../Main/Board/Post';

function Body() {
  return (
    <div className="Body">
            <Routes>
                <Route path='/' element={<Main/>}/>
                <Route path='/post' element={<Post/>}/>
                <Route path='/account' element={<Main/>}/>
                <Route path='/book' element={<Main/>}/>
            </Routes>
    </div>
  );
}

export default Body;
