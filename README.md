# 📚 Sistema de Gerenciamento de Biblioteca

Uma API RESTful completa para gerenciamento de biblioteca, desenvolvida com Node.js utilizando o Sequelize como ORM, integrando com Google Books API para enriquecimento automático dos dados dos livros.

## ✨ Funcionalidades Principais

### Integração com Google Books API
- Cadastro automatizado de livros usando dados oficiais do Google Books
- Enriquecimento dos dados com:
  - Título e autor verificados
  - Descrição detalhada
  - Data de publicação
  - ISBN
  - Link direto para Google Books

### Sistema de Empréstimos Robusto
- Gerenciamento transacional de empréstimos
- Histórico completo de todas as operações
- Sistema de status para acompanhamento
- Validações de disponibilidade

### Controle de Usuários
- Cadastro com validação de email único
- Perfil completo com histórico de empréstimos
- Sistema de atualização com verificações de segurança

## 🛠️ Tecnologias Utilizadas

- Node.js
- Express
- Sequelize ORM
- MySQL
- Axios para integrações

## 📋 Endpoints Principais

### Livros
```javascript
POST /livros/adicionar/:titulo - Adiciona livro via Google Books API
GET /livros - Lista todos os livros
GET /livros/:id - Busca livro específico
PUT /livros/:id - Atualiza informações do livro
DELETE /livros/:id - Remove livro do sistema
```

### Empréstimos
```javascript
POST /emprestimos - Cria novo empréstimo (com transação)
GET /emprestimos/usuario/usuario_id - Lista empréstimos do usuário
PUT /emprestimos/:id - Atualiza status do empréstimo
```

### Usuários
```javascript
POST /usuarios - Cria novo usuário
GET /usuarios - Lista todos os usuários
GET /usuario/:id - Busca usuário específico
PUT /usuario/:id - Atualiza dados do usuário
DELETE /usuarios/:id - Remove usuário do sistema
```

### Histórico de Empréstimos
```javascript
GET /historico-emprestimos - Lista todo histórico de empréstimos
GET /historico-emprestimos/:id - Busca histórico específico
PUT /historico-emprestimos/:id - Atualiza registro do histórico
```

## 🚀 Como Executar

1. Clone o repositório
```bash
git clone [url-do-seu-repositorio]
```

2. Instale as dependências
```bash
npm install
```

3. Configure a conexão com o banco de dados
```bash
no arquivo config.json dentro da pasta config
```

4. Execute as migrations
```bash
npx sequelize-cli db:migrate
```

5. Inicie o servidor
```bash
npm start
