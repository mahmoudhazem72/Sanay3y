/**
 * Sanay3y (صنايعي) — Landing Page Scripts
 * Vanilla JavaScript, Zero External Dependencies
 */

function init() {
  initStickyHeader();
  initMobileDrawer();
  initJourneyTabs();
  initFaqAccordion();
  initDownloadButtons();
}

// Initialize immediately if DOM elements are already available, or on DOMContentLoaded
if (document.readyState !== 'loading' || document.querySelector('.site-header')) {
  init();
} else {
  document.addEventListener('DOMContentLoaded', init);
}

/**
 * 1. Sticky Header elevation on scroll
 */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/**
 * 2. Mobile Drawer Navigation
 */
function initMobileDrawer() {
  const toggleBtn = document.querySelector('.menu-toggle');
  const closeBtn = document.querySelector('.drawer-close-btn');
  const drawer = document.querySelector('.mobile-drawer');
  const overlay = document.querySelector('.mobile-drawer-overlay');
  const drawerLinks = document.querySelectorAll('.drawer-nav-link, .mobile-drawer .btn');

  if (!toggleBtn || !drawer || !overlay) return;

  const openDrawer = () => {
    drawer.classList.add('open');
    overlay.classList.add('open');
    toggleBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    drawer.classList.remove('open');
    overlay.classList.remove('open');
    toggleBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  toggleBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  overlay.addEventListener('click', closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeDrawer();
    }
  });
}

/**
 * 3. Choose Your Journey Tab Switcher (Customers vs Workers)
 */
function initJourneyTabs() {
  const tabButtons = document.querySelectorAll('.journey-tab-btn');
  const tabContents = document.querySelectorAll('.journey-tab-content');

  if (!tabButtons.length || !tabContents.length) return;

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-tab');

      // Update button active state
      tabButtons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      // Update content visibility
      tabContents.forEach(content => {
        if (content.id === targetId) {
          content.classList.add('active');
        } else {
          content.classList.remove('active');
        }
      });
    });
  });
}

/**
 * 4. FAQ Accordion Toggle
 */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    if (!questionBtn || !answer) return;

    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all other open FAQ items for a clean accordion effect
      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
          const otherAnswer = otherItem.querySelector('.faq-answer');
          if (otherAnswer) otherAnswer.style.maxHeight = null;
        }
      });

      // Toggle current item
      if (isActive) {
        item.classList.remove('active');
        answer.style.maxHeight = null;
      } else {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  // Open first FAQ item by default for better user engagement
  if (faqItems.length > 0) {
    const firstItem = faqItems[0];
    const firstAnswer = firstItem.querySelector('.faq-answer');
    firstItem.classList.add('active');
    if (firstAnswer) {
      firstAnswer.style.maxHeight = firstAnswer.scrollHeight + 'px';
    }
  }
}

/**
 * 5. Download Button Feedback & Action
 */
function initDownloadButtons() {
  const downloadLinks = document.querySelectorAll('a[href*="drive.google.com"]');

  downloadLinks.forEach(link => {
    link.addEventListener('click', () => {
      // Small visual feedback to let the user know download started
      const originalText = link.innerHTML;
      link.style.opacity = '0.85';
      
      setTimeout(() => {
        link.style.opacity = '1';
      }, 1500);
    });
  });
}
