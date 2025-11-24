# Projeto: Integração REST + SOAP com API Gateway e Cliente Web

Este projeto demonstra a construção de uma arquitetura completa composta por:

- **API REST** interna para gerenciamento de contas bancárias
- **Servidor SOAP** para envio e consulta de arquivos
- **API Gateway** integrando REST + SOAP e fornecendo documentação HATEOAS + Swagger
- **Cliente Web (HTML, CSS, JS)** consumindo recursos do Gateway
- Ambiente Dockerizado para execução em qualquer máquina

O projeto foi desenvolvido com propósito didático e acadêmico, exemplificando padrões de integração entre diferentes estilos arquiteturais (REST e SOAP) usando tecnologias modernas.

## 📌 Objetivo do Sistema

O sistema simula uma arquitetura distribuída onde:

### 🟦 REST API Interna

Gerencia contas com operações CRUD:

- Criar conta
- Listar contas
- Obter por ID
- Atualizar (depósito)

### 🟧 SOAP Server (Java + JAX-WS)

Gerencia operações envolvendo arquivos:

- `uploadFile(filename, contentBase64)`
- `getFileInfo(id)`

### 🟩 API Gateway

Unifica as duas APIs:

- Reexpor endpoints REST internamente
- Consumir o SOAP Server
- Fornecer HATEOAS
- Documentação completa com Swagger (OpenAPI 3.0)

### 🟨 Cliente Web

Interface simples que consome o Gateway via Fetch API.

## 🏗️ Arquitetura do Projeto

```
project/
 ├── rest-api/          → API REST em Node.js + TypeScript
 ├── soap-server/       → Servidor SOAP em Java (JAX-WS)
 ├── api-gateway/       → Gateway para REST e SOAP + Swagger
 ├── web-client/        → Cliente Web (HTML, CSS, JS)
 └── docker-compose.yml → Orquestração completa
```

## 🛠️ Tecnologias Utilizadas

### 🔵 Backend (REST API)

- Node.js
- TypeScript
- Express.js
- Docker

### 🟠 SOAP Server

- Java 17
- JAX-WS
- Maven
- Docker

### 🟣 API Gateway

- Node.js
- Express.js
- SOAP Client (node-soap)
- Swagger (swagger-jsdoc + swagger-ui-express)
- HATEOAS

### 🟢 Frontend (Cliente Web)

- HTML5
- CSS3
- JavaScript puro (Fetch API)
- Nginx (servidor estático via Docker)

### 🐳 Orquestração

- Docker
- Docker Compose
- Redes internas

## 🚀 Como Executar o Projeto

A execução é extremamente simples porque tudo está dockerizado.

### 1️⃣ Pré-requisitos

Certifique-se de ter instalado:

- Docker
- Docker Compose

Verifique:

```bash
docker --version
docker compose version
```

### 2️⃣ Clonar o repositório

```bash
git clone https://github.com/seu-usuario/seu-projeto.git
cd seu-projeto
```

### 3️⃣ Executar toda a aplicação

```bash
docker compose up --build
```

Aguarde a criação das imagens.

## 🌍 Endpoints Principais

| Serviço | URL |
|---------|-----|
| REST API | http://localhost:3001 |
| SOAP Server | http://localhost:8081/FileService?wsdl |
| API Gateway | http://localhost:3000/api |
| Swagger | http://localhost:3000/docs |
| Web Client | http://localhost:8080 |
## 🧪 Testes com cURL

A seguir estão comandos curl para testar a API Gateway sem precisar do frontend.

### 📘 Criar Conta

```bash
curl -X POST http://localhost:3000/api/accounts \
  -H "Content-Type: application/json" \
  -d '{"nome":"Pedro", "cpf":"12345678900"}'
```

### 📗 Listar Contas

```bash
curl http://localhost:3000/api/accounts
```

### 📙 Obter Conta por ID

```bash
curl http://localhost:3000/api/accounts/{id}
```

### 💰 Realizar Depósito

