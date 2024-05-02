document.getElementById('pixel-character').addEventListener('click', function() {
    let anim = this.style.animation;
    if (anim.includes('jump')) {
        this.style.animation = 'pixelAnim 1s infinite'; // Reset to default bounce
    } else {
        this.style.animation = 'jump 0.5s'; // Trigger jump animation
    }
});

@keyframes jump {
    0% { transform: translateY(0); }
    50% { transform: translateY(-50px); }
    100% { transform: translateY(0); }
}
