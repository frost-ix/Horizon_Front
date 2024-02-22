import React, { useState, useEffect } from "react";
import axios, { AxiosResponse } from 'axios';
import './Comments.css';
import CommentsItem from "../../../Interface/CommentsInterface";
// import Loading from "../../Information/Loading";

function Comments({ boardId }: { boardId: any }) {
  const [comments, setComments] = useState<CommentsItem[] | null>();
  const [isChecked, setIsChecked] = useState<boolean>(true);

  const anonymousCheck = (e:any)=> {
    // setIsChecked(e.target.checked);
    setIsChecked(!isChecked)
  };

  const getComments = async () => {
    try {
      const response: AxiosResponse<{success: boolean, comments: CommentsItem[]}> = await axios.get(`http://jungsonghun.iptime.org:7223/board/comments/${boardId}`);
      if(response.data.success)
      {
        setComments(response.data.comments);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(()=>{
    getComments()
  },[])

  const commentMenu = (ID:any) => {
    var menu:any = document.getElementById(ID);
    if (menu.style.display == "none")
      {
        menu.style.display ="block";
      }else{
        menu.style.display ="none";
      }
    }

    const Commenting = async (e:any) => {
      e.preventDefault()
      const form:any = e.target;
      const content:String = form.elements.content.value
      const writer:String = "예비데이터"
      const isAnonymous:boolean = isChecked
      const commentData = {
        writer : writer,
        content : content,
        isAnonymous : isAnonymous,
        boardId : boardId
      }
      
      try {
        const response: AxiosResponse<{success: boolean, comments: CommentsItem[]}>
        = await axios.post(`http://jungsonghun.iptime.org:7223/board/comments/post`,commentData);

        if(response.data.success)
        {
          getComments()
        }else{
          alert("댓글등록 실패")
        }
      } catch (error) {
        alert("댓글등록 실패")
        // console.error('Error fetching data:', error);
      }
    }

  return (
    <div className="Comments">
      {comments? (
        comments.map((item) => (
          <div className="comment-tr" onClick={()=>commentMenu(item.commentNum+'comment')}>
              <div className="comment-tr-writer">{item.writer}</div>
              <div className="comment-tr-content">{item.content}</div>
              
            <div className="comment-tr-bottom">
                <div className="comment-tr-createAt">{/*{item.createAt.toString()}*/}10월23일 14:29</div>
                <div className="comment-like"><img src="/Icon/Like.png" className="comment-like-icon" alt="" /> {item.likes.toString()}</div>
            </div>

            <div className="comment-menubar" id={`${item.commentNum}comment`} >
              <div>신고버튼</div><div>댓글달기</div><div>추천</div>
            </div>

          </div>
        ))
      ):
      (
        <>댓글없음</>
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