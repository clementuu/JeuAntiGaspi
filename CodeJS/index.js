let audioMuted = true;

document.addEventListener("click", () => {
    audioMuted = false;
}, { once: true });

document.addEventListener("keydown", () => {
    audioMuted = false;
}, { once: true });

const canvas=document.querySelector("canvas");
const c=canvas.getContext('2d');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Phrase d'intro du jeu
const introduction = "Je devrais me dépêcher de finir les tâches que mamie m'a\ndonnées avant de sortir jouer avec mes copains...\nC'était quoi déjà ?? Ah oui ! Tout est noté sur un papier !";

//Décalage de la fenêtre
const offset = GAME_CONFIG.mapOffset;

// Define interaction mappings with types and offsets
const interactionMappings = {
    [GAME_CONFIG.interactionTypes.DOOR_EXIT]: { type: GAME_CONFIG.interactionTypes.DOOR_EXIT, xOff: 40, yOff: 235 }, // Porte de sortie
    [GAME_CONFIG.interactionTypes.ROBINET_EVO]: { type: GAME_CONFIG.interactionTypes.ROBINET_EVO, xOff: 40, yOff: 235 }, // Robinet
    [GAME_CONFIG.interactionTypes.CARTON]: { type: GAME_CONFIG.interactionTypes.CARTON, xOff: 50, yOff: 245 }, // Carton
    [GAME_CONFIG.interactionTypes.JUKEBOX]: { type: GAME_CONFIG.interactionTypes.JUKEBOX, xOff: 40, yOff: 235 }, // Jukebox
    [GAME_CONFIG.interactionTypes.PLAQUES]: { type: GAME_CONFIG.interactionTypes.PLAQUES, xOff: 40, yOff: 235 }, // Plaques
    [GAME_CONFIG.interactionTypes.POUBELLES]: { type: GAME_CONFIG.interactionTypes.POUBELLES, xOff: 40, yOff: 235 }, // Poubelles
    [GAME_CONFIG.interactionTypes.FRIGO]: { type: GAME_CONFIG.interactionTypes.FRIGO, xOff: 40, yOff: 235 }, // Frigo
    [GAME_CONFIG.interactionTypes.MARMITE]: { type: GAME_CONFIG.interactionTypes.MARMITE, xOff: 40, yOff: 235 }, // Marmite
    [GAME_CONFIG.interactionTypes.PAPIER]: { type: GAME_CONFIG.interactionTypes.PAPIER, xOff: 30, yOff: 190 }, // Papier
    [GAME_CONFIG.interactionTypes.ASSIETTE]: { type: GAME_CONFIG.interactionTypes.ASSIETTE, xOff: 25, yOff: 220 }, // Assiette
    [GAME_CONFIG.interactionTypes.LAMPE_BAS]: { type: GAME_CONFIG.interactionTypes.LAMPE_BAS, xOff: 50, yOff: 200 }, // LampeBas
    [GAME_CONFIG.interactionTypes.LAMPE_DECO]: { type: GAME_CONFIG.interactionTypes.LAMPE_DECO, xOff: 40, yOff: 220 }, // Lampe 2
    [GAME_CONFIG.interactionTypes.LAVABO]: { type: GAME_CONFIG.interactionTypes.LAVABO, xOff: 40, yOff: 235 }, // Lavabo
    [GAME_CONFIG.interactionTypes.LETTRE]: { type: GAME_CONFIG.interactionTypes.LETTRE, xOff: 40, yOff: 200 }, // Papier2
    [GAME_CONFIG.interactionTypes.LAMPE_CUISINE]: { type: GAME_CONFIG.interactionTypes.LAMPE_CUISINE, xOff: 40, yOff: 210 }, // Lampe Cuisine
    [GAME_CONFIG.interactionTypes.CHEMINEE]: { type: GAME_CONFIG.interactionTypes.CHEMINEE, xOff: 40, yOff: 235 }, // Chemine
    [GAME_CONFIG.interactionTypes.BAIGNOIRE]: { type: GAME_CONFIG.interactionTypes.BAIGNOIRE, xOff: 25, yOff: 225 }, // Baignoire
    [GAME_CONFIG.interactionTypes.BOUTEILLE]: { type: GAME_CONFIG.interactionTypes.BOUTEILLE, xOff: 36, yOff: 255 }, // Bouteille
};

