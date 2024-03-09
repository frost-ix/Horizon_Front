import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LogoutButton.css';
import { LoginSessionDispatch } from '../../Redux/Login/ReduxLoginSessionDispatch';


function LogoutButton() {
  const navigate = useNavigate();

  const logoutSubmit = () => {
    LoginSessionDispatch(null,null);
    sessionStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate('/login');
  }

  return (
    <div className="LogoutButton">
      <button className='logoutButton' onClick={logoutSubmit}>로그아웃</button>
    </div>
  );
}

export default LogoutButton;