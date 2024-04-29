const text = "Welcome to my portfolio!";
const typingDiv = document.getElementById('typing');
let i = 0;

function type() {
	if (i < text.length) {
		typingDiv.innerHTML += text.charAt(i);
		i++;
		setTimeout(type, 150); // Typing speed in milliseconds
	}
}

document.addEventListener('DOMContentLoaded', type); // Start typing animation once the DOM is fully loaded