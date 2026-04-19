// Hotel Der Heidehof - JavaScript Functions
// 4-Sterne Superior Conference & Spa Resort Hotel

(function() {
  'use strict';

  // Initialize when DOM is ready
  document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
  });

  function initializeApp() {
    initializeNavigation();
    initializeScrollAnimation();
    initializeCarousel();
    initializeContactForm();
    initializeSmoothScroll();
  }

  // Navigation Menu Toggle
  function initializeNavigation() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav');
    
    if (menuToggle) {
      menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
      });
    }

    // Close menu on link click
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
      });
    });
  }

  // Scroll Animation
  function initializeScrollAnimation() {
    const elements = document.querySelectorAll('.animate');
    
    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1
    });

    elements.forEach(function(element) {
      observer.observe(element);
    });
  }

  // Image Carousel
  function initializeCarousel() {
    const carousels = document.querySelectorAll('.carousel');
    
    carousels.forEach(function(carousel) {
      const images = carousel.querySelectorAll('img');
      const prevBtn = carousel.querySelector('.prev');
      const nextBtn = carousel.querySelector('.next');
      let currentIndex = 0;

      function showImage(index) {
        images.forEach(img => img.style.display = 'none');
        images[index].style.display = 'block';
      }

      if (prevBtn) {
        prevBtn.addEventListener('click', function() {
          currentIndex = (currentIndex - 1 + images.length) % images.length;
          showImage(currentIndex);
        });
      }

      if (nextBtn) {
        nextBtn.addEventListener('click', function() {
          currentIndex = (currentIndex + 1) % images.length;
          showImage(currentIndex);
        });
      }

      showImage(currentIndex);
    });
  }

  // Contact Form Handling
  function initializeContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        
        // Validate form
        if (validateForm(formData)) {
          // Show success message
          showMessage('Nachricht erfolgreich versendet!', 'success');
          contactForm.reset();
        } else {
          showMessage('Bitte füllen Sie alle erforderlichen Felder aus.', 'error');
        }
      });
    }
  }

  function validateForm(formData) {
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    return name && email && message && isValidEmail(email);
  }

  function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  function showMessage(text, type) {
    const message = document.createElement('div');
    message.className = 'message ' + type;
    message.textContent = text;
    
    const form = document.querySelector('.contact-form');
    form.parentNode.insertBefore(message, form);

    setTimeout(function() {
      message.remove();
    }, 3000);
  }

  // Smooth Scroll
  function initializeSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
      link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        if (href !== '#' && href !== '#top') {
          e.preventDefault();
          const target = document.querySelector(href);
          
          if (target) {
            target.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        }
      });
    });
  }

  // Utility function: Lazy load images
  window.lazyLoadImages = function() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          observer.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  };

  // Utility function: Toggle element visibility
  window.toggleElement = function(selector) {
    const element = document.querySelector(selector);
    if (element) {
      element.classList.toggle('visible');
    }
  };

  // Utility function: Add active class to current page link
  window.setActiveNav = function() {
    const currentPage = window.location.pathname;
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
      if (link.href.includes(currentPage) || link.href.split('/').pop() === currentPage.split('/').pop()) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  };

})();
