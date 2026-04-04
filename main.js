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
orderForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const name = orderForm.querySelector('input[type="text"]').value;
  const treat = orderForm.querySelector('select:nth-of-type(1)').value;
  const type = orderForm.querySelector('select:nth-of-type(2)').value;
  const notes = orderForm.querySelector('textarea').value;
  
  // Create WhatsApp Message
  const message = `Hola Jos-Mycakes! I would like to place an order:
- Treat: ${treat}
- Name: ${name}
- Mode: ${type}
- Notes: ${notes}

Looking forward to it!`;

  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/1234567890?text=${encodedMessage}`;
  
  // Open WhatsApp in new tab
  window.open(whatsappUrl, '_blank');
  
  alert('Order sent via WhatsApp! We will confirm with you shortly.');
  closeModal();
});
