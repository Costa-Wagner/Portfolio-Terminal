console.log("JS carregou");

// ===== SAUDAÇÃO AUTOMÁTICA =====
// ① Estrutura de decisão - exibe saudação conforme horário do dia
let agora = new Date();
let hora = agora.getHours();
let mensagem = "";

if (hora < 12) {
  mensagem = "Bom dia! Seja bem-vindo ao meu portfólio.";
} else if (hora < 18) {
  mensagem = "Boa tarde! Seja bem-vindo ao meu portfólio.";
} else {
  mensagem = "Boa noite! Seja bem-vindo ao meu portfólio.";
}

document.getElementById("saudacao").innerText = mensagem;

/* ─── CONTAGEM AUTOMÁTICA DE PROJETOS ─── */
function atualizarStatProjetos() {
  const el = document.getElementById("stat-projetos");
  if (!el) return;

  const total = projetos.length;
  el.textContent = total + "+";
}

// ===== ANO AUTOMÁTICO NO FOOTER =====
document.getElementById("ano").textContent = new Date().getFullYear();

/* ===========================================================================
CURSOS (array)
=========================================================================== */
const cursos = [
  {
    nome: "Escola de Inovadores",
    horas: "40h",
    instituicao: "FATEC",
    ano: 2025,
    descricao: "Capacitação em inovação, empreendedorismo e novas tecnologias aplicadas ao mercado.",
    certificado: "imagem/imagens/CERTIFICADOS/certif_escola_inovadores.jpg",
    link: "https://inova.cps.sp.gov.br/escola-de-inovadores/"
  },
  {
    nome: "Python Básico",
    horas: "18h",
    instituicao: "Fundação Bradesco",
    ano: 2025,
    descricao: "Introdução à linguagem Python, lógica de programação e estruturas básicas.",
    certificado: "imagem/imagens/CERTIFICADOS/certif_python_basic_bradesco.jpg",
    link: "https://www.ev.org.br/cursos/linguagem-de-programacao-python-basico"
  }
];

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

// ===== GERAR LISTA DE CURSOS =====
// ② Repetição - percorre o array e cria um item para cada curso
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

/* ===========================================================================
PROJETOS
=========================================================================== */
const projetos = [
  {
    nome: "Projeto Portfólio",
    data: "dez/2025",
    descricao: "Portfólio pessoal desenvolvido com HTML, CSS, JavaScript e Python (Flask).",
    semestre: "1º sem. · FATEC",
    categoria: "academico",
    link: "https://portfolio-wagner-nu.vercel.app/",
    github: "https://github.com/Costa-Wagner/portfolio"
  },
  {
    nome: "Projeto API — JanoSys",
    data: "dez/2025",
    descricao: "Solução digital para facilitar a visualização e interpretação dos dados do CENSO 2010/2022. Atuei como Product Owner da equipe JanoSys.",
    tipo: "API - Aprendizado por Projeto Integrador - Projeto Acadêmico",
    semestre: "1º sem. · FATEC",
    categoria: "api",
    link: "https://janosysapi1.vercel.app/",
    github: "https://github.com/janosystime/Janosys-Project"
  },
  {
    nome: "Site Pessoal",
    data: "out/2025",
    descricao: "Site pessoal explorando conceitos de desenvolvimento web, UX e design digital.",
    semestre: "1º sem. · FATEC",
    categoria: "academico",
    link: "https://ws-start-ten.vercel.app/",
    github: "https://github.com/Costa-Wagner/WS.start"
  }
];

// ===== GERAR CARDS DE PROJETOS =====
// ③ Função - renderiza os cards de projetos
function renderProjetos(filtro) {

  const container = document.getElementById("lista-projetos");
  container.innerHTML = "";

  for (let i = 0; i < projetos.length; i++) {

    // ① Estrutura de decisão - exibe só os projetos da categoria selecionada
    if (filtro === "todos" || projetos[i].categoria === filtro) {

      container.innerHTML += `
        <article class="projeto-card" data-categoria="${projetos[i].categoria}">
          <h3>${projetos[i].nome}</h3>
          <h4>${projetos[i].data}</h4>
          <h5>${projetos[i].semestre}</h5>
          <p>${projetos[i].descricao}</p>
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

  // ① Estrutura de decisão - ativa o botão clicado
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

/* ===========================================================================
FORMULÁRIO
=========================================================================== */
// ③ Função - valida os campos antes de enviar para o Formspree
async function validarFormulario(event) {
  event.preventDefault();

  const nome     = document.getElementById("form-nome");
  const email    = document.getElementById("form-email");
  const mensagem = document.getElementById("form-mensagem");
  const feedback = document.getElementById("form-feedback");

  feedback.innerHTML = "";
  let erros = [];

  // ① Estrutura de decisão - verifica se os campos estão preenchidos
  if (nome.value.trim() === "") {
    erros.push("Preencha o campo Nome.");
  }

  if (email.value.trim() === "") {
    erros.push("Preencha o campo E-mail.");
  } else if (!email.value.includes("@")) {
    erros.push("Informe um e-mail válido.");
  }

  if (mensagem.value.trim() === "") {
    erros.push("Preencha o campo Mensagem.");
  }

  // ① if/else - exibe erros ou envia para o Formspree
  if (erros.length > 0) {

    feedback.style.color = "#ff4466";
    for (let i = 0; i < erros.length; i++) {
      feedback.innerHTML += "<p>" + erros[i] + "</p>";
    }

  } else {

    const resposta = await fetch("https://formspree.io/f/xdawaqnn", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nome: nome.value,
        email: email.value,
        mensagem: mensagem.value
      })
    });

    if (resposta.ok) {
      feedback.style.color = "#00ff9c";
      feedback.innerHTML = "<p>✔ Mensagem enviada! Em breve entrarei em contato.</p>";
      nome.value     = "";
      email.value    = "";
      mensagem.value = "";
    } else {
      feedback.style.color = "#ff4466";
      feedback.innerHTML = "<p>Erro ao enviar. Tente pelo WhatsApp.</p>";
    }
  }

  return false;
}

/* ===========================================================================
INICIALIZAÇÃO
=========================================================================== */
renderProjetos("todos");

setTimeout(function(){
  atualizarStatProjetos();
}, 50);