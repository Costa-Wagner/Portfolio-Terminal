# ROTEIRO DE DEMONSTRAÇÃO — ATIVIDADE 2

# MÉTODO HTTP (CRUD)

| CRUD | Método | O que faz
|---|---|---
|**C** reate | **POST**   | CRIA um novo registro
|**R** ead   | **GET**    | LISTA os registros
|**U** pdate | **PUT**    | EDITA um registro existente
|**D** elete | **DELETE** | REMOVE um registro

## 1. Iniciar o servidor Flask

```bash
cd Portfolio-Terminal
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

- Acessar Admin com senha
- Navegar entre Formação, Cursos, Skills e Projetos
- Preencher o formulário e adicionar uma nova formação, cursos, skills ou projetos
- Itens já cadastrados aparecem para edição/remoção
- Formulário permite adicionar novos registros e cancelar já existentes

> **Observação:** Os dados adicionados via POST ou painel admin são perdidos ao reiniciar o Flask pois ficam na memória. Na Atividade 3 serão persistidos no banco de dados.