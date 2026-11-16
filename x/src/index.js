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

import Doacao from './pages/doar/index.jsx';
import './pages/doar/index.scss';

import Login from './pages/login/index.jsx';
import './pages/login/index.scss';

import Painel from './pages/painel/index.jsx';
import './pages/painel/index.scss';




import {BrowserRouter,Routes,Route} from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
        <BrowserRouter>
          <Routes>
              <Route path='/' element ={<Home/>}/>
              <Route path='/Instituicoes' element ={<Instituicoes/>}/>
              <Route path='/SobreNos' element ={<SobreNos/>}/>
              <Route path='Doar' element={<Doacao/>}/>
              <Route path='/Contato' element ={<Contato/>}/>
              <Route path='/Login' element={<Login/>}/>
              <Route path='/Painel' element={<Painel/>}/>
              <Route path='*' element ={<NotFound/>}/>  

          </Routes>
        </BrowserRouter>
  </React.StrictMode>
);
