/* Josh Yeung — Portfolio */
(function () {
  const root = document.documentElement;

  const backToTop = document.getElementById('backToTop');
  const yearEl = document.getElementById('year');
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  // Year
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* =========================
     Staggered Menu
  ========================= */
  class StaggeredMenu {
    constructor(wrapper) {
      this.wrapper = wrapper;
      this.isOpen = false;
      this.isBusy = false;

      // Elements
      this.panel = wrapper.querySelector('.staggered-menu-panel');
      this.prelayers = wrapper.querySelectorAll('.sm-prelayer');
      this.toggle = wrapper.querySelector('.sm-toggle');
      this.icon = wrapper.querySelector('.sm-icon');
      this.textInner = wrapper.querySelector('.sm-toggle-textInner');
      this.menuItems = wrapper.querySelectorAll('.sm-panel-item');

      this.init();
    }

    init() {
      // Set initial positions
      this.setInitialPositions();

      // Bind events
      this.toggle?.addEventListener('click', () => this.toggleMenu());

      // Close menu when clicking menu items
      this.menuItems.forEach(item => {
        item.addEventListener('click', () => {
          setTimeout(() => this.closeMenu(), 200);
        });
      });
    }

    setInitialPositions() {
      if (!this.panel) return;

      // Check if menu is positioned on the left or right
      const isLeft = this.wrapper.getAttribute('data-position') === 'left';
      const initialTransform = isLeft ? 'translateX(-100%)' : 'translateX(100%)';

      // Set panel and prelayers off-screen
      this.panel.style.transform = initialTransform;
      this.prelayers.forEach(layer => {
        layer.style.transform = initialTransform;
      });

      // Set icon initial state
      if (this.icon) {
        this.icon.style.transform = 'rotate(0deg)';
      }

      // Set text initial state
      if (this.textInner) {
        this.textInner.style.transform = 'translateY(0%)';
      }

      // Set menu items initial state
      const itemLabels = this.panel.querySelectorAll('.sm-panel-itemLabel');
      const numbers = this.panel.querySelectorAll('.sm-panel-item');
      const socialTitle = this.panel.querySelector('.sm-socials-title');
      const socialLinks = this.panel.querySelectorAll('.sm-socials-link');

      itemLabels.forEach(item => {
        item.style.transform = 'translateY(140%) rotate(10deg)';
      });

      numbers.forEach(item => {
        item.style.setProperty('--sm-num-opacity', '0');
      });

      if (socialTitle) {
        socialTitle.style.opacity = '0';
      }

      socialLinks.forEach(link => {
        link.style.transform = 'translateY(25px)';
        link.style.opacity = '0';
      });
    }

    toggleMenu() {
      if (this.isBusy) return;

      if (this.isOpen) {
        this.closeMenu();
      } else {
        this.openMenu();
      }
    }

    openMenu() {
      if (this.isBusy) return;
      this.isBusy = true;
      this.isOpen = true;

      this.wrapper.setAttribute('data-open', 'true');
      this.toggle?.setAttribute('aria-expanded', 'true');
      this.toggle?.setAttribute('aria-label', 'Close menu');
      this.panel?.setAttribute('aria-hidden', 'false');

      // Animate prelayers
      this.prelayers.forEach((layer, index) => {
        setTimeout(() => {
          layer.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
          layer.style.transform = 'translateX(0%)';
        }, index * 70);
      });

      // Animate panel
      setTimeout(() => {
        this.panel.style.transition = 'transform 0.65s cubic-bezier(0.23, 1, 0.32, 1)';
        this.panel.style.transform = 'translateX(0%)';
      }, this.prelayers.length * 70 + 80);

      // Animate menu items
      setTimeout(() => {
        this.animateItemsIn();
      }, this.prelayers.length * 70 + 200);

      // Animate icon
      this.animateIcon(true);

      // Animate text
      this.animateText(true);

      setTimeout(() => {
        this.isBusy = false;
      }, 1000);
    }

    closeMenu() {
      if (this.isBusy) return;
      this.isBusy = true;
      this.isOpen = false;

      this.wrapper.removeAttribute('data-open');
      this.toggle?.setAttribute('aria-expanded', 'false');
      this.toggle?.setAttribute('aria-label', 'Open menu');
      this.panel?.setAttribute('aria-hidden', 'true');

      // Check if menu is positioned on the left or right
      const isLeft = this.wrapper.getAttribute('data-position') === 'left';
      const closeTransform = isLeft ? 'translateX(-100%)' : 'translateX(100%)';

      // Animate everything out
      const allElements = [this.panel, ...this.prelayers];
      allElements.forEach(el => {
        el.style.transition = 'transform 0.32s cubic-bezier(0.55, 0.085, 0.68, 0.53)';
        el.style.transform = closeTransform;
      });

      // Reset menu items
      setTimeout(() => {
        this.setInitialPositions();
      }, 320);

      // Animate icon
      this.animateIcon(false);

      // Animate text
      this.animateText(false);

      setTimeout(() => {
        this.isBusy = false;
      }, 400);
    }

    animateItemsIn() {
      const itemLabels = this.panel.querySelectorAll('.sm-panel-itemLabel');
      const numbers = this.panel.querySelectorAll('.sm-panel-item');
      const socialTitle = this.panel.querySelector('.sm-socials-title');
      const socialLinks = this.panel.querySelectorAll('.sm-socials-link');

      // Animate item labels
      itemLabels.forEach((item, index) => {
        setTimeout(() => {
          item.style.transition = 'transform 1s cubic-bezier(0.23, 1, 0.32, 1)';
          item.style.transform = 'translateY(0%) rotate(0deg)';
        }, index * 100);
      });

      // Animate numbers
      setTimeout(() => {
        numbers.forEach((item, index) => {
          setTimeout(() => {
            item.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            item.style.setProperty('--sm-num-opacity', '1');
          }, index * 80);
        });
      }, 100);

      // Animate socials
      setTimeout(() => {
        if (socialTitle) {
          socialTitle.style.transition = 'opacity 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
          socialTitle.style.opacity = '1';
        }

        socialLinks.forEach((link, index) => {
          setTimeout(() => {
            link.style.transition = 'all 0.55s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            link.style.transform = 'translateY(0px)';
            link.style.opacity = '1';
          }, index * 80);
        });
      }, 200);
    }

    animateIcon(opening) {
      if (!this.icon) return;

      this.icon.style.transition = 'transform 0.8s cubic-bezier(0.23, 1, 0.32, 1)';
      this.icon.style.transform = opening ? 'rotate(225deg)' : 'rotate(0deg)';
    }

    animateText(opening) {
      if (!this.textInner) return;

      // Simple text swap with animation
      const targetY = opening ? '-50%' : '0%';
      this.textInner.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
      this.textInner.style.transform = `translateY(${targetY})`;
    }
  }

  // Smooth scroll offset for sticky header
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (!href || href === '#' || href.length < 2) return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const offset = 24;
      const y = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    });
  });

  // Active section highlighting
  const sections = Array.from(document.querySelectorAll('section[id]'));
  const navLinks = new Map(
    Array.from(document.querySelectorAll('.sm-panel-item')).map((el) => [el.getAttribute('href'), el])
  );
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const id = `#${entry.target.id}`;
        const link = navLinks.get(id);
        if (!link) return;
        if (entry.isIntersecting) {
          document.querySelectorAll('.sm-panel-item.active').forEach((n) => n.classList.remove('active'));
          link.classList.add('active');
          history.replaceState(null, '', id);
        }
      });
    },
    { rootMargin: '-40% 0px -50% 0px', threshold: 0.01 }
  );
  sections.forEach((s) => obs.observe(s));

  // Initialize Staggered Menu
  const staggeredMenuWrapper = document.querySelector('.staggered-menu');
  if (staggeredMenuWrapper) {
    new StaggeredMenu(staggeredMenuWrapper);
  }

  /* =========================
     Typing Text Effect
  ========================= */

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
    if (!data.name || data.name.trim().length < 2) {
      setError('name', 'Please enter your name.');
      ok = false;
    } else setError('name');
    const emailRe = /[^@\s]+@[^@\s]+\.[^@\s]+/;
    if (!emailRe.test(data.email || '')) {
      setError('email', 'Please enter a valid email.');
      ok = false;
    } else setError('email');
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


  /* =========================
     Typing Text Effect
  ========================= */
  class TextType {
    constructor(element, options = {}) {
      this.element = element;
      this.text = options.text || ["Hello, I'm Josh 👋"];
      this.typingSpeed = options.typingSpeed || 75;
      this.pauseDuration = options.pauseDuration || 1500;
      this.deletingSpeed = options.deletingSpeed || 30;
      this.showCursor = options.showCursor !== false;
      this.cursorCharacter = options.cursorCharacter || '|';
      this.loop = options.loop !== false;

      this.currentTextIndex = 0;
      this.currentCharIndex = 0;
      this.isDeleting = false;
      this.displayedText = '';

      this.init();
    }

    init() {
      // Create cursor element if needed
      if (this.showCursor) {
        this.cursorElement = document.createElement('span');
        this.cursorElement.className = 'typing-cursor';
        this.cursorElement.textContent = this.cursorCharacter;
        this.element.appendChild(this.cursorElement);
        this.startCursorBlink();
      }

      // Start typing animation
      this.startTyping();
    }

    startCursorBlink() {
      setInterval(() => {
        if (this.cursorElement) {
          this.cursorElement.style.opacity =
            this.cursorElement.style.opacity === '0' ? '1' : '0';
        }
      }, 500);
    }

    startTyping() {
      const currentText = this.text[this.currentTextIndex];

      if (this.isDeleting) {
        // Delete characters
        if (this.displayedText.length > 0) {
          this.displayedText = this.displayedText.slice(0, -1);
          this.updateDisplay();
          setTimeout(() => this.startTyping(), this.deletingSpeed);
        } else {
          // Finished deleting, move to next text
          this.isDeleting = false;
          this.currentTextIndex = (this.currentTextIndex + 1) % this.text.length;
          this.currentCharIndex = 0;
          setTimeout(() => this.startTyping(), this.pauseDuration);
        }
      } else {
        // Type characters
        if (this.currentCharIndex < currentText.length) {
          this.displayedText += currentText[this.currentCharIndex];
          this.currentCharIndex++;
          this.updateDisplay();
          setTimeout(() => this.startTyping(), this.typingSpeed);
        } else {
          // Finished typing current text
          if (this.text.length > 1 && this.loop) {
            setTimeout(() => {
              this.isDeleting = true;
              this.startTyping();
            }, this.pauseDuration);
          }
        }
      }
    }

    updateDisplay() {
      // Update only the text content, preserve the cursor
      const textContent = this.element.childNodes[0];
      if (textContent && textContent.nodeType === Node.TEXT_NODE) {
        textContent.textContent = this.displayedText;
      } else {
        // Create text node if it doesn't exist
        const textNode = document.createTextNode(this.displayedText);
        this.element.insertBefore(textNode, this.element.firstChild);
      }
    }
  }

  /* =========================
     Interactive Card Stack
  ========================= */
  class CardStack {
    constructor(container) {
      this.container = container;
      this.cards = Array.from(container.querySelectorAll('.card-wrapper'));
      this.currentIndex = 0;
      this.isDragging = false;
      this.startX = 0;
      this.startY = 0;
      this.currentX = 0;
      this.currentY = 0;

      this.init();
    }

    init() {
      if (this.cards.length === 0) return;

      this.updateStack();
      this.bindEvents();
    }

    updateStack() {
      this.cards.forEach((card, index) => {
        const isActive = index === this.currentIndex;
        const offset = index - this.currentIndex;

        card.style.zIndex = this.cards.length - Math.abs(offset);
        card.style.transform = `
          translateY(${offset * 8}px) 
          translateX(${offset * 4}px) 
          scale(${1 - Math.abs(offset) * 0.05})
          rotateY(${offset * 2}deg)
        `;
        card.style.opacity = Math.max(0.4, 1 - Math.abs(offset) * 0.3);

        // Only the top card should be interactive
        card.style.pointerEvents = isActive ? 'auto' : 'none';
      });
    }

    bindEvents() {
      const topCard = () => this.cards[this.currentIndex];

      // Mouse events
      this.container.addEventListener('mousedown', (e) => this.startDrag(e));
      document.addEventListener('mousemove', (e) => this.onDrag(e));
      document.addEventListener('mouseup', () => this.endDrag());

      // Touch events
      this.container.addEventListener('touchstart', (e) => this.startDrag(e.touches[0]), { passive: false });
      document.addEventListener('touchmove', (e) => this.onDrag(e.touches[0]), { passive: false });
      document.addEventListener('touchend', () => this.endDrag());

      // Prevent context menu on long press
      this.container.addEventListener('contextmenu', (e) => e.preventDefault());
    }

    startDrag(e) {
      if (this.cards.length <= 1) return;

      this.isDragging = true;
      this.startX = e.clientX || e.pageX;
      this.startY = e.clientY || e.pageY;
      this.currentX = 0;
      this.currentY = 0;

      const card = this.cards[this.currentIndex];
      card.style.transition = 'none';
      card.style.cursor = 'grabbing';

      // Prevent text selection
      document.body.style.userSelect = 'none';
    }

    onDrag(e) {
      if (!this.isDragging) return;

      e.preventDefault();

      this.currentX = (e.clientX || e.pageX) - this.startX;
      this.currentY = (e.clientY || e.pageY) - this.startY;

      const card = this.cards[this.currentIndex];
      const rotation = this.currentX * 0.1;

      card.style.transform = `
        translateX(${this.currentX}px) 
        translateY(${this.currentY}px) 
        rotate(${rotation}deg)
        scale(1.05)
      `;

      // Visual feedback for swipe direction
      const opacity = Math.max(0.3, 1 - Math.abs(this.currentX) / 200);
      card.style.opacity = opacity;
    }

    endDrag() {
      if (!this.isDragging) return;

      this.isDragging = false;
      document.body.style.userSelect = '';

      const card = this.cards[this.currentIndex];
      const threshold = 120;
      const velocity = Math.abs(this.currentX);

      card.style.cursor = 'grab';

      if (velocity > threshold) {
        // Card swiped away - animate out and show next
        this.swipeCard(this.currentX > 0 ? 'right' : 'left');
      } else {
        // Snap back to original position
        card.style.transition = 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        card.style.transform = '';
        card.style.opacity = '';

        setTimeout(() => {
          card.style.transition = '';
        }, 300);
      }
    }

    swipeCard(direction) {
      const card = this.cards[this.currentIndex];
      const moveDistance = direction === 'right' ? 350 : -350;

      // Animate card out
      card.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
      card.style.transform = `
        translateX(${moveDistance}px) 
        translateY(${this.currentY}px) 
        rotate(${moveDistance * 0.1}deg)
        scale(0.8)
      `;
      card.style.opacity = '0';

      // Move to next card
      setTimeout(() => {
        this.nextCard();

        // Reset the swiped card
        card.style.transition = '';
        card.style.transform = '';
        card.style.opacity = '';
      }, 400);
    }

    nextCard() {
      this.currentIndex = (this.currentIndex + 1) % this.cards.length;
      this.updateStack();
    }

    prevCard() {
      this.currentIndex = (this.currentIndex - 1 + this.cards.length) % this.cards.length;
      this.updateStack();
    }
  }

  // Initialize card stack
  const cardStackContainer = document.querySelector('.card-stack-container');
  if (cardStackContainer) {
    new CardStack(cardStackContainer);
  }

  // Initialize typing effect for hero title
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    // Store original text and clear it
    heroTitle.textContent = '';

    new TextType(heroTitle, {
      text: ["Josh Yeung"],
      typingSpeed: 75,
      pauseDuration: 1500,
      deletingSpeed: 50,
      showCursor: true,
      cursorCharacter: '|',
      loop: true
    });
  }

  /* =========================
     Education timeline reveal
  ========================= */
  const timelineItems = document.querySelectorAll('.timeline-item');
  if (timelineItems.length) {
    // Respect user's reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const timelineContainer = document.querySelector('.timeline');
    let lineGrown = false;

    const tlObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          // Add a slight stagger based on index for nicer visual flow
          if (!prefersReducedMotion) {
            const idx = Array.from(timelineItems).indexOf(el);
            el.style.transitionDelay = `${Math.min(0.18 + idx * 0.08, 0.6)}s`;
          }
          el.classList.add('in-view');

          // Grow the central line once when the first item appears
          if (!lineGrown && timelineContainer) {
            lineGrown = true;
            // If reduced motion, add class without animation
            if (prefersReducedMotion) timelineContainer.classList.add('line-grow');
            else setTimeout(() => timelineContainer.classList.add('line-grow'), 90);
          }

          // Once visible, stop observing this element
          tlObserver.unobserve(el);
        }
      });
    }, { root: null, threshold: 0.14 });

    timelineItems.forEach((item) => {
      // Make items keyboard-focusable for accessibility
      item.setAttribute('tabindex', '0');
      // Add focus state that mirrors the in-view style
      item.addEventListener('focus', () => item.classList.add('in-view'));
      item.addEventListener('blur', () => { });
      tlObserver.observe(item);
    });
  }

  // When a timeline item receives keyboard focus, ensure it's visible
  if (timelineItems.length) {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    timelineItems.forEach(item => {
      item.addEventListener('focus', () => {
        if (prefersReducedMotion) {
          item.scrollIntoView({ block: 'center', inline: 'nearest' });
        } else {
          item.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
        }
      });
    });
  }
})();
