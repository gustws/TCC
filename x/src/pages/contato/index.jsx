import './index.scss';
import { Link } from 'react-router-dom';

export default function Contato(){
    return(
        <div className='PagContato'>
            <p>Teste - Página Contato</p>
            <Link to="/">Voltar</Link>
        </div>
    );

}