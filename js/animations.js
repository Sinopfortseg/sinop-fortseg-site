/**
 * Additional animations for the website
 */
document.addEventListener('DOMContentLoaded', function() {
  // Initialize hero section animations
  initHeroAnimations();
  
  // Initialize service card animations
  initServiceCardAnimations();
});

/**
 * Initialize animations for the hero section
 */
function initHeroAnimations() {
  const heroTitle = document.querySelector('.hero-content h2');
  const heroText = document.querySelector('.hero-content p');
  const heroButtons = document.querySelector('.hero-buttons');
  
  // Only apply animations if elements exist
  if (heroTitle && heroText && heroButtons) {
    // Staggered animation for hero elements
    setTimeout(() => {
      heroTitle.classList.add('slide-in');
      
      setTimeout(() => {
        heroText.classList.add('fade-in');
        
        setTimeout(() => {
          heroButtons.classList.add('fade-in');
        }, 300);
      }, 300);
    }, 200);
  }
}

/**
 * Initialize animations for service cards
 */
function initServiceCardAnimations() {
  const serviceCards = document.querySelectorAll('.service-card');
  const serviceIcons = document.querySelectorAll('.service-icon');
  
  // Apply animation to service cards on hover
  serviceCards.forEach((card, index) => {
    card.addEventListener('mouseenter', () => {
      // Add a subtle pulse animation to the icon
      if (serviceIcons[index]) {
        serviceIcons[index].style.animation = 'pulse 0.8s ease infinite';
      }
    });
    
    card.addEventListener('mouseleave', () => {
      // Remove the animation when mouse leaves
      if (serviceIcons[index]) {
        serviceIcons[index].style.animation = '';
      }
    });
  });
}

/**
 * Create a parallax effect for the hero section
 */
window.addEventListener('scroll', function() {
  const heroSection = document.querySelector('.hero-section');
  
  if (heroSection) {
    const scrollPosition = window.scrollY;
    
    // Parallax effect for the hero background
    if (scrollPosition < heroSection.offsetHeight) {
      heroSection.style.backgroundPositionY = `${scrollPosition * 0.4}px`;
    }
  }
});

/**
 * Add animation to elements when they appear in the viewport
 */
document.addEventListener('scroll', function() {
  const fadeElements = document.querySelectorAll('.fade-in:not(.visible)');
  const slideElements = document.querySelectorAll('.slide-in:not(.visible)');
  
  fadeElements.forEach(element => {
    if (isElementInViewport(element)) {
      element.classList.add('visible');
    }
  });
  
  slideElements.forEach(element => {
    if (isElementInViewport(element)) {
      element.classList.add('visible');
    }
  });
});

/**
 * Check if an element is in the viewport
 * @param {HTMLElement} element - The element to check
 * @returns {boolean} - True if the element is in the viewport
 */
function isElementInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
    rect.left >= 0 &&
    rect.bottom >= 0 &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

/**
 * Add subtle animation to WhatsApp button
 */
document.addEventListener('DOMContentLoaded', () => {
  const whatsappButtons = document.querySelectorAll('.btn-whatsapp, .btn-whatsapp-large');
  
  whatsappButtons.forEach(button => {
    setInterval(() => {
      button.classList.add('pulse-animation');
      
      setTimeout(() => {
        button.classList.remove('pulse-animation');
      }, 1000);
    }, 5000); // Pulse every 5 seconds
  });
});

// Add pulse animation to the stylesheet if not already defined
if (!document.querySelector('style#pulse-animation')) {
  const style = document.createElement('style');
  style.id = 'pulse-animation';
  style.textContent = `
    @keyframes pulseAnimation {
      0% { transform: scale(1); }
      50% { transform: scale(1.05); }
      100% { transform: scale(1); }
    }
    
    .pulse-animation {
      animation: pulseAnimation 1s ease;
    }
  `;
  document.head.appendChild(style);
}