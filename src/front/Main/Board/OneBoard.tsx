import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import ClipboardJS from 'clipboard';
import BoardItem from "../../../Interface/BoardInterface";
import Comments from './Comments';
import Loading from '../../Information/Loading';
import report from '../../Information/Report';
import Likes from '../../Information/Likes';
import accessTokenAxiosConfig from '../../Information/accessTokenAxios';
import './css/OneBoard.css';

function OneBoard() {
    const navigate = useNavigate();
    const[boardData, setBoardData] = useState<BoardItem | null>();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const boardId:string = queryParams.get('BoardId') || 'null';

    const getBoard = async () => {
      try {
        const response: AxiosResponse<{tokenVerify: boolean, board: BoardItem}> = await accessTokenAxiosConfig.get(`http://jungsonghun.iptime.org:7223/board/oneboard/${boardId}`);
        if(response.data.tokenVerify)
        {
          setBoardData(response.data.board);
        }else{
          navigate('/login');
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
      try{
        const response:any = await Likes(boardId)
        if(response)
        {
          alert("임시 좋아요알림")
          getBoard()
        }else{
          alert("임시 좋아요실패알림")
        }
      }catch(error){
        console.log("likeEvent"+error)
      }
      
    }

    const shareEvent = () => {
      const clipboard = new ClipboardJS('.oneboard-bar-button');
      clipboard.on('success', function(e) {
      alert("URL이 클립보드에 복사되었습니다.")
    });
    }
    
    const backEvent = () => {
      navigate(-1);
    }

  return (
    <div className="OneBoard">
          {boardData? (
        <div className='oneboard-all'>
          <div className='oneboard-navbar'>
            <img src="./Icon/LeftArrow.png" className='oneboard-navbar-backIcon' alt="뒤로가기" onClick={backEvent} />
            {/* <img src="./Icon/HorizonLogo.png" alt="" className='oneboard-navbar-logoIcon'/> */}
            <div className='oneboard-navbar-logoIcon'>게시물</div>
            {/* <img src="./Icon/Jumjumjum.png" alt="" className='oneboard-navbar-settingIcon'/> */}
            <div className='oneboard-navbar-settingIcon'></div>
          </div>

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
                  <span className="board-like"><img src="/Icon/LikeRed.png" className="board-like-icon" alt="" /> {boardData.likes}</span>               
            </div>

          {boardData.imageUrl? (
          <img className='oneboard-image' src={boardData.imageUrl}/>
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
