import { useState } from "react";
import './index.scss';
import Cabecalho from "../../components/cabecalho";
import Rodape from "../../components/rodape";

export default function Contato(){

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [enviado, setEnviado] = useState(false);

    function enviar(e){
        e.preventDefault();

        setEnviado(true);
        setNome('');
        setEmail('');
        setMensagem('');
    }

    return(

        <div className="Pagina-Contato">
            <Cabecalho />

            <section className="hero">
                <h1>Contato</h1>
                <p>Dúvidas, sugestões ou interesse em ser instituição parceira? Escreva para a gente.</p>
            </section>

            <main className="conteudo">

                <form className="card form" onSubmit={enviar}>
                    <label htmlFor="nome">Nome</label>
                    <input
                        id="nome"
                        type="text"
                        value={nome}
                        onChange={e => setNome(e.target.value)}
                        required
                    />

                    <label htmlFor="email">E-mail</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />

                    <label htmlFor="mensagem">Mensagem</label>
                    <textarea
                        id="mensagem"
                        value={mensagem}
                        onChange={e => setMensagem(e.target.value)}
                        required
                    />

                    <button type="submit">Enviar mensagem</button>

                    {enviado && <span className="sucesso">Mensagem enviada! Obrigado pelo contato.</span>}
                </form>

                <section className="card info">
                    <h2>Fale com a gente</h2>

                    <h3>E-mail</h3>
                    <p>contato@pratocheio.exemplo</p>

                    <h3>Telefone</h3>
                    <p>(11) 4000-0000</p>

                    <h3>Quer ser instituição parceira?</h3>
                    <p>Conte pelo formulário quem você atende e como podemos ajudar.</p>

                    <div className="xadrez-card"></div>
                </section>

            </main>

            <Rodape />
        </div>

    );

};