import React, { useState , useRef , useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './approval.css';


const Approval = () => {
  
  // 리스트 데이터
  const data = [
    { check: 0, id: 'hoseo123', name: '김호서', studentid: '2025201012', phone: '010-1234-5678', email: 'hoseo123@naver.com', photo: 'test1.jpg'},
    { check: 1, id: 'nohappy34', name: '노행복', studentid: '2025201031', phone: '010-1111-2222', email: 'nohappy34@gmail.com', photo: 'test2.png'},
    { check: 2, id: 'silverstar1101', name: '이은별', studentid: '2025202015', phone: '010-1101-1101', email: 'silverstar1101@naver.com', photo: 'test3.jpg'}
  ];
  
  //Modal
  const [isShow, setShow] = useState(false);
  const [isPhoto, setPhoto] = useState("");

  // 체크박스 선택
  const [checkItems, setCheckItems] = useState<any[]>([]);

  const handleSingleCheck = (checked : boolean, check : number) => {
    if (checked) {
      // 단일 선택 시 체크된 아이템을 배열에 추가
      setCheckItems(prev => [...prev, check]);
    } else {
      // 단일 선택 해제 시 체크된 아이템을 제외한 배열 (필터)
      setCheckItems(checkItems.filter((el) => el !== check));
    }
  };

  const handleAllCheck = (checked : boolean) => {
    if(checked) {
      // 전체 선택 클릭 시 데이터의 모든 아이템(id)를 담은 배열로 checkItems 상태 업데이트
      const idArray : any = [];
      data.forEach((el) => idArray.push(el.check));
      setCheckItems(idArray);
    }
    else {
      // 전체 선택 해제 시 checkItems 를 빈 배열로 상태 업데이트
      setCheckItems([]);
    }
  };

  const selectApproval = () => {
    if (window.confirm("회원가입 승인 하시겠습니까?")) {
      //alert("승인되었습니다.");
      if(checkItems){
        checkItems.forEach((checked) => {
          const account = data.find(el => el.check === checked);
          console.table(account);
        });
        alert("승인되었습니다.");
      }
    }
  };

  const selectDelete = () => {
    if (window.confirm("삭제 하시겠습니까?")) {
      if(checkItems){
        checkItems.forEach((checked) => {
          const account = data.find(el => el.check === checked);
          console.table(account);
        });
        alert("삭제되었습니다.");
      }
    }
  };

  const showPhoto = (photo: string) => {
     setPhoto(photo);
     setShow(true);
  };

  return (
    <div className="approval">
      <h1 className='title'>회원가입 승인</h1>
      <div className='list'>
        <div className='btn'>
          <button className='btn-approval'onClick={selectApproval}>승인</button>
          <button className='btn-delete' onClick={selectDelete}>삭제</button>
        </div>
        <table className='board-table'>
            <thead>
            <tr>
                <th className='th-check'><input type='checkbox' id='check' onChange={(e) => handleAllCheck(e.target.checked)}
                  // 데이터 개수와 체크된 아이템의 개수가 다를 경우 선택 해제 (하나라도 해제 시 선택 해제)
                  checked={checkItems.length === data.length ? true : false} /></th>
                <th className='th-id'>아이디</th>
                <th className='th-name'>이름</th>
                <th className='th-studentid'>학번</th>
                <th className='th-phone'>전화번호</th>
                <th className='th-email'>이메일</th>
                <th className='th-photo'>사진</th>
            </tr>
            </thead>
            <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td><input type='checkbox' id={`check-${index}`} name={`select-${item.check}`}
                  onChange={(e) => handleSingleCheck(e.target.checked, item.check)}
                  // 체크된 아이템 배열에 해당 아이템이 있을 경우 선택 활성화, 아닐 시 해제
                  checked={checkItems.includes(item.check)} /></td>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.studentid}</td>
                <td>{item.phone}</td>
                <td>{item.email}</td>
                <td><button onClick={(e) => showPhoto(item.photo)}>사진보기</button></td>
              </tr>
            ))}
            </tbody>
        </table>
      </div>
      {/* Modal */}
      {isShow == true ? 
        <div className='modal'>
          <button className='btn-x' onClick={() => setShow(false)}>닫기</button>
          <img src={`/img/${isPhoto}`} alt="" height="500px" width="700px"/>
        </div> 
        : null 
      }
      
      
    </div>
  );
}

export default  Approval;