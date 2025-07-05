document.addEventListener('DOMContentLoaded', () => {
  // ————— Wizard —————
  const steps    = document.querySelectorAll('.wizard-steps li');
  const sections = document.querySelectorAll('.wizard-content > section');
  const prevBtn  = document.getElementById('prevBtn');
  const nextBtn  = document.getElementById('nextBtn');
  let current    = 0;

  function showStep(i) {
    steps.forEach((s, idx) => s.classList.toggle('active', idx === i));
    sections.forEach((sec, idx) => sec.classList.toggle('active', idx === i));
    prevBtn.disabled = (i === 0);
    nextBtn.textContent = (i === sections.length - 1) ? 'Finalizar' : 'Próximo';
  }

  function fillReview() {
    const getVal = id => document.getElementById(id)?.value || '–';
    document.getElementById('rev-plano').textContent =
      document.querySelector('input[name="plan"]:checked')?.value || '–';
    document.getElementById('rev-noiva').textContent = getVal('nome-noiva');
    document.getElementById('rev-noivo').textContent = getVal('nome-noivo');
    document.getElementById('rev-data').textContent  = getVal('data-evento');
    document.getElementById('rev-local').textContent = getVal('local-evento');
    document.getElementById('rev-tema').textContent  =
      document.getElementById('tema-evento').value || '–';
    document.getElementById('rev-cores').textContent =
      `${getVal('cor-primaria')}, ${getVal('cor-secundaria')}`;
    const convidados = getVal('convidados').split('\n').filter(l => l.trim());
    document.getElementById('rev-convidados-count').textContent = convidados.length;
    const sel = document.getElementById('template-convite');
    document.getElementById('rev-template').textContent =
      sel.options[sel.selectedIndex]?.text || '–';
        document.getElementById('rev-contato').textContent =
    getVal('contato');
  }

  nextBtn.addEventListener('click', () => {
    if (current < sections.length - 1) {
      current++;
      if (current === sections.length - 1) fillReview();
      showStep(current);
    } else {
      window.location.href = 'bem-vindo.html';
    }
  });

  prevBtn.addEventListener('click', () => {
    if (current > 0) {
      current--;
      showStep(current);
    }
  });

  const confirmBtn = document.getElementById('confirmBtn');
  if (confirmBtn) {
    confirmBtn.addEventListener('click', () => {
      window.location.href = 'bem-vindo.html';
    });
  }

  showStep(current);

  // ————— Preview do Convite —————
  const templateSelect = document.getElementById('template-convite');
  const previewImg     = document.getElementById('preview-img');

  // esconde até seleção
  if (previewImg) previewImg.style.display = 'none';

  function updatePreview() {
    const v = templateSelect.value;
    if (v) {
      // monta "convite 1.png", "convite 2.png", etc
      const fileName = `convite ${v}.png`;
      previewImg.src = `assets/${encodeURIComponent(fileName)}`;
      previewImg.style.display = 'block';
    } else {
      previewImg.style.display = 'none';
    }
  }

  if (templateSelect && previewImg) {
    templateSelect.addEventListener('change', updatePreview);
    // inicializa (útil se você tiver um valor padrão diferente de "")
    updatePreview();
  }

  // ————— Color Pickers —————
  function setupPicker(inputId) {
    const inp  = document.getElementById(inputId);
    const disp = inp?.nextElementSibling;
    if (!inp || !disp) return;
    disp.style.backgroundColor = inp.value;
    inp.addEventListener('input', () => {
      disp.style.backgroundColor = inp.value;
    });
  }

  setupPicker('cor-primaria');
  setupPicker('cor-secundaria');
});


  // ————— Passo Presentes —————
  const giftForm = document.getElementById('form-personalizado');
  const checkboxes = document.querySelectorAll('#sugestoes-presentes input[type="checkbox"]');
  const campoPresente = document.getElementById('campoPresente');
  const imagensSelecionadas = document.getElementById('imagensSelecionadas');

  if (giftForm) {
    // envio do form
    giftForm.addEventListener('submit', e => {
      e.preventDefault();
      alert("Obrigado por sua generosidade! 🎁");
      giftForm.reset();
      imagensSelecionadas.innerHTML = '';
    });
  }

  // sincroniza checkboxes → campo texto + preview de imagens (se você tiver data-img, adapte)
  checkboxes.forEach(cb => {
    cb.addEventListener('change', () => {
      const selecionados = [];
      imagensSelecionadas.innerHTML = '';
      checkboxes.forEach(c => {
        if (c.checked) {
          selecionados.push(c.value);
          // se usar data-img no input, troque c.value por c.dataset.img
          // aqui não há data-img, então omitimos
          // ex: criar thumb: 
          // const img = document.createElement('img');
          // img.src = c.dataset.img;
          // imagensSelecionadas.appendChild(img);
        }
      });
      campoPresente.value = selecionados.join(', ');
    });
  });


  document.addEventListener('DOMContentLoaded', () => {
  // — Confetti (5s) —
  if (typeof confetti === 'function') {
    const duration = 5 * 1000;
    const end = Date.now() + duration;
    (function frame() {
      confetti({ particleCount: 2, angle: 60, spread: 55, origin: { x: 0 } });
      confetti({ particleCount: 2, angle: 120, spread: 55, origin: { x: 1 } });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  }

  // — Countdown —
  const daysEl = document.getElementById('days-left');
  // tenta ler do localStorage (definido no wizard)
  let weddingDate = new Date(localStorage.getItem('weddingDate') || '2025-12-31');
  function updateCountdown() {
    const now = new Date();
    const diff = weddingDate - now;
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    daysEl.textContent = `Faltam ${days > 0 ? days : 0} dias para o grande dia!`;
  }
  updateCountdown();
  setInterval(updateCountdown, 1000 * 60 * 60 * 24);
});


  // botão Confirmar (última etapa)
  const confirmBtn = document.getElementById('confirmBtn');
  if (confirmBtn) {
    confirmBtn.addEventListener('click', () => {
      // 1) salva no localStorage
      const planningData = {
        plano: document.querySelector('input[name="plan"]:checked')?.value || '',
        noiva: document.getElementById('nome-noiva').value,
        noivo: document.getElementById('nome-noivo').value,
        data: document.getElementById('data-evento').value,
        local: document.getElementById('local-evento').value,
        contato: document.getElementById('contato')?.value || '',
        tema: document.getElementById('tema-evento').value,
        cores: {
          primaria: document.getElementById('cor-primaria').value,
          secundaria: document.getElementById('cor-secundaria').value
        },
        convidados: document.getElementById('convidados').value
                       .split('\n').filter(l => l.trim()),
        convite: document.getElementById('template-convite').value
      };
      localStorage.setItem('planningData', JSON.stringify(planningData));

      // 2) redireciona para o dashboard
      window.location.href = 'dashboard.html';
    });
  }

document.addEventListener('DOMContentLoaded', () => {
  // Saudação e logout
  const email = localStorage.getItem('userEmail') || 'Convidado';
  document.getElementById('userName').textContent = email;
  document.getElementById('logoutLink').addEventListener('click', e => {
    e.preventDefault();
    localStorage.clear();
    window.location.href = 'login-area.html';
  });

  // Preenche o resumo
  const data = JSON.parse(localStorage.getItem('planningData') || '{}');
  if (data) {
    document.getElementById('dash-plan').textContent    = data.plano || '–';
    document.getElementById('dash-couple').textContent  = `${data.noiva} & ${data.noivo}`;
    document.getElementById('dash-date').textContent    = `${data.data} @ ${data.local}`;
    document.getElementById('dash-contact').textContent = data.contato || '–';
    document.getElementById('dash-guests').textContent  = (data.convidados||[]).length;
    document.getElementById('dash-invite').textContent  = data.convite || '–';
  }

  // Countdown (mesma lógica do bem-vindo)
  const daysEl = document.getElementById('dash-countdown');
  let weddingDate = new Date(data.data || '2025-12-31');
  function updateCountdown() {
    const diff = weddingDate - new Date();
    const days = Math.max(0, Math.ceil(diff/(1000*60*60*24)));
    daysEl.textContent = `Faltam ${days} dia${days!==1?'s':''} para o grande dia!`;
  }
  updateCountdown();
  setInterval(updateCountdown, 1000*60*60*24);

  // PDF com jsPDF
  document.getElementById('downloadPdf').addEventListener('click', () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Resumo do Seu Planejamento', 20, 20);
    doc.setFontSize(12);
    doc.text(`Plano: ${data.plano}`, 20, 40);
    doc.text(`Noiva & Noivo: ${data.noiva} & ${data.noivo}`, 20, 50);
    doc.text(`Data e Local: ${data.data} @ ${data.local}`, 20, 60);
    doc.text(`Contato: ${data.contato}`, 20, 70);
    doc.text(`Convidados: ${(data.convidados||[]).length}`, 20, 80);
    doc.text(`Convite: ${data.convite}`, 20, 90);
    doc.save('meu-planejamento.pdf');
  });
});


document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('loginBtn');

  btn.addEventListener('click', () => {
    const email = document.getElementById('loginEmail').value.trim();
    const senha = document.getElementById('loginSenha').value.trim();

    if (!email || !senha) {
      alert('Por favor, preencha e-mail e senha para continuar.');
      return;
    }

    // Simula um login: guarda o email do usuário
    const usuario = { email };
    localStorage.setItem('clienteLogado', JSON.stringify(usuario));

    // Redireciona para o dashboard
    window.location.href = 'dashboard.html';
  });
});

