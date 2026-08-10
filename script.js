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
    const submitButton = contactForm.querySelector('button[type="submit"]');

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
        showToast('Please fill in all fields before sending.', false);
        return;
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        showToast('Please enter a valid email address.', false);
        return;
      }

      // --- Web3Forms Configuration ---
      // GANTI DENGAN ACCESS KEY YANG DIKIRIMKAN KE EMAIL ANDA DARI WEB3FORMS.COM
      const ACCESS_KEY = "0e45951d-200b-4337-a768-bd9510752c2e";

      if (!ACCESS_KEY || ACCESS_KEY === "" || ACCESS_KEY.includes("MASUKKAN")) {
        showToast('Please enter your Web3Forms Access Key in script.js first.', false);
        return;
      }

      // Disable button during submission
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.style.opacity = '0.7';
      }
      showToast('Sending message...');

      // Prepare Form Data payload
      const formData = new FormData();
      formData.append('access_key', ACCESS_KEY);
      formData.append('name', name);
      formData.append('email', email);
      formData.append('message', message);

      // Submit via Fetch
      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            // Backup locally in localStorage
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

            contactForm.reset();
            showToast('Message sent successfully! Thank you.');
          } else {
            showToast('Failed to send message: ' + (data.message || 'Error'), false);
          }
        })
        .catch(error => {
          console.error('Error submitting form:', error);
          showToast('A network or connection error occurred.', false);
        })
        .finally(() => {
          if (submitButton) {
            submitButton.disabled = false;
            submitButton.style.opacity = '1';
          }
        });
    });
  }

  /* --- 5. Hero Profile Image Crossfade --- */
  const profileImages = document.querySelectorAll('.hero-profile .profile-img');
  if (profileImages.length > 1) {
    let currentIdx = 0;
    setInterval(() => {
      profileImages[currentIdx].classList.remove('active');
      currentIdx = (currentIdx + 1) % profileImages.length;
      profileImages[currentIdx].classList.add('active');
    }, 4000);
  }
});
