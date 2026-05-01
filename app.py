from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv
import os

load_dotenv()
ADMIN_SENHA = os.getenv("ADMIN_SENHA")

app = Flask(__name__)
CORS(app, origins=["http://127.0.0.1:5500", "http://localhost:5500"])

#=========================================
#   Rota POST — verifica senha do ADMIN
#=========================================
@app.route("/admin/login", methods=["POST"])
def admin_login():
    dados = request.get_json()
    if dados.get("senha") == ADMIN_SENHA:
        return jsonify({"autorizado": True}), 200
    return jsonify({"autorizado": False}), 401

#=====================================================================================
#                                   FORMAÇÃO
#=====================================================================================

#=========================================
#            DADOS MOCKADOS
#=========================================
#***por enquanto os DADOS estão FIXOS, na Atividade 3 virão do BD***
formacao = [
    {"id": 1, 
     "icone": "🎮",
     "curso": "DSM - Desenvolvimento de Software Multiplataforma",
     "instituicao": "FATEC / São José dos Campos",
     "periodo": "previsão 2028 · em andamento"},

    {"id": 2,
     "icone":"🏛️",
     "curso": "Gestão Pública",
     "instituicao": "UNINTER / São José dos Campos",
     "periodo": "2020 · concluído"},

    {"id": 3,
     "icone": "⚙️",
     "curso": "Engenharia de Produção Mecânica",
     "instituicao": "UNITAU / Taubaté",
     "periodo": "2011 · concluído"}
]

#=========================================
#   Rota GET — retorna todos os projetos
#=========================================
@app.route("/formacao", methods=["GET"])
def get_formacao():
    return jsonify(formacao)

#=========================================
#   Rota POST — adiciona um novo projeto
#=========================================

@app.route("/formacao", methods=["POST"])
def add_formacao():
    novo = request.get_json()
    novo["id"] = len(formacao) + 1
    formacao.append(novo)
    return jsonify(novo), 201

#=========================================
#   Rota PUT — edita um projeto existente
#=========================================
@app.route("/formacao/<int:id>", methods=["PUT"])
def update_formacao(id):
    for item in formacao:
        if item["id"] == id:
            item.update(request.get_json())
            return jsonify(item)
    return jsonify({"erro": "Formação não encontrada"}), 404

#=========================================
#   Rota DELETE — remove um projeto
#=========================================
@app.route("/formacao/<int:id>", methods=["DELETE"])
def delete_formacao(id):
    for item in formacao:
        if item["id"] == id:
            formacao.remove(item)
            return jsonify({"mensagem": "Formação removida com sucesso"}), 200
    return jsonify({"erro": "Formação não encontrada"}), 404

#=====================================================================================
#                                   CURSOS
#=====================================================================================

#=========================================
#            DADOS MOCKADOS
#=========================================
#***por enquanto os DADOS estão FIXOS, na Atividade 3 virão do BD***
cursos = [
    {
        "id": 1,
        "nome": "Escola de Inovadores",
        "horas": "40h",
        "instituicao": "FATEC",
        "ano": 2025,
        "descricao": "Capacitação em inovação, empreendedorismo e novas tecnologias aplicadas ao mercado.",
        "certificado": "imagem/imagens/CERTIFICADOS/certif_escola_inovadores.jpg",
        "link": "https://inova.cps.sp.gov.br/escola-de-inovadores/"
    },
    {
        "id": 2,
        "nome": "Python Básico",
        "horas": "18h",
        "instituicao": "Fundação Bradesco",
        "ano": 2025,
        "descricao": "Introdução à linguagem Python, lógica de programação e estruturas básicas.",
        "certificado": "imagem/imagens/CERTIFICADOS/certif_python_basic_bradesco.jpg",
        "link": "https://www.ev.org.br/cursos/linguagem-de-programacao-python-basico"
    }
]

#=========================================
#   Rota GET — retorna todos os projetos
#=========================================
@app.route("/cursos", methods=["GET"])
def get_cursos():
    return jsonify(cursos)

#=========================================
#   Rota POST — adiciona um novo projeto
#=========================================
@app.route("/cursos", methods=["POST"])
def add_curso():
    novo = request.get_json()
    novo["id"] = len(cursos) + 1
    cursos.append(novo)
    return jsonify(novo), 201

