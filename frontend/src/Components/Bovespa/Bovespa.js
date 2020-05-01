import React, { useEffect, useState } from "react";
import axios from "axios";
import Main from "../../Templates/Main/Main";
import "./Bovespa.css";

const Bovespa = () => {
  const [valor, setValor] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const resp = await axios.get("http://127.0.0.1:5001/bovespa");

      setValor(resp.data.valor);

      console.log(resp.data.valor);
    } catch {
      console.log("erro na api");
      setValor("try again");
    }
  }

  // useEffect(() => {
  //   console.log(valor);
  // }, [valor]);
  return (
    <Main>
      <div className="container">
        <div className="bovespa">
          <h1>Bovespa</h1>
          <button className="btn btn-dark" type="button" onClick={fetchData}>
            <i className="fa fa-refresh"></i>
          </button>
          <h2>{valor}</h2>
        </div>
      </div>
    </Main>
  );
};

export default Bovespa;
