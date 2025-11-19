// ========== HEADER QUE SE RETRAE ==========
let lastScroll = 0;
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > lastScroll && currentScroll > 100) {
        header.classList.add('header-hidden');
    } else {
        header.classList.remove('header-hidden');
    }
    
    lastScroll = currentScroll;
});

// ========== MENÚ DESPLEGABLE ==========
const menuToggle = document.getElementById('menuToggle');
const toolsDropdown = document.getElementById('toolsDropdown');
const closeMenu = document.getElementById('closeMenu');

menuToggle.addEventListener('click', () => {
    toolsDropdown.classList.toggle('show');
});

closeMenu.addEventListener('click', () => {
    toolsDropdown.classList.remove('show');
});

// Cerrar menú al hacer clic fuera
document.addEventListener('click', (e) => {
    if (!toolsDropdown.contains(e.target) && !menuToggle.contains(e.target)) {
        toolsDropdown.classList.remove('show');
    }
});

// ========== SLIDER INTERACTIVO ==========
const slideTrack = document.getElementById('slideTrack');
const slides = document.querySelectorAll('.slide-item');
const prevBtn = document.getElementById('prevSlide');
const nextBtn = document.getElementById('nextSlide');
const dotsContainer = document.getElementById('sliderDots');

let currentSlide = 0;
const totalSlides = slides.length;

// Crear indicadores de posición
for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
}

const dots = document.querySelectorAll('.dot');

function updateSlider() {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
    
    const offset = -currentSlide * 100;
    slideTrack.style.transform = `translateX(${offset}%)`;
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlider();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlider();
}

function goToSlide(index) {
    currentSlide = index;
    updateSlider();
}

prevBtn.addEventListener('click', prevSlide);
nextBtn.addEventListener('click', nextSlide);

// Auto-play
let autoplayInterval = setInterval(nextSlide, 5000);

// Pausar autoplay al hacer hover
const sliderContainer = document.querySelector('.slider-container');
sliderContainer.addEventListener('mouseenter', () => {
    clearInterval(autoplayInterval);
});

sliderContainer.addEventListener('mouseleave', () => {
    autoplayInterval = setInterval(nextSlide, 5000);
});

// Navegación con teclado
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
});

// ========== NEWSLETTER ==========
const newsletterForm = document.getElementById('newsletterForm');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = e.target.querySelector('input[type="email"]').value;
        alert(`¡Gracias por suscribirte! Hemos enviado un correo de confirmación a ${email}`);
        e.target.reset();
    });
}

// ========== ANIMACIONES AL SCROLL ==========
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Aplicar animaciones a las tarjetas de productos
document.querySelectorAll('.product-item').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = 'all 0.6s ease-out';
    observer.observe(item);
});

// ========== CONTADOR DEL CARRITO ==========
let cartCount = 0;
const cartCountElement = document.querySelector('.cart-count');

function updateCartCount() {
    if (cartCountElement) {
        cartCountElement.textContent = cartCount;
    }
}

// Simular agregar al carrito (para demostración)
document.querySelectorAll('.product-item').forEach(item => {
    item.addEventListener('click', () => {
        cartCount++;
        updateCartCount();
        
        // Animación del carrito
        const cartBtn = document.querySelector('.cart-btn');
        cartBtn.style.transform = 'scale(1.2)';
        setTimeout(() => {
            cartBtn.style.transform = 'scale(1)';
        }, 300);
    });
});