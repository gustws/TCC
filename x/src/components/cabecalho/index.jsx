import { useState } from "react";
import './index.scss';
import { Link } from 'react-router-dom';

export default function Cabecalho(){


    return(

        <div className="comp-cabecalho">
                <Link to="/"><img src="/assets/images/logotcc.png" alt="Logo" /></Link> 

                <ul className="botoeslink">
                    <li><Link to="/">Início</Link></li>
                    <li><Link to="/Doar">Faça sua doação</Link></li>
                    <li><Link to="/Instituicoes">Instituições</Link></li>
                    <li><Link to="/SobreNos">Sobre e dúvidas</Link></li>
                </ul>

                <input type="search" placeholder="🔍︎  Procure por pontos de coleta" />

                <ul className="botoes2">
                    <li className="contato"><Link to="/Contato">Contato</Link></li>
                    <li className="cadastro"><Link to="/Register">Painel Alimenta</Link></li>
                </ul>

            


        </div>

    );

};