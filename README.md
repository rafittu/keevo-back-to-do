# 📝 Back-end da aplicação UmTrem ToDo

###

<br>

O projeto UmTrem ToDo consiste em uma API desenvolvida para simplificar a gestão de tarefas e afazeres diários. Com recursos que permitem ao usuário criar, visualizar, atualizar e excluir suas atividades com facilidade, a plataforma visa aumentar a produtividade e a organização na rotina diária.

Além disso, a API realiza integração com a [API ALMA](https://github.com/rafittu/back-alma), permitindo a comunicação entre as duas plataformas para determinadas tarefas, como a criação de novos usuários e autenticação.

Inspirada na cultura mineira, onde "um trem" pode significar qualquer coisa, celebramos a riqueza regional de Minas Gerais incorporando-a em uma solução tecnológica que visa simplificar e organizar as atividades cotidianas dos usuários!

Para uma experiência completa, siga o passo-a-passo abaixo para iniciar o servidor e, depois, inicie a [interface front-end](https://github.com/rafittu/keevo-front-to-do) para interagir com a API!

<br>

## Tecnologias

Este projeto utiliza as seguintes tecnologias:

- **Node.js** com framework **NestJS** e **TypeScript**;
- **Prisma ORM** para comunicação e manipulação do banco de dados **PostgreSQL**;
- **Passport.js** para implementação de estratégias de autenticação;

- **Docker** como uma ferramenta de containerização;
- **Jest** para execução dos testes unitários;
- **Swagger** para documentação da API;

- **[API externa](https://github.com/rafittu/back-alma)**: API utilizada para serviços de usuário e autenticação.

<br>

## Funcionalidades

Antes de gerenciar tarefas, é necessário que o usuário realize o cadastro na plataforma. Foi desenvolvido um CRUD de usuário para tal funcionalidade.

<br>

Realizado o cadastro, é disponibilizado um endpoint para autenticação, onde após validação de email e senha, a requisição retorna um token de acesso para ser utilizado nas próximas requisições.

<br>

Após cadastro e autenticação na API, o usuário consegue acessar o CRUD para gerenciar suas tarefas com as seguintes funcionalidade:

- Criar uma tarefa:
```
{
	"title": "Learn Quantum Computing",
	"description": "Learn quantum computing with Python and IBM Quantum Experience using Qiskit",
	"priority": "HIGH",
	"dueDate": "2024-04-18",
	"categories": ["STUDIES", "PROJECTS"]
}
```

<br>

- Buscar uma ou mais tarefas por filtro:
    - **Id**: id da tarefa;
    - **Data de vencimento**: prazo limite para finalizar tarefa;
    - **Completado em**: data em que a tarefa foi concluída;
    - **Categoria**: "WORK", "STUDIES", "PERSONAL", "HEALTH", "PROJECTS", "SHOPPING", "LEISURE", "TRAVEL", "FINANCES", "EVENTS";
    - **Status**: "TODO", "DOING", "HOLD", "DONE";
    - **Prioridade**: "LOW", "MEDIUM", "HIGH", "URGENT";
    - Caso não seja aplicado nenhum filtro, todas as tarefas do usuário é retornada.

  <br>

- Editar uma tarefa da lista;
  
<br>

- Deletar uma tarefa da lista;

<br>

## Requisitos para rodar a aplicação

- NodeJs;
- Docker (para execução do banco de dados PostgreSQL)
- [API externa](https://github.com/rafittu/back-alma) em execução. Instruções de como iniciar o servidor estão disponíveis no repositório.

<br>

## Instalação

Clonando o repositório:

```bash
$ git clone git@github.com:rafittu/keevo-back-to-do.git
```

Instalando as dependências:

```bash
$ cd back-to-do
$ npm install
```

<br>

## Iniciando o app

Crie um arquivo `.env` na raiz do projeto e preencha as informações de acordo com o arquivo `.env.example` disponível.

Execute o banco de dados PostgreSQL usando Docker:

```bash
$ docker-compose up -d
```

Iniciando o servidor:

```bash
# modo de desenvolvimento
$ npm run start

# modo de observação
$ npm run start:dev
```

<br>

## Testes

Os testes desempenham um papel fundamental na garantia da qualidade do código e na confiabilidade da aplicação. Com isso, à API possui uma cobertura de testes unitários abrangente, com aproximadamente 100% de cobertura em cada parte essencial do código, garantindo a qualidade e o correto funcionamento do sistema.

Para executar os testes unitários, utilize o seguinte comando:

```bash
$ npm run test
```

Você também pode gerar um relatório de cobertura dos testes para verificar quais partes do código foram testadas. Para gerar esse relatório, utilize o seguinte comando:

```bash
$ npm run test:cov
```

<br>

## Documentação

A documentação completa da API com suas rotas e exemplos está disponível através do Swagger. Para acessá-la, siga as etapas abaixo:

- Certifique-se de ter a API em execução localmente ou em um ambiente acessível;
- Abra um navegador da web e acesse a seguinte URL: `http://localhost:3001/v1/api-doc` (substitua `3001` pelo número da porta inserida no arquivo `.env`);
- A documentação interativa da API será exibida no Swagger UI, onde você poderá explorar todos os endpoints, seus parâmetros e exemplos de solicitação.

<br>

## Uso

Com a [API externa](https://github.com/rafittu/back-alma) e a Back-end To-Do List em execução, você pode também iniciar a [interface front-end](https://github.com/rafittu/keevo-front-to-do) e começar a explorar as funcionalidades!

<br>

##

<p align="right">
  <a href="https://www.linkedin.com/in/rafittu/">Rafael Ribeiro 🚀</a>
</p>
