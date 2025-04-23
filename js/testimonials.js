/**
 * Testimonials slider functionality
 */
document.addEventListener('DOMContentLoaded', function() {
  initTestimonialsSlider();
});

/**
 * Initialize the testimonials slider
 */
function initTestimonialsSlider() {
  const slider = document.getElementById('testimonials-slider');
  const prevBtn = document.getElementById('prev-testimonial');
  const nextBtn = document.getElementById('next-testimonial');
  const dots = document.querySelectorAll('.dot');
  
  let currentSlide = 0;
  const slides = document.querySelectorAll('.testimonial-card');
  const maxSlides = slides.length;
  
  // Only initialize if slider elements exist
  if (!slider || !prevBtn || !nextBtn || !dots.length || !slides.length) {
    return;
  }
  
  // Set first slide as active initially
  slides[0].classList.add('active');
  dots[0].classList.add('active');
  
  // Function to show a specific slide
  function showSlide(index) {
    // Hide all slides
    slides.forEach(slide => {
      slide.classList.remove('active');
    });
    
    // Remove active class from all dots
    dots.forEach(dot => {
      dot.classList.remove('active');
    });
    
    // Show the current slide
    slides[index].classList.add('active');
    dots[index].classList.add('active');
    
    // Update current slide index
    currentSlide = index;
  }
  
  // Previous button click handler
  prevBtn.addEventListener('click', () => {
    let newIndex = currentSlide - 1;
    if (newIndex < 0) {
      newIndex = maxSlides - 1;
    }
    showSlide(newIndex);
  });
  
  // Next button click handler
  nextBtn.addEventListener('click', () => {
    let newIndex = currentSlide + 1;
    if (newIndex >= maxSlides) {
      newIndex = 0;
    }
    showSlide(newIndex);
  });
  
  // Dot click handlers
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      showSlide(index);
    });
  });
  
  // Auto play functionality
  let autoplayInterval;
  
  function startAutoplay() {
    autoplayInterval = setInterval(() => {
      let newIndex = currentSlide + 1;
      if (newIndex >= maxSlides) {
        newIndex = 0;
      }
      showSlide(newIndex);
    }, 7000); // Change slide every 7 seconds
  }
  
  function stopAutoplay() {
    clearInterval(autoplayInterval);
  }
  
  // Start autoplay on page load
  startAutoplay();
  
  // Pause autoplay on hover
  slider.addEventListener('mouseenter', stopAutoplay);
  slider.addEventListener('mouseleave', startAutoplay);
  
  // Touch events for mobile swiping
  let touchStartX = 0;
  let touchEndX = 0;
  
  slider.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });
  
  slider.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });
  
  function handleSwipe() {
    const swipeThreshold = 50; // Minimum pixel distance for swipe detection
    
    // Left swipe
    if (touchEndX < touchStartX - swipeThreshold) {
      let newIndex = currentSlide + 1;
      if (newIndex >= maxSlides) {
        newIndex = 0;
      }
      showSlide(newIndex);
    }
    
    // Right swipe
    if (touchEndX > touchStartX + swipeThreshold) {
      let newIndex = currentSlide - 1;
      if (newIndex < 0) {
        newIndex = maxSlides - 1;
      }
      showSlide(newIndex);
    }
  }
}