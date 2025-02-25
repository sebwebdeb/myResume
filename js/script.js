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
    const targetId = this.getAttribute('href');
    if (targetId === '#') return; // Add this check for '#' links
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) { // Add null check
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
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
// Handling Form Submission
document.getElementById('contactForm').addEventListener('submit', async function(event) {
  event.preventDefault(); // Prevent the form from refreshing the page
  
  const form = this;
  const submitButton = form.querySelector('button[type="submit"]');
  const originalButtonText = submitButton.textContent;
  
  // Set loading state
  submitButton.disabled = true;
  submitButton.textContent = "Sending...";
  
  // Gather form data
  const formData = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    subject: document.getElementById('subject').value,
    message: document.getElementById('message').value
  };
  
  try {
    console.log('Sending form data:', formData); // Debug log
    
    const response = await fetch("https://sendemailtosebas.azurewebsites.net/api/sendEmail", { // Removed the ? at the end
      method: "POST",
      headers: { 
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });
  
    console.log('Response status:', response.status); // Debug log
    const result = await response.text();
    console.log('Response text:', result); // Debug log
    
    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}: ${result}`);
    }
    
    alert(result);
    form.reset();
    submitButton.textContent = originalButtonText;
    submitButton.disabled = false;
  } catch (error) {
    console.error("Detailed error:", error);
    alert(`Error details: ${error.message}`);
    submitButton.textContent = originalButtonText;
    submitButton.disabled = false;
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
