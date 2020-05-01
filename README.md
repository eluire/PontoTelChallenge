# Desafio PontoTel

## Introdução:

Projeto faz parte do processo seletivo da empresa [PontoTel](https://www.pontotel.com.br/). O desafio consiste em implementar as seguintes etapas:

- Parte 1 - Apresente o número de pontos do bovespa:

- - (Back) Crie um endpoint que retorne o número de pontos do bovespa no formato JSON, utilizando o alpha vantage.
- - (Front) Apresente o número de pontos do bovespa em uma página html.

- Parte 2 - Apresente o número de pontos de outras empresas:

- - (Back) Crie um endpoint que recebe as informações de uma empresa e retorne o seu atual valor no formato JSON.
- - (Back) Valide o input da API para garantir que ela sempre esteja correta.
- - (Back) Escreva testes para api.
- - (Front) Escolha algumas empresas(ex: Petrobras(PETR4), Itaú Unibanco(ITUB4) e Vale(VALE3)) e em uma página html deixe o usuário selecione uma delas para realizar a consulta do seu preço no momento.

- (Opcional) Parte 3 - O usuário escolher outras empresas:

- - (DB) Modele Usuário, Empresa e Cotação em um banco de dados relacional (Postgres).

- - (Back) Para cada um dos modelos acima crie uma rota CRUD.

- - (Front) Em uma página html, deixe o usuário adicionar uma empresa para a qual ele quer consultar o seu preço.

# Desenvolvimento

## Tecnologías utilizadas:

Para o desenvolvimento desse projeto utilizei as seguintes tecnologias/dependências:

### Frontend

- [Javascript](https://www.ecma-international.org/ecma-262/10.0/index.html#Title)
- [React.js](https://pt-br.reactjs.org/)
- [Bootstrap](https://getbootstrap.com/)
- [FontAwesome](https://fontawesome.com/)

### Backend

- [Python](https://www.python.org/)
- [Flask](https://flask.palletsprojects.com/en/1.1.x/)
- [PostgresSql](https://www.postgresql.org/)
- [psycopg2](https://www.psycopg.org/docs/)
- [SQLAlchemy](https://www.sqlalchemy.org/)

## API endpoints:

A api construída para servir nossa aplicação Apresenta 5 rotas principais.

- Retorna valor do índice bovespa em tempo real

        @app.route('/bovespa', methods  = ['GET'])

  **Request:**


        http://localhost:5001/bovespa


    **Response:**


    	{
    	  "valor": "80.506"
    	}

- Retorna o preço da ação da empresa selecionada

        @app.route('/consulta', methods  = ['POST'])

  **Request:**


    	  http://localhost:5001/consulta

    	  {
    		  cod_empresa : "PETR4"
    	  }




    **Response:**


    	{
    	  "valor": "23.70"
    	}

- Salva empresas selecionadas no banco de dados

        @app.route('/save-personalizada', methods  = ['POST'])

  **Request:**


    	  http://localhost:5001/save-personalizada

    	  {
    		  cod_empresa : "PETR4",
    		  empresa : "Petrobras"
    	  }




    **Response:**

    	'Empresas adicionadas!'

- Retorna as empresas presentes no banco de dados

      	@app.route('/export-personalizada', methods  = ['GET'])

  **Request:**


    	  http://localhost:5001/export-personalizada

    **Response:**

    	  [
    	    {
    	      "cod_empresa": "VALE3.SA",
    	      "empresa": "Vale",
    	      "price": "44.8600"
    	    },
    	    {
    	      "cod_empresa": "ITUB4.SA",
    	      "empresa": "Itaú",
    	      "price": "22.7700"
    	    }
    	  ]

- Deleta do banco de dados as empresas selecionadas

      	@app.route('/delete-personalizada', methods  = ['DELETE'])


    **Request:**


    	  http://localhost:5001/delete-personalizada

    	  {
    		  cod_empresa : "PETR4"
    	  }
    **Response:**

    	  "Empresas removidas"

Para fazer a consulta aos dados da bolsa de valores em tempo real, foi utilizada a API [Alphavantage](https://www.alphavantage.co/documentation/)

## Opções do Frontend:

A interface da aplicação permite navegar entre 4 abas: Home, Consulta Bovespa, Consulta empresas e Consulta Personalizada.

A tela inicial permite o usuário ter uma visão geral sobre o projeto bem como o acesso ao github e linkedin do desenvolvedor.
![Home](/frontend/src/assets/home.png)

Na tela de consulta bovespa é possível visualizar a pontuação em tempo real do índice, Já a tela de consulta personalizada, oferece a possibilidade do usuário escolher um empresa e observar o preço de sua ação em tempo real.

A última tela é de consulta personalizada, a mesma permite ao usuário montar uma espécie de dashboard com a contação das maiores empresas da bolsa brasileira. Através do menu superior é possível adicionar e excluir empresas do dashboard, se usuário sair da aplicação o mesmo poderá visualizar as mesmas empresas selecionadas anteriormente.

# Conclusão

## Dificuldades enfrentadas:

- **Falta de Experiencia com as linguagens solicitadas:** Construir uma API com Flask e python foi um grande desafio, pois não tinha utilizado essa linguagem para aplicações web. Sem dúvida foi um grande aprendizado, quero continuar estudando para aprofundar meu conhecimento e construir aplicações mais complexas.
- **Limitações do AlphaVantage:** A API indicada para busca dos dados da bolsa, em sua versão gratuita é extremamente limitada, sendo possível realizar no máximo de 5 a 8 requisições por minuto. Outro fator prejudicial é a forma como a resposta é construída, o objeto retornado não é facilmente acessível pois suas chaves não são strings intuitivas.
- **Minhas limitações:** tendo em vista que sou novo na área de desenvolvimento web, não tenho uma vasta bagagem de conhecimento, isso faz com que eu demore mais para terminar uma funcionalidade pois tenho que estudar e pesquisar bastante para depois colocar a "mão na massa".

## Palavras finais

Gostei muito de ter participado do processo seletivo, me fez reafirmar em minha mente qual carreira qual devo seguir. Quando nós vamos atrás do conhecimento e batalhamos para aprender novas tecnologias é muito gratificante e recompensador, todo o esforço vale a pena!
