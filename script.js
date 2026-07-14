/* ==========================================================================
   VISHAL'S PORTFOLIO - LOGIC & INTERACTION (script.js)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initTheme();
  initNavbar();
  initTyping();
  initScrollEffects();
  initProjectFilter();
  initContactForm();
  initStarfield();
  initCursorGlow();
});

/* --------------------------------------------------------------------------
   1. Preloader Controller
   -------------------------------------------------------------------------- */
function initPreloader() {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;

  window.addEventListener('load', () => {
    preloader.classList.add('fade-out');
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 600);
  });
}

/* --------------------------------------------------------------------------
   2. Theme Switcher (Dark / Light Mode)
   -------------------------------------------------------------------------- */
function initTheme() {
  const themeToggleBtn = document.getElementById('themeToggle');
  const html = document.documentElement;

  if (!themeToggleBtn) return;

  // Retrieve saved theme preference, defaulting to 'dark'
  const savedTheme = localStorage.getItem('theme') || 'dark';
  html.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
  });

  function updateThemeIcon(theme) {
    const icon = themeToggleBtn.querySelector('i');
    if (theme === 'dark') {
      icon.className = 'fa-solid fa-moon';
    } else {
      icon.className = 'fa-solid fa-sun';
    }
  }
}

/* --------------------------------------------------------------------------
   3. Navbar Toggles, Sticky Class, Scroll Progress, and Scroll Spy
   -------------------------------------------------------------------------- */
function initNavbar() {
  const header = document.getElementById('header');
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const navLinks = document.getElementById('navLinks');
  const links = navLinks?.querySelectorAll('a');
  const scrollProgress = document.getElementById('scrollProgress');
  const scrollTopBtn = document.getElementById('scrollTopBtn');

  // Mobile menu toggle
  if (mobileMenuToggle && navLinks) {
    mobileMenuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      navLinks.classList.toggle('active');
      const icon = mobileMenuToggle.querySelector('i');
      if (navLinks.classList.contains('active')) {
        icon.className = 'fa-solid fa-xmark';
      } else {
        icon.className = 'fa-solid fa-bars-staggered';
      }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (navLinks.classList.contains('active') && !navLinks.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
        navLinks.classList.remove('active');
        mobileMenuToggle.querySelector('i').className = 'fa-solid fa-bars-staggered';
      }
    });
  }

  // Close menu when clicking on any link
  if (links) {
    links.forEach(link => {
      link.addEventListener('click', () => {
        if (navLinks?.classList.contains('active')) {
          navLinks.classList.remove('active');
          if (mobileMenuToggle) {
            mobileMenuToggle.querySelector('i').className = 'fa-solid fa-bars-staggered';
          }
        }
      });
    });
  }

  // Scroll event listeners (Sticky, Progress bar, Scroll spy, Back to top)
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    // Sticky Header
    if (scrollY > 50) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }

    // Scroll Progress Indicator
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight > 0) {
      const scrollPercent = (scrollY / docHeight) * 100;
      if (scrollProgress) {
        scrollProgress.style.width = scrollPercent + '%';
      }
    }

    // Scroll-to-Top Button
    if (scrollY > 600) {
      scrollTopBtn?.classList.add('active');
    } else {
      scrollTopBtn?.classList.remove('active');
    }

    // Scroll Spy active navigation highlighting
    highlightActiveLink();
  });

  // Scroll to Top action
  scrollTopBtn?.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  function highlightActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 180; // offset for nav position

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        links?.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }
}

/* --------------------------------------------------------------------------
   4. Hero Section - Typing Simulation Engine
   -------------------------------------------------------------------------- */
function initTyping() {
  const textElement = document.getElementById('typing-text');
  if (!textElement) return;

  const roles = [
    'Java Developer',
    'Spring Boot Developer',
    'Full Stack Developer',
    'Software Engineer'
  ];

  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let typeSpeed = 100;

  function type() {
    const currentRole = roles[roleIdx];
    
    if (isDeleting) {
      textElement.textContent = currentRole.substring(0, charIdx - 1);
      charIdx--;
      typeSpeed = 50; // faster deleting
    } else {
      textElement.textContent = currentRole.substring(0, charIdx + 1);
      charIdx++;
      typeSpeed = 100; // standard typing
    }

    if (!isDeleting && charIdx === currentRole.length) {
      typeSpeed = 2000; // pause at full word
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      typeSpeed = 500; // short pause before typing next
    }

    setTimeout(type, typeSpeed);
  }

  // Start typing loop
  setTimeout(type, 500);
}

/* --------------------------------------------------------------------------
   5. IntersectionObserver for Counting Stats & Skill Meters
   -------------------------------------------------------------------------- */
function initScrollEffects() {
  // Elements that fade up on scroll
  const fadeElements = document.querySelectorAll('.fade-up-element');
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  fadeElements.forEach(el => fadeObserver.observe(el));

  // Statistics Counter Animation
  const statNumbers = document.querySelectorAll('.stat-num');
  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        countObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(stat => countObserver.observe(stat));

  // Skill progress bars filling
  const skillBars = document.querySelectorAll('.skill-bar-fill');
  const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const targetPercent = bar.getAttribute('data-percent');
        bar.style.width = targetPercent;
        skillsObserver.unobserve(bar);
      }
    });
  }, { threshold: 0.2 });

  skillBars.forEach(bar => skillsObserver.observe(bar));
}

