/* ===========================================================================
PROJETOS
=========================================================================== */
/* ─── CONTAGEM AUTOMÁTICA DE PROJETOS ─── */
function atualizarStatProjetos() {
  const el = document.getElementById("stat-projetos");
  if (!el) return;

  const total = projetos.length;
  el.textContent = total + "+";
}

let projetos = [];

// ===== GERAR CARDS DE PROJETOS =====
// ③ Função - renderiza os cards de projetos
function renderProjetos(filtro) {
  const container = document.getElementById("lista-projetos");
  container.innerHTML = "";

  for (let i = 0; i < projetos.length; i++) {
    if (filtro === "todos" || projetos[i].categoria === filtro) {
      container.innerHTML += `
        <article class="projeto-card" data-categoria="${projetos[i].categoria}">
          <h3>${projetos[i].nome}</h3>
          <h4>${projetos[i].data}</h4>
          <h5>${projetos[i].semestre}</h5>
          <p>${projetos[i].descricao}</p>
          <p class="proj-techs">${projetos[i].tecnologias.join(" · ")}</p>
          <div class="proj-actions">
            <a href="${projetos[i].link}" target="_blank" class="btn-proj">► Ver projeto</a>
            <a href="${projetos[i].github}" target="_blank" class="btn-proj">► GitHub</a>
          </div>
        </article>
      `;
    }
  }
}

// ===== FILTRO DE PROJETOS =====
// ③ Função - filtra projetos por categoria ao clicar nos botões
function filtrarProjetos(categoria, btn) {
  const botoes = document.querySelectorAll(".filtros-projetos button");
  botoes.forEach(function(b) {
    if (b === btn) {
      b.classList.add("ativo");
    } else {
      b.classList.remove("ativo");
    }
  });
  renderProjetos(categoria);
}

// ===== BUSCA DO FLASK =====
// Mapa para converter mês em número
const meses = {
  jan:1, fev:2, mar:3, abr:4, mai:5, jun:6,
  jul:7, ago:8, set:9, out:10, nov:11, dez:12
};

fetch("http://127.0.0.1:5000/projetos")
  .then(r => r.json())
  .then(dados => {
    // Ordena do mais recente para o mais antigo
    projetos = dados.sort((a, b) => {
      const [mesA, anoA] = a.data.split("/");
      const [mesB, anoB] = b.data.split("/");
      if (anoB !== anoA) return anoB - anoA;
      return meses[mesB] - meses[mesA];
    });
    renderProjetos("todos");
    atualizarStatProjetos();
  })
  .catch(err => console.error("Erro ao buscar projetos:", err));