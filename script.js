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

    document.querySelector("#contact form").reset();

     // Initialize the map
    var map = L.map('map').setView([47.5, -120.5], 7); 

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
    }).addTo(map);

    
    var orangeIcon = new L.Icon({
        iconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-orange.png',
        shadowUrl: 'https://leafletjs.com/examples/custom-icons/leaf-shadow.png',
        iconSize: [38, 95],
        shadowSize: [50, 64],
        iconAnchor: [22, 94],
        shadowAnchor: [4, 62],
        popupAnchor: [-3, -76]
    });

    var pierceMarker = L.marker([47.1717, -122.5185], { icon: orangeIcon }).addTo(map)
        .bindPopup('<div><img src="piercecollegelogo.png" alt="Pierce College Logo" style="width:50px;height:50px;"><br><b>Pierce College Fort Steilacoom, Lakewood, WA</b><br>Associate of Arts (AA) in Pre-Nursing<br>June 2020</div>');

    var wsuMarker = L.marker([46.7298, -117.1817], { icon: orangeIcon }).addTo(map)
        .bindPopup('<div><img src="Washington_State_Cougars_logo.png" alt="Washington State University Logo" style="width:50px;height:50px;"><br><b>Washington State University, Pullman, WA</b><br>Bachelor of Science (B.S.) in Data Analytics, Minor in Business<br>May 2024</div>');

});

