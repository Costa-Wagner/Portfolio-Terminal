/* ===========================================================================
                                ADMIN.js
=========================================================================== */

/* ========================= Função — abre o PAINEL ADMIN  =========================*/
function abrirAdmin() {
  const overlay = document.getElementById("admin-overlay");
  const box     = document.getElementById("admin-box");

  // Mostra login, esconde formulário
  document.getElementById("admin-login").style.display = "block";
  document.getElementById("admin-conteudo").style.display = "none";
  document.getElementById("admin-senha").value = "";
  document.getElementById("admin-senha-erro").textContent = "";

  overlay.style.display = "block";
  box.style.display = "flex";

  setTimeout(() => {
    overlay.classList.add("aberto");
    box.classList.add("aberto");
  }, 10);

  setTimeout(() => {
    document.getElementById("admin-senha").focus();
  }, 50);
}

/* ========================= Função — verifica SENHA do ADMIN  =========================*/
async function verificarSenha() {
  const senha = document.getElementById("admin-senha").value;

  const resposta = await fetch("http://127.0.0.1:5000/admin/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ senha: senha })
  });

  const dados = await resposta.json();

  if (dados.autorizado) {
    document.getElementById("admin-login").style.display = "none";
    document.getElementById("admin-conteudo").style.display = "block";
  } else {
    document.getElementById("admin-senha-erro").textContent = "Senha incorreta!";
  }
}

/* ========================= Função — fecha o painel ADMIN  =========================*/
function fecharAdmin() {
  const overlay = document.getElementById("admin-overlay");
  const box     = document.getElementById("admin-box");

  overlay.classList.remove("aberto");
  box.classList.remove("aberto");

  setTimeout(() => {
    overlay.style.display = "none";
    box.style.display = "none";
  }, 300);
}

/* ========================= Função — navegação entre seções  =========================*/
function abrirSecao(secao) {
  // Esconde todos os formulários
  document.getElementById("form-formacao").style.display = "none";
  document.getElementById("form-cursos").style.display = "none";
  document.getElementById("form-skills").style.display = "none";
  document.getElementById("form-projetos").style.display = "none";

  // destaca botão ativo
  document.querySelectorAll("#admin-menu .btn-categoria").forEach(btn => btn.classList.remove("ativo"));
  event.target.classList.add("ativo");

  // Exibe o formulário da seção clicada
  document.getElementById("form-" + secao).style.display = "block";

  if (secao === "formacao") { resetarFormFormacao(); carregarFormacaoAdmin(); }
  if (secao === "cursos") { resetarFormCurso(); carregarCursosAdmin(); }
  if (secao === "skills") { resetarFormSkill(); carregarSkillsAdmin(); }
  if (secao === "projetos") { resetarFormProjeto(); carregarProjetosAdmin(); }
 
  // reseta botão para modo adicionar
  const btn = document.getElementById("btn-submit-projeto");
  btn.textContent = "► Adicionar Projeto";
  btn.onclick = null;
}