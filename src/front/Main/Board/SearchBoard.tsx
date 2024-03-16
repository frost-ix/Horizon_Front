import React, { useState, useEffect} from "react";
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
    const sessionPage = Number(sessionStorage.getItem("searchBoardPage")) || 0;
    const category = queryParams.get('Category') || "error";
    const [search,setSearch] = useState<String|null>(queryParams.get('Search'))
    const [page, setPage] = useState<number>(sessionPage);
    const [isLoding, setIsLoding] = useState<boolean>(false);
    const [boardList, setBoardList] = useState<BoardListItem[]>([]);
    const [searchName,setSearchName] = useState<String|null>(search);
    // const placeValue = category+" 카테고리 "+search+"검색 결과";
    const placeValue = (()=>{
        if(category === "hoseo"){
            return "호서게시판 "+search+" 검색결과"
        }else if(category === "qna"){
            return "QnA게시판 "+search+" 검색결과"
        }else if(category === "qna"){
            return "맛집게시판 "+search+" 검색결과"
        }else if(category === "qna"){
            return "학과게시판 "+search+" 검색결과"
        }else{
            return "error"
        }
    })();

    const oneboard = (boardId:string)=> {
        navigate(`/oneboard?BoardId=${boardId}`);
        const toStr = String(page-1)
        sessionStorage.setItem("searchBoardPage", toStr)
    }

    const getBoardList = async () => {
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
      };
    
      const getBoardListS = async () => {
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
      };
    
        useEffect(() => {
          const handleScroll = () => {
            const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
            if (scrollTop + clientHeight >= scrollHeight - 5) {
              window.removeEventListener('scroll', handleScroll);
              setIsLoding(true);
              getBoardListS();
            }
          };
          window.addEventListener('scroll', handleScroll);
          return () => {
            window.removeEventListener('scroll', handleScroll);
          };
        }, [boardList]);

        useEffect(()=> {
            getBoardList();
          },[]);

          const searchEvent = async (e:any) => {
            e.preventDefault();
            const value = searchName?searchName.replace(/\s+/g, '') : "";
            if(value === "")
            {
              alert("검색어를 입력해주세요.");
            }else{
              try {
                sessionStorage.setItem("searchBoardPage","0");
                setSearch(searchName);
                setPage(0);
                navigate(`/searchBoard?Category=${category}&Search=${searchName}`);
                const response: AxiosResponse<{tokenVerify: boolean, boards: BoardListItem[]}> = await accessTokenAxiosConfig.get(`http://jungsonghun.iptime.org:7223/searchBoard/${category}/0/${searchName}`);
                if(response.data.tokenVerify)
                {
                  setBoardList(response.data.boards);
                  setPage(1);
                }else{
                  navigate('/login');
                }
              } catch (error) {
                console.error('Error fetching data:', error);
              }
            }
          }

  return (
    <div className="SearchBoard">
      {page}
        <div className="Book-header">
          <div className="Book-header-name"><img src="/PwaIcon/HoseoLogoLong.png" className="Book-header-logo" alt="" onClick={()=>navigate('/')} /></div>
          <form onSubmit={searchEvent} className="Book-header-form">
            <input type="text" placeholder={placeValue} onChange={(e)=>setSearchName(e.target.value)}className="Book-header-search" required/>
            <img src="/Icon/Search.png" alt="" className="Book-header-searchIcon" onClick={searchEvent}/>
          </form>
        </div>
      {boardList? (
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
        {isLoding?<div className="loading-container"><div className="loading"></div></div>:<></>}
        </div>
        </div>
      ):(
        <Loading/>
      )}
    </div>
  );
}

export default SearchBoard;
