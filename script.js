document.addEventListener('DOMContentLoaded', function() {
     // Initialize the map
    var map = L.map('map').setView([47.5, -120.5], 7); // Centered on Washington state

    // Set up the OSM layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
    }).addTo(map);

    // Add markers for educational institutions
    var pierceMarker = L.marker([47.1717, -122.5185], { color: 'red' }).addTo(map)
        .bindPopup('<b>Pierce College Fort Steilacoom, Lakewood, WA</b><br>Associate of Arts (AA) in Pre-Nursing<br>June 2020');

    var wsuMarker = L.marker([46.7298, -117.1817], { color: 'red' }).addTo(map)
        .bindPopup('<b>Washington State University, Pullman, WA</b><br>Bachelor of Science (B.S.) in Data Analytics, Minor in Business<br>May 2024');
    
    // Ensure the map does not move
    map.dragging.disable();
    map.scrollWheelZoom.disable();
    map.doubleClickZoom.disable();
    map.boxZoom.disable();
    map.keyboard.disable();
    map.touchZoom.disable();

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

    document.querySelector("#contact form").reset();
});

