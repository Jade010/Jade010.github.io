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

    element.innerHTML = fullText.substring(0, letterPos);

    if (!isDeleting && letterPos === fullText.length) {
        // Finish typing
        setTimeout(() => { isDeleting = true; }, 2000);
    } else if (isDeleting && letterPos === 0) {
        // Switch to next phrase
        isDeleting = false;
        currentPhrase = (currentPhrase + 1) % phrases.length;
        setTimeout(type, 500);
        return;
    }

    setTimeout(type, isDeleting ? 100 : 150);
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
