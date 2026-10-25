import { useState } from "react";
import './index.scss';
import { Link } from 'react-router-dom';

export default function Calc(){

    const[num1, setnum1] = useState(""); 
    const[num2, setnum2] = useState(""); // Variáveis de soma
    const[resp, setresp] = useState("");

    const[num3, setnum3] = useState("");
    const[num4, setnum4] = useState(""); // Variáveis de subtração
    const[resp2, setresp2] = useState("");

    const[num5, setnum5] = useState("");
    const[num6, setnum6] = useState(""); // Variáveis de multiplicação
    const[resp3, setresp3] = useState("");

    const[num7, setnum7] = useState("");
    const[num8, setnum8] = useState(""); // Variáveis de divisão
    const[resp4, setresp4] = useState("");

    function somar(e){
        let soma = Number(num1) + Number(num2);
        setresp(soma)
    }

    function subtrair(e){
        let subtrair = Number(num3) - Number(num4);
        setresp2(subtrair)
    }

    function multiplicar(e){
        let multiplicar = Number(num5) * Number(num6);
        setresp3(multiplicar)
    }

    function dividir(e){
        let dividir = Number(num7) / Number(num8);
        setresp4(dividir)
    }

    return(

        <div className="Pagina-Calc">

            <h1>Página - Calculadora</h1>

            <div className="calc">
                <div className="inputs">
                
                    <div className="somar">
                        <input type="text" value = {num1} onChange={(e) => setnum1(e.target.value)} />
                        <input type="text" value = {num2} onChange={(e) => setnum2(e.target.value)} />
                
                        <div>=</div>
                        <div className="resp">{resp}</div>
                        <button onClick={somar}>+ | Adição</button>
                
                    </div>
                
                    <div className="subtrair">
                        <input type="text" value = {num3} onChange={(e) => setnum3(e.target.value)} />
                        <input type="text" value = {num4} onChange={(e) => setnum4(e.target.value)} />
                        <div>=</div>
                        <div className="resp">{resp2}</div>
                        <button onClick={subtrair}>- | Subtrair</button>
                    </div>
                    <div className="multiplicar">
                        <input type="text" value = {num5} onChange={(e) => setnum5(e.target.value)} />
                        <input type="text" value = {num6} onChange={(e) => setnum6(e.target.value)} />
                        <div>=</div>
                        <div className="resp">{resp3}</div>
                        <button onClick={multiplicar}>× | Multiplicar</button>
                    </div>
                    <div className="divisao">
                        <input type="text" value = {num7} onChange={(e) => setnum7(e.target.value)} />
                        <input type="text" value = {num8} onChange={(e) => setnum8(e.target.value)} />
                        <div>=</div>
                        <div className="resp">{resp4}</div>
                        <button onClick={dividir}>÷ | Dividir</button>
                    </div>
                </div>
            </div>
            

        </div>

    )

};