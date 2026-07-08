document.addEventListener('DOMContentLoaded', () => {
  setupMobileMenu();
  setupStickyContactBar();
  updateCopyrightYear();
});

/**
 * Handles responsive mobile navigation menu toggling and actions
 */
function setupMobileMenu() {
  const menuBtn = document.getElementById('menu-btn');
  const closeBtn = document.getElementById('close-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuBackdrop = document.getElementById('menu-backdrop');
  
  if (!menuBtn || !mobileMenu) return;

  function openMenu() {
    mobileMenu.classList.remove('translate-x-full');
    if (menuBackdrop) {
      menuBackdrop.classList.remove('hidden');
      setTimeout(() => menuBackdrop.classList.remove('opacity-0'), 10);
    }
    document.body.classList.add('overflow-hidden');
  }

  function closeMenu() {
    mobileMenu.classList.add('translate-x-full');
    if (menuBackdrop) {
      menuBackdrop.classList.add('opacity-0');
      setTimeout(() => menuBackdrop.classList.add('hidden'), 300);
    }
    document.body.classList.remove('overflow-hidden');
  }

  menuBtn.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  if (menuBackdrop) menuBackdrop.addEventListener('click', closeMenu);

  // Close menu on selecting a link (e.g. for single-page anchors, or slow loading pages)
  const mobileLinks = mobileMenu.querySelectorAll('a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}

/**
 * Shows the sticky floating Call/WhatsApp contact buttons on scroll
 */
function setupStickyContactBar() {
  const stickyBar = document.getElementById('sticky-contact-bar');
  if (!stickyBar) return;

  // Show only after scrolling down 200px
  window.addEventListener('scroll', () => {
    if (window.scrollY > 200) {
      stickyBar.classList.remove('translate-y-24', 'opacity-0');
      stickyBar.classList.add('translate-y-0', 'opacity-100');
    } else {
      stickyBar.classList.remove('translate-y-0', 'opacity-100');
      stickyBar.classList.add('translate-y-24', 'opacity-0');
    }
  });
}

/**
 * Dynamically updates footer copyright year
 */
function updateCopyrightYear() {
  const yearEl = document.getElementById('copyright-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}
