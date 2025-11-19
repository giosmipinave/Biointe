
/* <<< SLIDER */

const slides = document.querySelector('.slides');
const prevBtn = document.querySelector('.nav-prev');
const nextBtn = document.querySelector('.nav-next');
const dots = document.querySelectorAll('.dot');

let index = 0;

function showSlide(i) {
    index = i;
    slides.style.transform = `translateX(${-100 * index}%)`;
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
}

nextBtn.addEventListener('click', () => {
    index = (index + 1) % dots.length;
    showSlide(index);
});

prevBtn.addEventListener('click', () => {
    index = (index - 1 + dots.length) % dots.length;
    showSlide(index);
});

dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
        showSlide(i);
    });
});
