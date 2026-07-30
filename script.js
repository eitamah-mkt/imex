function init() {
  // animação de entrada
  const hero = document.querySelector('.hero');
  const buttons = document.querySelectorAll('.buttons-group .btn');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (hero) hero.style.animation = reduceMotion ? 'none' : 'fadeUp 0.4s ease forwards';

  buttons.forEach((btn, index) => {
    if (reduceMotion) {
      btn.style.opacity = '1';
      return;
    }
    btn.style.animation = `btnIn 0.45s ease forwards`;
    btn.style.animationDelay = `${0.15 + index * 0.08}s`;
  });

  // sistema de idioma
  const translations = {
    pt: {
      tagline: "Equipamentos e Acessórios Fitness",
      btn1: "@imexfitness",
      btn2: "Já sou cliente",
      btn3: "Novos clientes Ceará",
      btn4: "Novos clientes outros estados"
    },
    en: {
      tagline: "Fitness Equipment & Accessories",
      btn1: "@imexfitness",
      btn2: "Existing customers",
      btn3: "New customers (Ceará)",
      btn4: "New customers (other states)"
    },
    es: {
      tagline: "Equipos y Accesorios Fitness",
      btn1: "@imexfitness",
      btn2: "Ya soy cliente",
      btn3: "Nuevos clientes Ceará",
      btn4: "Nuevos clientes otros estados"
    }
  };

  const langBtns = document.querySelectorAll('.lang-btn');

  function updateLanguage(lang) {
    const t = translations[lang];
    if (!t) return;

    const taglineEl = document.querySelector('.tagline');
    if (taglineEl) taglineEl.textContent = t.tagline;

    const btns = document.querySelectorAll('.buttons-group .btn');
    const labels = [t.btn1, t.btn2, t.btn3, t.btn4];
    btns.forEach((btn, index) => {
      const label = btn.querySelector('span:nth-child(2)');
      if (label && labels[index]) label.textContent = labels[index];
    });

    langBtns.forEach(btn => {
      btn.classList.remove('active');
      if (btn.dataset.lang === lang) btn.classList.add('active');
    });

    localStorage.setItem('imex_lang', lang);
  }

  langBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      updateLanguage(btn.dataset.lang);
    });
  });

  const savedLang = localStorage.getItem('imex_lang') || 'pt';
  updateLanguage(savedLang);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
