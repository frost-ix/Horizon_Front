import React, { useState, useEffect, useCallback , useMemo} from "react";
import { useNavigate,useLocation } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import './css/BoardList.css';
import './css/SearchBoard.css';
import BoardListItem from "../../../Interface/BoardListItem";
import Loading from "../../Information/Loading";
import accessTokenAxiosConfig from "../../Information/accessTokenAxios";


function SearchBoard(this: any) {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const sessionPage = Number(sessionStorage.getItem("searchBoardPage")) || 0; //세션에 저장되어있는 페이지
    const category = queryParams.get('Category') || "error"; //url로 받은 카테고리
    const [search,setSearch] = useState<String|null>(queryParams.get('Search')) //url로받은  검색어
    const [page, setPage] = useState<number>(sessionPage);
    const [isLoding, setIsLoding] = useState<boolean>(false);
    const [boardList, setBoardList] = useState<BoardListItem[]>([]);
    const placeValue = useMemo(() => {
      if (category === "hoseo") {
          return "호서게시판 " + search + " 검색결과";
      } else if (category === "qna") {
          return "QnA게시판 " + search + " 검색결과";
      } else if (category === "food") {
          return "맛집게시판 " + search + " 검색결과";
      } else if (category === "department") {
          return "학과게시판 " + search + " 검색결과";
      } else {
          return "error";
      }
  }, [category, search]);

    const oneboard = useCallback((boardId:string)=>{
      navigate(`/oneboard?boardId=${boardId}`);
      const toStr = String(page-1)
      sessionStorage.setItem("searchBoardPage", toStr)
    },[page])

      const getBoardList = useCallback(async()=>{
        try {
          const response: AxiosResponse<{tokenVerify: boolean, boards: BoardListItem[]}> = await accessTokenAxiosConfig.get(`http://jungsonghun.iptime.org:7223/searchBoard/${category}/${page}/${search}`);
          if(response.data.tokenVerify)
          {
            setBoardList(response.data.boards);
            setPage(page+1);
          }else{
            navigate('/login');
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      },[category, page, search])


      const getBoardListPaging = useCallback(async()=>{
        try {
          const response: AxiosResponse<{tokenVerify: boolean, boards: BoardListItem[]}> = await accessTokenAxiosConfig.get(`http://jungsonghun.iptime.org:7223/searchBoard/${category}/${page}/${search}`);
          if(response.data.tokenVerify)
          {
            setTimeout(() => {
              const Data = response.data.boards.map((item) => ({
                _id: item._id,
                commentNum: item.commentNum,
                writer:item.writer,
                title:item.title,
                createAt:item.createAt,
                likes:item.likes,
                hits:item.hits,
                content:item.content
              }));
              setBoardList((prevData) => [...prevData, ...Data]);
              setPage(page+1);
              setIsLoding(false);
            }, 300);
          }else{
            navigate('/login');
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      },[category, page, search])

    
        // useEffect(() => {
        //   const handleScroll = () => {
        //     const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        //     if (scrollTop + clientHeight >= scrollHeight - 5) {
        //       window.removeEventListener('scroll', handleScroll);
        //       setIsLoding(true);
        //       getBoardListPaging();
        //     }
        //   };
        //   window.addEventListener('scroll', handleScroll);
        //   return () => {
        //     window.removeEventListener('scroll', handleScroll);
        //   };
        // }, [boardList]);

        useEffect(()=> {
            getBoardList();
          },[]);

          const searchEvent = useCallback(async (e:any) => {
            e.preventDefault();
            const value = e.target.searchName.value ? e.target.searchName.value.replace(/\s+/g, '') : "";
            if (value === "") {
              alert("검색어를 입력해주세요.");
            } else {
              try {
                sessionStorage.setItem("searchBoardPage", "0");
                setSearch(e.target.searchName.value);
                setPage(0);
                navigate(`/searchBoard?Category=${category}&Search=${e.target.searchName.value}`);
                const response: AxiosResponse<{ tokenVerify: boolean, boards: BoardListItem[] }> = await accessTokenAxiosConfig.get(`http://jungsonghun.iptime.org:7223/searchBoard/${category}/0/${e.target.searchName.value}`);
                if (response.data.tokenVerify) {
                  setBoardList(response.data.boards);
                  setPage(1);
                } else {
                  navigate('/login');
                }
              } catch (error) {
                console.error('Error fetching data:', error);
              }
            }
          }, []);

  return (
    <div className="SearchBoard">
        <div className="Book-header">
          <div className="Book-header-name"><img src="/PwaIcon/HoseoLogoLong.png" className="Book-header-logo" alt=""/></div>
          <form onSubmit={searchEvent} className="Book-header-form">
            <input type="text" placeholder={placeValue} maxLength={30} name="searchName" className="Book-header-search" required/>   
            <button type="submit" className="Book-header-search-button"><img src="/Icon/Search.png" alt="" className="Book-header-searchIcon"/></button>
          </form>
        </div>
      {boardList.length > 0 ? (
        <div className='boardList-box'>
        <div className="board-table">
        {boardList.map((item, index) => (
          <div key={index} className='board-tr' onClick={()=>{oneboard(item._id)}}>
            <div className="board-tr-left">
              <div className='board-title'><img src="./Icon/User.png" className="board-userIcon" alt="" />{item.title}</div>
              <div className='board-content'>{item.content}</div>
              <div className='board-data'>
                {item.writer}
                <div className="board-line">|</div> <span className="board-hit">조회수 {item.hits}</span>
                <div className="board-line">|</div><>{item.createAt.toString().substring(5, 10)}</>
              </div>
            </div>
            <div className="board-tr-right">
                <span className="board-comment"><img src="/Icon/Comment.png" className="board-comment-icon" alt="" /> {item.commentNum}</span>
                <span className="board-like"><img src="/Icon/LikeRed.png" className="board-like-icon" alt="" /> {item.likes}</span>               
            </div>
          </div>
        ))}
        {/* <img src="/Icon/Loading.gif" className="BoardList-loding-icon" alt="" /> */}
        {isLoding?<div className="loading-container"><div className="loading"></div></div>:<div className="BottomArrowDiv" onClick={()=>{setIsLoding(true);getBoardListPaging();}}><img src="/Icon/BottomArrow.png" alt="" className="BottomArrow"/></div>}
        </div>
        </div>
      ):(
        <div className="SearchBoard-noBoard">게시물이 존재하지 않습니다.</div>
      )}
    </div>
  );
}

export default SearchBoard;
