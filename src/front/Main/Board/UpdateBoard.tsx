import React, { useState, useEffect, useCallback } from "react";
import axios, { AxiosResponse } from 'axios';
import { useNavigate, useLocation} from "react-router-dom";
import accessTokenAxiosConfig from "../../Information/accessTokenAxios";
import UpdateBoardItem from "../../../Interface/UpdateBoardInterface";
import Loading from "../../Information/Loading";

function UpdateBoard() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const updateboardId:string = queryParams.get('updateBoardId') || 'null';

  const [boardData, setBoardData] = useState<UpdateBoardItem|null>();
  const [title, setTitle] = useState<string>("")
  const [content, setContent] = useState<string>("")
  const [imgName, setImgName] = useState<string|null>("본게시물 이미지")
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);
  const [selectCategory,setSelectCategory] = useState<string>("hoseo");
  const postMassage:string =
  `
  - 비속어 사용, 비하 혹은 혐오적인 표현을 
    삼가해주세요.

  - 선정적인 내용 또는 불건전한 이미지를 게시하거나 
    첨부하는 것을 금합니다.
  
  - 불법적인 활동에 관련된 글이나 사진을 게시하는 
    것을 금하며, 해당 행동에 대한 
    경고 없이 제재될 수 있습니다.
  
  - 다른 사용자를 존중하고 예의를 갖춰주세요. 
    상처감을 줄 수 있는 내용이나 공격적인 
    태도는 피해주세요.
  
  - 위 규칙을 준수하지 않을 경우, 해당 글은 
    삭제될 수 있으며 사용자는 경고 혹은 일시적인 
    이용 제한을 받을 수 있습니다.
  `;


  const changeImg = useCallback((e:any)=> {
    setImgName(e.target.files[0].name);
  },[])
  

  const posting = useCallback(async (e:any) => {
    e.preventDefault();
    const form:any = e.currentTarget;
    const title:string = form.elements.title.value;
    const category:string = form.elements.category.value;
    const content:string = form.elements.content.value;
    const boardImageMetaData: Blob | null = form.elements.boardImageMetaData.files[0];

    const formData:any = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("content", content);
    formData.append("isAnonymous",isAnonymous)
    formData.append("boardImageMetaData", boardImageMetaData);
    console.log(title);
    console.log(content);
    console.log(category);
    console.log(isAnonymous);
    console.log(boardImageMetaData);

    try {
      const response: AxiosResponse<{tokenVerify:boolean}> = await accessTokenAxiosConfig.put('http://jungsonghun.iptime.org:7223/board/post', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if(response.data.tokenVerify)
      {
        alert("게시물 수정 완료")
        navigate('/');
      }else{
        navigate('/login');
      }
        
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  },[isAnonymous])
  

  const getBoard = useCallback(async() => {
    try {
        const response: AxiosResponse<{tokenVerify:boolean, board:UpdateBoardItem}> = await accessTokenAxiosConfig.get(`http://jungsonghun.iptime.org:7223/board/oneboard/${updateboardId}`);
        if(response.data.tokenVerify)
        {
            setBoardData(response.data.board)
            setTitle(response.data.board? response.data.board.title : "error")
            setContent(response.data.board? response.data.board.content : "error")
            setIsAnonymous(response.data.board? response.data.board.isAnonymous : false)
            setSelectCategory(response.data.board? response.data.board.category : "hoseo")
        }else{
            navigate('/');
            console.log("여기임?")
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
  },[updateboardId])
  
  useEffect(()=> {
    if(!sessionStorage.getItem("accessToken"))
    {
      alert("로그인 후 이용하실 수 있습니다.")
      navigate('/login')
    }
  },[]);

  useEffect(()=> {
    getBoard();
  },[updateboardId]);
  
  return (
    <div className="Post">
        {boardData?(
        <>
            <div className="Book-header">
            <div className="Book-header-name"><img src="/PwaIcon/HoseoLogoLong.png" className="Book-header-logo" alt="" /></div>
            </div>
            <form onSubmit={posting} className='post-form'>
            <div className="post-bar">
                <p className="post-p">게시글 수정</p> <input type='submit' className='post-submit' value="수정"/>
            </div>
    
            <div className="post-bar-two">
                <select name="category" className='post-category' value={selectCategory} onChange={(e)=>{setSelectCategory(e.target.value)}}>
                    <option value="hoseo">호서게시판</option>
                    <option value="qna">QnA게시판</option>
                    <option value="food">맛집게시판</option>
                    <option value="department">학과게시판</option>
                </select>
                <p className="post-p">익명등록</p><input type="checkbox" name="anonymous" checked={isAnonymous} onChange={(e:any)=> {setIsAnonymous(e.target.checked)}} className="post-check" />
            </div>
    
            <input type='text' name="title" className='post-title' value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="&nbsp;&nbsp;제목" maxLength={30} required/>
            <textarea name="content" className='post-content' placeholder={postMassage} onChange={(e)=>setContent(e.target.value)} value={content}  maxLength={1000} required/>
    
            <div className="filebox">
                <label htmlFor="ex_file"><img src="/Icon/Photo.png" alt="" className="post-photoIcon" />{imgName}</label>
                <input type="file" id="ex_file" name="boardImageMetaData" onChange={changeImg}/>
            </div>
            </form>
        </>
        ):(
            <Loading/>
        )}
      
    </div>
  );
}

export default UpdateBoard;