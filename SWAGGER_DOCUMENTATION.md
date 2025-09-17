# 📚 Documentação Swagger - Commerce Simple API

## 🌐 Acesso à Documentação

A documentação interativa da API está disponível através do Swagger UI:

- **Desenvolvimento**: http://localhost:8080/swagger-ui.html
- **OpenAPI JSON**: http://localhost:8080/v3/api-docs

## 🔐 Autenticação

A API utiliza autenticação JWT (JSON Web Token). Para acessar endpoints protegidos:

1. **Faça login** através do endpoint `/auth/user`
2. **Copie o token** retornado no campo `acess_token`
3. **Clique em "Authorize"** no Swagger UI
4. **Insira o token** no formato: `Bearer {seu_token_aqui}`

## 📋 Endpoints Documentados

### 🔑 Autenticação
- **POST** `/auth/user` - Autenticar usuário
- **POST** `/register/user` - Registrar novo usuário

### 🛍️ Produtos (Públicos)
- **GET** `/api/products/` - Listar todos os produtos
- **GET** `/api/products/{id}` - Buscar produto por ID

### 🛒 Produtos (Administrativos) - Requer Autenticação ADMIN
- **GET** `/api/admin/products/getAll` - Listar produtos (admin)
- **POST** `/api/admin/products/create` - Criar produto
- **PUT** `/api/admin/products/update` - Atualizar produto
- **DELETE** `/api/admin/products/delete` - Deletar produto

### 🛒 Carrinho - Requer Autenticação USER
- **GET** `/api/cart/get-items?userid={id}` - Listar itens do carrinho
- **POST** `/api/cart/?userid={id}` - Adicionar item ao carrinho
- **PUT** `/api/cart/{itemId}/quantity?quantity={qty}` - Atualizar quantidade
- **DELETE** `/api/cart/{itemId}` - Remover item do carrinho
- **DELETE** `/api/cart/clear?userid={id}` - Limpar carrinho

## 📊 Schemas Documentados

### DTOs de Requisição
- **AuthUserRequestDTO** - Dados para login
- **RegisterUserRequestDTO** - Dados para registro

### DTOs de Resposta
- **AuthUserResponseDTO** - Resposta do login com token JWT
- **RegisterUserResponseDTO** - Resposta do registro

### Entidades
- **ProductEntity** - Produto do catálogo
- **CartItemEntity** - Item do carrinho
- **UserEntity** - Usuário do sistema

## 🎯 Exemplos de Uso

### 1. Registrar um novo usuário
```json
POST /register/user
{
  "username": "usuario123",
  "password": "senha123",
  "email": "usuario@email.com",
  "name": "João Silva",
  "role": "USER"
}
```

### 2. Fazer login
```json
POST /auth/user
{
  "username": "usuario123",
  "password": "senha123"
}
```

### 3. Listar produtos (público)
```http
GET /api/products/
```

### 4. Criar produto (admin)
```json
POST /api/admin/products/create
Authorization: Bearer {token}
{
  "name": "Smartphone XYZ",
  "price": 1299.99,
  "description": "Smartphone com tela de 6.1 polegadas e câmera de 48MP",
  "imageURL": "https://example.com/smartphone.jpg"
}
```

### 5. Adicionar item ao carrinho
```json
POST /api/cart/?userid=123e4567-e89b-12d3-a456-426614174000
Authorization: Bearer {token}
{
  "product": {
    "productId": "789e0123-e89b-12d3-a456-426614174002"
  },
  "quantity": 2,
  "name": "Smartphone XYZ"
}
```

## 🔍 Códigos de Resposta

| Código | Descrição |
|--------|-----------|
| **200** | Sucesso |
| **201** | Criado com sucesso |
| **204** | Sucesso sem conteúdo |
| **400** | Dados inválidos |
| **401** | Não autorizado |
| **403** | Acesso negado |
| **404** | Não encontrado |
| **500** | Erro interno do servidor |

## 🛡️ Segurança

### JWT Token
- **Algoritmo**: HMAC256
- **Expiração**: 1 hora (3600000ms)
- **Claims**: username, role, userId
- **Header**: `Authorization: Bearer {token}`

### Roles
- **USER**: Acesso ao carrinho e produtos públicos
- **ADMIN**: Acesso completo incluindo gerenciamento de produtos

## 📝 Validações

### Produto
- **name**: Obrigatório, não pode ser vazio
- **price**: Obrigatório, deve ser um valor positivo
- **description**: 5-200 caracteres
- **imageURL**: Opcional

### Usuário
- **name**: Obrigatório
- **username**: 3-10 caracteres
- **email**: Formato de email válido
- **password**: 6-400 caracteres
- **role**: USER ou ADMIN

### Item do Carrinho
- **quantity**: Obrigatório, valor positivo
- **name**: Obrigatório

## 🚀 Como Testar

1. **Acesse** http://localhost:8080/swagger-ui.html
2. **Registre** um usuário através de `/register/user`
3. **Faça login** através de `/auth/user`
4. **Copie o token** e clique em "Authorize"
5. **Teste os endpoints** protegidos
6. **Explore** os schemas e exemplos fornecidos

## 📖 Recursos Adicionais

- **Schemas detalhados** com exemplos para cada campo
- **Códigos de erro** específicos para cada endpoint
- **Validações** documentadas com mensagens em português
- **Exemplos de requisição** e resposta para cada endpoint
- **Documentação de segurança** com instruções de autenticação

---

**Desenvolvido com ❤️ usando Spring Boot e Swagger/OpenAPI**
