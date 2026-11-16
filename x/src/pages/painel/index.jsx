import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../contato/index.scss';
import './index.scss';
import Cabecalho from "../../components/cabecalho";
import Rodape from "../../components/rodape";

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:2078';

// mostra só a data; com comHora = true mostra também a hora (usado nos contatos)
function formatarData(data, comHora = false) {
    if (!data) return '-';
    const texto = String(data);
    const dia = texto.slice(0, 10).split('-').reverse().join('/');
    if (!comHora || texto.length < 16) return dia;
    return `${dia} ${texto.slice(11, 16)}`;
}

function formatarValor(valor) {
    return Number(valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// tira acentos e maiúsculas para a busca achar "acucar" em "Açúcar"
function normalizar(texto) {
    return String(texto || '')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase();
}

// true se algum dos campos contém o termo buscado
function combina(campos, termo) {
    if (!termo) return true;
    return normalizar(campos.join(' ')).includes(normalizar(termo));
}

// célula da coluna "Verificação": selo se já verificada, botão se pendente
function CelulaVerificacao({ item, onVerificar }) {
    return Number(item.verificada) === 1
        ? <span className="selo-verificada">Verificada</span>
        : <button className="btn-verificar" onClick={onVerificar}>Verificar</button>;
}

export default function Painel(){

    const navigate = useNavigate();

    const [estoque, setEstoque] = useState([]);

    const emFalta = estoque.filter(item => Number(item.quantidade) === 0);

    const [erroAcao, setErroAcao] = useState('');

    const [aba, setAba] = useState('dinheiro');
    const [dinheiro, setDinheiro] = useState([]);
    const [alimentos, setAlimentos] = useState([]);
    const [contatos, setContatos] = useState([]);
    const [busca, setBusca] = useState('');
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState('');

    const nomeAdmin = localStorage.getItem('adminNome');

    // só conta como arrecadado o dinheiro já verificado
    const dinheiroVerificado = dinheiro.filter(item => Number(item.verificada) === 1);
    const totalArrecadado = dinheiroVerificado.reduce((soma, item) => soma + Number(item.valor), 0);
    const pendentes = dinheiro.length - dinheiroVerificado.length
                    + alimentos.filter(item => Number(item.verificada) !== 1).length;

    // listas já filtradas pela busca
    const dinheiroFiltrado = dinheiro.filter(item =>
        combina([item.nome_doador, item.email_doador, item.instituicao || 'Onde mais precisar'], busca));

    const alimentosFiltrado = alimentos.filter(item =>
        combina([item.nome_doador, item.email_doador, item.alimento, item.instituicao || 'Onde mais precisar'], busca));

    const contatosFiltrado = contatos.filter(item =>
        combina([item.nome, item.email, item.mensagem], busca));

    const estoqueFiltrado = estoque.filter(item =>
        combina([item.nome, item.categoria], busca));

    function sair(){
        localStorage.removeItem('token');
        localStorage.removeItem('adminNome');
        navigate('/Login');
    }

    // tipo = 'doacao-dinheiro' ou 'doacao-alimento'
    async function verificar(tipo, id){
        setErroAcao('');
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };

        try {
            const resposta = await fetch(`${API_URL}/${tipo}/${id}/verificar`, { method: 'PUT', headers });

            if (resposta.status === 401 || resposta.status === 403) {
                sair();
                return;
            }

            if (!resposta.ok) {
                const dados = await resposta.json().catch(() => ({}));
                throw new Error(dados.erro || 'Falha ao verificar');
            }

            if (tipo === 'doacao-dinheiro') {
                setDinheiro(lista => lista.map(item => item.id === id ? { ...item, verificada: 1 } : item));
            }
            else {
                setAlimentos(lista => lista.map(item => item.id === id ? { ...item, verificada: 1 } : item));

                // a doação entrou no estoque, então recarrega a aba de estoque
                const respEstoque = await fetch(`${API_URL}/estoque/detalhado`, { headers });
                if (respEstoque.ok) setEstoque(await respEstoque.json());
            }
        }
        catch (err) {
            setErroAcao(err.message || 'Não foi possível verificar a doação.');
        }
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

                const [respDinheiro, respAlimentos, respEstoque, respContatos] = await Promise.all([
                    fetch(`${API_URL}/doacao-dinheiro/detalhado`, { headers }),
                    fetch(`${API_URL}/doacao-alimento/detalhado`, { headers }),
                    fetch(`${API_URL}/estoque/detalhado`, { headers }),
                    fetch(`${API_URL}/contato`, { headers })
                ]);

                // token inválido, expirado ou sem permissão de admin
                if ([respDinheiro.status, respAlimentos.status, respEstoque.status, respContatos.status].some(s => s === 401 || s === 403)) {
                    localStorage.removeItem('token');
                    localStorage.removeItem('adminNome');
                    navigate('/Login');
                    return;
                }

                if (!respDinheiro.ok || !respAlimentos.ok || !respEstoque.ok || !respContatos.ok)
                    throw new Error('Falha ao carregar');

                setDinheiro(await respDinheiro.json());
                setAlimentos(await respAlimentos.json());
                setEstoque(await respEstoque.json());
                setContatos(await respContatos.json());
            }
            catch (err) {
                setErro('Não foi possível carregar os dados. Tente novamente mais tarde.');
            }
            finally {
                setCarregando(false);
            }
        }

        carregar();
    }, [navigate]);

    const placeholders = {
        dinheiro: 'Buscar por doador, e-mail ou instituição',
        alimentos: 'Buscar por doador, e-mail, alimento ou instituição',
        estoque: 'Buscar por alimento ou categoria',
        contatos: 'Buscar por nome, e-mail ou mensagem'
     };

    return(

        <div className="Pagina-Contato Pagina-Painel">
            <Cabecalho />

            <section className="hero">
                <h1>Painel Alimenta</h1>
                <p>Olá{nomeAdmin ? `, ${nomeAdmin}` : ''}. Veja as doações recebidas, para qual instituição foram e as mensagens de contato.</p>
            </section>

            <main className="conteudo">

                <div className="resumo">
                    <div className="card">
                        <h2>{formatarValor(totalArrecadado)}</h2>
                        <p>{dinheiroVerificado.length} doações em dinheiro verificadas</p>
                    </div>
                    <div className="card">
                        <h2>{alimentos.length}</h2>
                        <p>doações de alimentos</p>
                    </div>
                    <div className="card">
                        <h2>{pendentes}</h2>
                        <p>doações pendentes de verificação</p>
                    </div>
                    <div className="card">
                        <h2>{contatos.length}</h2>
                        <p>mensagens de contato</p>
                    </div>
                    <div className="card">
                        <h2>{emFalta.length}</h2>
                        <p>alimentos em falta no estoque</p>
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
                        <button className={aba === 'estoque' ? 'ativa' : ''} onClick={() => setAba('estoque')}>
                            Estoque ({estoque.length})
                        </button>
                        <button className={aba === 'contatos' ? 'ativa' : ''} onClick={() => setAba('contatos')}>
                            Contatos ({contatos.length})
                        </button>
                    </div>

                    <input
                        className="busca-painel"
                        type="search"
                        placeholder={placeholders[aba]}
                        value={busca}
                        onChange={e => setBusca(e.target.value)}
                    />

                    {carregando && <p>Carregando...</p>}
                    {erro && <p className="erro">{erro}</p>}
                    {erroAcao && <p className="erro">{erroAcao}</p>}

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
                                        <th>Verificação</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dinheiroFiltrado.map(item =>
                                        <tr key={item.id}>
                                            <td>{formatarData(item.data_doacao)}</td>
                                            <td>{item.nome_doador || '-'}</td>
                                            <td>{item.email_doador || '-'}</td>
                                            <td>{formatarValor(item.valor)}</td>
                                            <td>{item.instituicao || 'Onde mais precisar'}</td>
                                            <td><CelulaVerificacao item={item} onVerificar={() => verificar('doacao-dinheiro', item.id)} /></td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                            {dinheiroFiltrado.length === 0 &&
                                <p>{busca ? 'Nenhuma doação em dinheiro encontrada para essa busca.' : 'Nenhuma doação em dinheiro registrada.'}</p>}
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
                                        <th>Verificação</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {alimentosFiltrado.map(item =>
                                        <tr key={item.id}>
                                            <td>{formatarData(item.data_doacao)}</td>
                                            <td>{item.nome_doador || '-'}</td>
                                            <td>{item.email_doador || '-'}</td>
                                            <td>{item.alimento}</td>
                                            <td>{item.instituicao || 'Onde mais precisar'}</td>
                                            <td><CelulaVerificacao item={item} onVerificar={() => verificar('doacao-alimento', item.id)} /></td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                            {alimentosFiltrado.length === 0 &&
                                <p>{busca ? 'Nenhuma doação de alimentos encontrada para essa busca.' : 'Nenhuma doação de alimentos registrada.'}</p>}
                        </div>
                    }

                    {!carregando && !erro && aba === 'estoque' &&
                        <div className="tabela-scroll">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Alimento</th>
                                        <th>Categoria</th>
                                        <th>Em estoque</th>
                                        <th>Situação</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {estoqueFiltrado.map(item =>
                                        <tr key={item.alimento_id}>
                                            <td>{item.nome}</td>
                                            <td>{item.categoria}</td>
                                            <td>{item.quantidade} {item.unidade}</td>
                                            <td className={Number(item.quantidade) > 0 ? 'disponivel' : 'falta'}>
                                                {Number(item.quantidade) > 0 ? 'Disponível' : 'Em falta'}
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                            {estoqueFiltrado.length === 0 &&
                                <p>{busca ? 'Nenhum alimento encontrado para essa busca.' : 'Nenhum alimento cadastrado.'}</p>}
                        </div>
                    }

                    {!carregando && !erro && aba === 'contatos' &&
                        <div className="tabela-scroll">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Data</th>
                                        <th>Nome</th>
                                        <th>E-mail</th>
                                        <th>Mensagem</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {contatosFiltrado.map(item =>
                                        <tr key={item.id}>
                                            <td>{formatarData(item.data_envio, true)}</td>
                                            <td>{item.nome || '-'}</td>
                                            <td>
                                                {item.email
                                                    ? <a href={`mailto:${item.email}`}>{item.email}</a>
                                                    : '-'}
                                            </td>
                                            <td className="mensagem">{item.mensagem || '-'}</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                            {contatosFiltrado.length === 0 &&
                                <p>{busca ? 'Nenhum contato encontrado para essa busca.' : 'Nenhuma mensagem de contato recebida.'}</p>}
                        </div>
                    }

                </div>

            </main>

            <Rodape />
        </div>

    );

};