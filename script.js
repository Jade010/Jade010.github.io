document.addEventListener('DOMContentLoaded', function() {
    // Page navigation
    if (!window.location.hash) {
        window.location.hash = '#home';
    } else {
        window.location.hash = '';
        window.location.hash = '#home';
    }
    
    // Leaflet map setup (same as your code)
    var map = L.map('map', {
        center: [47.5, -120.5],
        zoom: 7,
        maxBounds: [
            [45.0, -125.0],
            [50.0, -115.0]
        ],
        maxBoundsViscosity: 1.0
    });
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
    }).addTo(map);

    var pierceContent = '<div style="display: flex; align-items: center;"><img src="Images/piercecollegelogo.png" alt="Pierce College Logo" style="width:50px;height:50px;margin-right:10px;"><div><b>Pierce College Fort Steilacoom, Lakewood, WA</b><br>Associate of Arts (AA) in Pre-Nursing<br>June 2020</div></div>';
    var wsuContent = '<div style="display: flex; align-items: center;"><img src="Images/Washington_State_Cougars_logo.png" alt="Washington State University Logo" style="width:50px;height:50px;margin-right:10px;"><div><b>Washington State University, Pullman, WA</b><br>Bachelor of Science (BS) in Data Analytics, Minor in Business<br>May 2024</div></div>';

    var piercePopup = L.popup({ closeButton: false, autoClose: false, closeOnClick: false })
        .setLatLng([47.1717, -122.5185])
        .setContent(pierceContent);
    
    var wsuPopup = L.popup({ closeButton: false, autoClose: false, closeOnClick: false })
        .setLatLng([46.7298, -117.1817])
        .setContent(wsuContent);
    
    map.addLayer(piercePopup);
    map.addLayer(wsuPopup);

    // Filter project cards
    filterSelection("all");

    // Add event listeners to filter buttons
    const filterButtons = document.querySelectorAll('.filter-button');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove 'active' class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add 'active' class to the clicked button
            this.classList.add('active');
            // Filter the project cards
            filterSelection(this.innerText.toLowerCase());
        });
    });

    const projects = document.querySelectorAll('.project-card');
    projects.forEach(project => {
        project.addEventListener('click', function(event) {
            event.preventDefault();
            const videoSrc = project.getAttribute('data-video');
            const repoLink = project.getAttribute('data-repo');
            const projectInfo = project.getAttribute('data-info');
            const modalBody = document.getElementById('modal-body');

            modalBody.innerHTML = ''; // Clear previous content
            if (videoSrc) {
                const videoElement = document.createElement('video');
                videoElement.controls = true;
                videoElement.src = videoSrc;
                videoElement.style.width = '100%';
                modalBody.appendChild(videoElement);
            }
            const infoElement = document.createElement('div');
            infoElement.innerHTML = projectInfo;
            modalBody.appendChild(infoElement);
            
            modal.style.display = 'flex';
            document.body.classList.add('no-scroll');
        });
    });

    // Make sure these variables are correctly selected
    const modal = document.getElementById('project-modal');
    const closeVideoButton = document.querySelector('.close-button');
    
    // Modal close button event
    closeVideoButton.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.classList.remove('no-scroll');
    });

    // Close modal when clicking outside of it
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.classList.remove('no-scroll');
        }
    });

    // Contact form handling
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
        document.body.classList.remove('no-scroll');  // Re-enable scrolling
    });

    // Reset form on reload
    document.getElementById('contact-form').reset();
});

function filterSelection(c) {
    var x, i;
    x = document.getElementsByClassName("project-card");
    if (c == "all") c = "";
    for (i = 0; i < x.length; i++) {
        w3RemoveClass(x[i], "show");
        if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
    }
}

function w3AddClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
        if (arr1.indexOf(arr2[i]) == -1) {element.className += " " + arr2[i];}
    }
}

function w3RemoveClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
        while (arr1.indexOf(arr2[i]) > -1) {
            arr1.splice(arr1.indexOf(arr2[i]), 1);     
        }
    }
    element.className = arr1.join(" ");
}
