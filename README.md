# 🛒 Davies Roupas - E-commerce Full Stack

> 🚧 **Status:** Em desenvolvimento (Work in Progress) 🚧

## 💻 Sobre o Projeto

O **Davies Roupas** é uma plataforma de e-commerce completa, desenvolvida sob medida para proporcionar uma experiência de compra online rápida e segura para os clientes da marca. 

Este projeto foi arquitetado do zero para resolver desafios reais de negócios, abrangendo desde a interface de usuário (vitrine e carrinho) até o gerenciamento de dados complexos no back-end, incluindo fluxo de autenticação, gestão de estado e processamento de pagamentos.

## 🛠️ Tecnologias Utilizadas

O projeto utiliza as tecnologias mais modernas do ecossistema Full Stack para garantir performance e escalabilidade:

**Front-end:**
* [React](https://reactjs.org/)
* [TypeScript](https://www.typescriptlang.org/)
* [CSS Modules](https://github.com/css-modules/css-modules)

**Back-end & Banco de Dados:**
* [Node.js](https://nodejs.org/)
* [TypeScript](https://www.typescriptlang.org/)
* [Prisma ORM](https://www.prisma.io/)
* [PostgreSQL](https://www.postgresql.org/)
* *Em breve:* **Redis** (Cache de catálogo para otimização de performance)

**Integrações & Infraestrutura:**
* [Cloudinary](https://cloudinary.com/) (Armazenamento de imagens atual)
* [Stripe](https://stripe.com/) (Gateway de Pagamentos)
* *Em breve:* **Docker** (Containerização da aplicação)
* *Em breve:* **AWS S3** (Migração para armazenamento de alta disponibilidade)

## 🚀 Funcionalidades e Roadmap

Abaixo está o planejamento de desenvolvimento e o status atual das entregas:

- [x] Estruturação inicial do monorepo (Front-end e Back-end)
- [x] Modelagem do Banco de Dados com PostgreSQL e Prisma
- [x] Sistema de Autenticação e Autorização de Usuários
- [x] Listagem e Detalhes de Produtos
- [x] Carrinho de Compras
- [ ] **Checkout e Sistema de Pedidos** *(Em andamento 👨‍💻)*
- [ ] Integração final com Stripe
- [ ] Painel Administrativo para gestão de produtos
- [ ] Implementação de cache com **Redis**
- [ ] Orquestração do ambiente com **Docker**
- [ ] Migração de armazenamento para **AWS S3**

## ⚙️ Como executar o projeto localmente

O repositório está organizado em uma estrutura de monorepo com as pastas `frontend` e `backend` na raiz.

### Pré-requisitos
* [Node.js](https://nodejs.org/) instalado
* Instância do [PostgreSQL](https://www.postgresql.org/) ativa
* [Git](https://git-scm.com/) instalado

### Passos de Instalação

**1. Clone o repositório**
```bash
git clone https://github.com/ThyagoRafael/davies-roupas.git
cd davies-roupas
```

**2. Instalação de Dependências**  
Você deve instalar as dependências em ambas as pastas:
```bash
# Back-end
cd backend
npm install

# Front-end
cd ../frontend
npm install
```

**3. Configuração de Variáveis de Ambiente (.env)**  
Crie os arquivos de configuração baseados nos exemplos:

*No Back-end (`/backend`):*
```bash
cp .env.example .env
# Abra o arquivo .env e preencha as chaves do DATABASE_URL, Stripe e Cloudinary
```

*No Front-end (`/frontend`):*
```bash
cp .env.example .env
# Abra o arquivo .env e preencha a URL da API (VITE_API_URL) e chaves públicas
```

**4. Migrações do Banco de Dados**  
Na pasta `backend`, execute:
```bash
npx prisma migrate dev
```

**5. Execução**  
Inicie os dois serviços simultaneamente em terminais separados:

* **Terminal 1 (Back-end):** Dentro de `/backend` -> `npm run dev`
* **Terminal 2 (Front-end):** Dentro de `/frontend` -> `npm run dev`

---

## 👨‍💻 Autor

Desenvolvido por **Thyago Rafael de Carvalho**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/thyago-rafael/)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/ThyagoRafael)
