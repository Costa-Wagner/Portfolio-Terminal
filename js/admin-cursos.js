/* ===========================================================================
                                ADMIN-CURSOS.js
=========================================================================== */

/* ================================== READ (listar) ====================================*/
async function carregarCursosAdmin() {
  const resposta = await fetch("http://127.0.0.1:5000/cursos");
  const dados = await resposta.json();
  const lista = document.getElementById("lista-cursos-admin");
  lista.innerHTML = "";

  dados.forEach(c => {
    lista.innerHTML += `
      <div style="border:1px solid #00ff9c33; padding:8px; margin-bottom:8px; font-size:8px;">
        <strong style="color:#00ff9c">${c.nome} (${c.horas})</strong>
        <div style="margin-top:6px; display:flex; gap:8px;">
          <button class="btn-proj" onclick="preencherEdicaoCurso(${c.id})">► Editar</button>
          <button class="btn-proj" onclick="removerCurso(${c.id})">► Remover</button>
        </div>
      </div>
    `;
  });
}

/* =============================== CREATE ===================================*/
async function adicionarCurso(event) {
  event.preventDefault();

  const novo = {
    nome:        document.getElementById("curso-nome").value,
    horas:       document.getElementById("curso-horas").value,
    instituicao: document.getElementById("curso-instituicao").value,
    ano:         document.getElementById("curso-ano").value,
    descricao:   document.getElementById("curso-descricao").value,
    certificado: document.getElementById("curso-certificado").value,
    link:        document.getElementById("curso-link").value
  };

  const resposta = await fetch("http://127.0.0.1:5000/cursos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(novo)
  });

  if (resposta.ok) {
  resetarFormCurso();
  fecharAdmin();
  alert("✔ Curso adicionado com sucesso!");
  location.reload();
  } else {
    alert("Erro ao adicionar curso.");
  }
  return false;
}

/* =============================== READ (buscar p editar) ================================*/
async function preencherEdicaoCurso(id) {
  const resposta = await fetch("http://127.0.0.1:5000/cursos");
  const dados = await resposta.json();
  const c = dados.find(c => c.id === id);

  document.getElementById("curso-nome").value        = c.nome;
  document.getElementById("curso-horas").value       = c.horas;
  document.getElementById("curso-instituicao").value = c.instituicao;
  document.getElementById("curso-ano").value         = c.ano;
  document.getElementById("curso-descricao").value   = c.descricao;
  document.getElementById("curso-certificado").value = c.certificado;
  document.getElementById("curso-link").value        = c.link;

  const btn = document.getElementById("btn-submit-curso");
  btn.textContent = "► Salvar Edição";
  btn.onclick = (e) => { e.preventDefault(); salvarEdicaoCurso(id); };

  document.getElementById("btn-cancelar-curso").style.display = "block";
}

/* =============================== UPDATE ==================================*/
async function salvarEdicaoCurso(id) {
  const atualizado = {
    nome:        document.getElementById("curso-nome").value,
    horas:       document.getElementById("curso-horas").value,
    instituicao: document.getElementById("curso-instituicao").value,
    ano:         document.getElementById("curso-ano").value,
    descricao:   document.getElementById("curso-descricao").value,
    certificado: document.getElementById("curso-certificado").value,
    link:        document.getElementById("curso-link").value
  };

  const resposta = await fetch(`http://127.0.0.1:5000/cursos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(atualizado)
  });

  if (resposta.ok) {
    alert("✔ Curso atualizado!");
    fecharAdmin();
    location.reload();
  }
}

/* =============================== DELETE ==================================*/
async function removerCurso(id) {
  if (!confirm("Remover este curso?")) return;

  const resposta = await fetch(`http://127.0.0.1:5000/cursos/${id}`, {
    method: "DELETE"
  });

  if (resposta.ok) {
    alert("✔ Curso removido!");
    carregarCursosAdmin();
    location.reload();
  }
}

/* ========================= Função — reseta form CURSO =========================*/
function resetarFormCurso() {
  document.getElementById("curso-nome").value        = "";
  document.getElementById("curso-horas").value       = "";
  document.getElementById("curso-instituicao").value = "";
  document.getElementById("curso-ano").value         = "";
  document.getElementById("curso-descricao").value   = "";
  document.getElementById("curso-certificado").value = "";
  document.getElementById("curso-link").value        = "";

  const btn = document.getElementById("btn-submit-curso");
  btn.textContent = "► Adicionar Curso";
  btn.onclick = null;

  document.getElementById("btn-cancelar-curso").style.display = "none";
}