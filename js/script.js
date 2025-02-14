
// Reveal on Scroll
const reveals = document.querySelectorAll('.reveal');
function revealOnScroll() {
  const windowHeight = window.innerHeight;
  reveals.forEach(el => {
    if (el.getBoundingClientRect().top < windowHeight - 100) {
      el.classList.add('active');
    }
  });
}
window.addEventListener('scroll', revealOnScroll);
revealOnScroll();

// Smooth Scroll for Navigation
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href'))
      .scrollIntoView({ behavior: 'smooth' });
  });
});

// Contact Modal Functionality
const contactBtn = document.getElementById('contactBtn');
const contactModal = document.getElementById('contactModal');
contactBtn.addEventListener('click', function(e) {
  e.preventDefault();
  contactModal.classList.add('active');
});
window.addEventListener('click', function(e) {
  if (e.target == contactModal) {
    contactModal.classList.remove('active');
  }
});

// Tab Functionality for Skills Section (Larger Screens)
function openTab(evt, tabName) {
  document.querySelectorAll('.tab-content').forEach(content => {
    content.classList.remove('active');
  });
  document.querySelectorAll('.tab').forEach(btn => {
    btn.classList.remove('active');
  });
  document.getElementById(tabName).classList.add('active');
  evt.currentTarget.classList.add('active');
}

// Hamburger Toggle for Navigation (with smooth slide)
document.getElementById('hamburger').addEventListener('click', function() {
  document.querySelector('nav').classList.toggle('active');
});

// Accordion Toggle for Skills (Mobile) - Only one open at a time
document.querySelectorAll('.accordion-header').forEach(header => {
  header.addEventListener('click', function() {
    // Close other accordion items
    document.querySelectorAll('.accordion-header').forEach(h => {
      if (h !== this) {
        h.classList.remove('active');
        h.nextElementSibling.classList.remove('active');
      }
    });
    // Toggle the clicked one
    this.classList.toggle('active');
    this.nextElementSibling.classList.toggle('active');
  });
});
