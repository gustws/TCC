import { useState } from "react";
import './index.scss';
import { Link } from 'react-router-dom';

export default function Cabecalho(){


    return(

        <div className="comp-cabecalho">
                <Link to="/"><img src="/assets/images/logotcc.png" alt="Logo" /></Link> 

                <ul className="botoeslink">
                    <li><Link to="/Home">Início</Link></li>
                    <li><Link to="/Calc">Seja afiliado</Link></li>
                    <li><Link to="/Func">Instituições</Link></li>
                    <li><Link to="/Contato">Sobre e dúvidas</Link></li>
                </ul>

                <input type="search" placeholder="🔍︎  Procure por pontos de coleta" />

                <ul className="botoes2">
                    <li className="contato"><Link to="/App">Contato</Link></li>
                    <li className="cadastro"><Link to="/Register">Cadastrar-se</Link></li>
                </ul>

            


        </div>

    );

};