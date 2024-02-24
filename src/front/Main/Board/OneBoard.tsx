import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';
import BoardItem from "../../../Interface/BoardInterface";
import Comments from './Comments';
import Loading from '../../Information/Loading';
import report from '../../Information/Report';

import './OneBoard.css';

function OneBoard() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const[boardData, setBoardData] = useState<BoardItem | null>()
    const boardId:string = state ? state : 'null';

    const getBoardList = async () => {
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
      getBoardList()
    },[])

    const reportEvent = () => {
      report(boardId, "신고자이름")
    }


  return (
    <div className="OneBoard">
      {/* <button onClick={()=>{navigate(-1)}}>뒤로가기</button> */}
      {boardData? (
        <div className='oneboard-all'>
          <div className='oneboard-header'>
            <div className='oneboard-title'>{boardData.title}</div>
              <div className='oneboard-data'>
                {boardData.writer}
                <div className="oneboard-line">|</div> 추천 {boardData.likes}
                <div className="oneboard-line">|</div> 조회수 {boardData.hits}
              </div>
          </div>
          {boardData.boardImageMetadata? (
          <img className='oneboard-image' src={boardData.boardImageMetadata}/>
          ):(<></>)}
          <div className='oneboard-content'>
            {boardData.content}
          </div>
          <div className='oneboard-bar'>
            <button className='oneboard-bar-button'><img src="/Icon/Like.png" className="oneboard-bar-icon" alt="" />추천</button>
            <button className='oneboard-bar-button' onClick={reportEvent}><img src="/Icon/Report.png" className="oneboard-bar-icon" alt="" />신고</button>
            <button className='oneboard-bar-button'><img src="/Icon/Share.png" className="oneboard-bar-icon" alt="" />공유</button>
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
