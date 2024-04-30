const element = document.getElementById('typewriter-text');
const phrases = ["Jade Aidoghie", "Welcome to my portfolio!"];
let currentPhrase = 0;
let letterPos = 0;
let isDeleting = false;

function type() {
    const fullText = phrases[currentPhrase];
    if (isDeleting) {
        letterPos--;
    } else {
        letterPos++;
    }

    element.innerHTML = fullText.substring(0, letterPos) + '<span class="cursor"></span>';

    let typeSpeed = 150; // Typing speed in milliseconds
    if (isDeleting) {
        typeSpeed /= 2; // Make backspacing faster
    }

    if (!isDeleting && letterPos === fullText.length) {
        // Finish typing, start backspacing after a delay
        setTimeout(() => { isDeleting = true; }, 2000);
    } else if (isDeleting && letterPos === 0) {
        // Finished backspacing, switch to the next phrase
        isDeleting = false;
        currentPhrase = (currentPhrase + 1) % phrases.length;
        setTimeout(type, 500);
    } else {
        setTimeout(type, typeSpeed);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    runCode();
    window.addEventListener('scroll', function() {
        const navbar = document.getElementById('navbar');
        const homeHeight = document.getElementById('home').offsetHeight;
        if (window.pageYOffset > homeHeight - 50) {
            navbar.classList.remove('hidden');
        } else {
            navbar.classList.add('hidden');
        }
    });
});

function runCode() {
    const outputElement = document.getElementById('output');
    const bio = `My name is Jade Aidoghie, a Software Developer. I have a BS in Computer Science and my skills include Python, JavaScript, HTML, CSS.`;
    const hobbies = `Hobbies include: Photography, Hiking, Gaming.`;
    
    outputElement.textContent = bio + "\n" + hobbies;
}

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    const homeHeight = document.getElementById('home').offsetHeight;
    if (window.pageYOffset > homeHeight - 50) {
        navbar.classList.remove('hidden');
    } else {
        navbar.classList.add('hidden');
    }
});
