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

**Integrações & Infraestrutura:**
* [Cloudinary](https://cloudinary.com/) (Armazenamento de imagens atual)

## 🚀 Funcionalidades e Roadmap

Abaixo está o planejamento de desenvolvimento e o status atual das entregas:

### Funcionalidades
- [x] Autenticação
- [x] Catálogo de produtos
- [x] Carrinho de compras
- [ ] Checkout
- [ ] Integração com Stripe
- [ ] Painel administrativo

### Infraestrutura
- [ ] Deploy inicial da aplicação
- [ ] Containerização com Docker
- [ ] Implantação em AWS EC2
- [ ] Cache com Redis
- [ ] Migração do armazenamento para AWS S3

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

<!--
## 🌐 Deploy

Esta seção será atualizada após a publicação da aplicação.
-->

## 👨‍💻 Autor

Desenvolvido por **Thyago Rafael de Carvalho**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/thyago-rafael/)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/ThyagoRafael)
