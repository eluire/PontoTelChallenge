import React, { useState, useEffect } from "react";
import axios from "axios";
import Main from "../../Templates/Main/Main";
import "./ConsultaPersonalizada.css";

const ConsultaPersonalizada = () => {
  const [state_price, setStatePrice] = useState([]);
  const [state_no_Price, setStateNoPrice] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [_delete, setDelete] = useState(false);
  const [refresh, setRefresh] = useState(false);
  // const [checkboxes, setCheckBoxes] = useRef(null);
  var selectedCheckboxes = new Set();
  const [lista_emp_disponiveis, set_lista_emp_disponiveis] = useState([
    { nome: "Vale", cod_empresa: "VALE3.SA", on: false },
    { nome: "Itaú", cod_empresa: "ITUB4.SA", on: false },
    { nome: "Ambev", cod_empresa: "ABEV3.SA", on: false },
    { nome: "Petrobras", cod_empresa: "PETR4.SA", on: false },
    { nome: "Bradesco", cod_empresa: "BBDC4.SA", on: false },
  ]);
  // { nome: "Santander", cod_empresa: "BCSA34.SA" },
  // { nome: "Telefonica", cod_empresa: "VIVT4.SA" },
  // { nome: "Banco do Brasil", cod_empresa: "BBAS3.SA" },
  // { nome: "Itausa", cod_empresa: "ITSA4.SA" },
  // { nome: "Weg", cod_empresa: "WEGE3.SA" },

  useEffect(() => {
    getEmpresasDb();
  }, []);

  useEffect(() => {
    console.log(state_no_Price);
  }, [state_no_Price]);

  useEffect(() => {
    console.log(lista_emp_disponiveis);
  }, [lista_emp_disponiveis]);

  useEffect(() => {
    if (!isEmpty(state_no_Price)) {
      pushEmpresasDb();
    }
  }, [submit]);

  useEffect(() => {
    if (!isEmpty(state_no_Price)) {
      deleteEmpresasDb();
    }
  }, [_delete]);

  //FUNÇÃO AUXILIAR ---> COLOCAR EM OUTRO ARQUIVO
  function isEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  }

  function isin(chave, obj) {
    obj.map((key) => (key === chave ? true : false));
  }

  async function getEmpresasDb() {
    if (!refresh) {
      try {
        const resp = await axios.get(
          "http://127.0.0.1:5001/export-personalizada"
        );
        resp.data.map((empresa) => {
          setStatePrice((prevstate) => [
            ...prevstate,
            {
              nome: empresa["empresa"],
              cod_empresa: empresa["cod_empresa"],
              preco: empresa["price"],
            },
          ]);
        });
      } catch {
        console.log("erro na api");
        setStatePrice([{ nome: "try again", preco: "" }]);
      }
    } else {
      setTimeout(async () => {
        try {
          const resp = await axios.get(
            "http://127.0.0.1:5001/export-personalizada"
          );
          console.log(resp.data);
          resp.data.map((empresa) => {
            if (isin(empresa["cod_empresa"], state_price)) {
              console.log(empresa["cod_empresa"]);
              setStatePrice((prevstate) => [
                ...prevstate,
                {
                  nome: empresa["empresa"],
                  cod_empresa: empresa["cod_empresa"],
                  preco: empresa["price"],
                },
              ]);
            }
          });
          setStateNoPrice([]);
          setSubmit(!submit);
          setDelete(!_delete);
          setRefresh(!refresh);
        } catch {
          console.log("erro, tela não atualizada");
        }
      }, 2000);
    }
  }

  async function pushEmpresasDb() {
    try {
      console.log("save");
      console.log(state_no_Price);
      const resp = await axios.post(
        "http://127.0.0.1:5001/save-personalizada",
        state_no_Price
      );
      alert(resp.data);
      setRefresh(!refresh);
    } catch {
      alert("Empresa não cadastrada");
    }
  }

  async function deleteEmpresasDb() {
    try {
      console.log(state_no_Price);
      const resp = await axios.delete(
        "http://127.0.0.1:5001/delete-personalizada",
        { data: state_no_Price }
      );
      alert(resp.data);
      setRefresh(!refresh);
    } catch {
      alert("Empresa não deletada");
    }
  }
  function handleButtonSave() {
    Array.isArray(lista_emp_disponiveis) &&
      lista_emp_disponiveis.map((emp) => {
        if (selectedCheckboxes.has(emp["cod_empresa"])) {
          setStateNoPrice((prevstate) => [
            ...prevstate,
            { empresa: emp["nome"], cod_empresa: emp["cod_empresa"] },
          ]);

          set_lista_emp_disponiveis(emp[{ on: true }]);
        }
      });
    setSubmit(!submit);
  }

  function handleButtonDelete() {
    Array.isArray(lista_emp_disponiveis) &&
      lista_emp_disponiveis.map((emp) => {
        if (selectedCheckboxes.has(emp["cod_empresa"])) {
          setStateNoPrice((prevstate) => [
            ...prevstate,
            { empresa: emp["nome"], cod_empresa: emp["cod_empresa"] },
          ]);

          set_lista_emp_disponiveis(emp[{ on: false }]);
        }
      });
    setDelete(!_delete);
  }

  function handleInputCheck(e) {
    const cod = e.target.getAttribute("cod");

    if (selectedCheckboxes.has(cod)) {
      selectedCheckboxes.delete(cod);
    } else {
      selectedCheckboxes.add(cod);
    }
  }

  function createCheckBox() {
    return (
      Array.isArray(lista_emp_disponiveis) &&
      lista_emp_disponiveis.map((empresa) => (
        <div key={empresa.nome} className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            cod={empresa.cod_empresa}
            nome={empresa.nome}
            onClick={handleInputCheck}
          />
          <label className="form-check-label">{empresa.nome}</label>
        </div>
      ))
    );
  }

  function renderToggle() {
    if (toggle) {
      return (
        <form>
          <div className="options">
            {createCheckBox()}
            <div className="buttons">
              <div id="bblue">
                <button
                  id="save"
                  className="btn btn-default"
                  type="submit"
                  onClick={handleButtonSave}
                >
                  Save
                </button>
              </div>
              <div id="bred">
                <button
                  id="delete"
                  className="btn btn-default"
                  type="submit"
                  onClick={handleButtonDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </form>
      );
    } else return null;
  }

  return (
    <Main>
      <div className="main-personalizada">
        <div className="top">
          <div className="button">
            {!isEmpty(state_price) ? (
              <button className="toggle" onClick={() => setToggle(!toggle)}>
                <i className="fa fa-list" aria-hidden="true"></i>
              </button>
            ) : null}
          </div>
          <div className="checkbox">
            {!isEmpty(state_price) ? renderToggle() : null}
          </div>
        </div>
        <div className="dashboard">
          <div className="empresas">
            {state_price.map((empresa) => (
              <button key={empresa.nome}>
                {empresa.nome}
                <br />
                R$ {empresa.preco.slice(0, -2)}
              </button>
            ))}
          </div>
        </div>
      </div>
    </Main>
  );
};

export default ConsultaPersonalizada;
