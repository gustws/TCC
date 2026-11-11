import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../contato/index.scss';
import './index.scss';
import Cabecalho from "../../components/cabecalho";
import Rodape from "../../components/rodape";

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:2078';

export default function Login(){

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState('');

    async function entrar(e){
        e.preventDefault();
        setErro('');

        try {
            const resposta = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, senha })
            });

            const dados = await resposta.json();

            if (!resposta.ok) {
                setErro(dados.erro || 'Não foi possível entrar.');
                return;
            }

            localStorage.setItem('token', dados.token);
            localStorage.setItem('adminNome', dados.nome);
            navigate('/Painel');
        }
        catch (err) {
            setErro('Servidor indisponível. Tente novamente mais tarde.');
        }
    }

    return(

        <div className="Pagina-Contato Pagina-Login">
            <Cabecalho />

            <section className="hero">
                <h1>Painel Alimenta</h1>
                <p>Área restrita a administradores.</p>
            </section>

            <main className="conteudo">
                <form className="card form" onSubmit={entrar}>
                    <label htmlFor="email">E-mail</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />

                    <label htmlFor="senha">Senha</label>
                    <input
                        id="senha"
                        type="password"
                        value={senha}
                        onChange={e => setSenha(e.target.value)}
                        required
                    />

                    <button type="submit">Entrar</button>

                    {erro && <span className="erro">{erro}</span>}
                </form>
            </main>

            <Rodape />
        </div>

    );

};