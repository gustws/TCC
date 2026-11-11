import { useState } from "react";
import './index.scss';
import { Link } from 'react-router-dom';
import { createIcons, Heart } from 'lucide-react';

export default function Rodape(){


    return(

        <footer className="comp-rodape">

            <div className="logo-nome">
               <Heart />
                <h2>Rede Alimenta</h2>
            </div>

            <p>© 2026 Rede Alimenta, Inc.</p>

            <Link to="/">← Voltar à pagina inicial</Link>
            


        </footer>

    );

};