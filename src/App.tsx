import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';

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
