/* ================================================================
   ACT NORTH CAMPUS — main.js
   Asian College of Technology · North Campus
   ================================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ══════════════════════════════════════
     1. NAV — Scroll shadow + active links
  ══════════════════════════════════════ */
  const nav = document.querySelector('nav');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  });

  // Active nav link highlight based on scroll position
  const sections = document.querySelectorAll('section[id], footer[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const activateNav = () => {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) {
        current = sec.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  };

  window.addEventListener('scroll', activateNav);
  activateNav();


  /* ══════════════════════════════════════
     2. MOBILE MENU
  ══════════════════════════════════════ */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  // Close mobile menu on link click
  document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', false);
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !mobileMenu.contains(e.target)) {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('open');
    }
  });


  /* ══════════════════════════════════════
     3. SCROLL REVEAL
  ══════════════════════════════════════ */
  const revealEls = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => revealObserver.observe(el));


  /* ══════════════════════════════════════
     4. STAT COUNTER ANIMATION
  ══════════════════════════════════════ */
  const statEls = document.querySelectorAll('.stat-item .num');
  let statsAnimated = false;

  const animateStats = () => {
    if (statsAnimated) return;
    const heroRect = document.querySelector('.hero-stats').getBoundingClientRect();
    if (heroRect.top < window.innerHeight * 0.9) {
      statsAnimated = true;
      statEls.forEach(el => {
        const text = el.getAttribute('data-target') || el.textContent.trim();
        el.setAttribute('data-target', text);

        const suffix = text.replace(/[\d,]/g, '');
        const value = parseInt(text.replace(/[^0-9]/g, ''));

        let current = 0;
        const duration = 1800;
        const steps = 60;
        const increment = value / steps;
        const interval = duration / steps;

        const timer = setInterval(() => {
          current += increment;
          if (current >= value) {
            current = value;
            clearInterval(timer);
          }
          const display = Math.round(current).toLocaleString();
          el.textContent = display + suffix;
        }, interval);
      });
      window.removeEventListener('scroll', animateStats);
    }
  };

  window.addEventListener('scroll', animateStats);
  animateStats();


  /* ══════════════════════════════════════
     5. PROGRAM FILTER TABS
  ══════════════════════════════════════ */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const programCards = document.querySelectorAll('.program-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      programCards.forEach(card => {
        const dept = card.getAttribute('data-dept');
        if (filter === 'all' || dept === filter) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });


  /* ══════════════════════════════════════
     6. NEWS MODAL
  ══════════════════════════════════════ */
  const newsModal = document.getElementById('news-modal');
  const newsModalClose = document.getElementById('news-modal-close');

  document.querySelectorAll('.news-item').forEach(item => {
    item.addEventListener('click', () => {
      const title = item.querySelector('h4').textContent;
      const body = item.querySelector('p').textContent;
      const tagEl = item.querySelector('.news-tag');
      const tagText = tagEl ? tagEl.textContent : '';
      const tagClass = tagEl ? tagEl.className : '';
      const day = item.querySelector('.day').textContent;
      const mon = item.querySelector('.mon').textContent;

      document.getElementById('modal-tag-text').textContent = tagText;
      document.getElementById('modal-tag-text').className = 'news-tag ' + (tagClass.split(' ').find(c => c.startsWith('tag-')) || '');
      document.getElementById('modal-title').textContent = title;
      document.getElementById('modal-meta').textContent = `Published: ${mon} ${day}, 2026`;
      document.getElementById('modal-body').textContent = body + ' More details will be announced through the official ACT North Campus channels. Stay tuned to this page and our social media for updates.';

      newsModal.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeNewsModal = () => {
    newsModal.classList.remove('open');
    document.body.style.overflow = '';
  };

  newsModalClose.addEventListener('click', closeNewsModal);
  newsModal.addEventListener('click', (e) => {
    if (e.target === newsModal) closeNewsModal();
  });


  /* ══════════════════════════════════════
     7. INQUIRY / APPLICATION MODAL
  ══════════════════════════════════════ */
  const inquiryModal = document.getElementById('inquiry-modal');
  const inquiryClose = document.getElementById('inquiry-modal-close');
  const inquiryForm = document.getElementById('inquiry-form');
  const formSuccess = document.getElementById('form-success');

  const openInquiry = (type = 'apply') => {
    document.getElementById('inquiry-modal-title').textContent =
      type === 'apply' ? 'Apply for Admission' : 'Request Information';
    inquiryModal.classList.add('open');
    inquiryForm.style.display = 'block';
    formSuccess.style.display = 'none';
    document.body.style.overflow = 'hidden';
  };

  const closeInquiry = () => {
    inquiryModal.classList.remove('open');
    document.body.style.overflow = '';
  };

  // Trigger buttons
  document.querySelectorAll('[data-modal="apply"]').forEach(btn =>
    btn.addEventListener('click', (e) => { e.preventDefault(); openInquiry('apply'); })
  );
  document.querySelectorAll('[data-modal="info"]').forEach(btn =>
    btn.addEventListener('click', (e) => { e.preventDefault(); openInquiry('info'); })
  );

  inquiryClose.addEventListener('click', closeInquiry);
  inquiryModal.addEventListener('click', (e) => {
    if (e.target === inquiryModal) closeInquiry();
  });

  // Form submission
  inquiryForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Simulate form submission
    inquiryForm.style.display = 'none';
    formSuccess.style.display = 'block';
    inquiryForm.reset();
  });

  // Program "Learn More" links open inquiry
  document.querySelectorAll('.program-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const programName = link.closest('.program-card').querySelector('h3').textContent;
      openInquiry('apply');
      // Pre-select program if field exists
      const programSelect = document.getElementById('field-program');
      if (programSelect) {
        const options = Array.from(programSelect.options);
        const match = options.find(o => o.text.includes(programName.substring(0, 20)));
        if (match) programSelect.value = match.value;
      }
    });
  });


  /* ══════════════════════════════════════
     8. ESC KEY TO CLOSE MODALS
  ══════════════════════════════════════ */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeNewsModal();
      closeInquiry();
    }
  });


  /* ══════════════════════════════════════
     9. BACK TO TOP BUTTON
  ══════════════════════════════════════ */
  const backToTop = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 400);
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

});
