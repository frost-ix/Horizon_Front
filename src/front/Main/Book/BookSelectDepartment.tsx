import { useCallback } from "react";
import { useNavigate, Link } from 'react-router-dom';
import './css/BookSelectDepartment.css';


function BookSelectDepartment() {
  const navigate = useNavigate();

  const DepartmentEvent = useCallback((department:string) => {
    navigate(`/book/bookList?department=${department}`);
  },[])
  

  return (
        <div className="Book-selectDepartment">

          <div className="Book-selectDepartment-div">
            <Link className="Book-selectDepartment-div-department" to="/book/bookList" state={{ department : "ict", name:"ICT 융합보안"}}>
              <img src="/Department/Ict.png" alt="" className="Book-selectDepartment-div-departmentIcon"/>
              <div className="Book-selectDepartment-div-department-name">ICT융합보안</div> 
            </Link>
            <Link className="Book-selectDepartment-div-department" to="/book/bookList" state={{ department : "degign", name:"공간건축디자인"}}>
              <img src="/Department/Design.png" alt="" className="Book-selectDepartment-div-departmentIcon"/>
              <div className="Book-selectDepartment-div-department-name">공간건축디자인</div> 
            </Link>
          </div>

          <div className="Book-selectDepartment-div">
            <Link className="Book-selectDepartment-div-department" to="/book/bookList" state={{ department : "hotel1", name:"호텔조리"}}>
              <img src="/Department/Hotel1.png" alt="" className="Book-selectDepartment-div-departmentIcon"/>
              <div className="Book-selectDepartment-div-department-name">호텔조리</div> 
            </Link>
            <Link className="Book-selectDepartment-div-department" to="/book/bookList" state={{ department : "hotel2", name:"호텔제과제빵"}}>
              <img src="/Department/Hotel2.png" alt="" className="Book-selectDepartment-div-departmentIcon"/>
              <div className="Book-selectDepartment-div-department-name">호텔제과제빵</div> 
            </Link>
          </div>

          <div className="Book-selectDepartment-div">
            <Link className="Book-selectDepartment-div-department" to="/book/bookList" state={{ department : "hotel3", name:"호텔식음료"}}>
              <img src="/Department/Hotel3.png" alt="" className="Book-selectDepartment-div-departmentIcon"/>
              <div className="Book-selectDepartment-div-department-name">호텔식음료</div> 
            </Link>            
            <Link className="Book-selectDepartment-div-department" to="/book/bookList" state={{ department : "game", name:"게임"}}>
              <img src="/Department/Game.png" alt="" className="Book-selectDepartment-div-departmentIcon"/>
              <div className="Book-selectDepartment-div-department-name">게임</div> 
            </Link>   
          </div>

          <div className="Book-selectDepartment-div">
            <Link className="Book-selectDepartment-div-department" to="/book/bookList" state={{ department : "webtoon", name:"웹툰애니메이션"}}>
              <img src="/Department/Webtoon.png" alt="" className="Book-selectDepartment-div-departmentIcon"/>
              <div className="Book-selectDepartment-div-department-name">웹툰애니메이션</div> 
            </Link>  
            <Link className="Book-selectDepartment-div-department" to="/book/bookList" state={{ department : "beauty", name:"뷰티아트"}}>
              <img src="/Department/Beauty.png" alt="" className="Book-selectDepartment-div-departmentIcon"/>
              <div className="Book-selectDepartment-div-department-name">뷰티아트</div> 
            </Link>  
          </div>

          <div className="Book-selectDepartment-div">
            <Link className="Book-selectDepartment-div-department" to="/book/bookList" state={{ department : "animal1", name:"반려동물"}}>
              <img src="/Department/Animal1.png" alt="" className="Book-selectDepartment-div-departmentIcon"/>
              <div className="Book-selectDepartment-div-department-name">반려동물</div> 
            </Link>  
            <Link className="Book-selectDepartment-div-department" to="/book/bookList" state={{ department : "animal2", name:"동물보건"}}>
              <img src="/Department/Animal2.png" alt="" className="Book-selectDepartment-div-departmentIcon"/>
              <div className="Book-selectDepartment-div-department-name">동물보건</div> 
            </Link>  
          </div>

        </div>
  );
}

export default BookSelectDepartment;
