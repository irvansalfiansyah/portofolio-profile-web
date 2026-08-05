document.addEventListener('DOMContentLoaded', () => {
  
  /* --- 1. Scroll Progress Bar --- */
  const scrollProgress = document.getElementById('scroll-progress');
  
  const updateScrollProgress = () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
    scrollProgress.style.width = `${scrolled}%`;
  };
  
  window.addEventListener('scroll', updateScrollProgress);
  // Initial check
  updateScrollProgress();

  /* --- 2. Mobile Navigation Toggle --- */
  const menuToggle = document.getElementById('menu-toggle');
  const navLinksList = document.getElementById('nav-links');
  
  if (menuToggle && navLinksList) {
    menuToggle.addEventListener('click', () => {
      const isOpen = navLinksList.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when a link is clicked (crucial for mobile anchor links)
    const links = navLinksList.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('click', () => {
        navLinksList.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* --- 3. Scroll Highlighting Active Nav Link --- */
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-links a');
  
  if ('IntersectionObserver' in window) {
    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -40% 0px', // Trigger when section is around the center
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
  } else {
    // Fallback scroll listener for older browsers
    window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 160) {
          current = section.getAttribute('id');
        }
      });

      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });
    });
  }

  /* --- 4. Contact Form Validation, Persistence & Toast --- */
  const contactForm = document.getElementById('contact-form');
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');
  
  const showToast = (message, isSuccess = true) => {
    if (!toast || !toastMessage) return;
    
    toastMessage.textContent = message;
    const icon = toast.querySelector('.toast-icon');
    
    if (isSuccess) {
      if (icon) icon.style.color = 'var(--text-success)';
      toast.style.borderColor = 'var(--accent-primary)';
    } else {
      if (icon) icon.style.color = '#f87171'; // Red-400 error accent
      toast.style.borderColor = '#f87171';
    }
    
    toast.classList.add('show');
    
    // Hide toast after 4 seconds
    setTimeout(() => {
      toast.classList.remove('show');
    }, 4000);
  };

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const nameInput = document.getElementById('form-name');
      const emailInput = document.getElementById('form-email');
      const messageInput = document.getElementById('form-message');
      
      if (!nameInput || !emailInput || !messageInput) return;
      
      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const message = messageInput.value.trim();
      
      // Simple frontend validation validation
      if (!name || !email || !message) {
        showToast('Harap lengkapi semua data sebelum mengirim.', false);
        return;
      }
      
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        showToast('Harap masukkan alamat email yang valid.', false);
        return;
      }
      
      // Save submission in localStorage to simulate dynamic persistence
      try {
        const submissions = JSON.parse(localStorage.getItem('contact_submissions') || '[]');
        submissions.push({
          name,
          email,
          message,
          timestamp: new Date().toISOString()
        });
        localStorage.setItem('contact_submissions', JSON.stringify(submissions));
      } catch (err) {
        console.warn('LocalStorage unavailable for storage simulation:', err);
      }
      
      // Clear forms and show positive response toast
      contactForm.reset();
      showToast('Pesan berhasil dikirim! Terima kasih.');
    });
  }
});
