import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './pages/app/App.jsx';
import './pages/app/App.scss';
import Contato from './pages/contato/index.jsx';
import './pages/contato/index.scss';
import NotFound from './pages/notfound/index.jsx';
import './pages/notfound/index.scss';
import Home from './pages/home/index.jsx';
import './pages/home/index.scss';
import Calc from './pages/calc/index.jsx';
import './pages/calc/index.scss';
import Func from './pages/funcao/func.jsx';
import './pages/funcao/func.scss';


import {BrowserRouter,Routes,Route} from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
        <BrowserRouter>
          <Routes>
              <Route path='/' element ={<Home/>}/>
              <Route path='/Home' element ={<Home/>}/>
              <Route path='/Calc' element ={<Calc/>}/>
              <Route path='/Func' element ={<Func/>}/>    
              <Route path='/Contato' element ={<Contato/>}/>  
              <Route path='/App' element ={<App/>}/>
              <Route path='*' element ={<NotFound/>}/>  
          </Routes>
        </BrowserRouter>
  </React.StrictMode>
);
