import React from 'react';
import './css/Myaccount.css';
import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { RootState } from '../../../Redux/store';
import LogoutButton from '../../Information/LogoutButton';

function Myaccount() {
  const userImpormation = useSelector((state:RootState) => state.LoginSession);
  return (
    <div className="Myaccount">

      <div className='Myaccount-logoBar'>
        {/* <img src="./Icon/Account.png" alt="로고" className="Myaccount-logoBar-logoImg"/> */}
        <span className='Myaccount-logoBar-p'>Horizon Account</span>
      </div>

      <div className='Myaccount-myData'>
        <div className='Myaccount-div-header'>내정보</div>
        <div className='Myaccount-myData-data'>이름 : {userImpormation.userName}</div>
        <div className='Myaccount-myData-line'></div>
        <div className='Myaccount-myData-data'>아이디 : {userImpormation.userId}</div>
        <div className='Myaccount-myData-line'></div>
        <div className='Myaccount-myData-data'>전화번호 : 010-7223-2241</div>
        <div className='Myaccount-myData-line'></div>
        <div className='Myaccount-myData-data'>이메일 : h1jshmal1@naver.com</div>
        <div className='Myaccount-myData-line'></div>
        <div className='Myaccount-myData-data Myaccount-myData-data-bottom'>학과 : ICT융합보안</div>
      </div>

      <LogoutButton/>{/* css작업전  */}


    </div>
  );
}

export default Myaccount;
