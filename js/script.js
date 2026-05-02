/* ===========================================================================
                                  SCRIPT.js
=========================================================================== */
console.log("JS carregou");

// ===== SAUDAÇÃO AUTOMÁTICA =====
// ① Estrutura de decisão - exibe saudação conforme horário do dia
let agora = new Date();
let hora = agora.getHours();
let mensagem = "";

if (hora < 12) {
  mensagem = "<span class='saudacao-emoji'>☀️</span><span class='saudacao-texto'> Bom dia!<br> Seja bem-vindo ao meu portfólio</span>";
} else if (hora < 18) {
  mensagem = "<span class='saudacao-emoji'>🌤️</span><span class='saudacao-texto'> Boa tarde!<br> Seja bem-vindo ao meu portfólio</span>";
} else {
  mensagem = "<span class='saudacao-emoji'>🌙</span><span class='saudacao-texto'> Boa noite!<br> Seja bem-vindo ao meu portfólio</span>";
}

document.getElementById("saudacao").innerHTML = mensagem;

// ===== ANO AUTOMÁTICO NO FOOTER =====
document.getElementById("ano").textContent = new Date().getFullYear();

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