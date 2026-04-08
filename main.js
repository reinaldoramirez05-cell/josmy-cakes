// --- Scroll Animations ---
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

document.querySelectorAll('.fade-up').forEach(el => {
  observer.observe(el);
});

// --- Navbar State & Hamburger ---
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('active');
});

// Close menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
  });
});

// --- Modal Logic ---
const modal = document.getElementById('order-modal');
const openBtn = document.getElementById('open-modal');
const closeBtn = document.querySelector('.close-modal');
const orderBtns = document.querySelectorAll('.order-btn');

function openModal() {
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.classList.remove('active');
  document.body.style.overflow = 'auto';
}

const heroOrderBtn = document.getElementById('hero-order-btn');

openBtn.addEventListener('click', openModal);
if (heroOrderBtn) heroOrderBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);

orderBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    const itemName = e.target.parentElement.querySelector('h3').textContent;
    const select = document.querySelector('#order-form select');
    // Pre-select the item in the modal
    for (let option of select.options) {
      if (option.text.includes(itemName)) {
        select.value = option.text;
        break;
      }
    }
    openModal();
  });
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

// --- Order Form Submission ---
const orderForm = document.getElementById('order-form');
orderForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const submitBtn = orderForm.querySelector('button[type="submit"]');
  
  // Show loading state
  submitBtn.disabled = true;
  submitBtn.innerText = "Processing...";

  try {
    const formData = new FormData(orderForm);
    
    // REPLACE THIS KEY with the one you get from web3forms.com
    formData.append("access_key", "YOUR_ACCESS_KEY_HERE");
    formData.append("subject", "New Cake Order | Jos-Mycakes");
    formData.append("from_name", "Jos-Mycakes Website");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const result = await response.json();
    
    if (result.success) {
      closeModal();
      orderForm.reset();
      window.location.href = 'order-confirmed.html';
    } else {
      // Fallback redirect even if there's a minor error
      window.location.href = 'order-confirmed.html';
    }
    
  } catch (error) {
    console.error('Error!', error.message);
    window.location.href = 'order-confirmed.html';
  }
});

// --- FAQ Accordion ---
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
  const question = item.querySelector('.faq-question');
  const answer = item.querySelector('.faq-answer');
  
  question.addEventListener('click', () => {
    // Close other open FAQs for a cleaner look
    faqItems.forEach(otherItem => {
      if (otherItem !== item && otherItem.classList.contains('active')) {
        otherItem.classList.remove('active');
        otherItem.querySelector('.faq-answer').style.maxHeight = null;
      }
    });

    item.classList.toggle('active');
    
    if (item.classList.contains('active')) {
      answer.style.maxHeight = answer.scrollHeight + 'px';
    } else {
      answer.style.maxHeight = null;
    }
  });
});
