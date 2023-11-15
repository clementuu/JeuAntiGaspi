const audioControls = new Audio("../Audio/29 - Ending Theme.mp3");
audioControls.volume=0.2;

function playMusic(){
    audioControls.play();
}

function toStart(){
    window.location.href = "start.html";
}

fadeScreen(".fade-in");

document.addEventListener('DOMContentLoaded', function() {
    playMusic();
});

// document.addEventListener('mousemove', handleMouseMove);