/* ===========================================================================
                            FORMAÇÃO ACADÊMICA.js
=========================================================================== */
  fetch("http://127.0.0.1:5000/formacao")
  .then(res => res.json())
  .then(formacao => {

    formacao.sort((a, b) => {
      const anoA = parseInt(a.periodo);
      const anoB = parseInt(b.periodo);
      return anoB - anoA;
    });

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
  });