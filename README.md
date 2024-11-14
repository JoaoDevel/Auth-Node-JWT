<h1>Node Auth JWT 🚀</h1>

<h2>Descrição 📝</h2>
<p>Esta API de <strong>autenticação de usuários</strong> é construída com <strong>Node.js</strong>, <strong>JWT (JSON Web Tokens)</strong>, <strong>bcrypt</strong>, <strong>MongoDB</strong> e <strong>Mongoose</strong>. Seu objetivo é fornecer um sistema de autenticação seguro e simples, permitindo <strong>registro</strong>, <strong>login</strong> e acesso a dados privados com base em tokens JWT.</p>

<h2>Tecnologias ⚙️</h2>
<ul>
    <li><strong>Node.js</strong>: Plataforma para JavaScript no servidor.</li>
    <li><strong>Express.js</strong>: Framework para construir APIs rapidamente.</li>
    <li><strong>MongoDB</strong>: Banco de dados NoSQL para armazenar os usuários.</li>
    <li><strong>Mongoose</strong>: ODM para MongoDB, facilitando a manipulação de dados.</li>
    <li><strong>bcrypt</strong>: Criptografia de senhas.</li>
    <li><strong>jsonwebtoken (JWT)</strong>: Autenticação baseada em tokens.</li>
    <li><strong>dotenv</strong>: Gerenciamento de variáveis de ambiente.</li>
</ul>

<h2>Como Rodar ⚡</h2>
<ol>
    <li><strong>Clone o repositório</strong>:
        <pre><code>git clone https://github.com/seuusuario/node-auth-jwt.git
cd node-auth-jwt</code></pre>
    </li>
    <li><strong>Instale as dependências</strong>:
        <pre><code>npm install</code></pre>
    </li>
    <li><strong>Crie o arquivo <code>.env</code></strong>:
        <pre><code>DB_USER=seu_usuario
DB_PASS=sua_senha
SECRET=sua_chave_secreta</code></pre>
    </li>
    <li><strong>Inicie o servidor</strong>:
        <pre><code>npm start</code></pre>
        A API estará disponível em <code>http://localhost:3001</code>.
    </li>
</ol>

<h2>Endpoints 📡</h2>

<h3><strong>POST <code>/auth/register</code></strong>: Registra um novo usuário.</h3>
<p><strong>Exemplo de Body</strong>:</p>
<pre><code>
{
  "name": "Nome",
  "email": "email@exemplo.com",
  "password": "senha123",
  "confirmPassword": "senha123"
}
</code></pre>
<p><strong>Resposta</strong>:</p>
<pre><code>
{
  "message": "Usuário criado com sucesso"
}
</code></pre>

<h3><strong>POST <code>/auth/login</code></strong>: Realiza login e retorna um token JWT.</h3>
<p><strong>Exemplo de Body</strong>:</p>
<pre><code>
{
  "email": "email@exemplo.com",
  "password": "senha123"
}
</code></pre>
<p><strong>Resposta</strong>:</p>
<pre><code>
{
  "message": "Autenticação realizada com sucesso!",
  "token": "jwt_token_aqui"
}
</code></pre>

<h3><strong>GET <code>/user/:id</code></strong>: Acessa dados de um usuário (protegido por JWT).</h3>
<p><strong>Exemplo de Header</strong>:</p>
<pre><code>
{
  "Authorization": "Bearer seu_token_jwt_aqui"
}
</code></pre>
<p><strong>Resposta</strong>:</p>
<pre><code>
{
  "user": {
    "_id": "user_id",
    "name": "Nome",
    "email": "email@exemplo.com"
  }
}
</code></pre>

<h2>Estrutura 📂</h2>
<pre><code>
node-auth-jwt/
├── models/
│   └── User.js       # Modelo de usuário
├── .env              # Variáveis de ambiente
├── app.js            # Arquivo principal
├── package.json      # Dependências e scripts
└── README.md         # Este arquivo
</code></pre>
