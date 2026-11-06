import { useState } from "react";
import './index.scss';

export default function Acai(){


    const[qtd, setqtd] = useState(); 
    const[peq, setpeq] = useState(false);
    const[med, setmed] = useState(false);
    const[grd, setgrd] = useState(false);
    const[ativarcupom, setativarcupom] = useState(false);
    const[cupom, setcupom] = useState("");
    const[resp, setresp] = useState("");

    const valorpeq = 10;
    const valormed = 15;
    const valorgrd = 20;


    function resultado(){

        let valor = 0;      

        if(peq == true){
            valor = valorpeq * qtd
        }

        else if(med == true){
            valor = valormed * qtd
        }

        else if(grd == true){
            valor = valorgrd * qtd
        }

        if(ativarcupom == true){

            if(cupom == "CUPOM"){
                    valor = valor * 0.5
            }

        }

        setresp(valor)

    }




    return(

        <div className="Pagina-Acai">

            <h1 className="1">Página - Açaí</h1>

            <div className="acaii">
                <div className="acaimemo">
                
                    <label for="quantidade">Quantidade de Açaís:</label>
                    <input placeholder="Insira a quantidade"  name="quantidade"   type="number" value = {qtd} onChange={(e) => setqtd(e.target.value)}/>


                    <h3>Tamanhos:</h3>

                    <section>
                        <label for="tampeq">Pequeno </label>
                        <input type="checkbox" name="tampeq" value="pequeno" checked={peq} onChange={(e) => setpeq(e.target.checked)} />
                        
                        <label for="tammed">Médio </label>
                        <input type="checkbox" name="tammed" value="medio" checked={med} onChange={(e) => setmed(e.target.checked)} />
                        <label for="tamgrd">Grande </label>
                        <input type="Checkbox" name="tamgrd" value="grande" checked={grd} onChange={(e) => setgrd(e.target.checked)} />
                    </section>


                    <div className="inputcupom">
                        <label for="ativarcupom">Ativar cupom: </label>
                        <input type="checkbox"  name="ativarcupom"    value = {ativarcupom} onChange={(e) => setativarcupom(e.target.checked)} />
                        <div></div>
                        <label for="cupom">Cupom de Desconto: </label>
                        <input placeholder="Insira o cupom"  name="cupom"   type="text" value = {cupom} onChange={(e) => setcupom(e.target.value)} />
                    </div>

        
                    <button onClick={resultado}>Calcular preço</button>

                    <h2>{resp}</h2>

                </div>
            </div>
            

        </div>

    )

};