// Preenche o resumo rápido a partir do planningData salvo
(function fillSummary() {
  const data = JSON.parse(localStorage.getItem('planningData') || '{}');
  document.getElementById('sum-plan').textContent  = data.plano     || '–';
  document.getElementById('sum-date').textContent  = data.data      || '–';
  document.getElementById('sum-theme').textContent = data.tema      || '–';
  document.getElementById('sum-guests').textContent = (data.convidados || []).length;
})();

// Compartilhar o link atual via clipboard
const shareBtn = document.getElementById('shareSiteBtn');
if (shareBtn) {
  shareBtn.addEventListener('click', () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url)
      .then(() => alert('Link copiado: ' + url))
      .catch(() => alert('Não foi possível copiar o link.'));
  });
}

// ===== Passo 5: gerar PDF do planejamento =====
const dlBtn = document.getElementById('downloadPlanBtn');
if (dlBtn) {
  dlBtn.addEventListener('click', () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // recupera os dados salvos
    const data = JSON.parse(localStorage.getItem('planningData') || '{}');

    // título
    doc.setFontSize(18);
    doc.text('Meu Planejamento de Casamento', 20, 20);

    // linhas de texto
    doc.setFontSize(12);
    let y =  thirty;
    y += 10; doc.text(`Plano: ${data.plano || '–'}`, 20, y);
    y += 10; doc.text(`Noiva & Noivo: ${data.noiva || '–'} & ${data.noivo || '–'}`, 20, y);
    y += 10; doc.text(`Data & Local: ${data.data || '–'} @ ${data.local || '–'}`, 20, y);
    y += 10; doc.text(`Contato: ${data.contato || '–'}`, 20, y);
    y += 10; doc.text(`Tema: ${data.tema || '–'}`, 20, y);
    y += 10; doc.text(`Cores: Primária(${data.cores?.primaria||'–'}) Secundária(${data.cores?.secundaria||'–'})`, 20, y);
    y += 10; doc.text(`Convidados: ${(data.convidados||[]).length}`, 20, y);
    y += 10; doc.text(`Convite: ${data.convite || '–'}`, 20, y);

    // salva
    doc.save('planejamento-casamento.pdf');
  });
}


