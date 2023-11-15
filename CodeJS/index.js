function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

const canvas=document.querySelector("canvas");
const c=canvas.getContext('2d');

//Lecture des tableaux json
const collisionsMap=[]
for (let i=0; i<collisions.length; i+=22){
    collisionsMap.push(collisions.slice(i, i+22));
}

var interactionMap=[]
for (let i=0; i<interactionData.length; i+=22){
    interactionMap.push(interactionData.slice(i, i+22));
}

//Audio
const audioTheme = new Audio("../Audio/15 - National Park.mp3");
audioTheme.volume=0.2;

const audioJukebox = new Audio("../Audio/01 - The Pink Panther Theme.flac");
audioJukebox.volume=0.35;

const audioCollect = new Audio("../Audio/mixkit-martial-arts-punch-2052.wav");
audioCollect.volume=0.15;

const audioFootsteps = new Audio("../Audio/FootSteps.wav");
audioFootsteps.volume=0.35;

const audioGasOn = new Audio("../Audio/GasOn.wav");
audioGasOn.volume=0.6;

const audioGasOff = new Audio("../Audio/GasOff.wav");
audioGasOff.volume=0.6;

const audioRobinetOn = new Audio("../Audio/RobinetOn.wav");
audioRobinetOn.volume=0.45;

const audioRobinetOff = new Audio("../Audio/RobinetOff.wav");
audioRobinetOff.volume=0.45;

const audioSwitch = new Audio("../Audio/mixkit-light-switch-sound-2579.wav");
audioSwitch.volume=0.45;

const audioFire = new Audio("../Audio/campfireCrackles.wav");
audioFire.volume=0.3;

const bathSound = new Audio("../Audio/bathtub.wav");
bathSound.volume=0.3;

const vinylStart = new Audio("../Audio/VinylStart.wav");
vinylStart.volume=0.5;

const vinylStop = new Audio("../Audio/VinylStop.wav");
vinylStop.volume=0.5;

//Décalage de la fenêtre
const offset={
    x: -20,
    y: -100
}

//Blocs de collision
const boundaries=[];

collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j)=> {
        if (symbol===1062){
            boundaries.push(
                new Boundary({
                    position: {
                        x: j * Boundary.width - (offset.x+40),
                        y: i * Boundary.height - (offset.y+210)
                    }
                }
            ))
        }
    })
})

//Zones d'interactions
var interactions=[];

interactionMap.forEach((row, i) => {
    row.forEach((symbol, j)=> {
        //Porte de sortie
        if (symbol===357){
            interactions.push(
                new Interactive({
                    position: {
                        x: j * Interactive.width - (offset.x+40),
                        y: i * Interactive.height - (offset.y+235)
                    },
                    type: 1
                }
            ))
        }
        //Robinet
        else if (symbol===2357){
            interactions.push(
                new Interactive({
                    position: {
                        x: j * Interactive.width - (offset.x+40),
                        y: i * Interactive.height - (offset.y+235)
                    },
                    type: 4
                }
            ))
        }
        //Carton
        else if (symbol===23){
            interactions.push(
                new Interactive({
                    position: {
                        x: j * Interactive.width - (offset.x+50),
                        y: i * Interactive.height - (offset.y+245)
                    },
                    type: 2
                }
            ))
        }
        //Jukebox
        else if (symbol===57){
            interactions.push(
                new Interactive({
                    position: {
                        x: j * Interactive.width - (offset.x+40),
                        y: i * Interactive.height - (offset.y+235)
                    },
                    type: 3
                }
            ))
        }
        //Plaques
        else if (symbol===5){
            interactions.push(
                new Interactive({
                    position: {
                        x: j * Interactive.width - (offset.x+40),
                        y: i * Interactive.height - (offset.y+235)
                    },
                    type: 5
                }
            ))
        }
        //Poubelles
        else if (symbol===6){
            interactions.push(
                new Interactive({
                    position: {
                        x: j * Interactive.width - (offset.x+40),
                        y: i * Interactive.height - (offset.y+235)
                    },
                    type: 6
                }
            ))
        }
        //Frigo
        else if (symbol===7){
            interactions.push(
                new Interactive({
                    position: {
                        x: j * Interactive.width - (offset.x+40),
                        y: i * Interactive.height - (offset.y+235)
                    },
                    type: 7
                }
            ))
        }
        //Marmite
        else if (symbol===8){
            interactions.push(
                new Interactive({
                    position: {
                        x: j * Interactive.width - (offset.x+40),
                        y: i * Interactive.height - (offset.y+235)
                    },
                    type: 8
                }
            ))
        }
        //Papier
        else if (symbol===9){
            interactions.push(
                new Interactive({
                    position: {
                        x: j * Interactive.width - (offset.x+30),
                        y: i * Interactive.height - (offset.y+190)
                    },
                    type: 9
                }
            ))
        }
        //Assiette
        else if (symbol===10){
            interactions.push(
                new Interactive({
                    position: {
                        x: j * Interactive.width - (offset.x+25),
                        y: i * Interactive.height - (offset.y+220)
                    },
                    type: 10
                }
            ))
        }
        //LampeBas
        else if (symbol===11){
            interactions.push(
                new Interactive({
                    position: {
                        x: j * Interactive.width - (offset.x+50),
                        y: i * Interactive.height - (offset.y+200)
                    },
                    type: 11
                }
            ))
        }
        //Lampe 2
        else if (symbol===12){
            interactions.push(
                new Interactive({
                    position: {
                        x: j * Interactive.width - (offset.x+40),
                        y: i * Interactive.height - (offset.y+220)
                    },
                    type: 12
                }
            ))
        }
        //Lavabo
        else if (symbol===13){
            interactions.push(
                new Interactive({
                    position: {
                        x: j * Interactive.width - (offset.x+40),
                        y: i * Interactive.height - (offset.y+235)
                    },
                    type: 13
                }
            ))
        }
        //Papier2
        else if (symbol===14){
            interactions.push(
                new Interactive({
                    position: {
                        x: j * Interactive.width - (offset.x+40),
                        y: i * Interactive.height - (offset.y+200)
                    },
                    type: 14
                }
            ))
        }
        //Lampe Cuisine
        else if (symbol===15){
            interactions.push(
                new Interactive({
                    position: {
                        x: j * Interactive.width - (offset.x+40),
                        y: i * Interactive.height - (offset.y+210)
                    },
                    type: 15
                }
            ))
        }
        //Chemine
        else if (symbol===16){
            interactions.push(
                new Interactive({
                    position: {
                        x: j * Interactive.width - (offset.x+40),
                        y: i * Interactive.height - (offset.y+235)
                    },
                    type: 16
                }
            ))
        }
        //Baignoire
        else if (symbol===17){
            interactions.push(
                new Interactive({
                    position: {
                        x: j * Interactive.width - (offset.x+25),
                        y: i * Interactive.height - (offset.y+225)
                    },
                    type: 17
                }
            ))
        }
        //Bouteille
        else if (symbol===19){
            interactions.push(
                new Interactive({
                    position: {
                        x: j * Interactive.width - (offset.x+36),
                        y: i * Interactive.height - (offset.y+255)
                    },
                    type: 19
                }
            ))
        }
        // //Tele
        // else if (symbol===18){
        //     interactions.push(
        //         new Interactive({
        //             position: {
        //                 x: j * Interactive.width - (offset.x+40),
        //                 y: i * Interactive.height - (offset.y+235)
        //             },
        //             type: 18
        //         }
        //     ))
        // }
    })
})

