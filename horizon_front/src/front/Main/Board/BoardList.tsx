import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';
import './BoardList.css';
import BoardItem from "../../../Interface/BoardInterface";


function BoardList() {
  // const [boardData, setBoardData] = useState<BoardItem[] | null>(null)
  const [boardData, setBoardData] = useState<BoardItem[] | null>(
    [{
    num: 1,writer: '사용자1',title: '제목1',category: '카테고리1',
    content: '후 그냥 돈많은 백수로 살래',dateofCreate: new Date(),likes: 10,
    hits: 100,boardImageMetadata: { url: 'https://example.com/image1.jpg' }
  },{
    num: 1,writer: '사용자1',title: '제목1',category: '카테고리1',
    content: '후 그냥 돈많은 백수로 살래',dateofCreate: new Date(),likes: 10,
    hits: 100,boardImageMetadata: { url: 'https://example.com/image1.jpg' }
  },{
    num: 1,writer: '사용자1',title: '제목1',category: '카테고리1',
    content: '후 그냥 돈많은 백수로 살래',dateofCreate: new Date(),likes: 10,
    hits: 100,boardImageMetadata: { url: 'https://example.com/image1.jpg' }
  },{
    num: 1,writer: '사용자1',title: '제목1',category: '카테고리1',
    content: '후 그냥 돈많은 백수로 살래',dateofCreate: new Date(),likes: 10,
    hits: 100,boardImageMetadata: { url: 'https://example.com/image1.jpg' }
  },{
    num: 1,writer: '사용자1',title: '제목1',category: '카테고리1',
    content: '후 그냥 돈많은 백수로 살래',dateofCreate: new Date(),likes: 10,
    hits: 100,boardImageMetadata: { url: 'https://example.com/image1.jpg' }
  },{
    num: 1,writer: '사용자1',title: '제목1',category: '카테고리1',
    content: '후 그냥 돈많은 백수로 살래',dateofCreate: new Date(),likes: 10,
    hits: 100,boardImageMetadata: { url: 'https://example.com/image1.jpg' }
  },{
    num: 1,writer: '사용자1',title: '제목1',category: '카테고리1',
    content: '후 그냥 돈많은 백수로 살래',dateofCreate: new Date(),likes: 10,
    hits: 100,boardImageMetadata: { url: 'https://example.com/image1.jpg' }
  },{
    num: 1,writer: '사용자1',title: '제목1',category: '카테고리1',
    content: '후 그냥 돈많은 백수로 살래',dateofCreate: new Date(),likes: 10,
    hits: 100,boardImageMetadata: { url: 'https://example.com/image1.jpg' }
  },])

  useEffect(()=>{
    const fetchData = async () => {
      // await axios.get('백엔드링크')
      // .then((response:any)=>{setBoardData(response.data)})
      // .catch((error)=>{alert("불러오기 실패")})
      try {
        const response: AxiosResponse<BoardItem[] | null> = await axios.get('백엔드링크');
        if(response.status === 200)
        {
          setBoardData(response.data);
        }

      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        // alert("불러오기 실패!")
      }
    };

    fetchData();
  },[])


  return (
    <div className="BoardList">
                {boardData? (
                  <div className='BoardList-box'>
                  <p className='boardp'>테스트~ing</p>
                  <table className="boardtable">
                    <thead>
                      <tr className='boardtr'>
                        <th className='boardid'></th>
                        <th className='boardtitle'>제목</th>
                        <th className='boardusername'>작성자</th>
                        <th className='boardcontent'>글 내용</th>
                        <th className='boardusername'>좋아요</th>
                        <th className='boardusername'>조회수</th>
                      </tr>
                    </thead>
                    <tbody>
                  {boardData.map((item) => (
                    <tr key={item.num} className='boardtr'>
                      <td className='boardid2'>{item.num}</td>
                      <td className='boardtitle2'><Link to="/" state={{ boardId: item.num}}>{item.title}</Link></td>
                      <td className='boardusername2'>{item.writer}</td>
                      <td className='boardcontent'>{item.content}</td>
                      <td className='boardusername2'>{item.likes}</td>
                      <td className='boardusername2'>{item.hits}</td>
                    </tr>
                  ))}
                  </tbody>
                  </table>
                  </div>  
                ):(
                    <p>로딩중~~~</p>
                )}
    </div>
  );
}

export default BoardList;
