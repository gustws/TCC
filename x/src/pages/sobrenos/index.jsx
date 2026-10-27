import { useState } from "react";
import './index.scss';
import { Link } from 'react-router-dom';
import Cabecalho from "../../components/cabecalho";
import Rodape from "../../components/rodape";

export default function SobreNos(){

    

    return(

        <div className="Pagina-SobreNos">
            <Cabecalho />
            
                <h1>Sobre o Mesa Cheia</h1>

                <div className="SobreCards">
                    <div className="objetivo">
                        <p>Aproximar os doadores e as intuições para que ninguém acorde sem ter o que comer.</p>
                    </div>
                    
                    <div className="oqsomos">
                        <p>Somos uma instituição sem fins lucrativos que atua na cidade de São Paulo.</p>
                    </div>
                </div>

                <div className="oqDoar">
                    <h1>Quais alimentos doar?</h1>
                    <hr></hr>
                    <p>Prefira doar alimentos não perecíveis, longe do vencimento e sem danos na embalagem: arroz, feijão, macarrão, óleo, leite em pó, extrato de tomate, farinha e enlatados. Em caso de doação de itens frescos ou perecíveis, entre em contato com a instituição para mais informações.</p>
                </div>

                <div className="perguntasFrequentes">

                  <h1>Perguntas frequentes</h1>

                        <details>
                            <summary>Pra onde vai o dinheiro doado?</summary>
                                <p>As doações vão para as instituições parceiras</p>
                        </details>


                </div>


            <Rodape />


        </div>

    );

};