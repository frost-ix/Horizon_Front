import React,{ useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import BoardListItem from '../../../Interface/BoardListItem';
import './css/Myaccount.css';
import accessTokenAxiosConfig from '../../Information/accessTokenAxios';
import MyDataItem from '../../../Interface/MyDataInterface';
import MyAccountItem from '../../../Interface/MyAccountInterface';

function Myaccount() {
  const navigate  = useNavigate()
  const [myAccount, setMyAccount] = useState<MyAccountItem | null>(null);

  const myDataAxios = async () => {
      try{
        const response: AxiosResponse<{tokenVerify: boolean, myData:MyDataItem }> = await accessTokenAxiosConfig.get(`http://jungsonghun.iptime.org:7223/dddd`);
        if(response.data.tokenVerify)
        {
          setMyAccount({
            userName:response.data.myData.userName,
            userEmail:response.data.myData.userEmail,
            userPhone:response.data.myData.userPhone,
            userDepartment:response.data.myData.userDepartment
          })
        }else{
          navigate('/login')
        }
      }catch(error){
        console.log("myAccount"+error);
      }
  }

  useEffect(()=>{
    if(sessionStorage.getItem("accessToken"))
    {
      myDataAxios();
    }else{
      alert("로그인 후 이용하실 수 있습니다.")
      navigate('/login')
    }
  },[])
  
  const LogoutSubmit = () => {
    sessionStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate('/login');
  }

  const ChangeSubmit  = () => {
    alert("페이지 이동 (개발중)")
  }
  
  return (
    <div className="Myaccount">

      <div className='Myaccoun-myData'>
        <div className='Myaccount-haeder'>계정 관리</div>
        <div className='Myaccoun-myData-div'>
          <div className='Myaccoun-myData-div-header'>이름(실명)</div>
          <div className='Myaccoun-myData-div-data'>{myAccount? myAccount.userName : "error"}</div>
          <div className='Myaccoun-myData-div-icon'></div>
        </div>
        <div className='Myaccoun-myData-div'>
          <div className='Myaccoun-myData-div-header'>학과</div>
          <div className='Myaccoun-myData-div-data'>{myAccount? myAccount.userDepartment : "error"}</div>
          <div className='Myaccoun-myData-div-icon'></div>
        </div>
        <div className='Myaccoun-myData-div' onClick={ChangeSubmit}>
          <div className='Myaccoun-myData-div-header'>전화번호</div>
          <div className='Myaccoun-myData-div-data'>{myAccount? myAccount.userPhone : "error"}</div>
          <img src="/Icon/RightArrow.png" className='Myaccoun-myData-div-icon' alt="" />
        </div>
        <div className='Myaccoun-myData-div' onClick={ChangeSubmit}>
          <div className='Myaccoun-myData-div-header'>이메일</div>
          <div className='Myaccoun-myData-div-data'>{myAccount? myAccount.userEmail : "error"}</div>
          <img src="/Icon/RightArrow.png" className='Myaccoun-myData-div-icon' alt="" />
        </div>
        <div className='Myaccoun-myData-div' onClick={()=>{navigate('/findpw')}}>
          <div className='Myaccoun-myData-div-header'>비밀번호</div>
          <div className='Myaccoun-myData-div-data'>************</div>
          <img src="/Icon/RightArrow.png" className='Myaccoun-myData-div-icon' alt="" />
        </div>
        <div className='Myaccoun-myData-div last' onClick={LogoutSubmit}>
          <div className='Myaccoun-myData-div-header'>로그아웃</div>
          <div className='Myaccoun-myData-div-data'></div>
          <img src="/Icon/RightArrow.png" className='Myaccoun-myData-div-icon' alt="" />
        </div>
      </div>

      <div className='Myaccoun-myData'>
        <div className='Myaccount-haeder'>
          게시물 관리
        </div>
        <div className='Myaccoun-myData-div' onClick={()=>{navigate('/myBoardnLikeList',{state:{option:"myboard"}})}}>
          <div className='Myaccoun-myData-div-header'>내 게시물</div>
          <div className='Myaccoun-myData-div-data'></div>
          <img src="/Icon/RightArrow.png" className='Myaccoun-myData-div-icon' alt="" />
        </div>
        <div className='Myaccoun-myData-div' onClick={()=>{navigate('/myBoardnLikeList',{state:{option:"mylike"}})}}>
          <div className='Myaccoun-myData-div-header'>좋아요 누른 게시물</div>
          <div className='Myaccoun-myData-div-data'></div>
          <img src="/Icon/RightArrow.png" className='Myaccoun-myData-div-icon' alt="" />
        </div>
        <div className='Myaccoun-myData-div last' onClick={ChangeSubmit}>
          <div className='Myaccoun-myData-div-header'>내 책방</div>
          <div className='Myaccoun-myData-div-data'></div>
          <img src="/Icon/RightArrow.png" className='Myaccoun-myData-div-icon' alt="" />
        </div>
      </div>

      <div className='Myaccoun-myData'>
        <div className='Myaccount-haeder'>
          고객지원
        </div>
        <div className='Myaccoun-myData-div' onClick={ChangeSubmit}>
          <div className='Myaccoun-myData-div-header'>공지사항 (보류)</div>
          <div className='Myaccoun-myData-div-data'></div>
          <img src="/Icon/RightArrow.png" className='Myaccoun-myData-div-icon' alt="" />
        </div>
        <div className='Myaccoun-myData-div' onClick={ChangeSubmit}>
          <div className='Myaccoun-myData-div-header'>자주묻는질문 (보류)</div>
          <div className='Myaccoun-myData-div-data'></div>
          <img src="/Icon/RightArrow.png" className='Myaccoun-myData-div-icon' alt="" />
        </div>
        <div className='Myaccoun-myData-div' onClick={ChangeSubmit}>
          <div className='Myaccoun-myData-div-header'>문의하기</div>
          <div className='Myaccoun-myData-div-data'></div>
          <img src="/Icon/RightArrow.png" className='Myaccoun-myData-div-icon' alt="" />
        </div>
        <div className='Myaccoun-myData-div last' onClick={ChangeSubmit}>
          <div className='Myaccoun-myData-div-header'>회원탈퇴</div>
          <div className='Myaccoun-myData-div-data'></div>
          <img src="/Icon/RightArrow.png" className='Myaccoun-myData-div-icon' alt="" />
        </div>
      </div>

    </div>
  );
}

export default Myaccount;
