import React, { useState, useEffect } from "react";
import axios, { AxiosResponse } from 'axios';
import './Comments.css';
import CommentsItem from "../../../Interface/CommentsInterface";

function Comments({ boardId }: { boardId: any }) {
  const [comments, setComments] = useState<CommentsItem[] | null>();

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
    console.table(comments)
  },[])

  return (
    <div className="Comments">
      {comments? (
        comments.map((item) => (
          <div className="comment-tr">
            <div className="comment-tr-row">
              <div className="comment-tr-writer">{item.writer}</div>
               
            </div>
            <div className="comment-tr-content">{item.content}</div>
            <div className="comment-tr-createAt">{/*{item.createAt.toString()}*/}10월23일 14:29</div> 
          </div>
        ))
      ):
      (
        <></>
      )}
    </div>
  );
}

export default Comments;
