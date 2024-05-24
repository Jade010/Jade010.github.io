document.addEventListener('DOMContentLoaded', function() {
    // Making sure the page navigates to the home section on load
    if (!window.location.hash) {
        window.location.hash = '#home';
    } else {
        // In case there is a hash force reload
        window.location.hash = ''; 
        window.location.hash = '#home';
    }

    // Smooth scrolling with offset for navigation links
    const navbarHeight = document.getElementById('navbar').offsetHeight;

    document.querySelectorAll('.nav-link').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                const offsetTop = targetElement.getBoundingClientRect().top + window.scrollY - navbarHeight;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Getting all filter buttons and project cards
    const buttons = document.querySelectorAll('.filter-button');
    const projects = document.querySelectorAll('.project-card');

    // Adding the click event listener to the filter buttons
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            buttons.forEach(btn => btn.classList.remove('active'));
            // Adding active class to the clicked button
            this.classList.add('active');
            const filter = this.getAttribute('data-tag');
            projects.forEach(project => {
                // Checking if the project has a tag or if the filter is on all
                if (filter === 'all' || project.getAttribute('data-tags').includes(filter)) {
                    project.style.display = 'flex'; // Show project
                } else {
                    project.style.display = 'none'; // Hide project
                }
            });
        });
    });

    // Resetting the contact form when reloading page
    document.querySelector("#contact form").reset();

    // Starting map centered on Washington State
    var map = L.map('map').setView([47.5, -120.5], 7); 

    // Setting up the OSM layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
    }).addTo(map);

    // The popup content on the map for both colleges
    var pierceContent = '<div style="display: flex; align-items: center;"><img src="piercecollegelogo.png" alt="Pierce College Logo" style="width:50px;height:50px;margin-right:10px;"><div><b>Pierce College Fort Steilacoom, Lakewood, WA</b><br>Associate of Arts (AA) in Pre-Nursing<br>June 2020</div></div>';
    var wsuContent = '<div style="display: flex; align-items: center;"><img src="Washington_State_Cougars_logo.png" alt="Washington State University Logo" style="width:50px;height:50px;margin-right:10px;"><div><b>Washington State University, Pullman, WA</b><br>Bachelor of Science (BS) in Data Analytics, Minor in Business<br>May 2024</div></div>';

    // Adding the popups to the map
    var piercePopup = L.popup({ closeButton: false })
        .setLatLng([47.1717, -122.5185])
        .setContent(pierceContent);

    var wsuPopup = L.popup({ closeButton: false })
        .setLatLng([46.7298, -117.1817])
        .setContent(wsuContent);

    map.addLayer(piercePopup);
    map.addLayer(wsuPopup);

    // Contact form submission handling
    const form = document.getElementById('contact-form');
    const thankYouPopup = document.getElementById('thank-you-popup');
    const closeButton = document.querySelector('.close-popup');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Preventing the default form that goes to a different page

        // Sending form info to Formspree
        fetch(form.action, {
            method: 'POST',
            body: new FormData(form),
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                form.reset(); // Clear form when submitted
                showThankYouPopup(); // Thank you popup screen
            } else {
                alert('There was an issue with your submission. Please try again.');
            }
        }).catch(error => {
            alert('There was an issue with your submission. Please try again.');
        });
    });

    // Function for the thank you popup
    function showThankYouPopup() {
        thankYouPopup.style.display = 'flex';
        document.body.classList.add('no-scroll'); // Prevents scrolling
    }

    // Event listener to close the popup
    closeButton.addEventListener('click', function() {
        thankYouPopup.style.display = 'none';
        document.body.classList.remove('no-scroll'); // Re-enable scrolling
    });

   
});
