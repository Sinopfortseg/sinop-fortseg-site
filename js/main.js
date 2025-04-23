document.addEventListener('DOMContentLoaded', function() {
  // Initialize the components
  initNavbar();
  initBackToTop();
  initAOS();
  initSmoothScroll();
  initMap();
});

/**
 * Initialize the navbar functionality
 */
function initNavbar() {
  const header = document.getElementById('header');
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const links = document.querySelectorAll('.nav-link');

  // Handle scroll event for the header
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }
  });

  // Mobile menu toggle
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // Close mobile menu when a link is clicked
  links.forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });

  // Active link on scroll
  window.addEventListener('scroll', () => {
    let current = '';
    
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (scrollY >= (sectionTop - 200)) {
        current = section.getAttribute('id');
      }
    });
    
    links.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').slice(1) === current) {
        link.classList.add('active');
      }
    });
  });
}

/**
 * Initialize the back to top button
 */
function initBackToTop() {
  const backToTopButton = document.getElementById('back-to-top');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      backToTopButton.classList.add('visible');
    } else {
      backToTopButton.classList.remove('visible');
    }
  });
}

/**
 * Initialize Animation on Scroll
 */
function initAOS() {
  const animatedElements = document.querySelectorAll('[data-aos]');
  
  const checkVisibility = () => {
    animatedElements.forEach(element => {
      const elementPosition = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Check if element is in viewport
      if (elementPosition.top < windowHeight * 0.9) {
        element.classList.add('aos-animate');
      }
    });
  };
  
  // Initial check
  checkVisibility();
  
  // Check on scroll
  window.addEventListener('scroll', checkVisibility);
}

/**
 * Initialize Smooth Scrolling for anchor links
 */
function initSmoothScroll() {
  const anchors = document.querySelectorAll('a[href^="#"]');
  
  anchors.forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const target = document.querySelector(this.getAttribute('href'));
      
      if (target) {
        // Get header height to offset scroll position
        const headerHeight = document.getElementById('header').offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/**
 * Initialize the map
 */
function initMap() {
  const map = L.map('map').setView([-11.86103548929271, -55.50958772394573], 15);
  
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  // Add marker for the location
  const marker = L.marker([-11.86103548929271, -55.50958772394573]).addTo(map);
  marker.bindPopup("<b>Sinop Fortseg</b><br>R. das Castanheiras, 320 - St. Comercial").openPopup();
}

/**
 * Preload the logo image
 */
function preloadLogo() {
  // Create a temporary image element to load the logo
  const tempImg = new Image();
  tempImg.src = 'img/logo.png';
  
  // When the image loads, replace the placeholder if needed
  tempImg.onload = function() {
    const logos = document.querySelectorAll('.logo, .footer-logo-img');
    logos.forEach(logo => {
      logo.src = tempImg.src;
    });
  };
}

// Call preload logo function
preloadLogo();