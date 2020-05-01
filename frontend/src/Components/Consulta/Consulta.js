import React, { useState } from "react";
import Main from "../../Templates/Main/Main";
import axios from "axios";
import "./Consulta.css";

const Consulta = () => {
  const [valor, setValor] = useState("");

  async function fetchData(e) {
    const json = { cod_empresa: e.target.value };

    try {
      const resp = await axios.post("http://127.0.0.1:5001/consulta", json);

      setValor("R$" + resp.data.valor.slice(0, -2));

      console.log(resp.data.valor);
    } catch {
      console.log("erro na api");
      setValor("try again");
    }
  }
  return (
    <Main>
      <div className="consluta-padrao">
        <div className="card">
          <div className="form-group companies-select">
            <div className="label-companies">Selecione uma empresa:</div>
            <select className="form-control" onChange={fetchData}>
              {/* <option value="" disabled selected >::Selecione::</option> */}
              <option value="VALE3.SA">Vale</option>
              <option value="ITUB4.SA">Itau-Unibanco</option>
              <option value="ABEV3.SA">Ambev</option>
              <option value="PETR4.SA">Petrobras</option>
              <option value="BBDC4.SA">Bradesco</option>
              <option value="BCSA34.SA">Santander</option>
              <option value="VIVT4.SA">Telefônica</option>
              <option value="BBAS3.SA">Banco do Brasil</option>
              <option value="ITSA4.SA">Itausa</option>
              <option value="WEGE3.SA">Weg</option>
            </select>
          </div>

          <div className="label-result">Preço da ação:</div>
          <h1 id="result">{valor}</h1>
        </div>
      </div>
    </Main>
  );
};

export default Consulta;
