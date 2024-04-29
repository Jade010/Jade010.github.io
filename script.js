const text = "Welcome to my portfolio!";
const typingDiv = document.getElementById('typing');
let i = 0;

function type() {
    if (i < text.length) {
        typingDiv.innerHTML += text.charAt(i);
        i++;
        setTimeout(type, 150);
    }
}

function executeCode() {
    const code = document.getElementById('code').value;
    try {
        const output = eval(code); // For Python-like behavior, replace with API call to a Python execution service
        document.getElementById('output').textContent = output;
    } catch (error) {
        document.getElementById('output').textContent = 'Error: ' + error.message;
    }
}

document.addEventListener('DOMContentLoaded', type);
