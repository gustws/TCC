import { useState } from "react";
import './index.scss';

export default function Cinema(){

    const ingreso = 30;

    const[num, setnum] = useState(1); 
    const[meia, setmeia] = useState(false);
    const[cupom, setcupom] = useState("");
    const[resp, setresp] = useState("");




    function resultado(){

        let precoingreso = ingreso * num;      

        if(meia == true){
            precoingreso = precoingreso / 2
        }

        if(cupom == "cupom50"){
            precoingreso = precoingreso * 0.5
        }

        setresp(precoingreso)

    }




    return(

        <div className="Pagina-Ingresso">

            <h1>Página - Ingresos</h1>

            <div className="ingresso">
                <div className="inputs">
                

                    <p>quantidade de ingressos</p>
                    <input type="number" value = {num} onChange={(e) => setnum(e.target.value)}/>

                    <p>meia entrada:</p>
                    <input type="checkbox" checked={meia} onChange={(e) => setmeia(e.target.checked)} />

                    <p>cupom</p>
                    <input type="text" value = {cupom} onChange={(e) => setcupom(e.target.value)} />


                    <button onClick={resultado}>calcular</button>

                    <h1>{resp}</h1>

                </div>
            </div>
            

        </div>

    )

};