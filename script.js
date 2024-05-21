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

function scrollToFooter() {
    document.querySelector('footer').scrollIntoView({
        behavior: 'smooth'
    });
}
