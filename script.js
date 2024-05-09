document.addEventListener('DOMContentLoaded', function() {
    var typewriterText = [
        "Welcome to my portfolio!",
        "I love things with utility, so I create things with utility."
    ];
    var typingDelay = 50;
    var erasingDelay = 60;
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

document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.filter-button');
    const projects = document.querySelectorAll('.project-card');

    // Event listener for each button
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-tag'); // Get the filter tag from the button
            projects.forEach(project => {
                // Check if the project has the tag or if the filter is 'all'
                if (filter === 'all' || project.getAttribute('data-tags').includes(filter)) {
                    project.style.display = 'flex'; // Show project
                } else {
                    project.style.display = 'none'; // Hide project
                }
            });
        });
    });
});
