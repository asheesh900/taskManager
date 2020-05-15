import React from 'react';
import logo from './logo.svg';
import './App.css';
import Routes from './Routes/Routes';
import { BrowserRouter } from 'react-router-dom';

function App(props) {
  return (
    <BrowserRouter>
      <Routes {...props} />
    </BrowserRouter>
  );
}

export default App;
