import { useState } from "react";
import './index.scss';
import { Link } from 'react-router-dom';
import axios from "axios";
import Cabecalho from "../../../components/cabecalho";

export default function Chamada(){


    const [cep, setcep] = useState('')
    const [endereco, setendereco] = useState();


    async function buscarCep() {
        let url = `https://viacep.com.br/ws/${cep}/json/`;
        let resp = await axios.get(url)

        let dados = resp.data;
        let msg = dados.logradouro + " - " + dados.bairro + " - "  + dados.localidade + " - " + dados.uf;
        setendereco(msg);

    }



    return(

        <div className="Chamada-Inicial">

            <h1>chamada api</h1>

            <div className="chamada">
                <input type="text" value = {cep} onChange={(e) => setcep(e.target.value)} />
                <button onClick={buscarCep}>Buscar CEP</button>
            </div>

            <h2>{endereco}</h2>

        </div>

    );

};