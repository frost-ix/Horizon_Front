import React from 'react';
import './css/Myaccount.css';
import { Link } from 'react-router-dom';

function Myaccount() {
  return (
    <div className="Myaccount">
      <div className='Myaccount-logoBar'>
        <img src="./Icon/Account.png" alt="로고" className="Myaccount-logoBar-logoImg"/>
        <span className='Myaccount-logoBar-p'>내 계정</span>
      </div>
      <div className='Myaccount-myData'>
        
      </div>
    </div>
  );
}

export default Myaccount;
