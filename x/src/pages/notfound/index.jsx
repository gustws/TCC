import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './index.scss';
import Cabecalho from "../../components/cabecalho";
import Rodape from "../../components/rodape";

const SEGUNDOS = 10;

export default function NotFound(){

    const navigate = useNavigate();
    const [segundos, setSegundos] = useState(SEGUNDOS);

    // conta regressiva e redireciona para a página inicial
    useEffect(() => {
        if (segundos === 0) {
            navigate('/', { replace: true });
            return;
        }

        const timer = setTimeout(() => setSegundos(segundos - 1), 1000);
        return () => clearTimeout(timer);
    }, [segundos, navigate]);

    return(

        <div className='PagNotFound'>
            <Cabecalho />

            <main className="conteudo-404">
                <h1>404</h1>
                <h2>Página não encontrada</h2>
                <p>Verifique o endereço digitado ou volte para a página inicial.</p>
                <p className="contagem">
                    Você será redirecionado para o início em {segundos} {segundos === 1 ? 'segundo' : 'segundos'}.
                </p>

                <Link className="botao-inicio" to="/">Voltar ao início</Link>
            </main>

            <Rodape />
        </div>

    );

}