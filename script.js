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

    var pierceContent = '<div style="display: flex; align-items: center;"><img src="piercecollegelogo.png" alt="Pierce College Logo" style="width:50px;height:50px;margin-right:10px;"><div><b>Pierce College Fort Steilacoom, Lakewood, WA</b><br>Associate of Arts (AA) in Pre-Nursing<br>June 2020</div></div>';
    var wsuContent = '<div style="display: flex; align-items: center;"><img src="Washington_State_Cougars_logo.png" alt="Washington State University Logo" style="width:50px;height:50px;margin-right:10px;"><div><b>Washington State University, Pullman, WA</b><br>Bachelor of Science (BS) in Data Analytics, Minor in Business<br>May 2024</div></div>';

    var piercePopup = L.popup({ closeButton: false })
        .setLatLng([47.1717, -122.5185])
        .setContent(pierceContent);

    var wsuPopup = L.popup({ closeButton: false })
        .setLatLng([46.7298, -117.1817])
        .setContent(wsuContent);

    map.addLayer(piercePopup);
    map.addLayer(wsuPopup);


    const form = document.getElementById('contact-form');
    const thankYouPopup = document.getElementById('thank-you-popup');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); 

        // Send form data using Formspree
        fetch(form.action, {
            method: 'POST',
            body: new FormData(form),
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                form.reset(); 
                showThankYouPopup(); 
            } else {
                alert('There was an issue with your submission. Please try again.');
            }
        }).catch(error => {
            alert('There was an issue with your submission. Please try again.');
        });
    });

    function showThankYouPopup() {
        thankYouPopup.style.display = 'flex';
        thankYouPopup.addEventListener('click', function() {
            thankYouPopup.style.display = 'none';
        });
    }
});

