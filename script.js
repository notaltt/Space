const menuToggle = document.querySelector('.toggle');
const showcase = document.querySelector('.showcase');
const about = document.querySelector('.about');
const contact = document.querySelector('.contact');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    showcase.classList.toggle('active');
    about.classList.toggle('active');
    contact.classList.toggle('active');
})


exports.build = series(scssTask, jsTask);