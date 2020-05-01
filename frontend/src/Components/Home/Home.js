import React from "react";
import Main from "../../Templates/Main/Main";
import "./Home.css";

const Home = () => {
  return (
    <Main>
      <div className="home-card">
        <div className="display-4">PontoTel Challenge</div>
        <hr />
        <div className="abstract">
          <p className="mb-3">
            Aplicação criada para o processo seletivo da empresa PontoTel.
            Projeto consiste na implementação de algumas funcionalidades de
            consulta à dados da bolsa de valores tais como: Pontução do índice
            bovespa e preço de ações das maiores empresas cadastradas na bolsa.
            O sistema permite a navegação entre as funcionalidades citadas acima
            e acrescenta a opção de escolha das empresas que o usuário deseja
            acompnhar, sendo o mesmo capaz de adicionar e excluir empresas do
            dashboard.
          </p>

          <p>Tecnologias utilizadas:</p>
          <ul>
            <li>
              Frontend
              <ul>
                <li>React</li>
                <li>Bootstrap</li>
                <li>Font Awesome</li>
              </ul>
            </li>
            <li>Backend</li>
            <ul>
              <li>Python</li>
              <li>Flask</li>
              <li>PostgresSql</li>
            </ul>
          </ul>
        </div>
      </div>
    </Main>
  );
};

export default Home;
