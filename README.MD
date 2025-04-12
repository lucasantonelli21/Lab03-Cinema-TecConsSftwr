# Sistema Web de Controle de Cinema com JavaScript

## Objetivo

Desenvolver um sistema web de controle de cinema utilizando **HTML**, **CSS** e **JavaScript**, implementando funcionalidades como:

- Cadastro de filmes
- Cadastro de sessões
- Cadastro de salas
- Venda de ingressos

Os dados serão armazenados localmente via `localStorage`, e a navegação será feita com páginas HTML interligadas.

---

## Requisitos do Sistema

Você deverá criar um site com as seguintes páginas e formulários, simulando o controle de um cinema. O foco está em **criar**, **listar** e **interligar** dados entre as páginas, utilizando **JavaScript puro**.

---

## Conceitos Trabalhados

- Manipulação do DOM com JavaScript
- Uso de `localStorage`
- Estruturação de formulários HTML
- Criação dinâmica de elementos (ex: `<option>` nos `<select>`)
- Armazenamento e leitura de arrays de objetos em JSON
- Encadeamento de dados entre entidades

---

## Páginas e Formulários

### 1. Página Inicial (`index.html`)

Menu de navegação com links para:

- Cadastro de Filmes
- Cadastro de Salas
- Cadastro de Sessões
- Venda de Ingressos
- Listagem de Sessões Disponíveis

---

### 2. Cadastro de Filmes (`cadastro-filmes.html`)

**Formulário:**

- Título (`input`)
- Descrição (`textarea`)
- Gênero (`select`)
- Classificação Indicativa (`select`)
- Duração (`input number` em minutos)
- Data de Estreia (`input date`)
- Botão: **Salvar Filme**

**Armazenamento:** Salvar em `localStorage` (chave: `filmes`)

---

### 3. Cadastro de Salas (`cadastro-salas.html`)

**Formulário:**

- Nome da Sala (`input`)
- Capacidade (`input number`)
- Tipo (`select`: 2D, 3D, IMAX)
- Botão: **Salvar Sala**

**Armazenamento:** Salvar em `localStorage` (chave: `salas`)

---

### 4. Cadastro de Sessões (`cadastro-sessoes.html`)

**Formulário:**

- Filme (`select` → carregado do `localStorage`)
- Sala (`select` → carregado do `localStorage`)
- Data e Hora (`input datetime-local`)
- Preço (`input number`)
- Idioma (`select`: Dublado, Legendado)
- Formato (`select`: 2D, 3D)
- Botão: **Salvar Sessão**

**Armazenamento:** Salvar em `localStorage` (chave: `sessoes`)

---

### 5. Venda de Ingressos (`venda-ingressos.html`)

**Formulário:**

- Sessão (`select` → carregado do `localStorage`)
- Nome do Cliente (`input`)
- CPF (`input`)
- Assento (`input text`, ex: A10)
- Tipo de Pagamento (`select`: Cartão, Pix, Dinheiro)
- Botão: **Confirmar Venda**

**Armazenamento:** Salvar em `localStorage` (chave: `ingressos`)

---

### 6. Listagem de Sessões Disponíveis (`sessoes.html`)

**Listar sessões com os dados combinados:**

- Filme (título)
- Sala (nome)
- Data e Hora
- Preço
- Botão: **Comprar Ingresso** → redireciona para `venda-ingressos.html` com a sessão já selecionada

---

## Navegabilidade entre Páginas

- A navegação será feita via `<a href="...">` entre as páginas.
- Todas as páginas devem conter um menu fixo com links para as demais.
