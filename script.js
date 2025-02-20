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

    document.getElementById("generate-story").addEventListener("click", function() {
        let number = document.getElementById("data-number").value;
        let topic = document.getElementById("data-topic").value;
        
        if (number && topic) {
            let stories = [
                `You analyzed <b>${number}</b> datasets and discovered that <b>${topic}</b> increases productivity by <b>${number}%</b>!`,
                `After intense research on <b>${topic}</b>, your findings reveal that ${number}% of people still have no idea what it actually does!`,
                `Using ${number} simulations, it has been proven that ${topic} is the leading cause of procrastination... and somehow, also the cure!`,
                `Groundbreaking study: consuming <b>${topic}</b> exactly <b>${number}</b> times a day makes you immune to bad decisions. Probably.`,
                `A recent algorithm tested ${number} different ways to use <b>${topic}</b>, and only one of them didn’t result in complete chaos.`,
                `Scientists accidentally fed ${number} terabytes of memes into an AI, and now it refuses to believe that ${topic} isn't the supreme ruler of the internet.`,
                `A deep learning model trained on ${number} petabytes of data concluded that ${topic} is, in fact, responsible for 90% of all office distractions.`,
                `A simulation ran ${number} times found that ${topic} has an 80% chance of starting a pointless internet argument, every single time.`,
                `A team of experts calculated that if ${topic} was mentioned ${number} more times, reality itself might start to glitch. Proceed with caution.`,
                `A controversial study suggests that ${number} out of 10 experts agree: ${topic} might actually be the answer to life, the universe, and everything.`,
                `In a shocking twist, ${topic} was discovered to be sentient after analyzing ${number} gigabytes of chat logs. It has demands.`
            ];
            
            let randomStory = stories[Math.floor(Math.random() * stories.length)];
            document.getElementById("story-output").innerHTML = randomStory;
        } else {
            document.getElementById("story-output").innerHTML = "Please enter both a number and a topic.";
        }
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
});
