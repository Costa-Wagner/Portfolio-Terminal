/* ===========================================================================
   FORMAÇÃO ACADÊMICA
=========================================================================== */
const formacao = [
  {
    icone: "🎮",
    curso: "DSM - Desenvolvimento de Software Multiplataforma",
    instituicao: "FATEC / São José dos Campos",
    periodo: "previsão 2028 · em andamento"
  },
  {
    icone: "🏛️",
    curso: "Gestão Pública",
    instituicao: "UNINTER / São José dos Campos",
    periodo: "2020 · concluído"
  },
  {
    icone: "⚙️",
    curso: "Engenharia de Produção Mecânica",
    instituicao: "UNITAU / Taubaté",
    periodo: "2011 · concluído"
  }
];

// ② Repetição - percorre o array e cria um item para cada formação
const listaFormacao = document.getElementById("lista-formacao");

for (let i = 0; i < formacao.length; i++) {
  listaFormacao.innerHTML += `
    <li>
      <div class="tl-icon">${formacao[i].icone}</div>
      <div class="tl-content">
        <strong>${formacao[i].curso}</strong>
        <span>${formacao[i].instituicao}</span>
        <span>${formacao[i].periodo}</span>
      </div>
    </li>
  `;
}