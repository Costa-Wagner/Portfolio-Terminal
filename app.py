from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv
import os

load_dotenv()
ADMIN_SENHA = os.getenv("ADMIN_SENHA")

app = Flask(__name__)
CORS(app, origins=["http://127.0.0.1:5500", "http://localhost:5500"])

# DADOS DOS PROJETOS
# (aqui por enquanto fixos, quando for realizarmos a Atividade 3 virão de um BD)
projetos = [
    {
        "id": 1,
        "nome": "Projeto Portfólio",
        "data": "dez/2025",
        "descricao": "Portfólio pessoal desenvolvido com HTML, CSS e JavaScript.",
        "semestre": "1º sem. · FATEC",
        "categoria": "academico",
        "tecnologias": ["HTML", "CSS", "Flask"],
        "link": "https://portfolio-wagner-nu.vercel.app/",
        "github": "https://github.com/Costa-Wagner/portfolio"
    },
    {
        "id": 2,
        "nome": "Projeto API — JanoSys",
        "data": "dez/2025",
        "descricao": "Projeto Integrador (API) — solução digital para visualização dos dados do CENSO 2010/2022. Atuei como Product Owner.",
        "semestre": "1º sem. · FATEC",
        "categoria": "api",
        "tecnologias": ["HTML", "CSS"],
        "link": "https://janosysapi1.vercel.app/",
        "github": "https://github.com/janosystime/Janosys-Project"
    },
    {
        "id": 3,
        "nome": "Site Pessoal",
        "data": "out/2025",
        "descricao": "Site pessoal explorando conceitos de desenvolvimento web, UX e design digital.",
        "semestre": "1º sem. · FATEC",
        "categoria": "pessoal",
        "tecnologias": ["HTML", "CSS"],
        "link": "https://ws-start-ten.vercel.app/",
        "github": "https://github.com/Costa-Wagner/WS.start"
    }
]

#===========================================================================
#   Rota POST — verifica senha do admin
#===========================================================================
@app.route("/admin/login", methods=["POST"])
def admin_login():
    dados = request.get_json()
    if dados.get("senha") == ADMIN_SENHA:
        return jsonify({"autorizado": True}), 200
    return jsonify({"autorizado": False}), 401

#===========================================================================
#   Rota GET — retorna todos os projetos
#===========================================================================
@app.route("/projetos", methods=["GET"])
def get_projetos():
    return jsonify(projetos)

#===========================================================================
#   Rota POST — adiciona um novo projeto
#===========================================================================
@app.route("/projetos", methods=["POST"])
def add_projeto():
    novo = request.get_json()
    novo["id"] = len(projetos) + 1
    projetos.append(novo)
    return jsonify(novo), 201

#===========================================================================
#   Rota PUT — edita um projeto existente
#===========================================================================
@app.route("/projetos/<int:id>", methods=["PUT"])
def update_projeto(id):
    for projeto in projetos:
        if projeto["id"] == id:
            dados = request.get_json()
            projeto.update(dados)
            return jsonify(projeto)
    return jsonify({"erro": "Projeto não encontrado"}), 404

#===========================================================================
#   Rota DELETE — remove um projeto
#===========================================================================
@app.route("/projetos/<int:id>", methods=["DELETE"])
def delete_projeto(id):
    for projeto in projetos:
        if projeto["id"] == id:
            projetos.remove(projeto)
            return jsonify({"mensagem": "Projeto removido com sucesso"}), 200
    return jsonify({"erro": "Projeto não encontrado"}), 404

#===========================================================================
if __name__ == "__main__":
    app.run(debug=True)