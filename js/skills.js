/* ===========================================================================
SKILLS
=========================================================================== */
// ② Repetição - array com as habilidades técnicas
const skills = [
  { nome: "HTML5",      icone: "🌐", nivel: 60 },
  { nome: "CSS3",       icone: "🎨", nivel: 55 },
  { nome: "JavaScript", icone: "⚡", nivel: 45 },
  { nome: "Python",     icone: "🐍", nivel: 35 },
  { nome: "GitHub",     icone: "🐙", nivel: 50 },
  { nome: "Vercel",     icone: "▲",  nivel: 45 }
];

// ===== GERAR CARDS DE SKILLS =====
// ② Repetição - cria um card para cada habilidade do array
const listaSkills = document.getElementById("lista-skills");

for (let i = 0; i < skills.length; i++) {
  listaSkills.innerHTML += `
    <div class="skill-card">
      <span>${skills[i].icone}</span>
      <p>${skills[i].nome}</p>
      <p>${skills[i].nivel}%</p>
    </div>
  `;
}