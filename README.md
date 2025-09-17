# Commerce Simple

Sistema de e-commerce full-stack desenvolvido com Spring Boot 3.5.5 e React 19.1.1, implementando arquitetura limpa, autenticação JWT, e interface moderna responsiva.

## 📋 Índice

- [Arquitetura](#arquitetura)
- [Stack Tecnológica](#stack-tecnológica)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Modelo de Dados](#modelo-de-dados)
- [API Endpoints](#api-endpoints)
- [Configuração e Deploy](#configuração-e-deploy)
- [Segurança](#segurança)
- [Validações e Regras de Negócio](#validações-e-regras-de-negócio)
- [Frontend](#frontend)
- [Desenvolvimento](#desenvolvimento)

## 🏗️ Arquitetura

### Backend (Spring Boot)
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Controllers   │────│    Use Cases    │────│   Repositories  │
│   (REST API)    │    │ (Business Logic)│    │   (Data Layer)  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│      DTOs       │    │    Entities     │    │   PostgreSQL    │
│ (Data Transfer) │    │   (JPA/Hibernate)│    │   (Database)    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Frontend (React)
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│     Pages       │────│   Components    │────│    Services     │
│  (Route Views)  │    │  (Reusable UI)  │    │   (HTTP API)    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│    Contexts     │    │      Hooks      │    │   External APIs │
│ (State Mgmt)    │    │  (Custom Logic) │    │   (Backend)     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🛠️ Stack Tecnológica

### Backend
| Tecnologia | Versão | Propósito |
|------------|--------|-----------|
| **Spring Boot** | 3.5.5 | Framework principal |
| **Java** | 17 | Linguagem de programação |
| **Spring Security** | 6.x | Autenticação e autorização |
| **Spring Data JPA** | 3.x | Persistência de dados |
| **Hibernate** | 6.x | ORM |
| **PostgreSQL** | 15+ | Banco de dados |
| **JWT (Auth0)** | 4.5.0 | Tokens de autenticação |
| **Swagger/OpenAPI** | 2.8.9 | Documentação da API |
| **Lombok** | 1.18+ | Redução de boilerplate |
| **Hibernate Validator** | 8.0.0 | Validação de dados |
| **Spring Boot Validation** | 3.0.4 | Validação de entrada |

### Frontend
| Tecnologia | Versão | Propósito |
|------------|--------|-----------|
| **React** | 19.1.1 | Biblioteca principal |
| **Vite** | 7.1.2 | Build tool e dev server |
| **React Router DOM** | 7.9.1 | Roteamento |
| **Axios** | 1.12.2 | Cliente HTTP |
| **Lucide React** | 0.400.0 | Ícones |
| **ESLint** | 9.33.0 | Linting |

### Infraestrutura
| Tecnologia | Versão | Propósito |
|------------|--------|-----------|
| **Docker Compose** | 3.x | Containerização |
| **PostgreSQL** | Latest | Banco de dados |
| **Maven** | 3.6+ | Gerenciamento de dependências |

## 📁 Estrutura do Projeto

```
commerce-simple/
├── src/main/java/com/anthony/commercesimple/
│   ├── CommerceSimpleApplication.java          # Classe principal Spring Boot
│   ├── Config/
│   │   ├── CorsConfig.java                     # Configuração CORS
│   │   └── SwaggerConfig.java                  # Configuração OpenAPI/Swagger
│   ├── Controller/
│   │   ├── AuthController.java                 # Autenticação (POST /auth/user)
│   │   ├── CartItemController.java             # Carrinho (GET, POST, PUT, DELETE)
│   │   ├── ProductsController.java             # Produtos Admin (CRUD)
│   │   ├── PublicProductsController.java       # Produtos Públicos (GET)
│   │   └── RegisterController.java             # Registro (POST /register/user)
│   ├── DTO/
│   │   ├── AuthUserRequestDTO.java             # Request de login
│   │   ├── AuthUserResponseDTO.java            # Response de login
│   │   ├── RegisterUserRequestDTO.java         # Request de registro
│   │   └── RegisterUserResponseDTO.java        # Response de registro
│   ├── Entity/
│   │   ├── CartItemEntity.java                 # Entidade item do carrinho
│   │   ├── ProductEntity.java                  # Entidade produto
│   │   └── UserEntity.java                     # Entidade usuário
│   ├── Enums/
│   │   └── Role.java                           # Enum USER/ADMIN
│   ├── Exceptions/
│   │   ├── ProductAlredyExistsException.java   # Exceção produto duplicado
│   │   ├── UserAlredyExists.java               # Exceção usuário duplicado
│   │   └── UserNotFound.java                   # Exceção usuário não encontrado
│   ├── Providers/
│   │   └── JwtProvider.java                    # Geração e validação JWT
│   ├── Repository/
│   │   ├── AuthUserRepository.java             # Repositório autenticação
│   │   ├── CartRepository.java                 # Repositório carrinho
│   │   ├── ProductRepository.java              # Repositório produtos
│   │   └── RegisterUserRepository.java         # Repositório registro
│   ├── Security/
│   │   ├── JwtSecurityFilter.java              # Filtro JWT
│   │   ├── SecurityConfig.java                 # Configuração Spring Security
│   │   └── SecurityFilter.java                 # Filtros de segurança
│   └── UseCases/
│       ├── AuthUserUseCase.java                # Lógica de autenticação
│       ├── CartUseCase.java                    # Lógica do carrinho
│       ├── ProductsUseCase.java                # Lógica de produtos
│       └── RegisterUserUseCase.java            # Lógica de registro
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Icons.jsx                       # Componente de ícones
│   │   │   ├── Navbar.jsx                      # Barra de navegação
│   │   │   ├── ProtectedRoute.jsx              # Rota protegida
│   │   │   └── PublicRoute.jsx                 # Rota pública
│   │   ├── contexts/
│   │   │   ├── AuthContext.jsx                 # Context de autenticação
│   │   │   └── CartContext.jsx                 # Context do carrinho
│   │   ├── pages/
│   │   │   ├── AdminLogin.jsx                  # Login administrativo
│   │   │   ├── Cart.jsx                        # Página do carrinho
│   │   │   ├── Dashboard.jsx                   # Dashboard admin
│   │   │   ├── Home.jsx                        # Página inicial
│   │   │   ├── Login.jsx                       # Login de usuário
│   │   │   └── Register.jsx                    # Registro de usuário
│   │   ├── services/
│   │   │   └── api.js                          # Configuração Axios
│   │   ├── App.jsx                             # Componente principal
│   │   ├── App.css                             # Estilos globais
│   │   ├── index.css                           # Estilos customizados
│   │   └── main.jsx                            # Ponto de entrada
│   ├── package.json                            # Dependências frontend
│   └── vite.config.js                          # Configuração Vite
├── compose.yaml                                # Docker Compose
├── pom.xml                                     # Dependências Maven
└── README.md                                   # Este arquivo
```

## 🗄️ Modelo de Dados

### Entidades JPA

#### UserEntity
```java
@Entity(name = "users")
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID UserId;
    
    @NotBlank
    private String name;
    
    @Length(min = 3, max = 10, message = "Username deve ter no mínimo 3 caracteres e no máximo 10")
    private String username;
    
    @Email
    private String email;
    
    @Length(min = 6, max = 400, message = "Senha deve ter no mínimo 6 caracteres e no máximo 12")
    private String password;
    
    @Enumerated(EnumType.STRING)
    private Role role;
    
    @CreationTimestamp
    private LocalDateTime createdAt;
}
```

#### ProductEntity
```java
@Entity(name = "products")
public class ProductEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID productId;
    
    @NotBlank
    private String name;
    
    @NotNull
    private BigDecimal price;
    
    @Length(min = 5, max = 200, message = "A descrição deve ter no mínimo 5 caracteres e no máximo 200")
    private String description;
    
    private String imageURL;
}
```

#### CartItemEntity
```java
@Entity(name = "cart_items")
public class CartItemEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID cartItemId;
    
    @ManyToOne
    private UserEntity userid;
    
    @ManyToOne(fetch = FetchType.LAZY)
    private ProductEntity product;
    
    @NotNull
    @Positive
    private int quantity;
    
    @NotBlank
    private String name;
}
```

### Relacionamentos
- `CartItemEntity` → `UserEntity` (Many-to-One)
- `CartItemEntity` → `ProductEntity` (Many-to-One)

## 🌐 API Endpoints

### Autenticação
| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|--------------|
| `POST` | `/auth/user` | Login de usuário | Não |
| `POST` | `/register/user` | Registro de usuário | Não |

### Produtos (Públicos)
| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|--------------|
| `GET` | `/api/products/` | Listar todos os produtos | Não |
| `GET` | `/api/products/{id}` | Buscar produto por ID | Não |

### Produtos (Administrativos)
| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|--------------|
| `GET` | `/api/admin/products/getAll` | Listar produtos (admin) | ADMIN |
| `POST` | `/api/admin/products/create` | Criar produto | ADMIN |
| `PUT` | `/api/admin/products/update` | Atualizar produto | ADMIN |
| `DELETE` | `/api/admin/products/delete` | Deletar produto | ADMIN |

### Carrinho
| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|--------------|
| `GET` | `/api/cart/get-items?userid={id}` | Listar itens do carrinho | USER |
| `POST` | `/api/cart/?userid={id}` | Adicionar item ao carrinho | USER |
| `PUT` | `/api/cart/{itemId}/quantity?quantity={qty}` | Atualizar quantidade | USER |
| `DELETE` | `/api/cart/{itemId}` | Remover item do carrinho | USER |
| `DELETE` | `/api/cart/clear?userid={id}` | Limpar carrinho | USER |

### Documentação
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/swagger-ui.html` | Interface Swagger UI |
| `GET` | `/v3/api-docs` | OpenAPI JSON |

## ⚙️ Configuração e Deploy

### Variáveis de Ambiente

#### Backend (application.properties)
```properties
# Database
spring.datasource.url=jdbc:postgresql://localhost:5432/commerce
spring.datasource.username=postgres
spring.datasource.password=1234
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.hibernate.ddl-auto=update

# JWT
security.token.secret=Anthony772025
security.token.secret.expiration-time=3600000

# Logging
spring.jpa.show-sql=true
logging.level.org.hibernate.SQL=DEBUG
```

#### Frontend (vite.config.js)
```javascript
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': 'http://localhost:8080'
    }
  }
})
```

### Docker Compose
```yaml
services:
  postgres:
    image: 'postgres:latest'
    environment:
      - 'POSTGRES_DB=commerce'
      - 'POSTGRES_PASSWORD=1234'
      - 'POSTGRES_USER=postgres'
    ports:
      - "5432:5432"
    volumes:
      - 'pgdata:/var/lib/postgresql/data'
volumes:
  pgdata:
```

### Execução Local

#### Backend
```bash
# Iniciar PostgreSQL
docker-compose up -d

# Executar Spring Boot
mvn spring-boot:run
```

#### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Deploy com Docker

#### Backend
```bash
# Build da imagem
docker build -t commerce-simple-backend .

# Executar container
docker run -p 8080:8080 \
  -e SPRING_DATASOURCE_URL=jdbc:postgresql://host.docker.internal:5432/commerce \
  commerce-simple-backend
```

#### Frontend
```bash
cd frontend
docker build -t commerce-simple-frontend .
docker run -p 3000:3000 commerce-simple-frontend
```

## 🔒 Segurança

### Autenticação JWT
- **Algoritmo**: HMAC256
- **Expiração**: 1 hora (3600000ms)
- **Claims**: username, role, userId
- **Header**: `Authorization: Bearer {token}`

### Configuração Spring Security
```java
@Configuration
@EnableMethodSecurity
public class SecurityFilter {
    
    private static final String[] URL_WHITELIST = {
        "/v3/api-docs/**",
        "/swagger-ui/**",
        "/api/products/**",  // Endpoints públicos
        "/auth/user",
        "/register/user"
    };
    
    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) {
        return http
            .csrf(csrf -> csrf.disable())
            .cors(cors -> cors.configurationSource(corsConfigurationSource))
            .authorizeHttpRequests(auth -> {
                auth.requestMatchers("/api/admin/**").hasRole("ADMIN");
                auth.requestMatchers(URL_WHITELIST).permitAll();
                auth.anyRequest().authenticated();
            })
            .addFilterBefore(jwtSecurityFilter, UsernamePasswordAuthenticationFilter.class)
            .build();
    }
}
```

### CORS Configuration
```java
@Configuration
public class CorsConfig {
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOriginPatterns(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
```

## ✅ Validações e Regras de Negócio

### Validações de Entrada

#### UserEntity
- **name**: `@NotBlank` - Obrigatório
- **username**: `@Length(min=3, max=10)` - 3 a 10 caracteres
- **email**: `@Email` - Formato de email válido
- **password**: `@Length(min=6, max=400)` - 6 a 400 caracteres
- **role**: `@Enumerated(EnumType.STRING)` - USER ou ADMIN

#### ProductEntity
- **name**: `@NotBlank` - Obrigatório
- **price**: `@NotNull` - Obrigatório, BigDecimal
- **description**: `@Length(min=5, max=200)` - 5 a 200 caracteres
- **imageURL**: Opcional

#### CartItemEntity
- **quantity**: `@NotNull @Positive` - Quantidade positiva obrigatória
- **name**: `@NotBlank` - Nome do item obrigatório

### Regras de Negócio
1. **Usuários únicos**: Username e email devem ser únicos
2. **Produtos únicos**: Nome do produto deve ser único
3. **Carrinho por usuário**: Cada usuário tem seu próprio carrinho
4. **Quantidade positiva**: Itens do carrinho devem ter quantidade > 0
5. **Acesso administrativo**: Apenas usuários com role ADMIN podem gerenciar produtos

## 🎨 Frontend

### Arquitetura de Componentes
```
App.jsx
├── Navbar.jsx
├── Routes
│   ├── PublicRoute.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   └── AdminLogin.jsx
│   └── ProtectedRoute.jsx
│       ├── Dashboard.jsx (ADMIN)
│       └── Cart.jsx (USER)
```

### Context API
- **AuthContext**: Gerencia estado de autenticação
- **CartContext**: Gerencia estado do carrinho

### Estilização
- **CSS Custom**: Classes personalizadas
- **Responsive Design**: Mobile-first approach
- **Tipografia**: Poppins e Inter
- **Cores**: Gradientes modernos
- **Componentes**: Cards, botões, formulários estilizados

### Funcionalidades Frontend
- **Busca em tempo real** de produtos
- **Carrinho interativo** com controle de quantidade
- **Autenticação** com persistência de token
- **Navegação** baseada em roles
- **Feedback visual** para ações do usuário
- **Tratamento de erros** com mensagens amigáveis

## 🚀 Desenvolvimento

### Pré-requisitos
- Java 17+
- Node.js 18+
- Docker e Docker Compose
- Maven 3.6+
- IDE (IntelliJ IDEA, VS Code, Eclipse)

### Setup de Desenvolvimento

1. **Clone o repositório**
```bash
git clone <repository-url>
cd commerce-simple
```

2. **Configure o banco de dados**
```bash
docker-compose up -d
```

3. **Execute o backend**
```bash
mvn spring-boot:run
```

4. **Execute o frontend**
```bash
cd frontend
npm install
npm run dev
```

### Scripts Disponíveis

#### Backend (Maven)
```bash
mvn clean compile          # Compilar
mvn test                   # Executar testes
mvn spring-boot:run        # Executar aplicação
mvn package                # Gerar JAR
```

#### Frontend (NPM)
```bash
npm run dev                # Servidor de desenvolvimento
npm run build              # Build de produção
npm run preview            # Preview do build
npm run lint               # Linting
```

### Estrutura de Commits
```
feat: adiciona nova funcionalidade
fix: corrige bug
docs: atualiza documentação
style: formatação de código
refactor: refatoração de código
test: adiciona ou corrige testes
chore: tarefas de manutenção
```

### Padrões de Código
- **Backend**: Clean Architecture com Use Cases
- **Frontend**: Componentes funcionais com Hooks
- **Nomenclatura**: camelCase para variáveis, PascalCase para classes
- **Comentários**: Javadoc para métodos públicos
- **Validação**: Bean Validation no backend, validação de formulários no frontend

---

**Desenvolvido com ❤️ usando Spring Boot e React**