function animateCounter(element) {
  const target = parseFloat(element.getAttribute('data-val'));
  const isDecimal = element.getAttribute('data-decimal') === 'true';
  const label = element.getAttribute('data-label') || '';
  const customSuffix = element.getAttribute('data-suffix');
  const duration = 2000; // 2 seconds
  const startTime = performance.now();

  // Determine suffix
  let suffix = '';
  if (customSuffix !== null) {
    suffix = customSuffix;
  } else if (!isDecimal && target >= 5) {
    suffix = '+';
  }

  function updateCount(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Easing out quadratic function
    const easeProgress = progress * (2 - progress);
    const val = easeProgress * target;

    if (isDecimal) {
      element.textContent = val.toFixed(2) + suffix + label;
    } else {
      element.textContent = Math.floor(val) + suffix + label;
    }

    if (progress < 1) {
      requestAnimationFrame(updateCount);
    } else {
      if (isDecimal) {
        element.textContent = target.toFixed(2) + suffix + label;
      } else {
        element.textContent = target + suffix + label;
      }
    }
  }

  requestAnimationFrame(updateCount);
}

/* --------------------------------------------------------------------------
   6. Projects Categorized Filter Gallery
   -------------------------------------------------------------------------- */
function initProjectFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (filterBtns.length === 0) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active class in buttons
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        // Animation effect for filtering
        card.style.opacity = '0';
        card.style.transform = 'scale(0.85)';
        
        setTimeout(() => {
          const category = card.getAttribute('data-category');
          if (filterVal === 'all' || category === filterVal) {
            card.style.display = 'flex';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'scale(1)';
            }, 50);
          } else {
            card.style.display = 'none';
          }
        }, 300);
      });
    });
  });
}

// contact form

function initContactForm() {

  const form = document.getElementById("contactForm");
  const successBanner = document.getElementById("formSuccess");

  if (!form) return;

  const fields = [
    {
      id: "formName",
      validate: value => value.trim().length >= 3
    },
    {
      id: "formEmail",
      validate: value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
    },
    {
      id: "formSubject",
      validate: value => value.trim().length >= 4
    },
    {
      id: "formMessage",
      validate: value => value.trim().length >= 10
    }
  ];

  // Live Validation
  fields.forEach(field => {

    const input = document.getElementById(field.id);

    if (!input) return;

    input.addEventListener("blur", () => {
      validateField(input, field.validate);
    });

    input.addEventListener("input", () => {
      validateField(input, field.validate);
    });

  });

  // Submit Form
  form.addEventListener("submit", function (e) {

    e.preventDefault();

    let valid = true;

    fields.forEach(field => {

      const input = document.getElementById(field.id);

      if (!validateField(input, field.validate)) {
        valid = false;
      }

    });

    if (!valid) return;

    const submitBtn = form.querySelector("button[type='submit']");
    const originalText = submitBtn.innerHTML;

    submitBtn.disabled = true;
    submitBtn.innerHTML =
      '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';

    const templateParams = {

      from_name: document.getElementById("formName").value,

      from_email: document.getElementById("formEmail").value,

      subject: document.getElementById("formSubject").value,

      message: document.getElementById("formMessage").value

    };

    emailjs.send(
      "service_t3vmb68",
      "template_f2b6fzo",
      templateParams
    )
      .then(function () {

        successBanner.style.display = "flex";
        successBanner.style.background = "#d4edda";
        successBanner.style.color = "#155724";

        successBanner.innerHTML =
          '<i class="fa-solid fa-circle-check"></i> Thank you! Your message has been sent successfully.';

        form.reset();

        document.querySelectorAll(".form-group").forEach(group => {
          group.classList.remove("success");
        });

      })
      .catch(function (error) {

        console.error(error);

        successBanner.style.display = "flex";
        successBanner.style.background = "#f8d7da";
        successBanner.style.color = "#721c24";

        successBanner.innerHTML =
          '<i class="fa-solid fa-circle-xmark"></i> Failed to send message. Please try again.';

      })
      .finally(function () {

        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;

      });

  });

  function validateField(input, validator) {

    const group = input.closest(".form-group");

    if (validator(input.value.trim())) {

      group.classList.remove("error");
      group.classList.add("success");

      return true;

    }

    group.classList.remove("success");
    group.classList.add("error");

    return false;

  }

}

document.addEventListener("DOMContentLoaded", initContactForm);


/* --------------------------------------------------------------------------
   10. Starfield Background Canvas Animation
   -------------------------------------------------------------------------- */
function initStarfield() {
  const canvas = document.getElementById('starfield');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let stars = [];
  const numStars = 120;
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  class Star {
    constructor() {
      this.reset();
      this.y = Math.random() * height;
    }
    reset() {
      this.x = Math.random() * width;
      this.y = 0;
      this.size = Math.random() * 1.5 + 0.4;
      this.speed = Math.random() * 0.4 + 0.1;
      this.opacity = Math.random() * 0.5 + 0.4;
    }
    update() {
      this.y += this.speed;
      if (this.y > height) {
        this.reset();
      }
    }
    draw() {
      ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  for (let i = 0; i < numStars; i++) {
    stars.push(new Star());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    stars.forEach(star => {
      star.update();
      star.draw();
    });
    requestAnimationFrame(animate);
  }

  animate();
}

/* --------------------------------------------------------------------------
   11. Interactive Cursor Glow Effect
   -------------------------------------------------------------------------- */
function initCursorGlow() {
  const glow = document.getElementById('cursorGlow');
  if (!glow) return;

  document.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  });
}
