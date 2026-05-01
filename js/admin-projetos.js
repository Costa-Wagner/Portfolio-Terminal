/* ===========================================================================
                                ADMIN-PROJETOS.js
=========================================================================== */

/* ================================== READ (listar) ====================================*/
async function carregarProjetosAdmin() {
    
  const resposta = await fetch("http://127.0.0.1:5000/projetos");
  const dados = await resposta.json();
  const lista = document.getElementById("lista-projetos-admin");
  lista.innerHTML = "";

  dados.forEach(p => {
    lista.innerHTML += `
      <div style="border:1px solid #00ff9c33; padding:8px; margin-bottom:8px; font-size:8px;">
        <strong style="color:#00ff9c">${p.nome}</strong> · ${p.data}
        <div style="margin-top:6px; display:flex; gap:8px;">
          <button class="btn-proj" onclick="preencherEdicaoProjeto(${p.id})">► Editar</button>
          <button class="btn-proj" onclick="removerProjeto(${p.id})">► Remover</button>
        </div>
      </div>
    `;
  });
}

/* ================================= CREATE =====================================*/
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

/* =============================== READ (buscar p editar) ================================*/
async function preencherEdicaoProjeto(id) {
  const resposta = await fetch("http://127.0.0.1:5000/projetos");
  const dados = await resposta.json();
  const p = dados.find(p => p.id === id);

  document.getElementById("admin-nome").value       = p.nome;
  document.getElementById("admin-data").value       = p.data;
  document.getElementById("admin-semestre").value   = p.semestre;
  document.getElementById("admin-descricao").value  = p.descricao;
  document.getElementById("admin-categoria").value  = p.categoria;
  document.getElementById("admin-tecnologias").value = p.tecnologias.join(", ");
  document.getElementById("admin-link").value       = p.link;
  document.getElementById("admin-github").value     = p.github;

  // troca o submit para PUT
  document.getElementById("btn-submit-projeto").textContent = "► Salvar Edição";
  document.getElementById("btn-submit-projeto").onclick = (e) => {
    e.preventDefault();
    salvarEdicaoProjeto(id);
  };
  
  document.getElementById("btn-cancelar-projeto").style.display = "block";
}

/* ===================================== UPDATE =========================================*/
async function salvarEdicaoProjeto(id) {
  const atualizado = {
    nome:        document.getElementById("admin-nome").value,
    data:        document.getElementById("admin-data").value,
    semestre:    document.getElementById("admin-semestre").value,
    descricao:   document.getElementById("admin-descricao").value,
    categoria:   document.getElementById("admin-categoria").value,
    tecnologias: document.getElementById("admin-tecnologias").value.split(",").map(t => t.trim()),
    link:        document.getElementById("admin-link").value,
    github:      document.getElementById("admin-github").value
  };

  const resposta = await fetch(`http://127.0.0.1:5000/projetos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(atualizado)
  });

  if (resposta.ok) {
    alert("✔ Projeto atualizado!");
    fecharAdmin();
    location.reload();
  }
}

/* ================================= DELETE ====================================*/
async function removerProjeto(id) {
  if (!confirm("Remover este projeto?")) return;

  const resposta = await fetch(`http://127.0.0.1:5000/projetos/${id}`, {
    method: "DELETE"
  });

  if (resposta.ok) {
    alert("✔ Projeto removido!");
    carregarProjetosAdmin();
    location.reload();
  }
}

/* ========================= Função — reseta form de projeto  =========================*/
function resetarFormProjeto() {
  document.getElementById("admin-nome").value        = "";
  document.getElementById("admin-data").value        = "";
  document.getElementById("admin-semestre").value    = "";
  document.getElementById("admin-descricao").value   = "";
  document.getElementById("admin-categoria").value   = "";
  document.getElementById("admin-tecnologias").value = "";
  document.getElementById("admin-link").value        = "";
  document.getElementById("admin-github").value      = "";

  const btn = document.getElementById("btn-submit-projeto");
  btn.textContent = "► Adicionar Projeto";
  btn.onclick = null;

  document.getElementById("btn-cancelar-projeto").style.display = "none";
}

/* ========================= Função — botão categoria projetos  =========================*/
function setCategoria(valor, elemento) {
  // 1. Salva o valor no input hidden para o seu fetch funcionar
  document.getElementById('admin-categoria').value = valor;

  // 2. Remove a classe 'ativo' de todos os botões de categoria
  const botoes = document.querySelectorAll('.btn-categoria');
  botoes.forEach(btn => btn.classList.remove('ativo'));

  // 3. Adiciona a classe 'ativo' apenas no botão que foi clicado
  elemento.classList.add('ativo');
}