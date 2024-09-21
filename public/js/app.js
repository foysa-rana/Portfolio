// Menu bar
const menuBar = () => {
    const menuIcon = document.querySelector('.menu-icon');
    const closeIcon = document.querySelector('.close-icon');
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.overlay');

    menuIcon.addEventListener('click', () => {
        sidebar.classList.add('show-sidebar');
        menuIcon.style.display = 'none';
        closeIcon.style.display = 'block';
        overlay.style.display = 'block';
    });
    closeIcon.addEventListener('click', () => {
        sidebar.classList.remove('show-sidebar');
        menuIcon.style.display = 'block';
        closeIcon.style.display = 'none';
        overlay.style.display = 'none';
    });
};
menuBar();

// aside scroll
const scroll = () => {
    const navItem = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('main section');

    // scroll by scrolling
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            if (sectionTop - 201 <= window.scrollY) {
                current = section.getAttribute('id');
            }
        });
        navItem.forEach((item) => {
            item.classList.remove('active');
            if (item.classList.contains(current)) {
                item.classList.add('active');
            }
        });
    });

    // scroll on click
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach((link) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const attribute = link.getAttribute('href').slice(1);
            const id = document.getElementById(attribute);
            const sectionTop = id.offsetTop - 200;
            window.scrollTo({
                top: sectionTop,
                left: 0,
                behavior: 'smooth',
            });
        });
    });
};
scroll();

// detials
const details = () => {
    const showIcon = document.querySelector('.show-icon');
    const hideIcon = document.querySelector('.hide-icon');
    const aboutImgDetails = document.querySelector('.about-img-details');

    showIcon.addEventListener('click', () => {
        aboutImgDetails.classList.add('show-details');
        showIcon.style.display = 'none';
        hideIcon.style.display = 'block';
    });
    hideIcon.addEventListener('click', () => {
        aboutImgDetails.classList.remove('show-details');
        showIcon.style.display = 'block';
        hideIcon.style.display = 'none';
    });
};
details();

// cv validation
const cvValidation = () => {
    const cv = document.querySelectorAll('.cv');
    const modalClose = document.querySelector('.modal-close');
    const modalCV = document.querySelector('.modal-CV');

    cv.forEach((element) => {
        element.addEventListener('click', () => {
            const attribute = element.getAttribute('href');
            if (attribute === '#/') {
                modalCV.style.display = 'block';
            }
        });
    });

    modalClose.addEventListener('click', () => {
        modalCV.style.display = 'none';
    });
};
cvValidation();

// contact form handling
const contactForm = () => {
    const form = document.querySelector('.contact-form');
    const fName = document.querySelector('#fname');
    const lName = document.querySelector('#lname');
    const email = document.querySelector('#email');
    const message = document.querySelector('#message');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = {
            fName: fName.value,
            lName: lName.value,
            email: email.value,
            message: message.value,
        };
        const formDataString = JSON.stringify(formData);
        // sending data to the server
        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/');
        xhr.setRequestHeader('content-type', 'application/json');
        xhr.onload = () => {
            if (xhr.responseText === 'success') {
                fName.value = '';
                lName.value = '';
                email.value = '';
                message.value = '';
                const contactFormSuccess = document.querySelector('.contact-form-success');
                contactFormSuccess.style.display = 'block';
                const btnModalSucces = document.querySelector('.btn-modal-success');
                btnModalSucces.addEventListener('click', () => {
                    contactFormSuccess.style.display = 'none';
                    window.location.reload();
                });
            } else {
                fName.value = '';
                lName.value = '';
                email.value = '';
                message.value = '';
                const contactFormError = document.querySelector('.contact-form-error');
                contactFormError.style.display = 'block';
                const btnModalError = document.querySelector('.btn-modal-error');
                console.log(btnModalError);
                btnModalError.addEventListener('click', () => {
                    console.log(btnModalError);
                    contactFormError.style.display = 'none';
                    window.location.reload();
                });
            }
        };
        xhr.send(formDataString);
    });
};
contactForm();

// copyright
const copyright = () => {
    const d = new Date();
    const copyRight = document.querySelector('.copyright');
    copyRight.innerHTML = `Copyright © ${d.getFullYear()} Foysal Rana. All Rights Reserved`;
};
copyright();
