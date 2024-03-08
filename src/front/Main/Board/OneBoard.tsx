import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';
import ClipboardJS from 'clipboard';
import BoardItem from "../../../Interface/BoardInterface";
import Comments from './Comments';
import Loading from '../../Information/Loading';
import report from '../../Information/Report';
import Likes from '../../Information/Likes';

import './OneBoard.css';

function OneBoard() {
    const[boardData, setBoardData] = useState<BoardItem | null>()
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const boardId:string = queryParams.get('boardId') || 'null';

    const getBoard = async () => {
      try {
        const response: AxiosResponse<{success: boolean, board: BoardItem}> = await axios.get(`http://jungsonghun.iptime.org:7223/board/oneboard/${boardId}`);
        if(response.data.success)
        {
          setBoardData(response.data.board);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    useEffect(()=>{
      getBoard()
    },[])

    const reportEvent = () => {
      report(boardId, "신고자이름")
    }

    const LikesEvent = async () => {
      const response:any = await Likes(boardId, "좋아요누른사람이름")
      if(response)
      {
        alert("임시 좋아요알림")
        getBoard()
      }else{
        alert("임시 좋아요실패알림")
      }
    }

    const shareEvent = () => {
      const clipboard = new ClipboardJS('.oneboard-bar-button');
      clipboard.on('success', function(e) {
      alert("URL이 클립보드에 복사되었습니다.")
    });
    }

  return (
    <div className="OneBoard">
          {boardData? (
        <div className='oneboard-all'>
          <div className='oneboard-header'>
            <img src="./Icon/User.png" className="oneBoard-userIcon" alt="" />
            <div className='oneboard-data-div'>
              <div className='oneboard-writer'>{boardData.writer}</div>
              <div className='oneboard-data'>{boardData.createAt.toString().substring(0, 10)}</div>
            </div>
          </div>

          <div className='oneboard-content'>
            <div className='oneboard-title'>{boardData.title}</div>
            {boardData.content}
          </div>
          
          <div className="board-data-div-second">
                <span className="board-comment"><img src="/Icon/Comment.png" className="board-comment-icon" alt="" /> {boardData.commentNum}</span>
                <span className="board-like"><img src="/Icon/Like.png" className="board-like-icon" alt="" /> {boardData.likes}</span>               
          </div>

          {boardData.boardImageMetadata? (
          <img className='oneboard-image' src={boardData.boardImageMetadata}/>
          ):(<></>)}

          <div className='oneboard-bar'>
            <button className='oneboard-bar-button' onClick={LikesEvent}><img src="/Icon/Like.png" className="oneboard-bar-icon" alt="" />추천</button>
            <button className='oneboard-bar-button' onClick={reportEvent}><img src="/Icon/Report.png" className="oneboard-bar-icon" alt="" />신고</button>
            <button className='oneboard-bar-button' data-clipboard-text={window.location.href} onClick={shareEvent}><img src="/Icon/Share.png" className="oneboard-bar-icon" alt="" />공유</button>
          </div>
          <Comments boardId={boardId}/>
        </div>
        ):(
          <Loading/>
        )}
    </div>
  );
}

export default OneBoard;
