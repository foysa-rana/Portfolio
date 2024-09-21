// animation profession
const animationProfession = () => {
    const h3 = document.querySelector('.profession .js_animation');
    const text = h3.textContent;
    let add = '';
    for (const element of text) {
        add += `<span class="visible animate__animated animate__fadeIn">${element}</span>`;
    }
    h3.innerHTML = add;
    const visible = document.querySelectorAll('.visible');

    let delay = 0.1;
    visible.forEach((item) => {
        item.style.animationDelay = `${delay}s`;
        item.style.animationDuration = `${delay}s`;
        delay += 0.05;
    });
};
animationProfession();
setInterval(animationProfession, 3000);

const animationOnScroll = () => {
    // observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animation');
            } else {
                entry.target.classList.remove('animation');
            }
        });
    });
    // education section
    const left = document.querySelectorAll('#education .left-side .education-select');
    const right = document.querySelectorAll('#education .right-side .education-select');
    // left side
    left.forEach((element) => {
        observer.observe(element);
    });
    // right side
    right.forEach((element) => {
        observer.observe(element);
    });
};
animationOnScroll();