```bash
curl -X POST http://localhost:3000/api/accounts/{id}/deposit \
  -H "Content-Type: application/json" \
  -d '{"amount": 150}'
```

### 📤 Upload de Arquivo (Gateway → SOAP)

Base64 de exemplo: `"SGVsbG8gV29ybGQ="`

```bash
curl -X POST http://localhost:3000/api/files \
  -H "Content-Type: application/json" \
  -d '{
    "filename": "teste.txt",
    "contentBase64": "SGVsbG8gV29ybGQ="
  }'
```

### 📄 Obter Informações de Arquivo

```bash
curl http://localhost:3000/api/files/{id}
```

## 🧰 Descrição dos Componentes

### 🟦 REST API

Endpoints:

- `GET /accounts`
- `POST /accounts`
- `GET /accounts/:id`
- `POST /accounts/:id/deposit`

Armazena contas em memória, com:

```typescript
type Account = {
  id: string;
  nome: string;
  cpf: string;
  saldo: number;
};
```

### 🟧 SOAP Server

Possui duas operações:

**uploadFile**

Recebe:

```xml
<filename>string</filename>
<content>base64Binary</content>
```

Retorna ID do arquivo.

**getFileInfo**

Recebe ID e retorna:

```xml
<FileInfo>
   <id>...</id>
   <name>...</name>
   <size>...</size>
</FileInfo>
```

### 🟩 API Gateway

- Reexpõe todas as rotas da REST API
- Converte chamadas REST → SOAP
- Adiciona HATEOAS a todas as respostas
- Documentação via Swagger em `/docs`

### 🟨 Web Client

Interface simples que:

- cria contas
- lista contas
- faz depósito
- faz upload de arquivo via SOAP
- consulta dados do arquivo

Rodando no endereço: http://localhost:8080

## 📚 Swagger

Acesse: http://localhost:3000/docs

Permite visualizar:

- Schemas
- Exemplos
- Testes interativos
- Métodos REST + SOAP integrados

## 📦 Build Manual (Opcional)

**REST API:**

```bash
cd rest-api
npm install
npm run build
npm start
```

**SOAP Server:**

```bash
cd soap-server
mvn clean package
java -jar target/soap-server.jar
```

**Gateway:**

```bash
cd api-gateway
npm install
npm run dev
```

## 🧹 Limpar containers

```bash
docker compose down
```

Para remover tudo:

```bash
docker compose down --rmi all --volumes
```

## 🚧 Melhorias Futuras

### 🔐 Segurança

- **Autenticação e Autorização**: Implementar JWT ou OAuth2 no Gateway para proteger endpoints
- **Rate Limiting**: Adicionar controle de taxa de requisições para prevenir abusos
- **Validação de Input**: Implementar validação mais robusta com bibliotecas como Joi ou Zod
- **HTTPS**: Configurar certificados SSL/TLS para comunicação segura
- **Sanitização de Dados**: Adicionar proteção contra XSS e SQL Injection

### 💾 Persistência de Dados

- **Banco de Dados**: Substituir armazenamento em memória por PostgreSQL, MongoDB ou MySQL
- **Sistema de Arquivos**: Em [`FileRepository.java`](soap-server-java/src/main/java/br/com/soap/FileRepository.java), implementar persistência real de arquivos em disco ou cloud storage (S3, Azure Blob)
- **Migrations**: Adicionar sistema de migração de banco de dados (Prisma, TypeORM, Flyway)
- **Cache**: Implementar Redis para cache de consultas frequentes

### 🧪 Testes

- **Testes Unitários**: Adicionar cobertura em [`AccountService`](rest-api/src/services/accountService.ts), [`FileService.java`](soap-server-java/src/main/java/br/com/soap/FileService.java) e [`GatewayController`](gateway/src/controllers/gatewayController.ts)
- **Testes de Integração**: Testar comunicação entre serviços (REST ↔ Gateway ↔ SOAP)
- **Testes E2E**: Automatizar testes do cliente web com Cypress ou Playwright
- **Mocks**: Implementar mocks para isolar testes do SOAP Server

