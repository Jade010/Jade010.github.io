document.addEventListener('DOMContentLoaded', function() {
    // Making sure the page navigates to the home section on load
    if (!window.location.hash) {
        window.location.hash = '#home';
    } else {
        // In case there is a hash force reload
        window.location.hash = ''; 
        window.location.hash = '#home';
    }

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
                    project.style.display = 'block';
                } else {
                    project.style.display = 'none';
                }
            });
        });
    });

    // Resetting the contact form when reloading page
    document.querySelector("#contact form").reset();

    // Starting map centered on Washington State
    var map = L.map('map', {
        center: [47.5, -120.5],
        zoom: 7,
        maxBounds: [
            [45.0, -125.0], // Southwest coordinates
            [50.0, -115.0]  // Northeast coordinates
        ],
        maxBoundsViscosity: 1.0
    });

    // Setting up the OSM layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
    }).addTo(map);

    // The popup content on the map for both colleges
    var pierceContent = '<div style="display: flex; align-items: center;"><img src="Images/piercecollegelogo.png" alt="Pierce College Logo" style="width:50px;height:50px;margin-right:10px;"><div><b>Pierce College Fort Steilacoom, Lakewood, WA</b><br>Associate of Arts (AA) in Pre-Nursing<br>June 2020</div></div>';
    var wsuContent = '<div style="display: flex; align-items: center;"><img src="Images/Washington_State_Cougars_logo.png" alt="Washington State University Logo" style="width:50px;height:50px;margin-right:10px;"><div><b>Washington State University, Pullman, WA</b><br>Bachelor of Science (BS) in Data Analytics, Minor in Business<br>May 2024</div></div>';

    // Add popups to the map with closeButton disabled
    var piercePopup = L.popup({ closeButton: false, autoClose: false, closeOnClick: false })
        .setLatLng([47.1717, -122.5185])
        .setContent(pierceContent);

    var wsuPopup = L.popup({ closeButton: false, autoClose: false, closeOnClick: false })
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

    // Video Modal Functionality
    const modal = document.getElementById('video-modal');
    const videoElement = document.getElementById('project-video');
    const videoSource = document.getElementById('video-source');
    const closeVideoButton = document.querySelector('.close-button');
    const additionalInfo = document.getElementById('additional-info');

    projects.forEach(project => {
        project.addEventListener('click', function(event) {
            event.preventDefault();
            const videoSrc = project.getAttribute('data-video');
            if (videoSrc) {
                videoSource.src = videoSrc;
                videoElement.load();
                modal.style.display = 'flex';
                document.body.classList.add('no-scroll'); // Prevent scrolling

                // Check if the project is the Name Generator Application
                if (project.getAttribute('data-tags').includes('python') && project.querySelector('h2').innerText === 'Name Generator Application') {
                    additionalInfo.innerHTML = 'To see more information you can view this project in my GitHub repository <a href="https://github.com/Jade010/Python/tree/main/NameGenerator" target="_blank">Link here</a>';
                } else {
                    additionalInfo.innerHTML = '';
                }
            } else {
                window.location.href = project.getAttribute('href');
            }
        });
    });

    closeVideoButton.addEventListener('click', function() {
        modal.style.display = 'none';
        videoElement.pause(); // Pause the video when closing
        document.body.classList.remove('no-scroll'); // Re-enable scrolling
    });

    // Close modal when clicking outside the video content
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            videoElement.pause(); // Pause the video when closing
            document.body.classList.remove('no-scroll'); // Re-enable scrolling
        }
    });
});
