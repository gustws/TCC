import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../contato/index.scss';
import './index.scss';
import Cabecalho from "../../components/cabecalho";
import Rodape from "../../components/rodape";

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:2078';

function formatarData(data) {
    if (!data) return '-';
    return String(data).slice(0, 10).split('-').reverse().join('/');
}

function formatarValor(valor) {
    return Number(valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export default function Painel(){

    const navigate = useNavigate();

    const [aba, setAba] = useState('dinheiro');
    const [dinheiro, setDinheiro] = useState([]);
    const [alimentos, setAlimentos] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState('');

    const nomeAdmin = localStorage.getItem('adminNome');
    const totalArrecadado = dinheiro.reduce((soma, item) => soma + Number(item.valor), 0);

    function sair(){
        localStorage.removeItem('token');
        localStorage.removeItem('adminNome');
        navigate('/Login');
    }

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            navigate('/Login');
            return;
        }

        async function carregar() {
            try {
                const headers = { Authorization: `Bearer ${token}` };

                const [respDinheiro, respAlimentos] = await Promise.all([
                    fetch(`${API_URL}/doacao-dinheiro/detalhado`, { headers }),
                    fetch(`${API_URL}/doacao-alimento/detalhado`, { headers })
                ]);

                // token inválido, expirado ou sem permissão de admin
                if ([respDinheiro.status, respAlimentos.status].some(s => s === 401 || s === 403)) {
                    localStorage.removeItem('token');
                    localStorage.removeItem('adminNome');
                    navigate('/Login');
                    return;
                }

                if (!respDinheiro.ok || !respAlimentos.ok)
                    throw new Error('Falha ao carregar');

                setDinheiro(await respDinheiro.json());
                setAlimentos(await respAlimentos.json());
            }
            catch (err) {
                setErro('Não foi possível carregar as doações. Tente novamente mais tarde.');
            }
            finally {
                setCarregando(false);
            }
        }

        carregar();
    }, [navigate]);

    return(

        <div className="Pagina-Contato Pagina-Painel">
            <Cabecalho />

            <section className="hero">
                <h1>Painel Alimenta</h1>
                <p>Olá{nomeAdmin ? `, ${nomeAdmin}` : ''}. Veja todas as doações recebidas e para qual instituição foram.</p>
            </section>

            <main className="conteudo">

                <div className="resumo">
                    <div className="card">
                        <h2>{formatarValor(totalArrecadado)}</h2>
                        <p>{dinheiro.length} doações em dinheiro</p>
                    </div>
                    <div className="card">
                        <h2>{alimentos.length}</h2>
                        <p>doações de alimentos</p>
                    </div>
                    <button className="sair" onClick={sair}>Sair</button>
                </div>

                <div className="card">

                    <div className="abas">
                        <button className={aba === 'dinheiro' ? 'ativa' : ''} onClick={() => setAba('dinheiro')}>
                            Dinheiro ({dinheiro.length})
                        </button>
                        <button className={aba === 'alimentos' ? 'ativa' : ''} onClick={() => setAba('alimentos')}>
                            Alimentos ({alimentos.length})
                        </button>
                    </div>

                    {carregando && <p>Carregando...</p>}
                    {erro && <p className="erro">{erro}</p>}

                    {!carregando && !erro && aba === 'dinheiro' &&
                        <div className="tabela-scroll">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Data</th>
                                        <th>Doador</th>
                                        <th>E-mail</th>
                                        <th>Valor</th>
                                        <th>Instituição</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dinheiro.map(item =>
                                        <tr key={item.id}>
                                            <td>{formatarData(item.data_doacao)}</td>
                                            <td>{item.nome_doador || '-'}</td>
                                            <td>{item.email_doador || '-'}</td>
                                            <td>{formatarValor(item.valor)}</td>
                                            <td>{item.instituicao || 'Onde mais precisar'}</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                            {dinheiro.length === 0 && <p>Nenhuma doação em dinheiro registrada.</p>}
                        </div>
                    }

                    {!carregando && !erro && aba === 'alimentos' &&
                        <div className="tabela-scroll">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Data</th>
                                        <th>Doador</th>
                                        <th>E-mail</th>
                                        <th>Alimento</th>
                                        <th>Instituição</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {alimentos.map(item =>
                                        <tr key={item.id}>
                                            <td>{formatarData(item.data_doacao)}</td>
                                            <td>{item.nome_doador || '-'}</td>
                                            <td>{item.email_doador || '-'}</td>
                                            <td>{item.alimento}</td>
                                            <td>{item.instituicao || 'Onde mais precisar'}</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                            {alimentos.length === 0 && <p>Nenhuma doação de alimentos registrada.</p>}
                        </div>
                    }

                </div>

            </main>

            <Rodape />
        </div>

    );

};