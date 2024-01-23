import React, { useState } from 'react';
import './Header.css';
import { useNavigate } from "react-router-dom";

function Header() {
    const navigate = useNavigate();
    const [displayLine, setDisplayLine] = useState<boolean>(false);

    const displayBarClick = () => {
        setDisplayLine(!displayLine);
    };
    const AccountClick = () => {
        navigate('/account')
    };
    const PostClick = () => {
        navigate('/post')
    };
    const MainClick = () => {
        navigate('/')
    };
    const SearchClick = () => {
        // navigate('/search')
        alert("기능 준비 중")
    };
    const BookClick = () => {
        navigate('/book')
    };

    return (
        <div className="Header">
            <div className='Header-icons'>
                <img src="/Icon/DisplayLine.png" className='displayLineIcon' onClick={displayBarClick} alt="icon"/>{/* 컴퓨터 */}
                <img src="/Icon/Search.png"  className='AccountIcon' onClick={SearchClick} alt="icon"/>
                <img src="/Icon/Book.png"  className='AccountIcon' onClick={BookClick} alt="icon"/>
                <img src="/Icon/Home.png"  className='AccountIcon' onClick={MainClick} alt="icon"/>
                <img src="/Icon/Post.png"  className='AccountIcon' onClick={PostClick} alt="icon"/>
                <img src="/Icon/Account.png"  className='AccountIcon' onClick={AccountClick} alt="icon"/>
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