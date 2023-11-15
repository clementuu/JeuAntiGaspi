const audioControls = new Audio("../Audio/13 - Battle! Team Rocket Grunt.mp3");
audioControls.volume=0.4;

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