// ===== Passo 10: edição inline do convite via modal =====
const modal       = document.getElementById('editInviteModal');
const btnPreview  = document.getElementById('invitePreview');
const btnClose    = document.querySelector('.modal-close');
const btnSave     = document.getElementById('modalSaveBtn');
const inpNoiva    = document.getElementById('modalNoiva');
const inpNoivo    = document.getElementById('modalNoivo');
const inpData     = document.getElementById('modalData');
const txtNames    = document.getElementById('inviteTextNames');
const txtDate     = document.getElementById('inviteTextDate');

// 1) Abre modal preenchido com dados atuais
btnPreview.addEventListener('click', () => {
  const data = JSON.parse(localStorage.getItem('planningData') || '{}');
  inpNoiva.value = data.noiva || '';
  inpNoivo.value = data.noivo || '';
  inpData.value  = data.data  || '';
  modal.style.display = 'block';
});

// 2) Fecha modal
btnClose.addEventListener('click', () => {
  modal.style.display = 'none';
});
window.addEventListener('click', e => {
  if (e.target === modal) modal.style.display = 'none';
});

// 3) Salva as alterações
btnSave.addEventListener('click', () => {
  // atualiza localStorage + planningData
  const data = JSON.parse(localStorage.getItem('planningData') || '{}');
  data.noiva = inpNoiva.value.trim()  || data.noiva;
  data.noivo = inpNoivo.value.trim()  || data.noivo;
  data.data  = inpData.value           || data.data;
  localStorage.setItem('planningData', JSON.stringify(data));

  // atualiza preview na página
  txtNames.textContent = `${data.noiva} & ${data.noivo}`;
  txtDate.textContent  = data.data;

  // fecha
  modal.style.display = 'none';
  alert('Convite atualizado com sucesso!');
});

document.addEventListener('DOMContentLoaded', () => {
  const planDetails = document.getElementById('plan-details');
  const radios      = document.querySelectorAll('input[name="plan"]');

  radios.forEach(radio => {
    radio.addEventListener('change', () => {
      // pega diretamente o atributo data-desc
      planDetails.textContent = radio.dataset.desc || '';
    });
  });
});