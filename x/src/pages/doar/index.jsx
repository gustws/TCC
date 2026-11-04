import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import '../contato/index.scss';
import './index.scss';
import Cabecalho from "../../components/cabecalho";
import Rodape from "../../components/rodape";

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:2078';

function dataHoje() {
    const hoje = new Date();
    const mes = String(hoje.getMonth() + 1).padStart(2, '0');
    const dia = String(hoje.getDate()).padStart(2, '0');
    return `${hoje.getFullYear()}-${mes}-${dia}`;
}

export default function Doacao(){

    const [tipo, setTipo] = useState('dinheiro');
    const [instituicaoId, setInstituicaoId] = useState('');
    const [valor, setValor] = useState('');
    const [alimentoId, setAlimentoId] = useState('');
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');

    const [instituicoes, setInstituicoes] = useState([]);
    const [alimentos, setAlimentos] = useState([]);
    const [enviado, setEnviado] = useState(false);
    const [erro, setErro] = useState('');

    useEffect(() => {
        async function carregar() {
            try {
                const respInstituicoes = await fetch(`${API_URL}/instituicao`);
                setInstituicoes(await respInstituicoes.json());

                const respAlimentos = await fetch(`${API_URL}/alimento`);
                setAlimentos(await respAlimentos.json());
            }
            catch (err) {
                setErro('Não foi possível carregar as instituições. Tente novamente mais tarde.');
            }
        }

        carregar();
    }, []);

    async function enviar(e){
        e.preventDefault();
        setEnviado(false);
        setErro('');

        const instituicao_id = instituicaoId === '' ? null : Number(instituicaoId);

        let rota;
        let corpo;

        if (tipo === 'dinheiro') {
            rota = '/doacao-dinheiro';
            corpo = {
                data_doacao: dataHoje(),
                valor: Number(valor),
                usuario_id: null,
                instituicao_id,
                nome_doador: nome,
                email_doador: email
            };
        }
        else {
            rota = '/doacao-alimento';
            corpo = {
                alimento_id: Number(alimentoId),
                data_doacao: dataHoje(),
                usuario_id: null,
                instituicao_id,
                nome_doador: nome,
                email_doador: email
            };
        }

        try {
            const resposta = await fetch(`${API_URL}${rota}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(corpo)
            });

            if (!resposta.ok)
                throw new Error('Falha ao enviar');

            setEnviado(true);
            setInstituicaoId('');
            setValor('');
            setAlimentoId('');
            setNome('');
            setEmail('');
        }
        catch (err) {
            setErro('Não foi possível registrar sua doação. Tente novamente.');
        }
    }

    return(

        <div className="Pagina-Contato Pagina-Doacao">
            <Cabecalho />

            <section className="hero">
                <h1>Doar</h1>
                <p>Escolha o tipo de doação e preencha os dados. Entraremos em contato para combinar os detalhes.</p>
            </section>

            <main className="conteudo">

                <form className="card form" onSubmit={enviar}>
                    <label htmlFor="tipo">Tipo de doação</label>
                    <select id="tipo" value={tipo} onChange={e => setTipo(e.target.value)}>
                        <option value="dinheiro">Dinheiro</option>
                        <option value="alimentos">Alimentos</option>
                    </select>

                    <label htmlFor="instituicao">Instituição que vai receber</label>
                    <select id="instituicao" value={instituicaoId} onChange={e => setInstituicaoId(e.target.value)}>
                        <option value="">Onde mais precisar</option>
                        {instituicoes.map(item =>
                            <option key={item.id} value={item.id}>
                                {item.nome} · {item.cidade}
                            </option>
                        )}
                    </select>

                    {tipo === 'dinheiro' &&
                        <>
                            <label htmlFor="valor">Valor (R$)</label>
                            <input
                                id="valor"
                                type="number"
                                min="1"
                                step="1"
                                value={valor}
                                onChange={e => setValor(e.target.value)}
                                required
                            />
                        </>
                    }

                    {tipo === 'alimentos' &&
                        <>
                            <label htmlFor="alimento">Alimento</label>
                            <select id="alimento" value={alimentoId} onChange={e => setAlimentoId(e.target.value)} required>
                                <option value="">Selecione um alimento</option>
                                {alimentos.map(item =>
                                    <option key={item.id} value={item.id}>
                                        {item.nome} ({item.unidade})
                                    </option>
                                )}
                            </select>
                        </>
                    }

                    <label htmlFor="nome">Nome completo</label>
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

                    <button type="submit">Enviar doação</button>

                    {enviado && <span className="sucesso">Doação registrada! Obrigado por ajudar. Entraremos em contato.</span>}
                    {erro && <span className="erro">{erro}</span>}
                </form>

                <section className="card info">
                    <h2>Como a sua doação ajuda</h2>

                    <ul className="beneficios">
                        <li>Dinheiro ou alimentos: escolha o jeito que cabe na sua rotina.</li>
                        <li>Cada doação é direcionada a uma instituição parceira, com o destino publicado.</li>
                    </ul>

                    <h3>Prefere conversar antes?</h3>
                    <p>Escreva pela página de <Link to="/Contato">Contato</Link>.</p>

                    <div className="xadrez-card"></div>
                </section>

            </main>

            <Rodape />
        </div>

    );

};