//Images
const image=new Image();
image.src='../Images/HouseMap.png';

const playerDownImage=new Image();
playerDownImage.src='../Images/playerDown80.png';

const playerUpImage=new Image();
playerUpImage.src='../Images/playerUp80.png';

const playerLeftImage=new Image();
playerLeftImage.src='../Images/playerLeft80.png';

const playerRightImage=new Image();
playerRightImage.src='../Images/playerRight80.png';

const premierPlan=new Image();
premierPlan.src='../Images/PremierPlan.png';

const frigoOffimg=new Image();
frigoOffimg.src='../Images/FrigoOff.png';

const frigoOnimg=new Image();
frigoOnimg.src='../Images/FrigoOn.png';

const baignoireOnimg=new Image();
baignoireOnimg.src="../Images/BaignoireOn.png";

const baignoireOffimg=new Image();
baignoireOffimg.src="../Images/BaignoireOff.png";

const chemineOnimg=new Image();
chemineOnimg.src="../Images/ChemineOn.png";

const chemineOffimg=new Image();
chemineOffimg.src="../Images/ChemineOff.png";

const lampeCuisineOffimg=new Image();
lampeCuisineOffimg.src='../Images/LampeCuisineOff.png';

const lampeCuisineOnimg=new Image();
lampeCuisineOnimg.src='../Images/LampeCuisineOn.png';

const lampeTableOffimg=new Image();
lampeTableOffimg.src='../Images/LampeTableOff.png';

const lampeTableOnimg=new Image();
lampeTableOnimg.src='../Images/LampeTableOn.png';

const lampeSalonOffimg=new Image();
lampeSalonOffimg.src='../Images/LampeSalonOff.png';

const lampeSalonOnimg=new Image();
lampeSalonOnimg.src='../Images/LampeSalonOn.png';

const lavaboOffimg=new Image();
lavaboOffimg.src='../Images/lavaboOff.png';

const lavaboOnimg=new Image();
lavaboOnimg.src='../Images/lavaboOn.png';

const plaquesOffimg=new Image();
plaquesOffimg.src='../Images/plaquesOff.png';

const plaquesOnimg=new Image();
plaquesOnimg.src='../Images/plaquesOn.png';

const evierOffimg=new Image();
evierOffimg.src='../Images/evierOff.png';

const evierOnimg=new Image();
evierOnimg.src='../Images/evierOn.png';

const marmiteImg=new Image();
marmiteImg.src='../Images/Items/Marmite.png';

const cartonImg=new Image();
cartonImg.src='../Images/Items/Carton.png';

const papierImg=new Image();
papierImg.src='../Images/Items/Papier.png';

const assietteImg=new Image();
assietteImg.src='../Images/Items/Assiette.png';

const papierImg2=new Image();
papierImg2.src='../Images/Items/Papier2.png';

const bouteilleImg=new Image();
bouteilleImg.src='../Images/Items/Bouteille.png';

//Objet Joueur
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
        up: playerUpImage,
        right:playerRightImage,
        down:playerDownImage,
        left:playerLeftImage
    }
})

//Inventaire
const playerInventory = new Inventory();

//Objet Arrière plan
const background = new Sprite({
    position:{
        x: offset.x,
        y: offset.y
    },
    image: image
})

