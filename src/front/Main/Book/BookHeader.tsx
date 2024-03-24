import { useCallback } from "react";
import { useNavigate } from 'react-router-dom';
import './css/BookHeader.css';


function BookHeader() {
  const navigate = useNavigate();

  const searchEvent = useCallback((e:any) => {
    e.preventDefault();
    console.log(e.target.searchName.value)
  },[])
  
  
  return (
        <div className="Book-header">
          <div className="Book-header-name"><img src="/PwaIcon/HoseoLogoLong.png" className="Book-header-logo" alt=""/></div>
          <form onSubmit={searchEvent} className="Book-header-form">
            <input type="text" placeholder="책이름 검색" maxLength={30} name="searchName" className="Book-header-search" required/>   
            <button type="submit" className="Book-header-search-button"><img src="/Icon/Search.png" alt="" className="Book-header-searchIcon"/></button>
          </form>
        </div>
  );
}

export default BookHeader;
