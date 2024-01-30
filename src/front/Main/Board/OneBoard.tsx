import React from 'react';
import { useLocation } from 'react-router-dom';

import './OneBoard.css';

function OneBoard() {
    const { state } = useLocation();
    const boardNum:number|string = state ? state : 'null';

  return (
    <div className="OneBoard">
        {boardNum}번 게시물
    </div>
  );
}

export default OneBoard;