### 📊 Monitoramento e Logs

- **Logs Estruturados**: Implementar Winston ou Pino para logs JSON estruturados
- **Métricas**: Adicionar Prometheus + Grafana para monitoramento
- **Tracing Distribuído**: Implementar Jaeger ou Zipkin para rastreabilidade entre serviços
- **Health Checks**: Melhorar health checks existentes no [`docker-compose.yml`](docker-compose.yml) com mais detalhes

### 🎨 Frontend

- **Framework Moderno**: Migrar de vanilla JS para React, Vue ou Angular
- **TypeScript**: Adicionar tipagem ao [`app.js`](web-client/app.js)
- **UI/UX**: Implementar biblioteca de componentes (Material-UI, Ant Design, Shadcn/ui)
- **Responsividade**: Melhorar [`style.css`](web-client/style.css) para dispositivos móveis
- **Tratamento de Erros**: Adicionar feedback visual melhor para erros e loading states

### 🏗️ Arquitetura

- **Message Broker**: Adicionar RabbitMQ ou Kafka para comunicação assíncrona
- **API Versioning**: Implementar versionamento de API (v1, v2)
- **Circuit Breaker**: Adicionar padrão Circuit Breaker no [`restProxyService`](gateway/src/services/restProxyService.ts) e [`soapService`](gateway/src/services/soapService.ts)
- **Service Mesh**: Considerar Istio ou Linkerd para ambientes mais complexos
- **Saga Pattern**: Implementar transações distribuídas para operações que envolvem múltiplos serviços

### 📝 Documentação

- **OpenAPI Completo**: Adicionar schema `UpdateAccountRequest` faltante em [`schemas.ts`](gateway/src/docs/schemas.ts)
- **Exemplos de Resposta**: Adicionar mais exemplos no Swagger
- **ADR (Architecture Decision Records)**: Documentar decisões arquiteturais importantes
- **Diagramas**: Adicionar diagramas de sequência e arquitetura (Mermaid, PlantUML)

### 🔧 DevOps

- **CI/CD**: Configurar GitHub Actions, GitLab CI ou Jenkins
- **Linting**: Adicionar ESLint, Prettier e Checkstyle
- **Pre-commit Hooks**: Implementar Husky para validações antes de commits
- **Kubernetes**: Criar manifests para deploy em K8s
- **Environment Variables**: Melhorar gerenciamento com .env files e validação

### ⚡ Performance

- **Compressão**: Adicionar gzip/brotli compression no Gateway
- **Connection Pooling**: Implementar pool de conexões para banco de dados
- **Lazy Loading**: Otimizar carregamento de arquivos grandes
- **CDN**: Servir arquivos estáticos via CDN
- **Paginação**: Adicionar paginação em [`getAll()`](rest-api/src/services/accountService.ts)

### 🌐 Funcionalidades

- **Operações Bancárias**: Adicionar transferências, saques, histórico de transações
- **Gestão de Arquivos**: Implementar download, exclusão e listagem de arquivos
- **Notificações**: Sistema de notificações em tempo real (WebSockets, SSE)
- **Relatórios**: Gerar relatórios em PDF ou Excel
- **Multi-tenancy**: Suportar múltiplos clientes/organizações

### 🔄 SOAP Server

- **Timeout Configuration**: Adicionar configuração de timeout em [`soapService.ts`](gateway/src/services/soapService.ts)
- **Retry Logic**: Implementar retry automático para falhas temporárias
- **SOAP Fault Handling**: Melhorar tratamento de erros SOAP
- **WS-Security**: Adicionar autenticação no SOAP Server

## ✔️ Conclusão

Este projeto demonstra:

- ✅ Integração entre REST e SOAP
- ✅ Organização modular
- ✅ API Gateway moderno
- ✅ Documentação OpenAPI
- ✅ Cliente Web funcional
- ✅ Orquestração Docker completa

Uma base excelente para trabalhos acadêmicos, estudos de arquitetura ou projetos reais.