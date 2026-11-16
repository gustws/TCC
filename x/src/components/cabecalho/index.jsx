import { useState } from "react";
import './index.scss';
import { Link } from 'react-router-dom';

export default function Cabecalho(){


    return(

        <div className="comp-cabecalho">
                <Link to="/"><img src="/assets/imgs/logotcc.png" alt="Logo" /></Link> 

                <ul className="botoeslink">
                    <li><Link to="/">Início</Link></li>
                    <li><Link to="/Doar">Faça sua doação</Link></li>
                    <li><Link to="/Instituicoes">Instituições</Link></li>
                    <li><Link to="/SobreNos">Sobre e dúvidas</Link></li>
                    <li>
                        <a href="https://linktr.ee/gustavotccfrei" target="_blank" rel="noopener noreferrer">
                            Nossas Redes
                        </a>
                    </li>
                </ul>


                <ul className="botoes2">
                    <li className="contato"><Link to="/Contato">Contato</Link></li>
                    <li className="cadastro"><Link to="/Painel">Painel Alimenta</Link></li>
                </ul>

            


        </div>

    );

};