/* ===========================================================================
                                  SKILLS.js
=========================================================================== */
// ===== GERAR CARDS DE SKILLS =====
// ② Repetição - cria um card para cada habilidade do array

fetch("http://127.0.0.1:5000/skills")
  .then(res => res.json())
  .then(skills => {
    const listaSkills = document.getElementById("lista-skills");

    for (let i = 0; i < skills.length; i++) {
      listaSkills.innerHTML += `
        <div class="skill-card">
          <span>${skills[i].icone}</span>
          <p>${skills[i].nome}</p>
        </div>
      `;
    }
  });