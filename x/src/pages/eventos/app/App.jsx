import { useState } from "react";
import './App.scss';
import { Link } from 'react-router-dom';

export default function Contador(){
    
    const[descricao1, setdescricao1] = useState("Texto Inicial");

    function mudar(e){
        let novovalor = e.target.value;
        setdescricao1(novovalor)
    }



    return(

        <div className="App-Contador">

            <h1>teste do texto</h1>
            <div className="funcao-contador">
                <input onChange={mudar}></input>
                <h2>{descricao1}</h2>

            </div>
        </div>

    )


}