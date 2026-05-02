/* ===========================================================================
                                ADMIN-FORMACAO.js
=========================================================================== */

/* ================================== READ (listar) ====================================*/
async function carregarFormacaoAdmin() {
  const resposta = await fetch("http://127.0.0.1:5000/formacao");
  const dados = await resposta.json();
  const lista = document.getElementById("lista-formacao-admin");
  lista.innerHTML = "";

  dados.forEach(f => {
    lista.innerHTML += `
      <div style="border:1px solid #00ff9c33; padding:8px; margin-bottom:8px; font-size:8px;">
        <strong style="color:#00ff9c">${f.icone} ${f.curso}</strong>
        <div style="margin-top:6px; display:flex; gap:8px;">
          <button class="btn-proj" onclick="preencherEdicaoFormacao(${f.id})">► Editar</button>
          <button class="btn-proj" onclick="removerFormacao(${f.id})">► Remover</button>
        </div>
      </div>
    `;
  });
}

/* ================================= CREATE =====================================*/
async function adicionarFormacao(event) {
  event.preventDefault();

  const novo = {
    icone:       document.getElementById("formacao-icone").value,
    curso:       document.getElementById("formacao-curso").value,
    instituicao: document.getElementById("formacao-instituicao").value,
    periodo:     document.getElementById("formacao-periodo").value
  };

  const resposta = await fetch("http://127.0.0.1:5000/formacao", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(novo)
  });

  if (resposta.ok) {
    fecharAdmin();
    alert("✔ Formação adicionada com sucesso!");
    location.reload();
  } else {
    alert("Erro ao adicionar formação.");
  }
  return false;
}

/* =============================== READ (buscar p editar) ================================*/
async function preencherEdicaoFormacao(id) {
  const resposta = await fetch("http://127.0.0.1:5000/formacao");
  const dados = await resposta.json();
  const f = dados.find(f => f.id === id);

  document.getElementById("formacao-icone").value       = f.icone;
  document.getElementById("formacao-curso").value       = f.curso;
  document.getElementById("formacao-instituicao").value = f.instituicao;
  document.getElementById("formacao-periodo").value     = f.periodo;

  const btn = document.getElementById("btn-submit-formacao");
  btn.textContent = "► Salvar Edição";
  btn.onclick = (e) => { e.preventDefault(); salvarEdicaoFormacao(id); };

  document.getElementById("btn-cancelar-formacao").style.display = "block";
}

/* ================================= UPDATE ====================================*/
async function salvarEdicaoFormacao(id) {
  const atualizado = {
    icone:       document.getElementById("formacao-icone").value,
    curso:       document.getElementById("formacao-curso").value,
    instituicao: document.getElementById("formacao-instituicao").value,
    periodo:     document.getElementById("formacao-periodo").value
  };

  const resposta = await fetch(`http://127.0.0.1:5000/formacao/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(atualizado)
  });

  if (resposta.ok) {
    alert("✔ Formação atualizada!");
    fecharAdmin();
    location.reload();
  }
}

/* ================================= DELETE ====================================*/
async function removerFormacao(id) {
  if (!confirm("Remover esta formação?")) return;

  const resposta = await fetch(`http://127.0.0.1:5000/formacao/${id}`, {
    method: "DELETE"
  });

  if (resposta.ok) {
    alert("✔ Formação removida!");
    carregarFormacaoAdmin();
    location.reload();
  }
}

/* ========================= Função — reseta form FORMAÇÃO =========================*/
function resetarFormFormacao() {
  document.getElementById("formacao-icone").value       = "";
  document.getElementById("formacao-curso").value       = "";
  document.getElementById("formacao-instituicao").value = "";
  document.getElementById("formacao-periodo").value     = "";

  const btn = document.getElementById("btn-submit-formacao");
  btn.textContent = "► Adicionar Formação";
  btn.onclick = null;

  document.getElementById("btn-cancelar-formacao").style.display = "none";
}
