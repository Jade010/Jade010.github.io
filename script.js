document.addEventListener('DOMContentLoaded', function() {
    var typewriterText = [
        "Hi, my name is Jade.",
        "Welcome to my portfolio!",
        "I'm a data analyst and developer.",
        "I love things with utility, so I create things with utility."
    ];
    var typingDelay = 150;
    var erasingDelay = 75;
    var newTextDelay = 2000; // Delay between current and next text
    var textArrayIndex = 0;
    var charIndex = 0;
    var typedText = document.getElementById('typewriter');

    function type() {
        if (charIndex < typewriterText[textArrayIndex].length) {
            typedText.textContent += typewriterText[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } else {
            setTimeout(erase, newTextDelay);
        }
    }

    function erase() {
        if (charIndex > 0) {
            typedText.textContent = typewriterText[textArrayIndex].substring(0, charIndex-1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } else {
            textArrayIndex++;
            if (textArrayIndex >= typewriterText.length) textArrayIndex = 0;
            setTimeout(type, typingDelay + 1100);
        }
    }

    setTimeout(type, newTextDelay + 250);
});

