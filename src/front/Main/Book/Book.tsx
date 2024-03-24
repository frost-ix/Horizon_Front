import { useState, useEffect, useCallback } from "react";
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import './css/Book.css';
import BookSelectDepartment from "./BookSelectDepartment";
import BookHeader from "./BookHeader";
import BookList from "./BookList";


function Book() {
  const navigate = useNavigate();

  useEffect(()=>{
    if(!sessionStorage.getItem("accessToken"))
    {
      alert("로그인 후 이용하실 수 있습니다.")
      navigate('/login')
    }
  },[])

  return (
    <div className="Book">
      <BookHeader/>
      <Routes>
        <Route path='/' element={<BookSelectDepartment/>}/>
        <Route path='/booklist' element={<BookList/>}/>
      </Routes>
    </div>
  );
}

export default Book;
