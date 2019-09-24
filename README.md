# Meu Alelo Web Scrapping

Esse projeto consiste em fazer "Web scrapping" do site Meu Alelo.
No portal, é possível buscar informações sobre os cartões voucher da Alelo, e o Web Scrapping objetiva pegar as informações principais e trazer ao usuário em uma só tela, de forma rápida e fácil

---

O projeto depende do Node.js para seu funcionamento. Para desenvolvimento, foi utilizada a versão **10.15.2** do Node. É necessário rodar o projeto em uma versão igual ou superior. A versão mais recente pode ser encontrada no [site oficial do Node.js](https://nodejs.org/en/ "site oficial do Node.js"). Além disso, o gerenciador de pacotes do Node.js (**npm**), foi utilizado nesse projeto, na sua versão **5.8.0**. Da mesma forma, deve-se utilizar uma versão igual ou superior para execução do projeto.

---

###Instalação de Pacotes

Para executar o projeto pela primeira vez, é necessária rodar o seguinte comando:

`npm install`

O comando acima, fará a instalação de todos os pacotes necessários para funcionamento correto da ferramenta. Sendo que os pacotes e suas versões estão definidos no arquivo `package.json`e listados abaixo:



    ejs >= 2.7.1
    express >= 4.17.1
	mongoose >= 5.7.1
	puppeteer >= 1.20.0
	

### Configuração

Antes de rodar o projeto, deve-se configurar o caminho e base do banco de dados MongoDB. Para isso, deve-se acessar o arquivo `src/database.ejs`e alterar os valores das variáveis **server** e **database**, sendo que, o valor à ser setado na variável **server** é a URL do MongoDB com a porta, e o valor à ser setado na variável **database** é o nome da base de dados criada. Conforme exemplo:


    const server = '127.0.0.1:27017';
    const database = 'alelo';
	

### Execução

Após seguir os passos acima, o projeto já pode ser executado e testado. Para tanto, deve-se rodar o seguinte comando:

`node app.js`

Esse comando deverá levantar o servidor do Node.js na porta **3000**, conforme definido no arquivo **app.js**. Caso seja necessário alterar a porta, deverá ser feita essa alteração no arquivo **app.js**, na constante **port**.

Com o servidor rodando, utilize um browser para acessar o link local:

`localhost:3000/`(Se a porta foi alterada, deve ser alterada também nesse link)

À partir desse ponto, será possível visualizar dois campos de texto para inserção de login e senha de acesso ao portal **Meu Alelo**.

Ao inserir os dados, e clicar no botão **Enviar**, a ferramenta irá buscar as informações referentes ao cartão no portal, e exibirá o retorno na tela para o usuário.

Obs: Nesse ponto, é importante ressaltar que, o sistema buscará pela primeira vez os dados e salvará na base MongoDB. Após isso, cada nova busca no mesmo CPF, fará um **update** no banco de dados.
