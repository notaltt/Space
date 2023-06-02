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

let lastTime;
function update(time){
    if(lastTime == null){
        lastTime = time;
        window.requestAnimationFrame(update);
        return;
    }

    const delta = time - lastTime;
    lastTime = time;

    console.log(delta)
}

exports.build = series(scssTask, jsTask);