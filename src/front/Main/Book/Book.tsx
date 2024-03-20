import { useState, useEffect, useCallback } from "react";
import { useNavigate } from 'react-router-dom';
import './css/Book.css';


function Book() {
  const navigate = useNavigate();

  useEffect(()=>{
    if(!sessionStorage.getItem("accessToken"))
    {
      alert("로그인 후 이용하실 수 있습니다.")
      navigate('/login')
    }
  },[])

  const searchEvent = useCallback((e:any) => {
    e.preventDefault();
    console.log(e.target.searchName.value)
  },[])
  

  const DepartmentEvent = useCallback((department:string) => {
    navigate(`/bookList?department=${department}`);
  },[])
  

  return (
    <div className="Book">
        <div className="Book-header">
          <div className="Book-header-name"><img src="/PwaIcon/HoseoLogoLong.png" className="Book-header-logo" alt=""/></div>
          <form onSubmit={searchEvent} className="Book-header-form">
            <input type="text" placeholder="책이름 검색" maxLength={30} name="searchName" className="Book-header-search" required/>   
            <button type="submit" className="Book-header-search-button"><img src="/Icon/Search.png" alt="" className="Book-header-searchIcon"/></button>
          </form>
        </div>

        <div className="Book-selectDepartment">

          <div className="Book-selectDepartment-div">
            <div className="Book-selectDepartment-div-department" onClick={()=>DepartmentEvent("ict")}>
              <img src="/Department/Ict.png" alt="" className="Book-selectDepartment-div-departmentIcon"/>
              <div className="Book-selectDepartment-div-department-name">ICT융합보안</div> 
            </div>
            <div className="Book-selectDepartment-div-department" onClick={()=>DepartmentEvent("design")}>
              <img src="/Department/Design.png" alt="" className="Book-selectDepartment-div-departmentIcon"/>
              <div className="Book-selectDepartment-div-department-name">공간건축디자인</div> 
            </div>
          </div>

          <div className="Book-selectDepartment-div">
            <div className="Book-selectDepartment-div-department" onClick={()=>DepartmentEvent("hotel1")}>
              <img src="/Department/Hotel1.png" alt="" className="Book-selectDepartment-div-departmentIcon"/>
              <div className="Book-selectDepartment-div-department-name">호텔조리</div> 
            </div>
            <div className="Book-selectDepartment-div-department" onClick={()=>DepartmentEvent("hotel2")}>
              <img src="/Department/Hotel2.png" alt="" className="Book-selectDepartment-div-departmentIcon"/>
              <div className="Book-selectDepartment-div-department-name">호텔제과제빵</div> 
            </div>
          </div>

          <div className="Book-selectDepartment-div">
            <div className="Book-selectDepartment-div-department" onClick={()=>DepartmentEvent("hotel3")}>
              <img src="/Department/Hotel3.png" alt="" className="Book-selectDepartment-div-departmentIcon"/>
              <div className="Book-selectDepartment-div-department-name">호텔식음료</div> 
            </div>
            <div className="Book-selectDepartment-div-department" onClick={()=>DepartmentEvent("game")}>
              <img src="/Department/Game.png" alt="" className="Book-selectDepartment-div-departmentIcon"/>
              <div className="Book-selectDepartment-div-department-name">게임</div> 
            </div>
          </div>

          <div className="Book-selectDepartment-div">
            <div className="Book-selectDepartment-div-department" onClick={()=>DepartmentEvent("webtoon")}>
              <img src="/Department/Webtoon.png" alt="" className="Book-selectDepartment-div-departmentIcon"/>
              <div className="Book-selectDepartment-div-department-name">웹툰애니메이션</div> 
            </div>
            <div className="Book-selectDepartment-div-department" onClick={()=>DepartmentEvent("beauty")}>
              <img src="/Department/Beauty.png" alt="" className="Book-selectDepartment-div-departmentIcon"/>
              <div className="Book-selectDepartment-div-department-name">뷰티아트</div> 
            </div>
          </div>

          <div className="Book-selectDepartment-div">
            <div className="Book-selectDepartment-div-department" onClick={()=>DepartmentEvent("animal1")}>
              <img src="/Department/Animal1.png" alt="" className="Book-selectDepartment-div-departmentIcon"/>
              <div className="Book-selectDepartment-div-department-name">반려동물</div> 
            </div>
            <div className="Book-selectDepartment-div-department" onClick={()=>DepartmentEvent("animal2")}>
              <img src="/Department/Animal2.png" alt="" className="Book-selectDepartment-div-departmentIcon"/>
              <div className="Book-selectDepartment-div-department-name">동물보건</div> 
            </div>
          </div>

        </div>
    </div>
  );
}

export default Book;
