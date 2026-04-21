# ROTEIRO DE DEMONSTRAÇÃO — ATIVIDADE 2

# MÉTODO HTTP (CRUD)

| CRUD | Método | O que faz
|---|---|---
|**C** reate | **GET** | LISTA os registros
|**R** ead | **POST** | CRIA um novo registro
|**U** pdate | **PUT** | EDITA um registro existente
|**D** elete | **DELETE** | REMOVE um registro

## 1. Iniciar o servidor Flask

```bash
cd ~/Desktop/T.I/PROJETOS/FATEC/PORTFÓLIO/2.sem/Portfolio-Terminal
source venv/Scripts/activate
python app.py
```

## 2. Abrir o site

- No VSCode clicar em **Go Live** (barra inferior direita)
- Site abre em `http://127.0.0.1:5500`
- Verificar que os projetos carregam dinamicamente do Flask

## DEMONSTRAÇÃO DE CRUD POR `THUNDER CLIENT`

## 3. GET

- Método: `GET`
- URL: `http://127.0.0.1:5000/projetos`
- Clicar em **Send**
- ✅ Retorna lista de projetos em JSON

## 4. POST

- Método: `POST`
- URL: `http://127.0.0.1:5000/projetos`
- Aba **Body → JSON:**

```json
{
  "nome": "Projeto Teste",
  "data": "abr/2026",
  "descricao": "Projeto criado via POST.",
  "semestre": "2º sem. · FATEC",
  "categoria": "academico",
  "tecnologias": ["HTML", "CSS"],
  "link": "https://github.com",
  "github": "https://github.com"
}
```
- Clicar em **Send**
- ✅ Retorna projeto criado com status 201

## 5. PUT

- Método: `PUT`
- URL: `http://127.0.0.1:5000/projetos/1`
- Aba **Body → JSON:**

```json
{
  "nome": "Projeto Atualizado",
  "descricao": "Descrição atualizada via PUT."
}
```

- Clicar em **Send**
- ✅ Retorna projeto atualizado

## 6. DELETE

- Método: `DELETE`
- URL: `http://127.0.0.1:5000/projetos/3`
- Clicar em **Send**
- ✅ Retorna mensagem de sucesso

## 7. Demonstrar painel admin no site

- Clicar em **WGCosta** no canto superior esquerdo
- Digitar a senha
- Preencher o formulário e adicionar um projeto
- ✅ Projeto aparece na lista sem recarregar a página

> **Observação:** Os dados adicionados via POST ou painel admin são perdidos ao reiniciar o Flask pois ficam na memória. Na Atividade 3 serão persistidos no banco de dados.