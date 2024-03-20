import './App.css';
import { BrowserRouter } from 'react-router-dom';
import React, { useEffect } from 'react';
import Header from './front/Header/Header';
import Body from './front/Body/Body';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header/>
      <Body/>
      </BrowserRouter>
    </div>
  );
}

export default App;
