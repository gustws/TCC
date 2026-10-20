import { useState } from "react";
import './index.scss';
import { Link } from 'react-router-dom';
import { createIcons, Drumstick } from 'lucide-react';

export default function Rodape(){


    return(

        <footer className="comp-rodape">

            <div className="logo-nome">
                <Drumstick />
                <h2>Mesa Cheia</h2>
            </div>

            <p>© 2026 Mesa Cheia, Inc.</p>

            <Link to="/">← Voltar à pagina inicial</Link>
            


        </footer>

    );

};