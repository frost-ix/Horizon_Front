import React, { useState, useEffect } from "react";
import axios, { AxiosResponse } from 'axios';
import './css/Comments.css';
import CommentsItem from "../../../Interface/CommentsInterface";
import report from "../../Information/Report";
import CommentPostItem from "../../../Interface/CommentPostInterface";
import { useNavigate } from "react-router-dom";
import accessTokenAxiosConfig from "../../Information/accessTokenAxios";

function Comments({ boardId }: { boardId: any }) {
  const navigate = useNavigate();
  const [comments, setComments] = useState<CommentsItem[] | null>();
  const [isChecked, setIsChecked] = useState<boolean>(true);

  const anonymousCheck = (e:any)=> {
    // setIsChecked(e.target.checked);
    setIsChecked(!isChecked)
  };

  const getComments = async () => {
    try {
      const response: AxiosResponse<{tokenVerify: boolean, comments: CommentsItem[]}> = await accessTokenAxiosConfig.get(`http://jungsonghun.iptime.org:7223/board/comments/${boardId}`);
      if(response.data.tokenVerify)
      {
        setComments(response.data.comments);
      }else{
        navigate('/login');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(()=>{
    getComments()
  },[])

    const Commenting = async (e:any) => {
      e.preventDefault()
      const form:any = e.target;
      const content:String = form.elements.content.value
      const isAnonymous:boolean = isChecked
      const accessToken:String =  sessionStorage.getItem("accessToken") || "storageError"
      const commentData:CommentPostItem = {
        content : content,
        isAnonymous : isAnonymous,
        boardId : boardId,
        accessToken : accessToken
      }
      
      try {
        if(sessionStorage.getItem("accessToken"))
        {
          const response: AxiosResponse<{success: boolean, comments: CommentsItem[]}>
          = await axios.post(`http://jungsonghun.iptime.org:7223/board/comments/post`,commentData);
  
          if(response.data.success)
          {
            getComments()
          }else{
            alert("댓글등록 실패")
          }
        }else{
          navigate('/login')
        }
        
      } catch (error) {
        alert("댓글등록 실패")
        // console.error('Error fetching data:', error);
      }
    }

    const reportEvent = (id:any) => {
      report(id,"신고자이름")
    }

  return (
    <div className="Comments">
      {comments? (
        comments.map((item,index) => (
          <div className="comment-tr" key={index} >
              <div className="comment-tr-writer"><img src="./Icon/User.png" className="comment-userIcon" alt="" />
                {item.writer}
                <button className="comment-report" onClick={()=>{reportEvent(item.commentNum)}}>
                <img src="/Icon/Report.png" className="oneboard-bar-icon" alt="" />신고</button>
              </div>
              
              <div className="comment-tr-content">{item.content}</div>
              
            <div className="comment-tr-bottom">
                <div className="comment-tr-createAt">{item.createAt.toString().substring(0, 10)}</div>
                {/* <div className="comment-like"><img src="/Icon/Like.png" className="comment-like-icon" alt="" /> {item.likes.toString()}</div> */}
            </div>
            <div className="border80center"><div className="border80"></div></div>
          </div>
        ))
      ):
      (
       <div className="Comments-noComment">댓글이 존재하지 않습니다.</div>
      )}
      <div className="form-comment-div">
        <form onSubmit={Commenting} className="form-comment">
            <div className="input-comment-anonymous" onClick={anonymousCheck}>{isChecked ? '익명' : '실명'}</div>
            <input type="text" name="content" className="input-comment-text" placeholder="댓글을 입력해주세요."  required/>
            <button type="submit" className="input-comment-submit">등록</button>
        </form>
      </div>
    </div>
  );
}

export default Comments;