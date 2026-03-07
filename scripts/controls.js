const audioControls = new Audio("../assets/audio/17 - The Burned Tower.mp3");
audioControls.volume=0.4;

function playMusic(){
    audioControls.play();
}

function toGame(){
    window.location.href = "game.html";
}

document.addEventListener('DOMContentLoaded', function() {
    playMusic();
});

// document.addEventListener('mousemove', handleMouseMove);

setTimeout(function() {
    toGame();
}, 198000);