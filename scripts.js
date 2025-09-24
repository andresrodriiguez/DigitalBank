document.addEventListener('DOMContentLoaded', () => {
  // --- Smooth scroll from CTA to beneficios ---
  const ctaButton = document.getElementById('ctaBtn');
  const benefitsSection = document.getElementById('beneficiosSection');

  ctaButton.addEventListener('click', (event) => {
    event.preventDefault();
    benefitsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  // --- Reveal on scroll using IntersectionObserver ---
  const observerOptions = {
    threshold: 0.15
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        sectionObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal').forEach(element => sectionObserver.observe(element));

  // --- Smooth scroll en el menú ---
  document.querySelectorAll('.mainNav a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(event) {
      event.preventDefault();
      const targetId = this.getAttribute('href').slice(1);
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // --- Form validation ---
  const contactForm = document.getElementById('contactForm');
  const nameField = document.getElementById('nameInput');
  const emailField = document.getElementById('emailInput');
  const nameErrorBox = document.getElementById('nameError');
  const emailErrorBox = document.getElementById('emailError');
  const successMessage = document.getElementById('formSuccess');

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let isValid = true;
    nameErrorBox.textContent = '';
    emailErrorBox.textContent = '';
    successMessage.textContent = '';

    if (!nameField.value.trim()) {
      nameErrorBox.textContent = 'El nombre es obligatorio.';
      isValid = false;
    }

    if (!emailField.value.trim()) {
      emailErrorBox.textContent = 'El email es obligatorio.';
      isValid = false;
    } else if (!isValidEmail(emailField.value.trim())) {
      emailErrorBox.textContent = 'Introduce un email válido.';
      isValid = false;
    }

    if (!isValid) return;

    successMessage.textContent = '¡Mensaje enviado! Gracias, te contactaremos pronto.';
    contactForm.reset();

    setTimeout(() => successMessage.textContent = '', 5000);
  });

  // --- Mobile hamburger ---
  const hamburgerButton = document.querySelector('.hamburgerBtn');
  const navMenu = document.querySelector('.mainNav');

  hamburgerButton && hamburgerButton.addEventListener('click', () => {
    if (navMenu.style.display === 'flex') {
      navMenu.style.display = '';
    } else {
      navMenu.style.display = 'flex';
      navMenu.style.flexDirection = 'column';
      navMenu.style.background = 'white';
      navMenu.style.position = 'absolute';
      navMenu.style.right = '1rem';
      navMenu.style.top = '64px';
      navMenu.style.padding = '0.6rem';
      navMenu.style.borderRadius = '8px';
      navMenu.style.boxShadow = '0 6px 18px rgba(16,24,40,0.08)';
    }
  });

  navMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    if (window.innerWidth <= 700) navMenu.style.display = '';
  }));
});
