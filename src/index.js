import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import App from './App';
import STORE from './dummy-store';
import './index.css';

ReactDOM.render(
    <BrowserRouter>
        <App store={STORE}/>
    </BrowserRouter>
    , document.getElementById('root'));