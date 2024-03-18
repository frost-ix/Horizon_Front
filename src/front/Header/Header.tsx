import React, { useState } from 'react';
import './Header.css';
import { useNavigate } from "react-router-dom";

function Header() {
    const navigate = useNavigate();
    const [displayLine, setDisplayLine] = useState<boolean>(false);
    const [pos, setPost] = useState<boolean>(false);
    const [boo, setBook] = useState<boolean>(false);
    const [hom, setHome] = useState<boolean>(true);
    const [acc, setAcc] = useState<boolean>(false);

    const displayBarClick = () => {
        setDisplayLine(!displayLine);
    };

    const AccountClick = () => {
        navigate('/myaccount')
        // alert("기능 준비 중")
        sessionStorage.setItem("boardPage","0");
        sessionStorage.setItem("searchBoardPage","0");
        setAcc(true);setBook(false);setHome(false);setPost(false);
    };

    const PostClick = () => {
        navigate('/post')
        sessionStorage.setItem("boardPage","0");
        sessionStorage.setItem("searchBoardPage","0");
        setAcc(false);setBook(false);setHome(false);setPost(true)
    };

    const MainClick = () => {
        navigate('/board?Category=hoseo')
        sessionStorage.setItem("boardPage","0");
        sessionStorage.setItem("searchBoardPage","0");
        setAcc(false);setBook(false);setHome(true);setPost(false)
    };

    const BookClick = () => {
        navigate('/book')
        sessionStorage.setItem("boardPage","0");
        sessionStorage.setItem("searchBoardPage","0");
        setAcc(false);setBook(true);setHome(false);setPost(false)
    };
    
    const SearchClick = () => {
        // navigate('/search')
        alert("기능 준비 중")
    };

    return (
        <div className="Header">
            <div className='Header-icons'>
                <img src="/Icon/DisplayLine.png" className='displayLineIcon' onClick={displayBarClick} alt="icon"/>{/* 컴퓨터 */}
                {/* <img src="/Icon/Search.png"  className='Header-icon' onClick={SearchClick} alt="icon"/> */}
                <img src="/Icon/Book.png"  className={`Header-icon ${boo ? 'visible':''}`} onClick={BookClick} alt="icon"/>
                <img src="/Icon/Home.png"  className={`Header-icon ${hom ? 'visible':''}`} onClick={MainClick} alt="icon"/>
                <img src="/Icon/Post.png"  className={`Header-icon ${pos ? 'visible':''}`} onClick={PostClick} alt="icon"/>
                <img src="/Icon/Account.png"  className={`Header-icon ${acc ? 'visible':''}`} onClick={AccountClick} alt="icon"/>
            </div>

            {/* 컴퓨터 */}
            <div className={`displayBar ${displayLine ? 'visible' : ''}`}>
                <div className='displayBar-menu-first'>
                  <img src="/Icon/DisplayLine.png" className='displayLineIcon' onClick={displayBarClick} alt="icon"/>
                </div>

                <div className='iwantCenter'>
                    <div className='displayBar-menu-border' />
                </div>

                <div className='displayBar-menu-second'>
                    
                </div>
            </div>

        </div>
    );
}

export default Header;