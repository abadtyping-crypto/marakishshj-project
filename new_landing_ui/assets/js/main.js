/**
 * Abad Commercial Information Services (Abad Typing) - Main Application Script
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initSmoothScroll();
  initContactForm();
  initServiceInquiryButtons();
  initScrollAnimations();
});

/**
 * Navbar Background Scroll Handler
 */
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar-custom');
  if (!navbar) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Initial check
}

/**
 * Smooth Scrolling for Anchor Links (Supports #section and index.html#section)
 */
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href*="#"]');

  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || href === '#') return;

      const hashIndex = href.indexOf('#');
      if (hashIndex === -1) return;
      const targetId = href.substring(hashIndex);
      if (targetId === '#' || targetId.length <= 1) return;

      const pathName = window.location.pathname;
      const linkPath = link.pathname || '';
      
      const isCurrentPage = (linkPath === '' || linkPath === pathName || (linkPath.endsWith('index.html') && (pathName.endsWith('index.html') || pathName.endsWith('/'))) || href.startsWith('#'));
      
      if (!isCurrentPage) return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();

        // Close mobile navbar collapse if open
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
          const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
          if (bsCollapse) bsCollapse.hide();
        }

        const navHeight = 80;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/**
 * Temporary Form Action: Format Inquiry & Redirect to WhatsApp
 */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('form-name')?.value.trim() || '';
    const phone = document.getElementById('form-phone')?.value.trim() || '';
    const email = document.getElementById('form-email')?.value.trim() || '';
    const service = document.getElementById('form-service')?.value.trim() || 'General Inquiry';
    const message = document.getElementById('form-message')?.value.trim() || '';

    if (!name || !phone) {
      alert('Please fill in your Name and Mobile Number.');
      return;
    }

    // Build formatted WhatsApp message payload
    const textPayload = 
      `*New Website Inquiry - Abad Typing*\n` +
      `--------------------------------\n` +
      `👤 *Client Name:* ${name}\n` +
      `📞 *Mobile:* ${phone}\n` +
      (email ? `📧 *Email:* ${email}\n` : '') +
      `📌 *Requested Service:* ${service}\n` +
      (message ? `📝 *Details:* ${message}\n` : '') +
      `--------------------------------\n` +
      `Sent via Website Contact Form`;

    const encodedText = encodeURIComponent(textPayload);
    const whatsappUrl = `https://wa.me/971551012119?text=${encodedText}`;

    // Open WhatsApp URL in new tab
    window.open(whatsappUrl, '_blank');

    // Optional success feedback to user
    const successBox = document.getElementById('form-success-msg');
    if (successBox) {
      successBox.classList.remove('d-none');
    }
  });
}

/**
 * Quick Service Card WhatsApp Inquiry Triggers
 */
function initServiceInquiryButtons() {
  const serviceButtons = document.querySelectorAll('.btn-service-inquiry');

  serviceButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const serviceName = btn.getAttribute('data-service') || 'Government Clearance';
      
      const textPayload = 
        `Hello Abad Typing, I would like to inquire about *${serviceName}* services. Could you please share details and requirements?`;
      
      const encodedText = encodeURIComponent(textPayload);
      window.open(`https://wa.me/971551012119?text=${encodedText}`, '_blank');
    });
  });
}

/**
 * Lightweight IntersectionObserver Scroll Animations (Fade Up, Zoom In, Reveal)
 */
function initScrollAnimations() {
  const revealElements = document.querySelectorAll('.reveal-init');
  if (!revealElements.length) return;

  if (!('IntersectionObserver' in window)) {
    revealElements.forEach(el => el.classList.add('reveal-active'));
    return;
  }

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -40px 0px',
    threshold: 0.12
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-active');
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => observer.observe(el));
}
