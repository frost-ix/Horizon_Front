import React, { useState , useRef , useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './manager.css';
import Sign from '../Signup';
import Approval from './Approval';

const Manager = () => {
  
  const navigate = useNavigate();
  
  const [isPage, setPage] = useState(1);

  const goSite = () => {
    navigate('/Main');
  }

  return (
    <div className="manager">
      <aside className="side-bar">
        <section className="side-bar__icon-box">
          <section className="side-bar__icon-1">
            <div></div>
            <div></div>
            <div></div>
          </section>
        </section>
        <ul>
          <li onClick={goSite}>
            <i className="fa-solid fa-cat"></i>사이트 바로가기
          </li>
          <li>
            사이트 관리
            <ul>
              <li onClick={() => setPage(1)}>대시보드</li>
            </ul>
          </li>
          <li>
            게시판 관리
            <ul>
              <li onClick={() => setPage(3)}>최신글</li>
              <li onClick={() => setPage(4)}>자유 게시판</li>
              <li onClick={() => setPage(5)}>중고책 거래</li>
            </ul>
          </li>
          <li onClick={() => setPage(2)}>유저 관리</li>
          <li onClick={() => setPage(6)}>
            공지글 작성
          </li>
          <li>
            고객지원
            <ul>
              <li onClick={() => setPage(7)}>회원가입 승인</li>
              <li onClick={() => setPage(8)}>문의사항</li>
              <li onClick={() => setPage(9)}>신고 유저</li>
              <li onClick={() => setPage(10)}>신고 댓글 관리</li>
            </ul>
          </li>
        </ul>
      </aside>
      <div className='page'>
        {isPage === 1 && 
          <div className='page1'>
            <Sign></Sign>
          </div>
        }
        {isPage === 2 && 
          <div className='page2'>
            <h1>유저 관리</h1>
          </div>
          }
          {isPage === 3 && 
          <div className='page3'>
            <h1>최신글</h1>
          </div>
          }
          {isPage === 4 && 
          <div className='page4'>
            <h1>자유 게시판</h1>
          </div>
          }
          {isPage === 5 && 
          <div className='page5'>
            <h1>중고책 거래</h1>
          </div>
          }
          {isPage === 6 && 
          <div className='page6'>
            <h1>공지글 작성</h1>
          </div>
          }
          {isPage === 7 && 
          <div className='page7'>
            <Approval />
          </div>
          }
          {isPage === 8 && 
          <div className='page8'>
            <h1>문의사항</h1>
          </div>
          }
          {isPage === 9 && 
          <div className='page9'>
            <h1>신고 유저</h1>
          </div>
          }
          {isPage === 10 && 
          <div className='page10'>
            <h1>신고 댓글 관리</h1>
          </div>
          }
      </div>
    </div>
  );
}

export default  Manager;