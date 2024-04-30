document.addEventListener('DOMContentLoaded', function() {
    setupTypewriter();
});

function setupTypewriter() {
    const element = document.getElementById('typewriter-text');
    const phrases = ["Welcome to my portfolio!"];
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

        element.innerHTML = fullText.substring(0, letterPos) + '<span class="cursor">|</span>';
        
        if (!isDeleting && letterPos === fullText.length) {
            setTimeout(() => { isDeleting = true; }, 2000);
        } else if (isDeleting && letterPos === 0) {
            isDeleting = false;
            currentPhrase = (currentPhrase + 1) % phrases.length;
            setTimeout(type, 500);
        }

        setTimeout(type, isDeleting ? 100 : 150);
    }

    type();
}
