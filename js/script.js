
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
    const response = await fetch("sendemailtosebas.azurewebsites.net", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });
  
    const result = await response.text();
    // Immediately alert success once the email is sent
    alert(result);
    
    // Immediately reset the form and re-enable the button
    form.reset();
    submitButton.textContent = originalButtonText;
    submitButton.disabled = false;
  } catch (error) {
    console.error("Error sending email:", error);
    alert("There was an error sending your message. Please try again later.");
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
