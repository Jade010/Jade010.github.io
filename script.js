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

    document.getElementById("generate-idea").addEventListener("click", function() {
        let ideas = [
            "Sentient To-Do List – A to-do list that actively shames you when tasks go overdue but praises you excessively when you complete them.",
            "Reverse Search Engine – Given an answer, it tries to find the most bizarre question someone could have asked to get that result.",
            "Random Useless Laws Finder – A bot that scrapes legal databases to find and display the most absurd, outdated laws in history.",
            "Virtual Escape Room AI – A procedurally generated escape room game where an AI dungeon master adapts to the player's choices.",
            "AI-Powered Excuse Generator – Generates oddly specific yet believable excuses for avoiding plans.",
            "Automated Fortune Teller – Uses real-time web data to generate oddly specific daily horoscopes.",
            "Cooking Roulette – Suggests a random meal based only on the three weirdest ingredients in your fridge.",
            "AI Debate Coach – Picks apart your arguments and aggressively disagrees with you until you improve.",
            "Anti-Spoiler Browser Extension – Detects and censors potential spoilers across all web pages.",
            "Accidental Shakespeare Generator – A bot that rearranges modern tweets into Shakespearean prose.",
            "Infinite Choose-Your-Own-Adventure – A constantly evolving text-based adventure using AI responses.",
            "Financial Regret Calculator – Analyzes your past expenses and tells you how much money you could have now if you had invested it instead.",
            "Legal Document Simplifier – Converts legal jargon into easy-to-understand summaries.",
            "Custom Flashcard Generator from Articles – Extracts key concepts from any article or textbook to create flashcards.",
            "Mental Health Check-In Journal – Uses sentiment analysis to track emotional health over time.",
            "Caffeine Tolerance Tracker – Logs caffeine intake and predicts when you’ll crash."
        ];
        
        let randomIdea = ideas[Math.floor(Math.random() * ideas.length)];
        document.getElementById("idea-output").innerHTML = randomIdea;
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
