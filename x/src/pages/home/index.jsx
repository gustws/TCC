import { useState } from "react";
import './index.scss';
import { Link } from 'react-router-dom';
import Cabecalho from "../../components/cabecalho";
import Rodape from "../../components/rodape";

export default function Home(){

    // valor escolhido na doação (começa em 50)
    const [valor, setValor] = useState(50);

    // cada R$ 4 viram uma refeição
    const refeicoes = Math.floor(valor / 4);

    return(

        <div className="Pagina-Inicial">
            <Cabecalho />

            {/* banner com a foto */}
            <section className="banner">
                <div className="banner-escuro">
                    <div className="banner-conteudo">

                        <div className="banner-texto">
                            <h1>Ninguém deveria dormir sem jantar.</h1>
                            <p>O Prato Cheio conecta quem pode doar com instituições que já alimentam famílias todos os dias. Você escolhe como ajudar, e mostramos para onde foi cada doação.</p>

                            <Link className="botao-laranja" to="/doar">Quero doar</Link>
                            <Link className="botao-branco" to="/afiliado">Quero ser afiliado</Link>
                        </div>

                        <div className="doacao">
                            <h3>Quanto você quer doar?</h3>

                            <div className="valores">
                                <button onClick={() => setValor(20)}>R$ 20</button>
                                <button onClick={() => setValor(50)}>R$ 50</button>
                                <button onClick={() => setValor(100)}>R$ 100</button>
                                <button onClick={() => setValor(200)}>R$ 200</button>
                            </div>

                            <h2>{refeicoes} refeições</h2>
                            <p className="nota">Estimativa de exemplo: R$ 4 por refeição.</p>

                            <Link className="botao-laranja" to="/doar">Continuar para doação</Link>
                        </div>

                    </div>
                </div>
            </section>

            {/* números */}
            <section className="numeros">
                <div className="numero">
                    <h2>48.200</h2>
                    <p>refeições doadas</p>
                </div>
                <div className="numero">
                    <h2>3.150</h2>
                    <p>famílias atendidas</p>
                </div>
                <div className="numero">
                    <h2>67</h2>
                    <p>instituições parceiras</p>
                </div>
            </section>

            {/* como funciona */}
            <section className="como-funciona">
                <div className="conteudo">
                    <h2 className="titulo">Como funciona</h2>

                    <div className="passo">
                        <div className="passo-numero">1</div>
                        <div>
                            <h3>Escolha como ajudar</h3>
                            <p>Doe alimentos, dinheiro ou seu tempo como voluntário.</p>
                        </div>
                    </div>

                    <div className="passo">
                        <div className="passo-numero">2</div>
                        <div>
                            <h3>Selecione uma instituição</h3>
                            <p>Veja quem atende sua cidade e o que cada lugar precisa.</p>
                        </div>
                    </div>

                    <div className="passo">
                        <div className="passo-numero">3</div>
                        <div>
                            <h3>Acompanhe o resultado</h3>
                            <p>Publicamos a prestação de contas com o destino de cada doação.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* depoimentos */}
            <section className="quem-ajuda">
                <div className="conteudo">
                    <h2 className="titulo">Quem já ajuda</h2>

                    <div className="depoimentos">
                        <div className="depoimento">
                            <p>Doei uma vez por curiosidade e hoje sou afiliada. Saber para onde vai cada real muda tudo.</p>
                            <b>sandra, doadora recorrente</b>
                        </div>

                        <div className="depoimento">
                            <p>Com a lista de necessidades no site, paramos de receber só arroz e passamos a receber o que falta.</p>
                            <b>alex, coordenador de cozinha comunitária</b>
                        </div>
                    </div>

                    <p className="nota">depoimentos tlgd</p>
                </div>
            </section>

            <Rodape />
        </div>

    );

};