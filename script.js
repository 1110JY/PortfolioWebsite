/* Josh Yeung — Portfolio JS */
(function () {
  const root = document.documentElement;
  const nav = document.getElementById('site-nav');
  const sidebar = document.getElementById('sidebar');
  const navToggle = document.querySelector('.nav-toggle');

  const backToTop = document.getElementById('backToTop');
  const yearEl = document.getElementById('year');
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  // Year
  if (yearEl) yearEl.textContent = new Date().getFullYear();



  // Sidebar (mobile) nav toggle
  function closeNav() {
    sidebar?.classList.remove('open');
    navToggle?.setAttribute('aria-expanded', 'false');
  }
  navToggle?.addEventListener('click', () => {
    const isOpen = sidebar?.classList.toggle('open');
    navToggle?.setAttribute('aria-expanded', String(!!isOpen));
  });
  document.querySelectorAll('#site-nav a').forEach((a) => a.addEventListener('click', closeNav));

  // removed expand/collapse; icons-only sidebar

  // Smooth scroll offset for sticky header
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (!href || href === '#' || href.length < 2) return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      // Small offset for scroll positioning
      const offset = 24;
      const y = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    });
  });

  // Active section highlighting
  const sections = Array.from(document.querySelectorAll('section[id]'));
  const navLinks = new Map(
    Array.from(document.querySelectorAll('.nav-link')).map((el) => [el.getAttribute('href'), el])
  );
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const id = `#${entry.target.id}`;
        const link = navLinks.get(id);
        if (!link) return;
        if (entry.isIntersecting) {
          document.querySelectorAll('.nav-link.active').forEach((n) => n.classList.remove('active'));
          link.classList.add('active');
          history.replaceState(null, '', id);
        }
      });
    },
    { rootMargin: '-40% 0px -50% 0px', threshold: 0.01 }
  );
  sections.forEach((s) => obs.observe(s));

  // Back to top
  function onScroll() {
    if (window.scrollY > 400) backToTop?.classList.add('show');
    else backToTop?.classList.remove('show');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  backToTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // Contact form validation + EmailJS
  function setError(id, message) {
    const el = document.getElementById(`error-${id}`);
    if (el) el.textContent = message || '';
  }
  function validate(data) {
    let ok = true;
    // name
    if (!data.name || data.name.trim().length < 2) {
      setError('name', 'Please enter your name.');
      ok = false;
    } else setError('name');
    // email
    const emailRe = /[^@\s]+@[^@\s]+\.[^@\s]+/;
    if (!emailRe.test(data.email || '')) {
      setError('email', 'Please enter a valid email.');
      ok = false;
    } else setError('email');
    // message
    if (!data.message || data.message.trim().length < 10) {
      setError('message', 'Please write a slightly longer message.');
      ok = false;
    } else setError('message');
    return ok;
  }

  function initEmailJS() {
    const container = document.querySelector('.contact-inner');
    if (!container) return { ready: false };
    const publicKey = container.getAttribute('data-emailjs-public-key');
    if (!publicKey || !window.emailjs) return { ready: false };
    window.emailjs.init(publicKey);
    return {
      ready: true,
      serviceId: container.getAttribute('data-emailjs-service-id'),
      templateId: container.getAttribute('data-emailjs-template-id'),
    };
  }

  const emailConfig = initEmailJS();

  contactForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(contactForm).entries());
    if (!validate(formData)) return;

    formStatus.textContent = 'Sending…';
    try {
      if (!emailConfig.ready) {
        // Fallback: open mailto
        const subject = encodeURIComponent('Portfolio Contact');
        const body = encodeURIComponent(`${formData.name} <${formData.email}>\n\n${formData.message}`);
        window.location.href = `mailto:youremail@example.com?subject=${subject}&body=${body}`;
        formStatus.textContent = 'Opening your email client…';
        return;
      }
      await window.emailjs.send(emailConfig.serviceId, emailConfig.templateId, formData);
      formStatus.textContent = 'Thanks! Your message has been sent.';
      contactForm.reset();
    } catch (err) {
      console.error(err);
      formStatus.textContent = 'Something went wrong. Please try again later.';
    }
  });
})(); 