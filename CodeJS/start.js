const audioStart = new Audio("../Audio/26 - Lugia's Song.mp3");
audioStart.volume=0.4;

const audioClick = new Audio("../Audio/mixkit-explainer-video-game-alert-sweep-236.wav");
audioClick.volume=0.3;

const canvas=document.querySelector("canvas");
const c=canvas.getContext('2d');

const playerDownImage=new Image();
playerDownImage.src='../Images/playerDown80.png';

const player = new Sprite({
    position: {
        x: canvas.width/2-(154/4)/2, //Taille de la fenêtre/2 - (taille image joueur/4(car 4 frames))/2 pour être bien centré  
        y: canvas.height/2-55/2 //Taille de la fenêtre/2 - taille image joueur/2
    },
    image: playerDownImage,
    frames: {
        max: 4
    },
    sprites: {
        down:playerDownImage
    }
})

function toControls() {
    audioClick.play();
    setTimeout(function() {window.location.replace("controls.html");
    }, 1500);
}

function launchStartPage(){
    window.requestAnimationFrame(launchStartPage);
    audioStart.play();
    c.clearRect(0, 0, canvas.width, canvas.height);
    player.draw();
    player.moving=true;
    player.image=player.sprites.down;
    //console.log(player);
}

document.addEventListener('DOMContentLoaded', function() {
    launchStartPage();
});

// document.addEventListener('mousemove', handleMouseMove);