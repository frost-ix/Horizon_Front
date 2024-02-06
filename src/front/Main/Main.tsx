import React, { useState, useEffect } from "react";
import { Link, useNavigate,Outlet } from 'react-router-dom';
import './Main.css';

import BoardList from './Board/BoardList';

function Main() {
  const navigate = useNavigate();


  useEffect(()=> {
    navigate('/board?Category=hoseo')
  },[]);

  return (
    <div className="Main">
        
    </div>
  );
}

export default Main;
