# Pé Na Estrada Tour - Gerenciador Desktop

![Logo do Pé Na Estrada Tour](./src/assets/logoPeNaEstradaTour.png)

![Versão](https://img.shields.io/badge/version-1.0.0-blue)
![Status](https://img.shields.io/badge/status-concluído-brightgreen)
![Licença](https://img.shields.io/badge/license-MIT-green)

> Aplicação desktop (SPA) desenvolvida para a agência de viagens "Pé Na Estrada Tour", focada no gerenciamento completo de passeios, passageiros e alocação de assentos em tempo real.

---

## ✨ Funcionalidades Principais

*   **🔐 Autenticação Segura:** Sistema de login com e-mail e senha utilizando Firebase Authentication.
*   **👤 Gerenciamento de Passageiros:** CRUD completo para criar, visualizar, editar e excluir passageiros.
*   **🚌 Gerenciamento de Passeios:**
    *   Dashboard com a agenda de passeios em andamento.
    *   Filtro de passeios por período (data de início e fim).
    *   Cadastro de novos passeios com definição de transporte, capacidade e locais de embarque.
*   **🗺️ Alocação Visual de Assentos:**
    *   Mapa de assentos dinâmico e interativo, renderizado com base na capacidade do transporte.
    *   Alocação de passageiros em poltronas com busca inteligente.
    *   Suporte para adicionar crianças de colo ao mesmo assento.
    *   Lista detalhada de passageiros alocados, ordenada por poltrona.
*   **🔄 Ciclo de Vida dos Passeios:**
    *   Altere o status de um passeio para "Em Andamento", "Realizado" ou "Cancelado".
    *   Página dedicada para visualizar o histórico de todos os passeios, separados por status.
*   **📄 Relatórios em PDF:** Geração de relatórios profissionais com a lista de passageiros de uma viagem, incluindo logo, dados do passeio e informações detalhadas dos passageiros.

---

## 🛠️ Tecnologias Utilizadas

*   **Interface (UI):** [React](https://reactjs.org/)
*   **Build Tool:** [Vite](https://vitejs.dev/)
*   **Plataforma Desktop:** [Electron](https://www.electronjs.org/)
*   **Roteamento:** [React Router DOM](https://reactrouter.com/)
*   **Banco de Dados:** [Firebase](https://firebase.google.com/) (Firestore & Authentication)
*   **Estilização:** CSS Puro com Variáveis
*   **Geração de PDF:** [jsPDF](https://github.com/parallax/jsPDF) & [jsPDF-AutoTable](https://github.com/simonbengtsson/jsPDF-AutoTable)
*   **Empacotamento:** [Electron Builder](https://www.electron.build/)

---

## 🚀 Começando

Siga as instruções abaixo para executar o projeto em seu ambiente de desenvolvimento.

### Pré-requisitos

*   [Node.js](https://nodejs.org/) (versão 18 ou superior)
*   NPM ou Yarn

### Instalação

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/seu-usuario/penaestrada-tour-app.git
    cd penaestrada-tour-app
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Configure as variáveis de ambiente:**
    *   Crie um arquivo chamado `.env.local` na raiz do projeto.
    *   Copie e cole o conteúdo abaixo, substituindo os valores pelos do seu projeto no Firebase.
    ```env
    VITE_FIREBASE_API_KEY="SUA_API_KEY"
    VITE_FIREBASE_AUTH_DOMAIN="SEU_AUTH_DOMAIN"
    VITE_FIREBASE_PROJECT_ID="SEU_PROJECT_ID"
    VITE_FIREBASE_STORAGE_BUCKET="SEU_STORAGE_BUCKET"
    VITE_FIREBASE_MESSAGING_SENDER_ID="SEU_MESSAGING_SENDER_ID"
    VITE_FIREBASE_APP_ID="SEU_APP_ID"
    ```

4.  **Execute a aplicação em modo de desenvolvimento:**
    ```bash
    npm run dev
    ```
    *A aplicação React será aberta em seu navegador. Para testar com o Electron, você precisará de uma configuração adicional nos scripts.*

---

## 📦 Empacotamento para Produção

Para gerar o instalador `.exe` para Windows, execute o seguinte comando:

```bash
npm run electron:build
```

Após a conclusão, a pasta `release` será criada na raiz do projeto, contendo o arquivo `Pé Na Estrada Tour Setup 1.0.0.exe` pronto para distribuição.

---

## 🖼️ Telas da Aplicação

<p align="center">
  <img src="URL_DA_SUA_IMAGEM_LOGIN.png" width="48%" alt="Tela de Login">
  <img src="URL_DA_SUA_IMAGEM_DASHBOARD.png" width="48%" alt="Dashboard de Passeios">
  <img src="URL_DA_SUA_IMAGEM_GERENCIAMENTO.png" width="48%" alt="Tela de Gerenciamento">
  <img src="URL_DA_SUA_IMAGEM_STATUS.png" width="48%" alt="Tela de Status">
</p>

*(**Nota:** Substitua as `URL_DA_SUA_IMAGEM...` pelos links das suas screenshots no GitHub para que elas apareçam aqui.)*

---

## 📂 Estrutura do Projeto

A estrutura de pastas foi organizada para garantir a separação de responsabilidades e a manutenibilidade do código.

```
/
├── electron/
│   └── main.js       # Ponto de entrada e lógica do Electron
├── public/           # Arquivos estáticos (ícone)
├── src/
│   ├── assets/       # Imagens e logos
│   ├── components/   # Componentes React reutilizáveis
│   ├── pages/        # Componentes que representam as telas
│   ├── services/     # Lógica de comunicação com o Firebase e outros
│   ├── styles/       # Arquivos de estilização global
│   └── utils/        # Funções utilitárias (datas, constantes)
├── README.md
├── package.json
└── vite.config.js
```

---

## ✒️ Autor

Desenvolvido por **Ducosmo**

*   **GitHub:** [@cosmo-matias](https://github.com/cosmo-matias)