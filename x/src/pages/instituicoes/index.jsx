import { useState } from "react";
import './index.scss';
import { Link } from 'react-router-dom';
import Cabecalho from "../../components/cabecalho";
import Rodape from "../../components/rodape";

// lista das instituições (fica fora da função, não muda)
const instituicoes = [
    { nome: "Cozinha Solidária Bom Prato", cidade: "São Paulo", alimentos: ["Arroz", "Feijão", "Óleo"], horario: "Seg a sex, 8h às 17h", telefone: "(11) 4000-1001" },
    { nome: "Associação Mesa Farta", cidade: "São Paulo", alimentos: ["Leite em pó", "Enlatados", "Macarrão"], horario: "Ter a sáb, 9h às 16h", telefone: "(11) 4000-1002" },
    { nome: "Instituto Mão Amiga", cidade: "Campinas", alimentos: ["Cesta básica", "Farinhas", "Açúcar"], horario: "Seg a sex, 9h às 18h", telefone: "(19) 4000-1003" },
    { nome: "Banco de Alimentos Esperança", cidade: "Campinas", alimentos: ["Frutas", "Verduras", "Legumes"], horario: "Seg, qua e sex, 7h às 12h", telefone: "(19) 4000-1004" },
    { nome: "Refeitório Comunitário Santa Luzia", cidade: "Santos", alimentos: ["Arroz", "Carnes congeladas", "Óleo"], horario: "Todos os dias, 10h às 15h", telefone: "(13) 4000-1005" },
    { nome: "Projeto Pão Nosso", cidade: "Santos", alimentos: ["Farinhas", "Leite", "Café"], horario: "Seg a sex, 8h às 14h", telefone: "(13) 4000-1006" }
];

export default function Instituicoes(){

    // o que a pessoa digitou na busca e a cidade escolhida
    const [busca, setBusca] = useState("");
    const [cidade, setCidade] = useState("");

    // lista de instituições que passaram nos filtros (começa vazia)
    let lista = [];

    // passa por cada instituição, uma de cada vez
    for (let i = 0; i < instituicoes.length; i++) {
        const item = instituicoes[i];

        // junta o nome e os alimentos num texto só
        const texto = item.nome + " " + item.alimentos.join(" ");

        // regra 1: a cidade é a escolhida (ou nenhuma foi escolhida)
        const cidadeOk = cidade === "" || item.cidade === cidade;

        // regra 2: o texto tem o que a pessoa digitou na busca
        const buscaOk = texto.toLowerCase().includes(busca.toLowerCase());

        // se passou nas 2 regras, entra na lista
        if (cidadeOk && buscaOk) {
            lista.push(item);
        }
    }

    return(

        <div className="Pagina-Instituicoes">
            <Cabecalho />

            <div className="conteudo">

                <h1>Instituições de doação</h1>
                <p>Encontre uma instituição perto de você e veja o que ela aceita.</p>

                // filtros de busca e cidade
                <div className="filtros">
                    <div>
                        <label>Buscar</label>
                        <input
                            type="text"
                            placeholder="Nome ou alimento"
                            value={busca}
                            onChange={(e) => setBusca(e.target.value)}
                        />
                    </div>

                    <div>
                        <label>Cidade</label>
                        <select value={cidade} onChange={(e) => setCidade(e.target.value)}>
                            <option value="">Todas</option>
                            <option value="São Paulo">São Paulo</option>
                            <option value="Campinas">Campinas</option>
                            <option value="Santos">Santos</option>
                        </select>
                    </div>
                </div>

                {/* cards: map = cria um card para cada instituição da lista */}
                <div className="cards">
                    {lista.map((item) => (
                        <div className="card" key={item.nome}>
                            <h3>{item.nome}</h3>
                            <p className="cidade">{item.cidade}</p>

                            <div>
                                {item.alimentos.map((alimento) => (
                                    <div className="tag" key={alimento}>{alimento}</div>
                                ))}
                            </div>

                            <p>{item.horario}</p>
                            <p>{item.telefone}</p>

                            <Link className="botao-contorno" to="/doar">Doar para esta instituição</Link>
                        </div>
                    ))}
                </div>

                {/* se a lista ficou vazia, mostra essa mensagem */}
                {lista.length === 0 && (
                    <p>Nenhuma instituição encontrada. Tente outra cidade ou outro termo.</p>
                )}

                <p className="nota">Instituições fictícias, apenas para demonstração.</p>

            </div>

            <Rodape />
        </div>

    );

};