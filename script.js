// ===== MOBILE NAV =====
const navToggle = document.getElementById('navToggle');
const nav = document.getElementById('nav');

navToggle.addEventListener('click', () => {
  nav.classList.toggle('active');
  navToggle.classList.toggle('active');
});

document.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('active');
    navToggle.classList.remove('active');
  });
});

// ===== SCROLL REVEAL =====
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('[data-reveal]').forEach(el => revealObserver.observe(el));

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);

    formStatus.textContent = 'Sending...';
    formStatus.style.color = 'var(--text-secondary)';

    try {
      const response = await fetch(contactForm.action || 'https://formspree.io/f/your-form-id', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
      });

      if (response.ok) {
        formStatus.textContent = 'Thanks! Your message has been sent.';
        formStatus.style.color = '#d97706';
        contactForm.reset();
      } else {
        formStatus.textContent = 'Something went wrong. Please try again later.';
        formStatus.style.color = '#ef4444';
      }
    } catch {
      formStatus.textContent = 'Something went wrong. Please try again later.';
      formStatus.style.color = '#ef4444';
    }
  });
}

// ===== CLOSE NAV ON RESIZE =====
window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    nav.classList.remove('active');
    navToggle.classList.remove('active');
  }
});

// ===== HEADER SCROLL EFFECT =====
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 50) {
    header.style.borderBottomColor = 'var(--border-hover)';
  } else {
    header.style.borderBottomColor = 'var(--border)';
  }
});

// ===== SMOOTH CURSOR TRAIL (subtle) =====
const hero = document.querySelector('.hero');
if (hero) {
  hero.addEventListener('mousemove', (e) => {
    const shapes = hero.querySelectorAll('.hero__shape');
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;

    shapes.forEach((shape, i) => {
      const factor = (i + 1) * 10;
      shape.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
    });
  });
}
