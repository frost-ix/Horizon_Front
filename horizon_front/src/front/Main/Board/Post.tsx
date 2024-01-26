import React from 'react';
import './Post.css';
import axios, { AxiosResponse } from 'axios';

function Post() {
  const posting = async (e:any) => {
    e.preventDefault();
    const form:any = e.currentTarget;
    const title:string = form.elements.title.value;
    const category:string = form.elements.category.value;
    const write:string = form.elements.write.value;
    const content:string = form.elements.content.value;
    const boardImageMetaData:Blob|null = form.elements.boardImageMetaData.files[0]; 

    console.log(title, category, write, content, boardImageMetaData);

    const formData:any = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("write", write);
    formData.append("content", content);
    formData.append("boardImageMetaData", boardImageMetaData);
    
    try {
      const response: AxiosResponse<any> = await axios.post('백엔드링크', formData);
      if(response.status === 200)
      {
        alert("게시물 작성 성공")
      }else{
        alert("게시물 작성 실패")
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      // alert("실패!")
    }

  }

  return (
    <div className="Post">
        <form onSubmit={posting}>
          제목:<input type='text' name="title"/><br />
          카테고리:<input type='text' name="category"/><br />
          작성자:<input type='text' name="write"/><br />
          내용:<input type='text' name="content"/><br />
          사진:<input type='file' name="boardImageMetaData"/><br />
          <input type='submit' value="글쓰기"/>
        </form>
    </div>
  );
}

export default Post;
