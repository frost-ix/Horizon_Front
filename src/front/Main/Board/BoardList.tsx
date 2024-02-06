import React, { useState, useEffect } from "react";
import { useNavigate,useLocation } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';
import './BoardList.css';
import BoardListItem from "../../../Interface/BoardListItem";


function BoardList() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const Category = queryParams.get('Category');

  const navigate = useNavigate();
  const [boardList, setBoardList] = useState<BoardListItem[] | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string|null>(Category);

  const getBoardList = async () => {
    try {
      const response: AxiosResponse<{success: boolean, boards: BoardListItem[]}> = await axios.get(`http://jungsonghun.iptime.org:7223/board/list/${selectedCategory}`);
      if(response.data.success)
      {
        setBoardList(response.data.boards);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(()=> {
    getBoardList();
    // console.log(Category)
  },[selectedCategory]);
  
  const cateclick = (cate:string) => {
    navigate(`/board?Category=${cate}`)
    setSelectedCategory(cate)
  }

  const oneboard = (boardId:string)=> {
    navigate("/oneboard",{ state : boardId });
  }

  return (
    <div className="BoardList">
      <div className="board-bar">
        <div className={`board-bar-list ${selectedCategory === 'hoseo' ? 'select' : ''}`} onClick={() => cateclick('hoseo')}>호서게시판</div><div className="barl">|</div>
        <div className={`board-bar-list ${selectedCategory === 'qna' ? 'select' : ''}`} onClick={() => cateclick('qna')}>Q & A</div><div className="barl">|</div>
        <div className={`board-bar-list ${selectedCategory === 'food' ? 'select' : ''}`} onClick={() => cateclick('food')}>맛집</div><div className="barl">|</div>
        <div className={`board-bar-list ${selectedCategory === 'department' ? 'select' : ''}`} onClick={() => cateclick('department')}>학과별</div>
      </div>
      {boardList? (
        <div className='boardList-box'>
        <div className="board-table">
        {boardList.map((item) => (
          <div key={item._id} className='board-tr' onClick={()=>{oneboard(item._id)}}>
            <div className="board-tr-left">
              <div className='board-title'>{item.title}</div>
              <div className='board-data'>
                {item.writer}
                <div className="board-line">|</div> <span className="board-hit">조회수 {item.hits}</span>
                
                {/* <div className="board-line">|</div>  <>{item.createAt}</> */}
              </div>
            </div>
            <div className="board-tr-right">
                <span className="board-like"><img src="/Icon/Like.png" className="board-like-icon" alt="" /> {item.likes}</span>
                <span className="board-comment"><img src="/Icon/Comment.png" className="board-comment-icon" alt="" /> {item.likes}</span>
            </div>
          </div>
        ))}
        </div>
        </div>
      ):(
        <img src="/Icon/Loding.png" className="lodingIcon" alt="" />
      )}
    </div>
  );
}

export default BoardList;