//Objet Premier plan
const foreground = new Sprite({
    position:{
        x: offset.x,
        y: offset.y
    },
    image: premierPlan
})

const frigo=[
    frigoOffimg,
    frigoOnimg
]

const chemine=[
    chemineOnimg,
    chemineOffimg
]

const baignoire=[
    baignoireOffimg,
    baignoireOnimg
]

const lampeC=[
    lampeCuisineOnimg,
    lampeCuisineOffimg
]

const lampeT=[
    lampeTableOnimg,
    lampeTableOffimg
]

const lampeS=[
    lampeSalonOnimg,
    lampeSalonOffimg
]

const lavaboA=[
    lavaboOnimg,
    lavaboOffimg
]

const evierA=[
    evierOnimg,
    evierOffimg
]

const plaquesA=[
    plaquesOnimg,
    plaquesOffimg
]

//Calques objets dynamiques
const calqueFrigo = new Calques({
    position:{
        x: offset.x,
        y: offset.y
    },
    images: frigo
})

const calqueChemine = new Calques({
    position:{
        x: offset.x,
        y: offset.y
    },
    images: chemine
})

const calqueBaignoire = new Calques({
    position:{
        x: offset.x,
        y: offset.y
    },
    images: baignoire
})

const calqueLampeCuisine = new Calques({
    position:{
        x: offset.x,
        y: offset.y
    },
    images: lampeC
})

const calqueLampeTable = new Calques({
    position:{
        x: offset.x,
        y: offset.y
    },
    images: lampeT
})

const calqueLampeSalon = new Calques({
    position:{
        x: offset.x,
        y: offset.y
    },
    images: lampeS
})

const calqueLavabo = new Calques({
    position:{
        x: offset.x,
        y: offset.y
    },
    images: lavaboA
})

const calquePlaques = new Calques({
    position:{
        x: offset.x,
        y: offset.y
    },
    images: plaquesA
})

const calqueEvier = new Calques({
    position:{
        x: offset.x,
        y: offset.y
    },
    images: evierA
})

const calques=[
    calqueFrigo,
    calqueLampeCuisine,
    calqueLampeTable,
    calqueLampeSalon,
    calqueEvier,
    calqueLavabo,
    calquePlaques,
    calqueBaignoire,
    calqueChemine
]

//Les touches qu'on utilise
const keys = {
    z: {
        pressed: false
    }, //haut
    d: {
        pressed: false
    }, //droite
    s: {
        pressed: false
    }, //bas
    q: {
        pressed: false
    }, //gauche
    m: {
        pressed: false
    }, //interagir
    l: {
        pressed: false
    } //retour
}

const marmite = new Collectible({position: {x: 90, y: -26}, image: marmiteImg, name: "Marmite "});
const carton = new Collectible({position: {x: 5, y: 240}, image: cartonImg, name: "Carton "});
const papier = new Collectible({position: {x: 180,y: 270}, image: papierImg, name: "Papier "});
const assiette = new Collectible({position: {x: 345, y: 190}, image: assietteImg, name: "Assiette "});
const papier2 = new Collectible({position: {x: 425, y: 190}, image: papierImg2, name: "Lettre "});
const bouteille = new Collectible({position: {x: 85, y: 296}, image:bouteilleImg, name: "Bouteille "});

//Création des objets ramassables
var collectibles= [
    marmite,
    carton,
    papier,
    assiette,
    papier2,
    bouteille
];

var btnYes = document.getElementById("btn-yes");
var btnNo = document.getElementById("btn-no");
 
const movables=[background, ...boundaries, foreground, ...interactions, ...collectibles, ...calques];

//Renvoie true si détecte une collision (ajusté pour une meilleure perspective)
function rectangleCollision({rectangle1, rectangle2}) {
    return(
        rectangle1.position.x+rectangle1.width>=rectangle2.position.x &&  //gauche du rectangle1 droite du 2
        rectangle1.position.x<=rectangle2.position.x+rectangle2.width &&  //droite du 1 gauche du 2
        rectangle1.position.y<=rectangle2.position.y+(rectangle2.height/1.9) &&  //haut du 1
        rectangle1.position.y+(rectangle1.height/1.2)>=rectangle2.position.y  //bas du 1
    )
}

//Renvoie true si détecte une collision non ajusté
function rectangleInteraction({rectangle1, rectangle2}) {
    return(
        rectangle1.position.x+rectangle1.width>=rectangle2.position.x &&  //gauche du rectangle1 droite du 2
        rectangle1.position.x<=rectangle2.position.x+rectangle2.width &&  //droite du 1 gauche du 2
        rectangle1.position.y<=rectangle2.position.y+rectangle2.height &&  //haut du 1
        rectangle1.position.y+rectangle1.height>=rectangle2.position.y  //bas du 1
    )
}

let textWindowTimeout = null;
let haveChoice = false;

//Fonctions pour afficher, cacher et actualiser la boite de texte, le point d'interrogation et la fenêtre d'interraction avec les poubelles.
function showTextWindow(duration=8000) {
    var textWindow = document.getElementById("text-window");
    var choiceCommandWindow = document.getElementById("commandListContainer");
    textWindow.style.display = "block";
    if(haveChoice){
        choiceCommandWindow.style.display="block";
    }

    if(textWindowTimeout){
        clearTimeout(textWindowTimeout);
    }

    textWindowTimeout = setTimeout(function() {
        hide('text-window');
        hide('commandListContainer');
    }, duration);
}