//Lecture des tableaux json
function processMapData(mapData, objectWidth, objectHeight, offsetX, offsetY, createObjectFn) {
    const objects = [];
    mapData.forEach((row, i) => {
        row.forEach((symbol, j) => {
            if (symbol !== 0) { // Assuming 0 means no object/interaction
                const obj = createObjectFn(symbol, j, i, objectWidth, objectHeight, offsetX, offsetY);
                if (obj) {
                    objects.push(obj);
                }
            }
        });
    });
    return objects;
}

const collisionsMap = [];
for (let i = 0; i < collisions.length; i += GAME_CONFIG.mapWidth) {
    collisionsMap.push(collisions.slice(i, i + GAME_CONFIG.mapWidth));
}

const interactionMap = [];
for (let i = 0; i < interactionData.length; i += GAME_CONFIG.mapWidth) {
    interactionMap.push(interactionData.slice(i, i + GAME_CONFIG.mapWidth));
}

//Blocs de collision
let boundaries = processMapData(
    collisionsMap,
    Boundary.width,
    Boundary.height,
    offset.x + 40,
    offset.y + 212,
    (symbol, j, i, width, height, offsetX, offsetY) => {
        if (symbol === GAME_CONFIG.collisionSymbol) {
            return new Boundary({
                position: {
                    x: j * width - offsetX,
                    y: i * height - offsetY
                }
            });
        }
        return null;
    }
);

//Zones d'interactions
let interactions = processMapData(
    interactionMap,
    Interactive.width,
    Interactive.height,
    offset.x,
    offset.y,
    (symbol, j, i, width, height, offsetX, offsetY) => {
        const mapping = interactionMappings[symbol];
        if (mapping) {
            return new Interactive({
                position: {
                    x: j * width - (offsetX + mapping.xOff),
                    y: i * height - (offsetY + mapping.yOff)
                },
                type: mapping.type
            });
        }
        return null;
    }
);

//Audio
const audio = {
    theme: new Audio(AUDIO_PATHS.theme),
    jukebox: new Audio(AUDIO_PATHS.jukebox),
    collect: new Audio(AUDIO_PATHS.collect),
    footsteps: new Audio(AUDIO_PATHS.footsteps),
    gasOn: new Audio(AUDIO_PATHS.gasOn),
    gasOff: new Audio(AUDIO_PATHS.gasOff),
    robinetOn: new Audio(AUDIO_PATHS.robinetOn),
    robinetOff: new Audio(AUDIO_PATHS.robinetOff),
    switch: new Audio(AUDIO_PATHS.switch),
    fire: new Audio(AUDIO_PATHS.fire),
    bathtub: new Audio(AUDIO_PATHS.bathtub),
    vinylStart: new Audio(AUDIO_PATHS.vinylStart),
    vinylStop: new Audio(AUDIO_PATHS.vinylStop),
};

audio.theme.volume = 0.2;
audio.jukebox.volume = 0.35;
audio.collect.volume = 0.15;
audio.footsteps.volume = 0.35;
audio.gasOn.volume = 0.6;
audio.gasOff.volume = 0.6;
audio.robinetOn.volume = 0.45;
audio.robinetOff.volume = 0.45;
audio.switch.volume = 0.45;
audio.fire.volume = 0.3;
audio.bathtub.volume = 0.3;
audio.vinylStart.volume = 0.5;
audio.vinylStop.volume = 0.5;

