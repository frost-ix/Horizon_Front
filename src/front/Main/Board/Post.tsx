import React, { useState, useEffect } from "react";
import './Post.css';
import axios, { AxiosResponse } from 'axios';

function Post() {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [imgName, setImgName] = useState<string>("사진 선택")

  const changeImg = (e:any)=>{
    setImgName(e.target.files[0].name);
  }

  const anonymousCheck = (e:any) => {
    setIsChecked(e.target.checked);
  };

  const posting = async (e:any) => {
    e.preventDefault();
    const form:any = e.currentTarget;
    const title:string = form.elements.title.value;
    const category:string = form.elements.category.value;
    const content:string = form.elements.content.value;
    const boardImageMetaData: Blob | null = form.elements.boardImageMetaData.files[0];

    console.log(title, category, content, boardImageMetaData, isChecked);

    const formData:any = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    // formData.append("write", write);
    formData.append("content", content);
    formData.append("boardImageMetaData", boardImageMetaData);
    
    // try {
    //   const response: AxiosResponse<any> = await axios.post('백엔드링크', formData, {
    //     headers: {'Content-Type': 'multipart/form-data'},})
    //   if(response.status === 200)
    //   {
    //     alert("게시물 작성 성공")
    //   }else{
    //     alert("게시물 작성 실패")
    //   }
    // } catch (error) {
    //   console.error('Error fetching data:', error);
    // } finally {
    //   // alert("실패!")
    // }

  }

  return (
    <div className="Post">
        <form onSubmit={posting} className='post-form'>
          <div className="post-bar">
            <p className="post-p">게시글 작성</p> <input type='submit' className='post-submit' value="등록"/>
          </div>

          <div className="post-bar">
            <select name="category" className='post-category'>
                <option value="hoseo">호서게시판</option>
                <option value="qna">QnA게시판</option>
                <option value="food">맛집게시판</option>
                <option value="department">학과게시판</option>
            </select>
            익명등록<input type="checkbox" name="anonymous" checked={isChecked} onChange={anonymousCheck} className="post-check" />
          </div>
            
          <input type='text' name="title" className='post-title' placeholder="제목" required/>
          <textarea name="content" className='post-content' placeholder="내용" required/>
          {/* <input type='file' className='post-file' name="boardImageMetaData"/> */}

          <div className="filebox"> 
            <label htmlFor="ex_file"><img src="/Icon/Photo.png" alt="" className="post-photoIcon" /> {imgName}</label> 
            <input type="file" id="ex_file" name="boardImageMetaData" onChange={changeImg}/> 
          </div>

        </form>
    </div>
  );
}

export default Post;