function showQMark(){
    if(!binShown){
        var qMark = document.getElementById("qmark");
        qMark.style.display = "block";

        qMarkTimeout = setTimeout(function() {
            hide('qmark');
        }, 500);
    }
}

function hide(element){
    var elementToHide = document.getElementById(element);

    switch (element) {
        case 'text-window':
            elementToHide.style.display = "none";
            break;
        case 'commandListContainer':
            elementToHide.style.display = "none";
            break;
        case 'qmark':
            elementToHide.style.display = "none";
            break;
        }
}

function setTextContent(text) {
    var textContent = document.getElementById("text-window");
    textContent.innerText = text;
    textContent.style.display='none';
  }

function showBin() {
    var binWindow = document.getElementById("bin");
    var binContainer = document.getElementById("binContainer");
    binWindow.style.display = "block";
    binContainer.style.display = "flex";

    // binWindowTimeout = setTimeout(function() {
    //     hideBin();
    // }, 120000);
  }

function hideBin() {
    var binWindow = document.getElementById("bin");
    var binContainer = document.getElementById("binContainer");
    binWindow.style.display = "none";
    binContainer.style.display = "none";
    binShown=false;
    playerInventory.inBin=false;
    allowPlayerMovement=true;
}

// function displayCommands(commands) {
//     commandListContainer.innerHTML = ''; // Clear previous commands

//     commandListContainer.style.display = 'block';

//     var ul = document.createElement('ul');

//     for (var i = 0; i < commands.length; i++) {
//       var li = document.createElement('li');
//       li.textContent = commands[i];
//       ul.appendChild(li);
//     }

//     commandListContainer.appendChild(ul);
// }

function deleteInteractionByType(type) {
    for (var i = 0; i < interactions.length; i++) {
        if (interactions[i].type === type) {
            interactions.splice(i, 1); // Supprime l'interaction
            break;
        }
    }
}

// function setupEventListeners() {
//     handleClick = (event) => {
//         if (event.target.id === "btn-yes") {
//             return true;  // Clicked the "Yes" button
//         } 
//         else if (event.target.id === "btn-no") {
//             hideTextWindow();
//             hideChoice();
//             return false; // Clicked any other button
//         }
//     };
//     btnYes.addEventListener("click", handleClick);
//     btnNo.addEventListener("click", handleClick);
// } 

function updateAudio() {
    if (player.moving) {
      audioFootsteps.play();
    } else {
      audioFootsteps.pause();
    }
}

function handleBinClick(divId,playerInventory) {
    switch (divId) {
        case 'bin1':
            if(playerInventory.selected=="Assiette "){
                playerInventory.removeCollectible("Assiette ");
                assietteDone=true;
                setTextContent("\nLes restes alimentaires c'est dans la poubelle orange !");
            }
            else if(playerInventory.selected=="Marmite "||playerInventory.selected=="Lettre "){
                setTextContent("\nJe ferais mieux de ne pas jeter ça...");
            }
            else{
                setTextContent("\nNon, pas là...");
            }
            break;
        case 'bin2':
            if(playerInventory.selected=="Marmite "||playerInventory.selected=="Lettre "){
                setTextContent("\nJe ferais mieux de ne pas jeter ça...");
            }
            else{
                setTextContent("\nNon, pas là...");
            }
            break;
        case 'bin3':
            if(playerInventory.selected=="Carton "){
                playerInventory.removeCollectible("Carton ");
                cartonDone=true;
                setTextContent("\nBien, le carton c'est dans la jaune !");
            }
            else if(playerInventory.selected=="Papier "){
                playerInventory.removeCollectible("Papier ");
                papierDone=true;
                setTextContent("\nBien, le papier c'est dans la jaune !");
            }
            else if(playerInventory.selected=="Bouteille "){
                playerInventory.removeCollectible("Bouteille ");
                bouteilleDone=true;
                setTextContent("\nBien, le plastique c'est dans la jaune !");
            }
            else if(playerInventory.selected=="Marmite "||playerInventory.selected=="Lettre "){
                setTextContent("\nJe ferais mieux de ne pas jeter ça...");
            }
            else{
                setTextContent("\nNon, pas là...");
            }
            break;
    }
    showTextWindow();
}

async function fadeScreen(element) {
    var fadeElement = document.querySelector(element);
    if(element===".fade-out"){
        fadeElement.style.opacity = '1';
    }
    else if(element===".fade-in"){
        fadeElement.style.display = 'block';
        fadeElement.style.opacity = '0';
    }
    else if(element===".quick-fade"){
        fadeElement.style.display = 'block';
        fadeElement.style.opacity = '1';
        await sleep(1000);
        fadeElement.style.opacity = '0';
    }
}

function resetFade(element) {
    var fadeElement = document.querySelector(element);
    if(element===".fade-out"){
        fadeElement.style.opacity = '0';
    }
    else if(element===".fade-in"){
        fadeElement.style.display = 'none';
        fadeElement.style.opacity = '1';
    }
}

