import React, { useState, useEffect } from "react";
import { useNavigate,useLocation } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';
import './css/BoardList.css';
import BoardListItem from "../../../Interface/BoardListItem";
import Loading from "../../Information/Loading";
import accessTokenAxiosConfig from "../../Information/accessTokenAxios";


function MyBoardnLikeList() {
  const navigate = useNavigate();
  const location = useLocation(); 
  const [boardList, setBoardList] = useState<BoardListItem[] | null>(null);
  const option = location.state? (location.state.option? location.state.option : "error") : "error";
  const [selectedCategory, setSelectedCategory] = useState<string|null>(option);

  const cateclick = (cate:string) => {
    if(sessionStorage.getItem("accessToken"))
    {
      setSelectedCategory(cate)
    }else{
      alert("로그인 후 이용하실 수 있습니다.")
      navigate('/login')
    }
  }

  const getMyBoardList = async () => {
    try {
      const response: AxiosResponse<{tokenVerify: boolean, boards: BoardListItem[]}> = await accessTokenAxiosConfig.get(`http://jungsonghun.iptime.org:7223/board/myboard`);
      if(response.data.tokenVerify)
      {
        setBoardList(response.data.boards);
      }else{
        navigate('/login');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const getMyLikeBoardList = async () => {
    try {
      const response: AxiosResponse<{tokenVerify: boolean, boards: BoardListItem[]}> = await accessTokenAxiosConfig.get(`http://jungsonghun.iptime.org:7223/board/mylikeboard`);
      if(response.data.tokenVerify)
      {
        setBoardList(response.data.boards);
      }else{
        navigate('/login');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(()=> {
    if(selectedCategory === "myboard"){
      getMyBoardList();
    }else if(selectedCategory === "mylike"){
      getMyLikeBoardList();
    }else{
      navigate('/')
    }

  },[selectedCategory]);

  const oneboard = (boardId:string)=> {
    if(sessionStorage.getItem("accessToken"))
    {
      navigate(`/oneboard?boardId=${boardId}`);
    }else{
      alert("로그인 후 이용하실 수 있습니다.")
      navigate('/login')
    }
  }

  return (
    <div className="BoardList">
      <div className="board-bar">
        <div className={`board-bar-list-myversion ${selectedCategory === 'myboard' ? 'select' : ''}`} onClick={() => cateclick('myboard')}>내 게시물</div><div className="barl">|</div>
        <div className={`board-bar-list-myversion ${selectedCategory === 'mylike' ? 'select' : ''}`} onClick={() => cateclick('mylike')}>좋아요 누른 게시물</div>
      </div>
      {boardList? (
        <div className='boardList-box'>
        <div className="board-table">
        {boardList.map((item) => (
          <div key={item._id} className='board-tr' onClick={()=>{oneboard(item._id)}}>
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
        </div>
        </div>
      ):(
        <Loading/>
      )}
    </div>
  );
}

export default MyBoardnLikeList;
