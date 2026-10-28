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
                                <p>As doações vão para as instituições parceiras, que comprarão comida para preparar as refeições oferecidas no local.</p>
                        </details>

                        <details>
                            <summary>Como e para quem as instituições distribuem a comida?</summary>
                            <p>As famílias devem ir até a instituição mais próxima e preencher o formulário de beneficiado. As instituições realizam entregas mensais de cestas básicas, além das refeições oferecias diariamente.</p>
                        </details>

                        <details>
                            <summary>Como eu me torno uma instituição parceira?</summary>
                            <p>Entre em contato conosco pelo formulário da página de contato, informando o nome, a cidade e o que a instituição precisa. </p>
                        </details>

                </div>

                <h1>Transparência</h1>
                <hr></hr>
                <p>Todo mês, publicamos em <a href="google.com">nossas redes</a> quanto foi arrecadado, quanto foi repassado e para quais instituições. </p>


            <Rodape />


        </div>

    );

};