function timer(minutes, seconds) {
    var totalSeconds = minutes * 60 + seconds;
  
    var timer = setInterval(function() {
        totalSeconds--;
        
        var displayMinutes = Math.floor(totalSeconds / 60);
        var displaySeconds = totalSeconds % 60;
    
        var formattedTime = ('0' + displayMinutes).slice(-2) + ':' + ('0' + displaySeconds).slice(-2);
    
        document.getElementById('timeDisplay').textContent = formattedTime;
  
        if (totalSeconds <= 0) {
            clearInterval(timer);
            window.location.href = 'gameover.html';
            return true; // Renvoie true une fois le compte à rebours terminé
        }
    }, 1000);
}

// document.addEventListener('DOMContentLoaded', () => {
//     const background = document.getElementById('background');
//     const initialOffsetX = 0; // Adjust this value if needed
//     const initialOffsetY = 0; // Adjust this value if needed
  
//     // Set initial background position
//     background.style.backgroundPosition = `${initialOffsetX}px ${initialOffsetY}px`;
  
//     // Register mousemove event listener
//     document.addEventListener('mousemove', handleMouseMove);
  
//     function handleMouseMove(event) {
//       const mouseX = event.clientX;
//       const mouseY = event.clientY;
  
//       const offsetX = initialOffsetX + mouseX / window.innerWidth*2;
//       const offsetY = initialOffsetY + mouseY / window.innerHeight*2;
  
//       background.style.backgroundPosition = `${offsetX*5}px ${offsetY*5}px`;
//     }
// });

// function handleMouseMove(event) {
//     const mouseX = event.clientX;
//     const mouseY = event.clientY;
  
//     const background = document.getElementById('background');
//     const offsetX = (mouseX - window.innerWidth / 2) / window.innerWidth * 10;
//     const offsetY = (mouseY - window.innerHeight / 2) / window.innerHeight * 10;

//     background.style.backgroundPosition = `${offsetX * 10}px ${offsetY * 10}px`;
// }

const confirmations = {
    deleteMarmite: false
};

let jukebox=false;
let chemineOn=true;
let toutPropre=false;
let marmiteInFridge=false;
let marmiteDone=false;
let assietteDone=false;
let papierDone=false;
let cartonDone=false;
let bouteilleDone=false;
let firstFrame=true;
let confirmingDeleteMarmite=false;
let binShown=false;
let allowPlayerMovement = true;
let lastInteractionTime = 0;
const interactionCooldown = 250;
const openedFridgeCooldown = 3000;

// Initialisation pour le calcul du fps
// let frameCount = 0;
// let fps = 0;
// let lastTime = performance.now();
// let startTime;

function startGame() {
    var timeoutReached = timer(20, 0); // Set timeout min,sec
    if (timeoutReached) {
        fadeScreen('.fade-out');
        window.location.href = "gameover.html";
    }
    // Appel animate pour lancer l'animation
    animate();
}

