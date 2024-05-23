document.addEventListener('DOMContentLoaded', function() {
    document.querySelector("#contact form").reset();
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


// Include Leaflet.js library for map
<script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
<link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css"/>

<script>
// Initialize the map
var map = L.map('map').setView([46.7298, -117.1817], 6);

// Set up the OSM layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
}).addTo(map);

// Add markers for educational institutions
var wsuMarker = L.marker([46.7298, -117.1817]).addTo(map)
    .bindPopup('<b>Washington State University</b><br>Bachelor of Science in Data Analytics, Minor in Business<br>May 2024');

var pierceMarker = L.marker([47.1683, -122.5078]).addTo(map)
    .bindPopup('<b>Pierce College Fort Steilacoom</b><br>Associate of Arts in Pre-Nursing<br>June 2020');
</script>

