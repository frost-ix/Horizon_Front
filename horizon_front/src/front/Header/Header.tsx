import React, {useState} from 'react';
import './Header.css';

function Header() {
    const [displayLine, setDisplayLine]=useState<boolean>(false);
  return (
    <div className="Header">
         {!displayLine && (
            <img src="/Icon/DisplayLine.jpeg" className='displayLineIcon' onClick={()=>{setDisplayLine(!displayLine)}}/>
        )}
        
        {displayLine && (
            <div className='displayBar'>
                <div className='displayBar-menu-first'>
                    <img src="/Icon/DisplayLine.jpeg" className='displayLineIcon' onClick={()=>{setDisplayLine(!displayLine)}}/>
                </div>
                
                <div className='iwantcenter'>
                    <div className='displayBar-menu-border'/>
                    
                    <div className='displayBar-menu-second'>
                        메뉴
                    </div>
                </div>
            </div>
        )}
    </div>
  );
}

export default Header;