//Gameloop
//Affichage du jeu, déplacement, actions etc
async function animate(){
    window.requestAnimationFrame(animate);

    
    // // Calcul du FPS

    // frameCount++;
    // const currentT = performance.now();
    // const elapsed = currentT - lastTime;
  
    // if (elapsed >= 1000) {
    //     fps = Math.round((frameCount * 1000) / elapsed);
    //     frameCount = 0;
    //     lastTime = currentT;
    // }

    fadeScreen('.fade-in');
    const currentTime = Date.now();
    background.draw();
    collectibles.forEach((collectible) => {
        collectible.draw();
    })
    calqueFrigo.draw();
    calqueChemine.draw();
    player.draw();
    calqueLampeCuisine.draw();
    calqueLampeTable.draw();
    calqueLampeSalon.draw();
    calqueLavabo.draw();
    calquePlaques.draw();
    calqueEvier.draw();
    calqueBaignoire.draw();
    foreground.draw();
    boundaries.forEach((boundary) => {
        boundary.draw();
    })
    interactions.forEach((interaction) => {
        interaction.draw();
    })
    if(!jukebox){
        audioTheme.play();
    }
    if(chemineOn){
        audioFire.play();
    }
    audioJukebox.addEventListener('ended', () => {
        jukebox=false;
    });
      
    if(firstFrame){
        setTextContent("Je devrais me dépêcher de finir les tâches que mamie m'a\ndonnées avant de sortir jouer avec mes copains...\nC'était quoi déjà ?? Ah oui ! Tout est noté sur un papier !");
        showTextWindow(25000);
        firstFrame=false;
    }
    
    // Pour imposer un fps précis: 
    // setInterval(updateCountdown, 1000 / 60);    
    // await sleep(16.67); //Temps entre chaque image en ms (60fps)
    let moving=true;
    player.moving=false;

    if (keys.z.pressed && lastKey==='z'){
        if(allowPlayerMovement){
            player.moving=true;
            player.image=player.sprites.up;
            for(let i=0;i<boundaries.length;i++){
                const boundary = boundaries[i]
                if(
                    rectangleCollision({
                        rectangle1: player,
                        rectangle2: {
                            ...boundary, position:{
                                x:boundary.position.x,
                                y:boundary.position.y+2.7
                            }
                        }
                    })
                ){
                    moving=false;
                    break;
                }
            }
            if(moving){
                movables.forEach((movable)=>{
                    movable.position.y += 2.7;
                })
            }
        }
    }
    else if (keys.d.pressed && lastKey==='d'){
        if(allowPlayerMovement){
            player.moving=true;
            player.image=player.sprites.right;
            for(let i=0;i<boundaries.length;i++){
                const boundary = boundaries[i]
                if(
                    rectangleCollision({
                        rectangle1: player,
                        rectangle2: {
                            ...boundary, position:{
                                x:boundary.position.x-2.7,
                                y:boundary.position.y
                            }
                        }
                    })
                ){
                    moving=false;
                    break;
                }
            }
            if(moving){
                movables.forEach((movable)=>{
                    movable.position.x -= 2.7;
                })
            }
        }
    }
    else if (keys.s.pressed && lastKey==='s'){
        if(allowPlayerMovement){
            player.moving=true;
            player.image=player.sprites.down;
            for(let i=0;i<boundaries.length;i++){
                const boundary = boundaries[i]
                if(
                    rectangleCollision({
                        rectangle1: player,
                        rectangle2: {
                            ...boundary, position:{
                                x:boundary.position.x,
                                y:boundary.position.y-2.7
                            }
                        }
                    })
                ){
                    moving=false;
                    break;
                }
            }
            if(moving){
                movables.forEach((movable)=>{
                    movable.position.y -= 2.7;
                })
        }
        }
    }
    else if (keys.q.pressed && lastKey==='q'){
        if(allowPlayerMovement){
            player.moving=true;
            player.image=player.sprites.left;
            for(let i=0;i<boundaries.length;i++){
                const boundary = boundaries[i]
                if(
                    rectangleCollision({
                        rectangle1: player,
                        rectangle2: {
                            ...boundary, position:{
                                x:boundary.position.x+2.7,
                                y:boundary.position.y
                            }
                        }
                    })
                ){
                    moving=false;
                    break;
                }
            }
            if(moving){
                movables.forEach((movable)=>{
                    movable.position.x += 2.7;
                })
            }
        }
    }
    else if (keys.m.pressed && lastKey==='m'){
        player.moving=false;
        //mKeyPressedCount++;

        // if (mKeyPressedCount === 1) {
        for(let i=0;i<interactions.length;i++){
            const interaction = interactions[i]
            if(
                rectangleInteraction({
                    rectangle1: player,
                    rectangle2: {
                        ...interaction, position:{
                            x:interaction.position.x,
                            y:interaction.position.y
                        }
                    }
                })
            ){
                if(interaction.type===1){
                    if (currentTime - lastInteractionTime <= interactionCooldown) {
                        // Ignore les instructions si le joueur ne respect pas le délai défini entre chaque interactions
                        return;
                    }  
                    lastInteractionTime = currentTime;
                    // console.log(plaques,lampeCuisine,lampeSalon,lampeTable,lavabo,evier);
                    // console.log(calqueEvier.active,calqueLampeCuisine.active,calqueLampeSalon.active,calqueLampeTable.active,calquePlaques.active,calqueLavabo.active);
                    if(!calquePlaques.active&&!calqueLampeSalon.active&&!calqueLampeTable.active&&!calqueEvier.active&&!calqueLavabo.active&&!calqueLampeCuisine.active&&marmiteDone&&cartonDone&&papierDone&&assietteDone&&bouteilleDone){
                        setTextContent("\n\u00c7a y est je peux enfin sortir !");
                        showTextWindow();
                        fadeScreen(".fade-out");
                        await sleep(5000);
                        window.location.href = "end.html";
                    }
                    else if(!calquePlaques.active||!calqueLampeSalon.active||!calqueLampeTable.active||!calqueEvier.active||!calqueLavabo.active||!calqueLampeCuisine.active||marmiteDone||cartonDone||papierDone||assietteDone||bouteilleDone){
                        setTextContent("\n\u00c7a avance mais c'est pas encore ça !");
                    }
                    else{
                        setTextContent("\nHep hep hep, au boulot !");
                    }
                    showTextWindow();
                }
                else if(interaction.type===3){
                    if (currentTime - lastInteractionTime < interactionCooldown) {
                        return;
                    }  
                    lastInteractionTime = currentTime;

                    if(!jukebox){
                        setTextContent('\n \ud834\udd1e \u2669 \ud83c\udf9d \u266a \u266c \ud83c\udf9d \u2669 \ud83c\udf9d');
                        showTextWindow();
                        audioTheme.pause();
                        vinylStart.play();
                        audioJukebox.play();
                        jukebox=true;
                    }
                    else if(jukebox){
                        audioJukebox.pause();
                        vinylStop.play();
                        audioTheme.play();
                        jukebox=false;
                    }
                }
                else if(interaction.type===6){
                    if (currentTime - lastInteractionTime < interactionCooldown) {
                        return;
                    }  
                    lastInteractionTime = currentTime;
                    const binAccessible = playerInventory.collectibles.find(collectible => collectible.name === "Papier " || collectible.name === "Assiette " || collectible.name === "Carton " || collectible.name === "Bouteille ");
                    if(binAccessible){
                        hide('commandListContainer');
                        allowPlayerMovement=false;
                        setTextContent("\nTiens j'ai des trucs à jeter !");
                        showTextWindow();
                        await sleep(1000);
                        fadeScreen(".quick-fade");
                        binShown=true;
                        await sleep(1000);
                        showBin();
                        setTextContent("\nPar quoi je commence ?");
                        showTextWindow();
                        if(playerInventory.inBin===false){
                            playerInventory.binAccessed();
                        }
                    }
                    else{
                        hide('commandListContainer');
                        setTextContent("\nJe n'ai rien à jeter...");
                        showTextWindow();
                    }
                }
                else if(interaction.type===16){
                    if(chemineOn){
                        if (currentTime - lastInteractionTime <= 3000) {
                            return;
                        }  
                        lastInteractionTime = currentTime;
                        allowPlayerMovement=false;
                        setTextContent("\nJe ferais mieux d'éteindre le feu avant de sortir");
                        showTextWindow();
                        await sleep(2000);
                        fadeScreen(".quick-fade");
                        await sleep(1000);
                        calqueChemine.changeStatus();
                        setTextContent("\nC'est plus sûr comme ça");
                        showTextWindow();
                        chemineOn=false;
                        allowPlayerMovement=true;
                    }
                    else{
                        setTextContent("\nJe ne vais quand même pas rallumer la cheminée maintenant");
                        showTextWindow();
                    }
                }
                else if(interaction.type===17){
                    if(!toutPropre){
                        if (currentTime - lastInteractionTime <= interactionCooldown) {
                            return;
                        }  
                        lastInteractionTime = currentTime;
                        allowPlayerMovement=false;
                        setTextContent("\nUn petit bain ne me ferait pas de mal");
                        showTextWindow();
                        await sleep(2000);
                        bathSound.play();
                        fadeScreen(".fade-out");
                        await sleep(300);
                        calqueBaignoire.changeStatus();
                        resetFade(".fade-in");
                        await sleep(7700);
                        resetFade(".fade-out");
                        fadeScreen(".fade-in");
                        calqueBaignoire.changeStatus();
                        setTextContent("Et voilà, tout propre ! J'espère que j'aurai le temps de tout finir quand même !");
                        showTextWindow();
                        toutPropre=true;
                        allowPlayerMovement=true;
                    }
                    else{
                        setTextContent("\nJe suis déjà propre !");
                        showTextWindow();
                    }
                }
                else if(interaction.type===7){
                    if (currentTime - lastInteractionTime < interactionCooldown) {
                        return;
                    }
                    lastInteractionTime = currentTime;

                    const marmiteCollectible = playerInventory.collectibles.find(collectible => collectible.name === "Marmite ");
                    if(!marmiteCollectible&&!marmiteDone){
                        setTextContent("\nUne liste de course et quelques magnets sont disposés sur la porte...");
                        showTextWindow();
                    }
                    else if(marmiteDone){
                        setTextContent("\nUne liste de course et quelques magnets sont disposés sur la porte...");
                        showTextWindow();
                    }
                    else{
                        setTextContent("\nJe mets les restes dans le frigo pour demain !");
                        showTextWindow();
                        playerInventory.removeCollectible(marmiteCollectible.name);
                        calqueFrigo.changeStatus();
                        marmiteDone=true;
                        
                        fridgeTimeout = setTimeout(function() {
                            calqueFrigo.changeStatus();
                        }, openedFridgeCooldown);
                    
                        //haveChoice=true;
                        //if (!confirmations.deleteMarmite) {
                        //    confirmations.deleteMarmite = true;
                        //     setTextContent("\nJe vais mettre les restes dans le frigo pour demain !");
                        //     showTextWindow();
                        //     calqueFrigo.changeStatus();
                        // } 
                        // else if (confirmations.deleteMarmite) {
                        //     confirmationKey='m';
                        //    calqueFrigo.changeStatus();
                            
                        // }
                        // if(confirmationKey==='m'){
                        //     playerInventory.removeCollectible(marmiteCollectible.name);
                        //     marmiteDone=true;
                        //     marmiteInFridge=true;
                        //     confirmations.deleteMarmite = false;
                        //     confirmationKey='';
                        //     haveChoice=false;
                        // }
                    }
                }
                else if(interaction.type==2){
                    if (currentTime - lastInteractionTime <= interactionCooldown) {
                        return;
                    }  
                    lastInteractionTime = currentTime;
                    playerInventory.addCollectible(carton.name,cartonImg);
                    carton.removeFromGame();
                    deleteInteractionByType(2);
                    audioCollect.play();
                }
                else if(interaction.type===4){
                    if(calqueEvier.active){
                        if (currentTime - lastInteractionTime <= 1850) {
                            return;
                        }  
                        lastInteractionTime = currentTime;

                        audioRobinetOff.play();
                        await sleep(1850);
                        calqueEvier.changeStatus();
                    }
                    else{
                        if (currentTime - lastInteractionTime <= 350) {
                            return;
                        }  
                        lastInteractionTime = currentTime;

                        audioRobinetOn.play();
                        await sleep(350);
                        calqueEvier.changeStatus();         
                    }
                }
                else if(interaction.type===5){
                    if(calquePlaques.active){
                        if (currentTime - lastInteractionTime <= 2700) {
                            return;
                        }  
                        lastInteractionTime = currentTime;

                        audioGasOff.play();
                        await sleep(2700);
                        calquePlaques.changeStatus();
                    }
                    else{
                        if (currentTime - lastInteractionTime <= 1300) {
                            return;
                        }  
                        lastInteractionTime = currentTime;

                        audioGasOn.play();
                        await sleep(1300);
                        calquePlaques.changeStatus();          
                    }
                }
                else if(interaction.type===8){
                    if (currentTime - lastInteractionTime <= interactionCooldown) {
                        return;
                    }  
                    lastInteractionTime = currentTime;
                    playerInventory.addCollectible(marmite.name,marmiteImg);
                    marmite.removeFromGame();
                    deleteInteractionByType(8);
                    audioCollect.play();
                }
                else if(interaction.type===9){
                    if (currentTime - lastInteractionTime <= interactionCooldown) {
                        return;
                    }  
                    lastInteractionTime = currentTime;
                    playerInventory.addCollectible(papier.name,papierImg);
                    papier.removeFromGame();
                    deleteInteractionByType(9);
                    audioCollect.play();
                }
                else if(interaction.type===10){
                    if (currentTime - lastInteractionTime <= interactionCooldown) {
                        return;
                    }  
                    lastInteractionTime = currentTime;
                    playerInventory.addCollectible(assiette.name,assietteImg);
                    assiette.removeFromGame();
                    deleteInteractionByType(10); 
                    audioCollect.play();    
                }
                else if(interaction.type===19){
                    if (currentTime - lastInteractionTime <= interactionCooldown) {
                        return;
                    }  
                    lastInteractionTime = currentTime;
                    playerInventory.addCollectible(bouteille.name,bouteilleImg);
                    bouteille.removeFromGame();
                    deleteInteractionByType(19); 
                    audioCollect.play();    
                }
                else if(interaction.type===11){
                    if (currentTime - lastInteractionTime < interactionCooldown) {
                        return;
                    }  
                    lastInteractionTime = currentTime;
                    audioSwitch.play();
                    calqueLampeSalon.changeStatus();
                }
                else if(interaction.type===12){
                    if (currentTime - lastInteractionTime < interactionCooldown) {
                        return;
                    }  
                    lastInteractionTime = currentTime;
                    audioSwitch.play();
                    calqueLampeTable.changeStatus();
                }
                else if(interaction.type===15){
                    if (currentTime - lastInteractionTime < interactionCooldown) {
                        return;
                    }  
                    lastInteractionTime = currentTime;
                    audioSwitch.play();
                    calqueLampeCuisine.changeStatus();
                }
                else if(interaction.type===13){
                    if(calqueLavabo.active){
                        if (currentTime - lastInteractionTime <= 1850) {
                            return;
                        }  
                        lastInteractionTime = currentTime;

                        audioRobinetOff.play();
                        await sleep(1850);
                        calqueLavabo.changeStatus();
                    }
                    else{
                        if (currentTime - lastInteractionTime <= 350) {
                            return;
                        }  
                        lastInteractionTime = currentTime;

                        audioRobinetOn.play();
                        await sleep(350);
                        calqueLavabo.changeStatus();       
                    }
                }
                else if(interaction.type===14){
                    if (currentTime - lastInteractionTime <= interactionCooldown) {
                        return;
                    }  
                    lastInteractionTime = currentTime;
                    playerInventory.addCollectible(papier2.name,papierImg2);
                    papier2.removeFromGame();
                    deleteInteractionByType(14); 
                    audioCollect.play();    
                }
                // if(marmiteInFridge){
                //     marmiteInFridge=false;
                // }
            }        
        }
    }
    else if(keys.l.pressed && lastKey==='l'){
        hide('text-window');
        hide('commandListContainer');
        hideBin();
        haveChoice=false;
        //confirmationKey='';
        confirmations.deleteMarmite=false;
    }

    // if(calqueFrigo.active===false){
    //     if (currentTime - lastInteractionTime < openedFridgeCooldown) {
    //         return;
    //     }  
    //     lastInteractionTime = currentTime;
    //     calqueFrigo.changeStatus();
    //     if(!marmiteDone){
    //         confirmationKey='';
    //         confirmations.deleteMarmite=false;
    //     }
    // }
    
    for(let i=0;i<interactions.length;i++){
        const interaction = interactions[i]
        if(
            rectangleInteraction({
                rectangle1: player,
                rectangle2: {
                    ...interaction, position:{
                        x:interaction.position.x,
                        y:interaction.position.y
                    }
                }
            })
        ){
            showQMark();
        }
    }
    //console.log(fps);
    //updateCurrentTime();
    updateAudio();
}
  
