document.addEventListener('DOMContentLoaded', function() {
    runCode();
    setupTypewriter();
    setupNavbarVisibility();
    setupSmoothScrolling();
});

function setupTypewriter() {
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

    type();
}

function setupNavbarVisibility() {
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', function() {
        const homeHeight = document.getElementById('home').offsetHeight;
        if (window.pageYOffset > homeHeight - 50) {
            navbar.style.top = "0";
        } else {
            navbar.style.top = "-50px"; // Adjust this to fully hide the navbar
        }
    });
}

function setupSmoothScrolling() {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            targetSection.scrollIntoView({ behavior: 'smooth' });
        });
    });
}

function runCode() {
    const outputElement = document.getElementById('output');
    const bio = `My name is Jade Aidoghie, a Software Developer. I have a BS in Computer Science and my skills include Python, JavaScript, HTML, CSS.`;
    const hobbies = `Hobbies include: Photography, Hiking, Gaming.`;
    
    outputElement.textContent = bio + "\n" + hobbies;
}
