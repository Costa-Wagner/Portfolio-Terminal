/* ===========================================================================
                                ADMIN-SKILLS.js
=========================================================================== */

/* ================================== READ (listar) ====================================*/
async function carregarSkillsAdmin() {
  const resposta = await fetch("http://127.0.0.1:5000/skills");
  const dados = await resposta.json();
  const lista = document.getElementById("lista-skills-admin");
  lista.innerHTML = "";

  dados.forEach(s => {
    lista.innerHTML += `
      <div style="border:1px solid #00ff9c33; padding:8px; margin-bottom:8px; font-size:8px;">
        <strong style="color:#00ff9c">${s.icone} ${s.nome}</strong>
        <div style="margin-top:6px; display:flex; gap:8px;">
          <button class="btn-proj" onclick="preencherEdicaoSkill(${s.id})">► Editar</button>
          <button class="btn-proj" onclick="removerSkill(${s.id})">► Remover</button>
        </div>
      </div>
    `;
  });
}

/* =============================== CREATE ===================================*/
async function adicionarSkill(event) {
  event.preventDefault();

  const novo = {
    icone: document.getElementById("skill-icone").value,
    nome:  document.getElementById("skill-nome").value
  };

  const resposta = await fetch("http://127.0.0.1:5000/skills", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(novo)
  });

  if (resposta.ok) {
  resetarFormSkill();
  fecharAdmin();
  alert("✔ Skill adicionada com sucesso!");
  location.reload();
  } else {
    alert("Erro ao adicionar skill.");
  }
  return false;
}

/* =============================== READ (buscar p editar) ================================*/
async function preencherEdicaoSkill(id) {
  const resposta = await fetch("http://127.0.0.1:5000/skills");
  const dados = await resposta.json();
  const s = dados.find(s => s.id === id);

  document.getElementById("skill-icone").value = s.icone;
  document.getElementById("skill-nome").value  = s.nome;

  const btn = document.getElementById("btn-submit-skill");
  btn.textContent = "► Salvar Edição";
  btn.onclick = (e) => { e.preventDefault(); salvarEdicaoSkill(id); };

  document.getElementById("btn-cancelar-skill").style.display = "block";
}

/* =============================== UPDATE ==================================*/
async function salvarEdicaoSkill(id) {
  const atualizado = {
    icone: document.getElementById("skill-icone").value,
    nome:  document.getElementById("skill-nome").value
  };

  const resposta = await fetch(`http://127.0.0.1:5000/skills/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(atualizado)
  });

  if (resposta.ok) {
    alert("✔ Skill atualizada!");
    fecharAdmin();
    location.reload();
  }
}

/* =============================== DELETE ==================================*/
async function removerSkill(id) {
  if (!confirm("Remover esta skill?")) return;

  const resposta = await fetch(`http://127.0.0.1:5000/skills/${id}`, {
    method: "DELETE"
  });

  if (resposta.ok) {
    alert("✔ Skill removida!");
    carregarSkillsAdmin();
    location.reload();
  }
}

/* ========================= Função — reseta form de skills  =========================*/
function resetarFormSkill() {
  document.getElementById("skill-icone").value = "";
  document.getElementById("skill-nome").value  = "";

  const btn = document.getElementById("btn-submit-skill");
  btn.textContent = "► Adicionar Skill";
  btn.onclick = null;

  document.getElementById("btn-cancelar-skill").style.display = "none";
}