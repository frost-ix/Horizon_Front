import React from 'react';
import './css/Myaccount.css';
import { Link } from 'react-router-dom';

function Myaccount() {
  return (
    <div className="Myaccount">
      <div className='account-bar'>
        <Link to="/" className='account-bar-link'>계정관리</Link>
      </div>
    </div>
  );
}

export default Myaccount;
