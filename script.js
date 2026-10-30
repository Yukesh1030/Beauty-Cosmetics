/**
 * STACKLY SKINCARE — INTERACTIVE CLIENT SCRIPT
 * Features:
 *   - Mobile Hamburger Menu Toggle & Accessibility
 *   - Sticky Header with Blur Effect
 *   - Active Navigation Scroll Spy
 *   - Back-to-Top Floating Button
 *   - AOS (Animate On Scroll) Integration
 *   - GSAP 3 Timelines & ScrollTrigger Counter Animations
 *   - Newsletter Form Handling & Feedback
 *   - Login Modal Dialog Interaction
 *   - FAQ Accordion Interactive Toggles
 *   - Blog Topic Filtering (Blog Page)
 *   - Contact Message Form Handling & Feedback (Contact Page)
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // -------------------------------------------------------------------------
  // 1. MOBILE HAMBURGER MENU & DRAWER
  // -------------------------------------------------------------------------
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link, .btn-mobile-cta');

  function openMenu() {
    if (!hamburgerBtn || !mobileDrawer) return;
    hamburgerBtn.classList.add('active');
    hamburgerBtn.setAttribute('aria-expanded', 'true');
    mobileDrawer.classList.add('active');
    mobileDrawer.setAttribute('aria-hidden', 'false');
    document.body.classList.add('menu-open');
  }

  function closeMenu() {
    if (!hamburgerBtn || !mobileDrawer) return;
    hamburgerBtn.classList.remove('active');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    mobileDrawer.classList.remove('active');
    mobileDrawer.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('menu-open');
  }

  if (hamburgerBtn && mobileDrawer) {
    hamburgerBtn.addEventListener('click', () => {
      const isOpen = hamburgerBtn.classList.contains('active');
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Close menu when clicking any mobile nav link
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        closeMenu();
      });
    });

    // Close menu on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && hamburgerBtn.classList.contains('active')) {
        closeMenu();
      }
    });

    // Close menu if window is resized above tablet breakpoint
    window.addEventListener('resize', () => {
      if (window.innerWidth > 868 && hamburgerBtn.classList.contains('active')) {
        closeMenu();
      }
    });
  }

  // -------------------------------------------------------------------------
  // 2. STICKY HEADER & SCROLL SPY
  // -------------------------------------------------------------------------
  const header = document.getElementById('header');
  const sections = document.querySelectorAll('section[id]');
  const desktopNavLinks = document.querySelectorAll('.desktop-nav .nav-link');

  function handleScroll() {
    const scrollY = window.scrollY;

    // Header shadow & background
    if (header) {
      if (scrollY > 30) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    // Scroll Spy for active nav item (only for anchor links on same page)
    let currentSectionId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    if (currentSectionId) {
      desktopNavLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === `#${currentSectionId}`) {
          desktopNavLinks.forEach(l => l.classList.remove('active'));
          link.classList.add('active');
        }
      });
    }

    // Back to top button visibility
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
      if (scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial invocation

  // Back to top click handler
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // -------------------------------------------------------------------------
  // 3. AOS (ANIMATE ON SCROLL) INITIALIZATION
  // -------------------------------------------------------------------------
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 80,
      disable: false
    });
  }

  // -------------------------------------------------------------------------
  // 4. GSAP ANIMATIONS & SCROLLTRIGGER
  // -------------------------------------------------------------------------
  if (typeof gsap !== 'undefined') {
    if (typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }

    // A. Hero Section Entrance Animation (Glitch-free, fail-safe with clearProps)
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    const heroBadges = '.hero-badge, .service-hero-badge, .about-hero-badge, .blog-hero-badge, .contact-hero-badge';
    const heroHeadings = '.hero-heading, .service-hero-title, .about-hero-title, .blog-hero-title, .contact-hero-title';
    const heroSubtexts = '.hero-subtext, .service-hero-subtext, .about-hero-subtext, .blog-hero-subtext, .contact-hero-subtext';
    const heroActionButtons = '.hero-actions .btn, .service-hero-actions .btn, .about-hero-actions .btn, .blog-hero-actions .btn, .contact-hero-actions .btn';
    const heroTrusts = '.hero-trust-bar .trust-item, .service-hero-guarantee .guarantee-item, .about-hero-badges .about-badge, .blog-hero-stats .guarantee-item, .contact-hero-guarantees .guarantee-item';

    heroTl.fromTo(heroBadges,
      { opacity: 0, y: -16 },
      { opacity: 1, y: 0, duration: 0.5, delay: 0.1, clearProps: 'all' }
    )
    .fromTo(heroHeadings,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.6, clearProps: 'all' },
      '-=0.3'
    )
    .fromTo(heroSubtexts,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.5, clearProps: 'all' },
      '-=0.35'
    )
    .fromTo(heroActionButtons,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, clearProps: 'all' },
      '-=0.3'
    )
    .fromTo(heroTrusts,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.45, stagger: 0.06, clearProps: 'all' },
      '-=0.25'
    )
    .fromTo('.hero-graphic-stage, .service-hero-visual, .about-hero-visual, .blog-hero-visual, .contact-hero-visual',
      { opacity: 0, scale: 0.94 },
      { opacity: 1, scale: 1, duration: 0.7, clearProps: 'all' },
      '-=0.8'
    )
    .fromTo('.floating-badge',
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.15, clearProps: 'all' },
      '-=0.4'
    );

    // Fail-safe: unconditionally ensure hero buttons are visible even if GSAP is throttled by the browser
    setTimeout(() => {
      document.querySelectorAll(heroActionButtons).forEach(btn => {
        btn.style.opacity = '1';
        btn.style.visibility = 'visible';
        btn.style.transform = 'none';
      });
    }, 350);

    // B. Floating Badges Gentle Idle Levitation
    gsap.to('.badge-top-right, .sphere-badge', {
      y: -8,
      duration: 2.8,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    gsap.to('.badge-bottom-left', {
      y: 8,
      duration: 3.2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: 0.5
    });

    // C. Animated Number Counter for Stats Section
    if (typeof ScrollTrigger !== 'undefined') {
      ScrollTrigger.create({
        trigger: '.stats-grid',
        start: 'top 85%',
        once: true,
        onEnter: () => {
          const statElements = document.querySelectorAll('.stat-num');
          statElements.forEach(el => {
            const target = parseFloat(el.getAttribute('data-target'));
            const isDecimal = el.getAttribute('data-decimals') === '1';

            gsap.fromTo(el, 
              { innerText: 0 }, 
              {
                innerText: target,
                duration: 2,
                ease: 'power2.out',
                snap: isDecimal ? { innerText: 0.1 } : { innerText: 1 },
                onUpdate: function () {
                  if (isDecimal) {
                    el.innerText = parseFloat(el.innerText).toFixed(1);
                  } else {
                    el.innerText = Math.round(parseFloat(el.innerText));
                  }
                }
              }
            );
          });
        }
      });
    }
  }

  // -------------------------------------------------------------------------
  // 5. NEWSLETTER FORM HANDLING (VALIDATION & REDIRECTION TO 404.HTML)
  // -------------------------------------------------------------------------
  const newsletterForm = document.getElementById('glow-newsletter-form');
  const feedbackMsg = document.getElementById('form-feedback');
  const emailInput = document.getElementById('subscriber-email');

  if (newsletterForm && feedbackMsg) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = emailInput ? emailInput.value.trim() : '';
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!email || !emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        if (emailInput) emailInput.focus();
        return;
      }

      feedbackMsg.style.display = 'inline-flex';
      feedbackMsg.classList.add('visible');
      newsletterForm.style.display = 'none';

      if (typeof gsap !== 'undefined') {
        gsap.fromTo(feedbackMsg, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.4 });
      }

      setTimeout(() => {
        window.location.href = '404.html';
      }, 900);
    });
  }

  // -------------------------------------------------------------------------
  // 5B. ABOUT PAGE "JOIN US" FORM HANDLING (VALIDATION & REDIRECTION TO 404.HTML)
  // -------------------------------------------------------------------------
  const joinForm = document.getElementById('join-form');
  const joinFeedback = document.getElementById('join-feedback');
  const joinEmailInput = document.getElementById('join-email');
  const joinBtn = document.getElementById('btn-join');
  const joinErrorMsg = document.getElementById('join-error-msg');
  const joinErrorText = document.getElementById('join-error-text');

  function showJoinError(message) {
    if (joinEmailInput) {
      joinEmailInput.classList.add('input-error');
      joinEmailInput.focus();
    }
    if (joinErrorMsg && joinErrorText) {
      joinErrorText.textContent = message;
      joinErrorMsg.style.display = 'inline-flex';
      if (typeof gsap !== 'undefined') {
        gsap.fromTo(joinErrorMsg, { opacity: 0, y: -6 }, { opacity: 1, y: 0, duration: 0.25 });
      }
    }
  }

  function clearJoinError() {
    if (joinEmailInput) {
      joinEmailInput.classList.remove('input-error');
    }
    if (joinErrorMsg) {
      joinErrorMsg.style.display = 'none';
    }
  }

  if (joinEmailInput) {
    joinEmailInput.addEventListener('input', clearJoinError);
  }

  if (joinForm) {
    joinForm.addEventListener('submit', (e) => {
      e.preventDefault();
      clearJoinError();
      const email = joinEmailInput ? joinEmailInput.value.trim() : '';
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!email) {
        showJoinError('Please enter your email address to join.');
        return;
      }

      if (!emailRegex.test(email)) {
        showJoinError('Please enter a valid email address (e.g., name@domain.com).');
        return;
      }

      clearJoinError();

      if (joinBtn) {
        joinBtn.disabled = true;
        joinBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> <span>Joining...</span>';
      }

      if (joinFeedback) {
        joinFeedback.style.display = 'inline-flex';
        joinForm.style.display = 'none';
        if (typeof gsap !== 'undefined') {
          gsap.fromTo(joinFeedback, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.4 });
        }
      }

      setTimeout(() => {
        window.location.href = '404.html';
      }, 900);
    });
  }

  // -------------------------------------------------------------------------
  // 6. LOGIN MODAL FUNCTIONALITY
  // -------------------------------------------------------------------------
  const loginModal = document.getElementById('login-modal');
  const loginModalClose = document.getElementById('login-modal-close');
  const loginModalOverlay = document.getElementById('login-modal-overlay');
  // Login modal trigger (Navbar & Mobile Drawer Login buttons direct to Login.html, modal is only for in-page #login links)
  const loginTriggers = document.querySelectorAll('a[href="#login"]:not(#login-nav-btn):not(#mobile-login-btn), [data-modal-open="login-modal"]');
  const loginForm = document.getElementById('login-form');
  const loginFeedback = document.getElementById('login-feedback');
  const modalSignupLink = document.getElementById('modal-signup-link');

  function openLoginModal() {
    if (loginModal) {
      closeMenu(); // Close mobile drawer if open
      loginModal.classList.add('active');
      loginModal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('menu-open');
      const emailInput = document.getElementById('login-email');
      if (emailInput) {
        setTimeout(() => emailInput.focus(), 100);
      }
    }
  }

  function closeLoginModal() {
    if (loginModal) {
      loginModal.classList.remove('active');
      loginModal.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('menu-open');
    }
  }

  loginTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openLoginModal();
    });
  });

  if (loginModalClose) {
    loginModalClose.addEventListener('click', closeLoginModal);
  }

  if (loginModalOverlay) {
    loginModalOverlay.addEventListener('click', closeLoginModal);
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && loginModal && loginModal.classList.contains('active')) {
      closeLoginModal();
    }
  });

  if (modalSignupLink) {
    modalSignupLink.addEventListener('click', () => {
      closeLoginModal();
    });
  }

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailEl = document.getElementById('login-email');
      const passEl = document.getElementById('login-password');
      const email = emailEl ? emailEl.value.trim() : '';
      const password = passEl ? passEl.value : '';
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!email || !emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        if (emailEl) emailEl.focus();
        return;
      }

      if (!password || password.length < 3) {
        alert('Please enter your password.');
        if (passEl) passEl.focus();
        return;
      }

      if (loginFeedback) {
        loginFeedback.style.display = 'flex';
      }

      setTimeout(() => {
        closeLoginModal();
        if (loginFeedback) loginFeedback.style.display = 'none';
        loginForm.reset();
        window.location.href = '404.html';
      }, 900);
    });
  }

  // -------------------------------------------------------------------------
  // 7. FAQ ACCORDION INTERACTION (SERVICE & CONTACT PAGES)
  // -------------------------------------------------------------------------
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const item = question.closest('.faq-item');
      if (!item) return;
      const isActive = item.classList.contains('active');

      // Close other accordion items
      document.querySelectorAll('.faq-item').forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          const btn = otherItem.querySelector('.faq-question');
          if (btn) btn.setAttribute('aria-expanded', 'false');
        }
      });

      if (isActive) {
        item.classList.remove('active');
        question.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('active');
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // -------------------------------------------------------------------------
  // 8. SMOOTH SCROLL FOR IN-PAGE ANCHOR LINKS
  // -------------------------------------------------------------------------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#login') {
        e.preventDefault();
        openLoginModal();
        return;
      }
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          const headerOffset = 70;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // -------------------------------------------------------------------------
  // 9. BLOG TOPIC FILTERING (BLOG PAGE)
  // -------------------------------------------------------------------------
  const topicPills = document.querySelectorAll('.topic-pill');
  const blogCards = document.querySelectorAll('.blog-post-card');

  if (topicPills.length > 0 && blogCards.length > 0) {
    topicPills.forEach(pill => {
      pill.addEventListener('click', () => {
        topicPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');

        const filter = pill.getAttribute('data-filter');

        blogCards.forEach(card => {
          const category = card.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            card.classList.remove('hidden');
            if (typeof gsap !== 'undefined') {
              gsap.fromTo(card, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' });
            }
          } else {
            card.classList.add('hidden');
          }
        });
      });
    });
  }

  // -------------------------------------------------------------------------
  // 10. CONTACT MESSAGE FORM HANDLING (VALIDATES AND REDIRECTS TO 404.HTML)
  // -------------------------------------------------------------------------
  const contactForm = document.getElementById('contact-form');
  const contactFeedback = document.getElementById('contact-form-feedback');

  if (contactForm && contactFeedback) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const nameInput = document.getElementById('contact-name');
      const emailInput = document.getElementById('contact-email');
      const topicInput = document.getElementById('contact-topic');
      const messageInput = document.getElementById('contact-message');

      const name = nameInput ? nameInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const topic = topicInput ? topicInput.value : '';
      const message = messageInput ? messageInput.value.trim() : '';
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!name || name.length < 2) {
        alert('Please enter your full name.');
        if (nameInput) nameInput.focus();
        return;
      }

      if (!email || !emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        if (emailInput) emailInput.focus();
        return;
      }

      if (!topic) {
        alert('Please select an inquiry reason.');
        if (topicInput) topicInput.focus();
        return;
      }

      if (!message || message.length < 5) {
        alert('Please enter your message (at least 5 characters).');
        if (messageInput) messageInput.focus();
        return;
      }

      const submitBtn = contactForm.querySelector('.btn-contact-submit');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> <span>Validating & Sending...</span>';
      }

      contactFeedback.style.display = 'flex';
      if (typeof gsap !== 'undefined') {
        gsap.fromTo(contactFeedback, { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.4 });
      }

      setTimeout(() => {
        contactForm.reset();
        window.location.href = '404.html';
      }, 900);
    });
  }

});