//Lancement du jeu
startGame();

//Listener: detection du statut clavier
//J'ai remplacé zqsd par les flèches du clavier et ml par az c'était plus intuitif pour les enfants
let lastKey = '';
//let confirmationKey='';
window.addEventListener('keydown', (e) => {
    switch(e.key){
        case 'ArrowUp':
            keys.z.pressed = true;
            lastKey = 'z';
            break;
        case 'ArrowRight':
            keys.d.pressed = true;
            lastKey = 'd';
            break;
        case 'ArrowDown':
            keys.s.pressed = true;
            lastKey = 's';
            break;
        case 'ArrowLeft':
            keys.q.pressed = true;
            lastKey = 'q';
            break;
        case 'a':
            keys.m.pressed = true;
            lastKey = 'm';
            break;
        case 'z':
            keys.l.pressed = true;
            lastKey = 'l';
            break;
    } 
})

window.addEventListener('keyup', (e)=>{
    switch(e.key){
        case 'ArrowUp':
            keys.z.pressed = false;
            break;
        case 'ArrowRight':
            keys.d.pressed = false;
            break;
        case 'ArrowDown':
            keys.s.pressed = false;
            break;
        case 'ArrowLeft':
            keys.q.pressed = false;
            break;
        case 'a':
            keys.m.pressed = false;
            break;
        case 'z':
            keys.l.pressed = false;
            break;
    }
})

