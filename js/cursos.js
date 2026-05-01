/* ===========================================================================
                              CURSOS.js (array)
=========================================================================== */

// ===== GERAR LISTA DE CURSOS =====
// ② Repetição - percorre o array e cria um item para cada curso
fetch("http://127.0.0.1:5000/cursos")
  .then(res => res.json())
  .then(cursos => {
    const listaCursos = document.getElementById("lista-cursos");

    for (let i = 0; i < cursos.length; i++) {
      listaCursos.innerHTML += `
        <li class="curso-card">
          <div class="curso-info">
            <strong>${cursos[i].nome} (${cursos[i].horas})</strong>
            <h4>${cursos[i].instituicao} · ${cursos[i].ano}</h4>
            <p>${cursos[i].descricao}</p>
          </div>
          <div class="proj-actions">
            <button onclick="abrirModal('${cursos[i].certificado}')" class="btn-proj">► Certificado</button>
            <a href="${cursos[i].link}" target="_blank" class="btn-proj">► Site</a>
          </div>
        </li>
      `;
    }
  }
);

/* ════════ MODAL CERTIFICADO ════════ */
function abrirModal(src) {
  console.log("Tentando abrir o certificado:", src);

  const overlay = document.getElementById("modal-overlay");
  const box     = document.getElementById("modal-box");
  const img     = document.getElementById("modal-img");

  if (!overlay || !box || !img) {
    console.error("Erro: Elementos do modal não encontrados no HTML.");
    return;
  }

  img.src = src;

  // 1. Primeiro muda o display para que o elemento exista no layout
  overlay.style.display = "block";
  box.style.display = "flex";

  // 2. Curto delay para o navegador processar a mudança de display e iniciar a transição
  setTimeout(() => {
    overlay.classList.add("aberto");
    box.classList.add("aberto");
  }, 10);
}

function fecharModal() {
  const overlay = document.getElementById("modal-overlay");
  const box     = document.getElementById("modal-box");

  overlay.classList.remove("aberto");
  box.classList.remove("aberto");

  // Espera a animação de 0.3s terminar antes de esconder totalmente
  setTimeout(() => {
    overlay.style.display = "none";
    box.style.display = "none";
    document.getElementById("modal-img").src = "";
  }, 300);
}