const phrases = ["Jade Aidoghie", "Welcome to my portfolio!"];
let currentPhrase = 0;
let letterCount = 0;
let typingDiv = document.getElementById('typing');
let typingSpeed = 150;
let backspaceSpeed = 100;

function type() {
    if (letterCount < phrases[currentPhrase].length) {
        typingDiv.textContent += phrases[currentPhrase].charAt(letterCount);
        letterCount++;
        setTimeout(type, typingSpeed);
    } else {
        setTimeout(backspace, 2000);
    }
}

function backspace() {
    if (letterCount > 0) {
        typingDiv.textContent = typingDiv.textContent.slice(0, -1);
        letterCount--;
        setTimeout(backspace, backspaceSpeed);
    } else {
        currentPhrase = (currentPhrase + 1) % phrases.length;
        setTimeout(type, 500);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    type();
});

function executeCode() {
    let outputDiv = document.getElementById('output');
    let jade = {
        education: 'BS in Computer Science',
        profession: 'Software Developer',
        skills: ['HTML', 'CSS', 'JavaScript', 'Python'],
        about_me: function() {
            return `Education: ${this.education}, Profession: ${this.profession}, Skills: ${this.skills.join(', ')}`;
        }
    };
    outputDiv.textContent = jade.about_me();
}

document.addEventListener('DOMContentLoaded', function() {
    type(); // Start typing animation
    setupScrollHandling(); // Setup custom scroll events
});

function setupScrollHandling() {
    const downArrow = document.querySelector('.down-arrow');
    const upArrow = document.querySelector('.up-arrow');

    downArrow.addEventListener('click', function() {
        window.location.hash = '#about';
    });

    upArrow.addEventListener('click', function() {
        window.location.hash = '#home';
    });

    // Optional: Custom scroll event for more control
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        let st = window.pageYOffset || document.documentElement.scrollTop;
        if (st > lastScrollTop){
            // downscroll code
            window.location.hash = '#about';
        } else {
            // upscroll code
            window.location.hash = '#home';
        }
        lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
    }, false);
}

