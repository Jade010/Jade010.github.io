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