#=========================================
#   Rota PUT — edita um projeto existente
#=========================================
@app.route("/cursos/<int:id>", methods=["PUT"])
def update_curso(id):
    for curso in cursos:
        if curso["id"] == id:
            curso.update(request.get_json())
            return jsonify(curso)
    return jsonify({"erro": "Curso não encontrado"}), 404

#=========================================
#   Rota DELETE — remove um projeto
#=========================================
@app.route("/cursos/<int:id>", methods=["DELETE"])
def delete_curso(id):
    for curso in cursos:
        if curso["id"] == id:
            cursos.remove(curso)
            return jsonify({"mensagem": "Curso removido com sucesso"}), 200
    return jsonify({"erro": "Curso não encontrado"}), 404

#=====================================================================================
#                                   SKILLS
#=====================================================================================

#=========================================
#            DADOS MOCKADOS
#=========================================
skills = [
    {"id": 1, "nome": "HTML5",      "icone": "🌐"},
    {"id": 2, "nome": "CSS3",       "icone": "🎨"},
    {"id": 3, "nome": "JavaScript", "icone": "⚡"},
    {"id": 4, "nome": "Python",     "icone": "🐍"},
    {"id": 5, "nome": "GitHub",     "icone": "🐙"},
    {"id": 6, "nome": "Vercel",     "icone": "▲"}
]

#=========================================
#   Rota GET — retorna todos os projetos
#=========================================
@app.route("/skills", methods=["GET"])
def get_skills():
    return jsonify(skills)

#=========================================
#   Rota POST — adiciona um novo projeto
#=========================================
@app.route("/skills", methods=["POST"])
def add_skill():
    novo = request.get_json()
    novo["id"] = len(skills) + 1
    skills.append(novo)
    return jsonify(novo), 201

#=========================================
#   Rota PUT — edita um projeto existente
#=========================================
@app.route("/skills/<int:id>", methods=["PUT"])
def update_skill(id):
    for skill in skills:
        if skill["id"] == id:
            skill.update(request.get_json())
            return jsonify(skill)
    return jsonify({"erro": "Skill não encontrada"}), 404

#=========================================
#   Rota DELETE — remove um projeto
#=========================================
@app.route("/skills/<int:id>", methods=["DELETE"])
def delete_skill(id):
    for skill in skills:
        if skill["id"] == id:
            skills.remove(skill)
            return jsonify({"mensagem": "Skill removida com sucesso"}), 200
    return jsonify({"erro": "Skill não encontrada"}), 404

#=====================================================================================
#                                   PROJETOS
#=====================================================================================

#=========================================
#            DADOS MOCKADOS
#=========================================
#***por enquanto os DADOS estão FIXOS, na Atividade 3 virão do BD***
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

#=========================================
#   Rota GET — retorna todos os projetos
#=========================================
@app.route("/projetos", methods=["GET"])
def get_projetos():
    return jsonify(projetos)

#=========================================
#   Rota POST — adiciona um novo projeto
#=========================================
@app.route("/projetos", methods=["POST"])
def add_projeto():
    novo = request.get_json()
    novo["id"] = len(projetos) + 1
    projetos.append(novo)
    return jsonify(novo), 201

#=========================================
#   Rota PUT — edita um projeto existente
#=========================================
@app.route("/projetos/<int:id>", methods=["PUT"])
def update_projeto(id):
    for projeto in projetos:
        if projeto["id"] == id:
            dados = request.get_json()
            projeto.update(dados)
            return jsonify(projeto)
    return jsonify({"erro": "Projeto não encontrado"}), 404

#=========================================
#   Rota DELETE — remove um projeto
#=========================================
@app.route("/projetos/<int:id>", methods=["DELETE"])
def delete_projeto(id):
    for projeto in projetos:
        if projeto["id"] == id:
            projetos.remove(projeto)
            return jsonify({"mensagem": "Projeto removido com sucesso"}), 200
    return jsonify({"erro": "Projeto não encontrado"}), 404

if __name__ == "__main__":
    app.run(debug=True)