document.addEventListener('DOMContentLoaded', function() {
    var typewriterText = [
        "I'm a data analyst and developer.",
        "I'm passionate about creative design and streamlining processes.",
        "I design practical solutions for everyday challenges, turning data into direction."
    ];
    let textArrayIndex = 0;
    let charIndex = 0;
    const typedText = document.getElementById('typewriter');

    function type() {
        if (charIndex < typewriterText[textArrayIndex].length) {
            typedText.textContent += typewriterText[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, 50);
        } else {
            setTimeout(erase, 2000);
        }
    }

    function erase() {
        if (charIndex > 0) {
            typedText.textContent = typewriterText[textArrayIndex].substring(0, charIndex-1);
            charIndex--;
            setTimeout(erase, 60);
        } else {
            textArrayIndex = (textArrayIndex + 1) % typewriterText.length;
            setTimeout(type, 1100);
        }
    }

    setTimeout(type, 250);
});

document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.filter-button');
    const projects = document.querySelectorAll('.project-card');

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            buttons.forEach(btn => btn.classList.remove('active'));
            // Add active class to the clicked button
            this.classList.add('active');
            const filter = this.getAttribute('data-tag');
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
