import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';
import './BoardList.css';
import BoardItem from "../../../Interface/BoardInterface";


function BoardList() {
  const navigate = useNavigate();
  // const [boardData, setBoardData] = useState<BoardItem[] | null>(null)
  const [hoseo, setHoseo] = useState<boolean>(true);
  const [qna, setQna] = useState<boolean>(false);
  const [food, setFood] = useState<boolean>(false);
  const [department, setDepartment] = useState<boolean>(false);

  const [boardData, setBoardData] = useState<BoardItem[] | null>(
    [
      {
        num: 1, writer: '익명', title: '2학년때 배우는 과목이 뭔가요?',category: '질문',content: '첫 번째 게시물 내용입니다. 어쩌구 저쩌구...',
        dateofCreate: new Date(), likes: 0, hits: 28,boardImageMetadata: { url: 'https://example.com/image1.jpg' }
      },
      {
        num: 2,writer: '익명',title: '아무것도 하기가 싫네요', category: '카테고리1',
        content: '두 번째 게시물 내용입니다. 뭐라뭐라...',dateofCreate: new Date(),likes: 3,hits: 89,boardImageMetadata: { url: 'https://example.com/image2.jpg' }
      },
      {
        num: 3,writer: '익명',title: '집에 가고싶다',category: '카테고리1',content: '세 번째 게시물 내용입니다. 어쩌구... 뭐라고...',
        dateofCreate: new Date(),likes: 200,hits: 64,boardImageMetadata: { url: 'https://example.com/image3.jpg' }
      },
      {
        num: 4, writer: '익명', title: '2학년때 배우는 과목이 뭔가요?',category: '질문',content: '첫 번째 게시물 내용입니다. 어쩌구 저쩌구...',
        dateofCreate: new Date(), likes: 0, hits: 28,boardImageMetadata: { url: 'https://example.com/image1.jpg' }
      },
      {
        num: 5,writer: '익명',title: '아무것도 하기가 싫네요', category: '카테고리1',
        content: '두 번째 게시물 내용입니다. 뭐라뭐라...',dateofCreate: new Date(),likes: 3,hits: 89,boardImageMetadata: { url: 'https://example.com/image2.jpg' }
      },
      {
        num: 6,writer: '익명',title: '집에 가고싶다',category: '카테고리1',content: '세 번째 게시물 내용입니다. 어쩌구... 뭐라고...',
        dateofCreate: new Date(),likes: 200,hits: 64,boardImageMetadata: { url: 'https://example.com/image3.jpg' }
      },
      {
        num: 7, writer: '익명', title: '2학년때 배우는 과목이 뭔가요?',category: '질문',content: '첫 번째 게시물 내용입니다. 어쩌구 저쩌구...',
        dateofCreate: new Date(), likes: 0, hits: 28,boardImageMetadata: { url: 'https://example.com/image1.jpg' }
      },
      {
        num: 8,writer: '익명',title: '아무것도 하기가 싫네요', category: '카테고리1',
        content: '두 번째 게시물 내용입니다. 뭐라뭐라...',dateofCreate: new Date(),likes: 3,hits: 89,boardImageMetadata: { url: 'https://example.com/image2.jpg' }
      },
      {
        num: 9,writer: '익명',title: '집에 가고싶다',category: '카테고리1',content: '세 번째 게시물 내용입니다. 어쩌구... 뭐라고...',
        dateofCreate: new Date(),likes: 200,hits: 64,boardImageMetadata: { url: 'https://example.com/image3.jpg' }
      },
      {
        num: 10, writer: '익명', title: '2학년때 배우는 과목이 뭔가요?',category: '질문',content: '첫 번째 게시물 내용입니다. 어쩌구 저쩌구...',
        dateofCreate: new Date(), likes: 0, hits: 28,boardImageMetadata: { url: 'https://example.com/image1.jpg' }
      },
      {
        num: 12,writer: '익명',title: '아무것도 하기가 싫네요', category: '카테고리1',
        content: '두 번째 게시물 내용입니다. 뭐라뭐라...',dateofCreate: new Date(),likes: 3,hits: 89,boardImageMetadata: { url: 'https://example.com/image2.jpg' }
      },
      {
        num: 13,writer: '익명',title: '집에 가고싶다',category: '카테고리1',content: '세 번째 게시물 내용입니다. 어쩌구... 뭐라고...',
        dateofCreate: new Date(),likes: 200,hits: 64,boardImageMetadata: { url: 'https://example.com/image3.jpg' }
      },
      {
        num: 14, writer: '익명', title: '2학년때 배우는 과목이 뭔가요?',category: '질문',content: '첫 번째 게시물 내용입니다. 어쩌구 저쩌구...',
        dateofCreate: new Date(), likes: 0, hits: 28,boardImageMetadata: { url: 'https://example.com/image1.jpg' }
      },
      {
        num: 15,writer: '익명',title: '아무것도 하기가 싫네요', category: '카테고리1',
        content: '두 번째 게시물 내용입니다. 뭐라뭐라...',dateofCreate: new Date(),likes: 3,hits: 89,boardImageMetadata: { url: 'https://example.com/image2.jpg' }
      },


    ])

    // const boardfetchData = async () => { 
    //   try {
    //     const response: AxiosResponse<BoardItem[] | null> = await axios.get('백엔드링크');
    //     if(response.status === 200)
    //     {
    //       setBoardData(response.data);
    //     }

    //   } catch (error) {
    //     console.error('Error fetching data:', error);
    //   } finally {
    //     // alert("불러오기 실패!")
    //   }
    // };

  // useEffect(()=>{
  //   boardfetchData();
  // },[])


  const hoseoClick = () => {
    setHoseo(true);setFood(false);setQna(false);setDepartment(false);
  }
  const foodClick = () => {
    setHoseo(false);setFood(true);setQna(false);setDepartment(false);
  }
  const qnaClick = () => {
    setHoseo(false);setFood(false);setQna(true);setDepartment(false);
  }
  const departmentClick = () => {
    setHoseo(false);setFood(false);setQna(false);setDepartment(true);
  }

  const oneboard = (boardNum:number)=>{
    navigate("/oneboard",{ state : boardNum });
  }

  return (
    <div className="BoardList">
                <div className="board-bar">
                  <div className={`board-bar-list ${hoseo ? 'select' : ''}`} onClick={hoseoClick}>호서게시판</div><div className="barl">|</div>
                  <div className={`board-bar-list ${qna ? 'select' : ''}`} onClick={qnaClick}>Q & A</div><div className="barl">|</div>
                  <div className={`board-bar-list ${food ? 'select' : ''}`} onClick={foodClick}>맛집</div><div className="barl">|</div>
                  <div className={`board-bar-list ${department ? 'select' : ''}`} onClick={departmentClick}>학과별</div>
                </div>
                {boardData? (
                  <div className='boardList-box'>
                  <div className="board-table">
                  {boardData.map((item) => (
                    <div key={item.num} className='board-tr' onClick={()=>{oneboard(item.num)}}>
                      <div className='board-title'>{item.title}</div>
                      {/* <div className="board-data-div"> */}
                        <div className='board-data'>
                          {item.writer} 
                          <div className="board-line">|</div> 추천 {item.likes} 
                          <div className="board-line">|</div> 조회수 {item.hits}
                          {/* <div className="board-line">|</div> {item.dateofCreate.toString()} */}
                        </div>
                      {/* </div> */}
                    </div>
                  ))}
                  </div>
                  </div>  
                ):(
                    <p>로딩중~~~</p>
                )}
    </div>
  );
}

export default BoardList;