//Images
const images = {
    houseMap: new Image(),
    playerDown: new Image(),
    playerUp: new Image(),
    playerLeft: new Image(),
    playerRight: new Image(),
    premierPlan: new Image(),
    frigoOff: new Image(),
    frigoOn: new Image(),
    baignoireOn: new Image(),
    baignoireOff: new Image(),
    chemineOn: new Image(),
    chemineOff: new Image(),
    lampeCuisineOff: new Image(),
    lampeCuisineOn: new Image(),
    lampeTableOff: new Image(),
    lampeTableOn: new Image(),
    lampeSalonOff: new Image(),
    lampeSalonOn: new Image(),
    lavaboOff: new Image(),
    lavaboOn: new Image(),
    plaquesOff: new Image(),
    plaquesOn: new Image(),
    evierOff: new Image(),
    evierOn: new Image(),
    marmiteItem: new Image(),
    cartonItem: new Image(),
    papierItem: new Image(),
    assietteItem: new Image(),
    papier2Item: new Image(),
    bouteilleItem: new Image(),
};

images.houseMap.src = IMAGE_PATHS.houseMap;
images.playerDown.src = IMAGE_PATHS.playerDown;
images.playerUp.src = IMAGE_PATHS.playerUp;
images.playerLeft.src = IMAGE_PATHS.playerLeft;
images.playerRight.src = IMAGE_PATHS.playerRight;
images.premierPlan.src = IMAGE_PATHS.premierPlan;
images.frigoOff.src = IMAGE_PATHS.frigoOff;
images.frigoOn.src = IMAGE_PATHS.frigoOn;
images.baignoireOn.src = IMAGE_PATHS.baignoireOn;
images.baignoireOff.src = IMAGE_PATHS.baignoireOff;
images.chemineOn.src = IMAGE_PATHS.chemineOn;
images.chemineOff.src = IMAGE_PATHS.chemineOff;
images.lampeCuisineOff.src = IMAGE_PATHS.lampeCuisineOff;
images.lampeCuisineOn.src = IMAGE_PATHS.lampeCuisineOn;
images.lampeTableOff.src = IMAGE_PATHS.lampeTableOff;
images.lampeTableOn.src = IMAGE_PATHS.lampeTableOn;
images.lampeSalonOff.src = IMAGE_PATHS.lampeSalonOff;
images.lampeSalonOn.src = IMAGE_PATHS.lampeSalonOn;
images.lavaboOff.src = IMAGE_PATHS.lavaboOff;
images.lavaboOn.src = IMAGE_PATHS.lavaboOn;
images.plaquesOff.src = IMAGE_PATHS.plaquesOff;
images.plaquesOn.src = IMAGE_PATHS.plaquesOn;
images.evierOff.src = IMAGE_PATHS.evierOff;
images.evierOn.src = IMAGE_PATHS.evierOn;
images.marmiteItem.src = IMAGE_PATHS.marmiteItem;
images.cartonItem.src = IMAGE_PATHS.cartonItem;
images.papierItem.src = IMAGE_PATHS.papierItem;
images.assietteItem.src = IMAGE_PATHS.assietteItem;
images.papier2Item.src = IMAGE_PATHS.papier2Item;
images.bouteilleItem.src = IMAGE_PATHS.bouteilleItem;

