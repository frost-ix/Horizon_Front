import { useState, useEffect} from "react";
import { useNavigate,useLocation } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import './css/BoardList.css';
import BoardListItem from "../../../Interface/BoardListItem";
import Loading from "../../Information/Loading";
import accessTokenAxiosConfig from "../../Information/accessTokenAxios";


function BoardList() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const Category = queryParams.get('Category')||"hoseo";

  const navigate = useNavigate();
  const [boardList, setBoardList] = useState<BoardListItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string|null>(Category);
  const sessionPage:number = Number(sessionStorage.getItem("boardPage")) || 0;
  const [page, setPage] = useState<number>(sessionPage);
  const [isLoding, setIsLoding] = useState<boolean>(false);
  const [searchName,setSearchName] = useState<String|null>();

  const getBoardList = async () => {
    try {
      const response: AxiosResponse<{tokenVerify: boolean, boards: BoardListItem[]}> = await accessTokenAxiosConfig.get(`http://jungsonghun.iptime.org:7223/board/list/${selectedCategory}/${page}`);
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
      const response: AxiosResponse<{tokenVerify: boolean, boards: BoardListItem[]}> = await accessTokenAxiosConfig.get(`http://jungsonghun.iptime.org:7223/board/list/${selectedCategory}/${page}`);
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

  useEffect(()=> {
    getBoardList();
  },[selectedCategory]);
  
  const cateclick = (cate:string) => {
    navigate(`/board?Category=${cate}`);
    setSelectedCategory(cate);
    setPage(0);
  }

  const oneboard = (boardId:string)=> {
    navigate(`/oneboard?BoardId=${boardId}`);
    const toStr = String(page-1)
    sessionStorage.setItem("boardPage", toStr)
  }

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

    const search = (e:any) => {
      e.preventDefault();
      const value = searchName?searchName.replace(/\s+/g, '') : "";
      if(value === "")
      {
        alert("검색어를 입력해주세요.");
      }else{
        sessionStorage.setItem("searchBoardPage","0")
        navigate(`/searchBoard?Category=${selectedCategory}&Search=${searchName}`);
      }
    }

  return (
    <div className="BoardList">
      <div className="Book-header">
          <div className="Book-header-name"><img src="/PwaIcon/HoseoLogoLong.png" className="Book-header-logo" alt="" onClick={()=>navigate('/')}/></div>
          <form onSubmit={search} className="Book-header-form">
            <input type="text" placeholder="검색" onChange={(e)=>setSearchName(e.target.value)}className="Book-header-search" required/>
            <img src="/Icon/Search.png" alt="" className="Book-header-searchIcon" onClick={search}/>
          </form>
      </div>
      <div className="board-bar">
        <div className={`board-bar-list ${selectedCategory === 'hoseo' ? 'select' : ''}`} onClick={() => cateclick('hoseo')}>호서게시판</div><div className="barl">|</div>
        <div className={`board-bar-list ${selectedCategory === 'qna' ? 'select' : ''}`} onClick={() => cateclick('qna')}>Q & A</div><div className="barl">|</div>
        <div className={`board-bar-list ${selectedCategory === 'food' ? 'select' : ''}`} onClick={() => cateclick('food')}>맛집</div><div className="barl">|</div>
        <div className={`board-bar-list ${selectedCategory === 'department' ? 'select' : ''}`} onClick={() => cateclick('department')}>학과별</div>
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

export default BoardList;
