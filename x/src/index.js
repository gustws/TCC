import React from 'react';
import ReactDOM from 'react-dom/client';

import NotFound from './pages/notfound/index.jsx';
import './pages/notfound/index.scss';

import Contato from './pages/contato/index.jsx';
import './pages/contato/index.scss';

import Home from './pages/home/index.jsx';
import './pages/home/index.scss';

import SobreNos from './pages/sobrenos/index.jsx';
import './pages/sobrenos/index.scss';

import Instituicoes from './pages/instituicoes/index.jsx';
import './pages/instituicoes/index.scss';



// imports de eventos
import Cinema from './pages/eventos/cinema/index.jsx';
import './pages/eventos/cinema/index.scss';
import Calc from './pages/eventos/calc/index.jsx';
import './pages/eventos/calc/index.scss';
import Func from './pages/eventos/funcao/func.jsx';
import './pages/eventos/funcao/func.scss';
import Chamada from './pages/eventos/chamada api/index.jsx';
import './pages/eventos/chamada api/index.scss';
import App from './pages/eventos/app/App.jsx';
import './pages/eventos/app/App.scss';



import {BrowserRouter,Routes,Route} from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
        <BrowserRouter>
          <Routes>
              <Route path='/' element ={<Home/>}/>
              <Route path='/Instituicoes' element ={<Instituicoes/>}/>

              <Route path='/Contato' element ={<Contato/>}/>
              <Route path='/Cinema' element ={<Cinema />}/>
              <Route path='/Calc' element ={<Calc/>}/>
              <Route path='/Func' element ={<Func/>}/>    
              <Route path='/Chamada' element ={<Chamada/>}/>  
              <Route path='/App' element ={<App/>}/>
              <Route path='*' element ={<NotFound/>}/>  
          </Routes>
        </BrowserRouter>
  </React.StrictMode>
);
