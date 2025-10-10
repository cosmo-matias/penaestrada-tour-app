// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
// 1. Mude de BrowserRouter...
import { HashRouter } from 'react-router-dom'; // ...para HashRouter
import App from './App.jsx';
import './styles/App.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        {/* 2. Use o HashRouter aqui */}
        <HashRouter>
            <App />
        </HashRouter>
    </React.StrictMode>,
);