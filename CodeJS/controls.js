const audioControls = new Audio("../Audio/17 - The Burned Tower.mp3");
audioControls.volume=0.4;

function playMusic(){
    audioControls.play();
}

function toGame(){
    window.location.href = "index.html";
}

document.addEventListener('DOMContentLoaded', function() {
    playMusic();
});

// document.addEventListener('mousemove', handleMouseMove);

setTimeout(function() {
    toGame();
}, 198000);