//Objet Joueur
const player = new Sprite({
    position: {
        x: canvas.width/2-(154/4)/2,
        y: canvas.height/2-55/2
    },
    image: images.playerDown,
    frames: {
        max: 4
    },
    sprites: {
        up: images.playerUp,
        right: images.playerRight,
        down: images.playerDown,
        left: images.playerLeft
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
    image: images.houseMap
})

//Objet Premier plan
const foreground = new Sprite({
    position:{
        x: offset.x,
        y: offset.y
    },
    image: images.premierPlan
})

const frigo=[
    images.frigoOff,
    images.frigoOn
]

const chemine=[
    images.chemineOn,
    images.chemineOff
]

const baignoire=[
    images.baignoireOff,
    images.baignoireOn
]

const lampeC=[
    images.lampeCuisineOn,
    images.lampeCuisineOff
]

const lampeT=[
    images.lampeTableOn,
    images.lampeTableOff
]

const lampeS=[
    images.lampeSalonOn,
    images.lampeSalonOff
]

const lavaboA=[
    images.lavaboOn,
    images.lavaboOff
]

const evierA=[
    images.evierOn,
    images.evierOff
]

const plaquesA=[
    images.plaquesOn,
    images.plaquesOff
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

const marmite = new Collectible({position: {x: 90, y: -26}, image: images.marmiteItem, name: "Marmite "});
const carton = new Collectible({position: {x: 5, y: 240}, image: images.cartonItem, name: "Carton "});
const papier = new Collectible({position: {x: 180,y: 270}, image: images.papierItem, name: "Papier "});
const assiette = new Collectible({position: {x: 345, y: 190}, image: images.assietteItem, name: "Assiette "});
const papier2 = new Collectible({position: {x: 425, y: 190}, image: images.papier2Item, name: "Lettre "});
const bouteille = new Collectible({position: {x: 85, y: 296}, image:images.bouteilleItem, name: "Bouteille "});

//Création des objets ramassables
let collectibles= [
    marmite,
    carton,
    papier,
    assiette,
    papier2,
    bouteille
];

let btnYes = document.getElementById("btn-yes");
let btnNo = document.getElementById("btn-no");
 
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

function deleteInteractionByType(type) {
    for (var i = 0; i < interactions.length; i++) {
        if (interactions[i].type === type) {
            interactions.splice(i, 1); // Supprime l'interaction
            break;
        }
    }
}

function updateAudio() {
    if (player.moving) {
      audio.footsteps.play();
    } else {
      audio.footsteps.pause();
    }
}

function handleBinClick(divId,playerInventory) {
    switch (divId) {
        case 'bin1':
            if(playerInventory.selected=="Assiette "){
                playerInventory.removeCollectible("Assiette ");
                assietteDone=true;
                setTextContent("Les restes alimentaires c'est dans la poubelle orange !");
            }
            else if(playerInventory.selected=="Marmite "||playerInventory.selected=="Lettre "){
                setTextContent("Je ferais mieux de ne pas jeter ça...");
            }
            else{
                setTextContent("Non, pas là...");
            }
            break;
        case 'bin2':
            if(playerInventory.selected=="Marmite "||playerInventory.selected=="Lettre "){
                setTextContent("Je ferais mieux de ne pas jeter ça...");
            }
            else{
                setTextContent("Non, pas là...");
            }
            break;
        case 'bin3':
            if(playerInventory.selected=="Carton "){
                playerInventory.removeCollectible("Carton ");
                cartonDone=true;
                setTextContent("Bien, le carton c'est dans la jaune !");
            }
            else if(playerInventory.selected=="Papier "){
                playerInventory.removeCollectible("Papier ");
                papierDone=true;
                setTextContent("Bien, le papier c'est dans la jaune !");
            }
            else if(playerInventory.selected=="Bouteille "){
                playerInventory.removeCollectible("Bouteille ");
                bouteilleDone=true;
                setTextContent("Bien, le plastique c'est dans la jaune !");
            }
            else if(playerInventory.selected=="Marmite "||playerInventory.selected=="Lettre "){
                setTextContent("Je ferais mieux de ne pas jeter ça...");
            }
            else{
                setTextContent("Non, pas là...");
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
const interactionCooldown = GAME_CONFIG.interactionCooldown;
const openedFridgeCooldown = GAME_CONFIG.openedFridgeCooldown;

function startGame() {
    var timeoutReached = timer(GAME_CONFIG.duration.min, GAME_CONFIG.duration.sec); // Set timeout min,sec
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
    if(!jukebox && !audioMuted){
        audio.theme.play();
    }
    if(chemineOn && !audioMuted){
        audio.fire.play();
    }
    audio.jukebox.addEventListener('ended', () => {
        jukebox=false;
    });

    if(firstFrame){
        setTextContent(introduction);
        showTextWindow(25000);
        firstFrame=false;
    }

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
                                y:boundary.position.y+GAME_CONFIG.playerSpeed
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
                    movable.position.y += GAME_CONFIG.playerSpeed;
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
                                x:boundary.position.x-GAME_CONFIG.playerSpeed,
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
                    movable.position.x -= GAME_CONFIG.playerSpeed;
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
                                y:boundary.position.y-GAME_CONFIG.playerSpeed
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
                    movable.position.y -= GAME_CONFIG.playerSpeed;
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
                                x:boundary.position.x+GAME_CONFIG.playerSpeed,
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
                    movable.position.x += GAME_CONFIG.playerSpeed;
                })
            }
        }
    }
    else if (keys.m.pressed && lastKey==='m'){
        player.moving=false;

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
                if(interaction.type===GAME_CONFIG.interactionTypes.DOOR_EXIT){
                    if (currentTime - lastInteractionTime <= interactionCooldown) {
                        // Ignore les instructions si le joueur ne respect pas le délai défini entre chaque interactions
                        return;
                    }  
                    lastInteractionTime = currentTime;
                    if(!calquePlaques.active&&!calqueLampeSalon.active&&!calqueLampeTable.active&&!calqueEvier.active&&!calqueLavabo.active&&!calqueLampeCuisine.active&&marmiteDone&&cartonDone&&papierDone&&assietteDone&&bouteilleDone){
                        setTextContent("\u00c7a y est je peux enfin sortir !");
                        showTextWindow();
                        fadeScreen(".fade-out");
                        await sleep(5000);
                        window.location.href = "end.html";
                    }
                    else if(!calquePlaques.active||!calqueLampeSalon.active||!calqueLampeTable.active||!calqueEvier.active||!calqueLavabo.active||!calqueLampeCuisine.active||marmiteDone||cartonDone||papierDone||assietteDone||bouteilleDone){
                        setTextContent("\u00c7a avance mais c'est pas encore ça !");
                    }
                    else{
                        setTextContent("Hep hep hep, au boulot !");
                    }
                    showTextWindow();
                }
                else if(interaction.type===GAME_CONFIG.interactionTypes.JUKEBOX){
                    if (currentTime - lastInteractionTime < interactionCooldown) {
                        return;
                    }  
                    lastInteractionTime = currentTime;

                    if(!jukebox){
                        setTextContent('\ud834\udd1e \u2669 \ud83c\udf9d \u266a \u266c \ud83c\udf9d \u2669 \ud83c\udf9d');
                        showTextWindow();
                        audio.theme.pause();
                        audio.vinylStart.play();
                        audio.jukebox.play();
                        jukebox=true;
                    }
                    else if(jukebox){
                        audio.jukebox.pause();
                        audio.vinylStop.play();
                        audio.theme.play();
                        jukebox=false;
                    }
                }
                else if(interaction.type===GAME_CONFIG.interactionTypes.POUBELLES){
                    if (currentTime - lastInteractionTime < interactionCooldown) {
                        return;
                    }  
                    lastInteractionTime = currentTime;
                    const binAccessible = playerInventory.collectibles.find(collectible => collectible.name === "Papier " || collectible.name === "Assiette " || collectible.name === "Carton " || collectible.name === "Bouteille ");
                    if(binAccessible){
                        hide('commandListContainer');
                        allowPlayerMovement=false;
                        setTextContent("Tiens j'ai des trucs à jeter !");
                        showTextWindow();
                        await sleep(1000);
                        fadeScreen(".quick-fade");
                        binShown=true;
                        await sleep(1000);
                        showBin();
                        setTextContent("Par quoi je commence ?");
                        showTextWindow();
                        if(playerInventory.inBin===false){
                            playerInventory.binAccessed();
                        }
                    }
                    else{
                        hide('commandListContainer');
                        setTextContent("Je n'ai rien à jeter...");
                        showTextWindow();
                    }
                }
                else if(interaction.type===GAME_CONFIG.interactionTypes.CHEMINEE){
                    if(chemineOn){
                        if (currentTime - lastInteractionTime <= 3000) {
                            return;
                        }  
                        lastInteractionTime = currentTime;
                        allowPlayerMovement=false;
                        setTextContent("Je ferais mieux d'éteindre le feu avant de sortir");
                        showTextWindow();
                        await sleep(2000);
                        fadeScreen(".quick-fade");
                        await sleep(1000);
                        calqueChemine.changeStatus();
                        setTextContent("C'est plus sûr comme ça");
                        showTextWindow();
                        chemineOn=false;
                        allowPlayerMovement=true;
                    }
                    else{
                        setTextContent("Je ne vais quand même pas rallumer la cheminée maintenant");
                        showTextWindow();
                    }
                }
                else if(interaction.type===GAME_CONFIG.interactionTypes.BAIGNOIRE){
                    if(!toutPropre){
                        if (currentTime - lastInteractionTime <= interactionCooldown) {
                            return;
                        }  
                        lastInteractionTime = currentTime;
                        allowPlayerMovement=false;
                        setTextContent("Un petit bain ne me ferait pas de mal");
                        showTextWindow();
                        await sleep(2000);
                        audio.bathSound.play();
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
                        setTextContent("Je suis déjà propre !");
                        showTextWindow();
                    }
                }
                else if(interaction.type===GAME_CONFIG.interactionTypes.FRIGO){
                    if (currentTime - lastInteractionTime < interactionCooldown) {
                        return;
                    }
                    lastInteractionTime = currentTime;

                    const marmiteCollectible = playerInventory.collectibles.find(collectible => collectible.name === "Marmite ");
                    if(!marmiteCollectible&&!marmiteDone){
                        setTextContent("Une liste de course et quelques magnets sont disposés sur la porte...");
                        showTextWindow();
                    }
                    else if(marmiteDone){
                        setTextContent("Une liste de course et quelques magnets sont disposés sur la porte...");
                        showTextWindow();
                    }
                    else{
                        setTextContent("Je mets les restes dans le frigo pour demain !");
                        showTextWindow();
                        playerInventory.removeCollectible(marmiteCollectible.name);
                        calqueFrigo.changeStatus();
                        marmiteDone=true;
                        
                        fridgeTimeout = setTimeout(function() {
                            calqueFrigo.changeStatus();
                        }, openedFridgeCooldown);
                    }
                }
                else if(interaction.type===GAME_CONFIG.interactionTypes.CARTON){
                    if (currentTime - lastInteractionTime <= interactionCooldown) {
                        return;
                    }  
                    lastInteractionTime = currentTime;
                    playerInventory.addCollectible(carton.name,carton.image);
                    carton.removeFromGame();
                    deleteInteractionByType(2);
                    audio.collect.play();
                }
                else if(interaction.type===GAME_CONFIG.interactionTypes.ROBINET_EVO){
                    if(calqueEvier.active){
                        if (currentTime - lastInteractionTime <= 1850) {
                            return;
                        }  
                        lastInteractionTime = currentTime;

                        audio.robinetOff.play();
                        await sleep(1850);
                        calqueEvier.changeStatus();
                    }
                    else{
                        if (currentTime - lastInteractionTime <= 350) {
                            return;
                        }  
                        lastInteractionTime = currentTime;

                        audio.robinetOn.play();
                        await sleep(350);
                        calqueEvier.changeStatus();         
                    }
                }
                else if(interaction.type===GAME_CONFIG.interactionTypes.PLAQUES){
                    if(calquePlaques.active){
                        if (currentTime - lastInteractionTime <= 2700) {
                            return;
                        }  
                        lastInteractionTime = currentTime;

                        audio.gasOff.play();
                        await sleep(2700);
                        calquePlaques.changeStatus();
                    }
                    else{
                        if (currentTime - lastInteractionTime <= 1300) {
                            return;
                        }  
                        lastInteractionTime = currentTime;

                        audio.gasOn.play();
                        await sleep(1300);
                        calquePlaques.changeStatus();          
                    }
                }
                else if(interaction.type===GAME_CONFIG.interactionTypes.MARMITE){
                    if (currentTime - lastInteractionTime <= interactionCooldown) {
                        return;
                    }  
                    lastInteractionTime = currentTime;
                    playerInventory.addCollectible(marmite.name,marmite.image);
                    marmite.removeFromGame();
                    deleteInteractionByType(8);
                    audio.collect.play();
                }
                else if(interaction.type===GAME_CONFIG.interactionTypes.PAPIER){
                    if (currentTime - lastInteractionTime <= interactionCooldown) {
                        return;
                    }  
                    lastInteractionTime = currentTime;
                    playerInventory.addCollectible(papier.name,papier.image);
                    papier.removeFromGame();
                    deleteInteractionByType(9);
                    audio.collect.play();
                }
                else if(interaction.type===GAME_CONFIG.interactionTypes.ASSIETTE){
                    if (currentTime - lastInteractionTime <= interactionCooldown) {
                        return;
                    }  
                    lastInteractionTime = currentTime;
                    playerInventory.addCollectible(assiette.name,assiette.image);
                    assiette.removeFromGame();
                    deleteInteractionByType(10); 
                    audio.collect.play();    
                }
                else if(interaction.type===GAME_CONFIG.interactionTypes.BOUTEILLE){
                    if (currentTime - lastInteractionTime <= interactionCooldown) {
                        return;
                    }  
                    lastInteractionTime = currentTime;
                    playerInventory.addCollectible(bouteille.name,bouteille.image);
                    bouteille.removeFromGame();
                    deleteInteractionByType(19); 
                    audio.collect.play();    
                }
                else if(interaction.type===GAME_CONFIG.interactionTypes.LAMPE_BAS){
                    if (currentTime - lastInteractionTime < interactionCooldown) {
                        return;
                    }  
                    lastInteractionTime = currentTime;
                    audio.switch.play();
                    calqueLampeSalon.changeStatus();
                }
                else if(interaction.type===GAME_CONFIG.interactionTypes.LAMPE_DECO){
                    if (currentTime - lastInteractionTime < interactionCooldown) {
                        return;
                    }  
                    lastInteractionTime = currentTime;
                    audio.switch.play();
                    calqueLampeTable.changeStatus();
                }
                else if(interaction.type===GAME_CONFIG.interactionTypes.LAMPE_CUISINE){
                    if (currentTime - lastInteractionTime < interactionCooldown) {
                        return;
                    }  
                    lastInteractionTime = currentTime;
                    audio.switch.play();
                    calqueLampeCuisine.changeStatus();
                }
                else if(interaction.type===GAME_CONFIG.interactionTypes.LAVABO){
                    if(calqueLavabo.active){
                        if (currentTime - lastInteractionTime <= 1850) {
                            return;
                        }  
                        lastInteractionTime = currentTime;

                        audio.robinetOff.play();
                        await sleep(1850);
                        calqueLavabo.changeStatus();
                    }
                    else{
                        if (currentTime - lastInteractionTime <= 350) {
                            return;
                        }  
                        lastInteractionTime = currentTime;

                        audio.robinetOn.play();
                        await sleep(350);
                        calqueLavabo.changeStatus();       
                    }
                }
                else if(interaction.type===GAME_CONFIG.interactionTypes.LETTRE){
                    if (currentTime - lastInteractionTime <= interactionCooldown) {
                        return;
                    }  
                    lastInteractionTime = currentTime;
                    playerInventory.addCollectible(papier2.name,papier2.image);
                    papier2.removeFromGame();
                    deleteInteractionByType(14); 
                    audio.collect.play();    
                }
            }        
        }
    }
    else if(keys.l.pressed && lastKey==='l'){
        hide('text-window');
        hide('commandListContainer');
        hideBin();
        haveChoice=false;
        confirmations.deleteMarmite=false;
    }
    
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
