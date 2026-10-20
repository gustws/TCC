import { useState } from "react";
import './func.scss';
import { Link } from 'react-router-dom';

export default function Func(){

    const[descricao1, setdescricao1] = useState("Texto Inicial"); // Mudar o texto do primeiro <h1>

    const[descricao2, setdescricao2] = useState("?"); // Variavel onde é guardado o 2º input
    const[descricao3, setdescricao3] = useState("shh segredo"); // Texto que aparece no <h1> de botão

    const[cor, setcor] = useState("black"); // Mudar a cor

    const[var1, setvar1] = useState(false); // Variavel do checkbox


    function mudar(e){
        let novovalor = e.target.value;
        setdescricao1(novovalor)
    }

    function muda2(e){
        let novovalor2 = e.target.value;
        setdescricao2(novovalor2)
    }

    function mudartitulo2(e){
        setdescricao3(descricao2)
    }

    function mudarcor(e){
      let novacor = e.target.value;
      setcor(novacor)
    }

    function check(e){
        let novovalor3 = e.target.checked;
        setvar1(novovalor3)
    }


    return(

        <div className="Funcoes" style={{backgroundColor: cor}}>

            <h1>Página - Teste UseState</h1>
            <div className="funcao-texto">
                <input onChange={mudar}></input>
                <h2>{descricao1}</h2>
            </div>

            <div className="funcao-texto2">
              <input type="text" placeholder="digita ae"  onChange={muda2}></input>
              <button onClick={mudartitulo2}>muda texto</button>
              <h1>{descricao3}</h1>
            </div>

            <div className="trocacor">
              <h1>Cor: {cor} </h1>
              <input type="color" onChange={mudarcor}/>
            </div>

            <div className="checkboxdaquelejeito">
                <h1>gosta de faze programa? {var1 ? "amo" : "nao"}</h1>
                <input type="checkbox" onClick={check}/>
            </div>

        </div>

    );

};