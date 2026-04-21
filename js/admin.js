/* ===========================================================================
ADMIN
=========================================================================== */
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
}

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

async function adicionarProjeto(event) {
  event.preventDefault();

  const novo = {
    nome:        document.getElementById("admin-nome").value,
    data:        document.getElementById("admin-data").value,
    descricao:   document.getElementById("admin-descricao").value,
    semestre:    document.getElementById("admin-semestre").value,
    categoria:   document.getElementById("admin-categoria").value,
    tecnologias: document.getElementById("admin-tecnologias").value.split(",").map(t => t.trim()),
    link:        document.getElementById("admin-link").value,
    github:      document.getElementById("admin-github").value
  };

  const resposta = await fetch("http://127.0.0.1:5000/projetos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(novo)
  });

  if (resposta.ok) {
    const criado = await resposta.json();
    projetos.push(criado);
    renderProjetos("todos");
    atualizarStatProjetos();
    fecharAdmin();
    alert("✔ Projeto adicionado com sucesso!");
  } else {
    alert("Erro ao adicionar projeto.");
  }

  return false;
}

/* BOTÃO CATEGORIA - PROJETOS */
function setCategoria(valor, elemento) {
  // 1. Salva o valor no input hidden para o seu fetch funcionar
  document.getElementById('admin-categoria').value = valor;

  // 2. Remove a classe 'ativo' de todos os botões de categoria
  const botoes = document.querySelectorAll('.btn-categoria');
  botoes.forEach(btn => btn.classList.remove('ativo'));

  // 3. Adiciona a classe 'ativo' apenas no botão que foi clicado
  elemento.classList.add('ativo');
}