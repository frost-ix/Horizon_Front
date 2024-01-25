import React, { useState } from 'react';
import './Header.css';
import { useNavigate } from "react-router-dom";

function Header() {
    const navigate = useNavigate();
    const [displayLine, setDisplayLine] = useState<boolean>(false);
    const [pos, setPos] = useState<boolean>(false);
    const [boo, setBoo] = useState<boolean>(false);
    const [hom, setHom] = useState<boolean>(false);
    const [acc, setAcc] = useState<boolean>(false);


    const displayBarClick = () => {
        setDisplayLine(!displayLine);
    };
    const AccountClick = () => {
        navigate('/account')
        setAcc(true)
        setBoo(false)
        setHom(false)
        setPos(false)
    };
    const PostClick = () => {
        navigate('/post')
        setAcc(false)
        setBoo(false)
        setHom(false)
        setPos(true)
    };
    const MainClick = () => {
        navigate('/')
        setAcc(false)
        setBoo(false)
        setHom(true)
        setPos(false)
    };
    const SearchClick = () => {
        // navigate('/search')
        alert("기능 준비 중")
    };
    const BookClick = () => {
        navigate('/book')
        setAcc(false)
        setBoo(true)
        setHom(false)
        setPos(false)
    };

    return (
        <div className="Header">
            <div className='Header-icons'>
                <img src="/Icon/DisplayLine.png" className='displayLineIcon' onClick={displayBarClick} alt="icon"/>{/* 컴퓨터 */}
                <img src="/Icon/Search.png"  className='Header-icon' onClick={SearchClick} alt="icon"/>
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