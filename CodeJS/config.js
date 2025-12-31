const AUDIO_PATHS = {
    theme: "Audio/15 - National Park.mp3",
    jukebox: "Audio/01 - The Pink Panther Theme.flac",
    collect: "Audio/mixkit-martial-arts-punch-2052.wav",
    footsteps: "Audio/FootSteps.wav",
    gasOn: "Audio/GasOn.wav",
    gasOff: "Audio/GasOff.wav",
    robinetOn: "Audio/RobinetOn.wav",
    robinetOff: "Audio/RobinetOff.wav",
    switch: "Audio/mixkit-light-switch-sound-2579.wav",
    fire: "Audio/campfireCrackles.wav",
    bathtub: "Audio/bathtub.wav",
    vinylStart: "Audio/VinylStart.wav",
    vinylStop: "Audio/VinylStop.wav",
};

const IMAGE_PATHS = {
    houseMap: 'Images/HouseMap.png',
    playerDown: 'Images/playerDown80.png',
    playerUp: 'Images/playerUp80.png',
    playerLeft: 'Images/playerLeft80.png',
    playerRight: 'Images/playerRight80.png',
    premierPlan: 'Images/PremierPlan.png',
    frigoOff: 'Images/FrigoOff.png',
    frigoOn: 'Images/FrigoOn.png',
    baignoireOn: 'Images/BaignoireOn.png',
    baignoireOff: 'Images/BaignoireOff.png',
    chemineOn: 'Images/ChemineOn.png',
    chemineOff: 'Images/ChemineOff.png',
    lampeCuisineOff: 'Images/LampeCuisineOff.png',
    lampeCuisineOn: 'Images/LampeCuisineOn.png',
    lampeTableOff: 'Images/LampeTableOff.png',
    lampeTableOn: 'Images/LampeTableOn.png',
    lampeSalonOff: 'Images/LampeSalonOff.png',
    lampeSalonOn: 'Images/LampeSalonOn.png',
    lavaboOff: 'Images/lavaboOff.png',
    lavaboOn: 'Images/lavaboOn.png',
    plaquesOff: 'Images/plaquesOff.png',
    plaquesOn: 'Images/plaquesOn.png',
    evierOff: 'Images/evierOff.png',
    evierOn: 'Images/evierOn.png',
    marmiteItem: 'Images/Items/Marmite.png',
    cartonItem: 'Images/Items/Carton.png',
    papierItem: 'Images/Items/Papier.png',
    assietteItem: 'Images/Items/Assiette.png',
    papier2Item: 'Images/Items/Papier2.png',
    bouteilleItem: 'Images/Items/Bouteille.png',
};

const GAME_CONFIG = {
    mapOffset: {
        x: -20,
        y: -100
    },
    interactionCooldown: 250,
    openedFridgeCooldown: 3000,
    mapWidth: 22, // In tiles
    playerSpeed: 2.7,
    collisionSymbol: 1062,
    interactionTypes: {
        DOOR_EXIT: 357, // Porte de sortie
        ROBINET_EVO: 2357, // Robinet
        CARTON: 23, // Carton
        JUKEBOX: 57, // Jukebox
        PLAQUES: 5, // Plaques
        POUBELLES: 6, // Poubelles
        FRIGO: 7, // Frigo
        MARMITE: 8, // Marmite
        PAPIER: 9, // Papier
        ASSIETTE: 10, // Assiette
        LAMPE_BAS: 11, // LampeBas
        LAMPE_DECO: 12, // Lampe 2
        LAVABO: 13, // Lavabo
        LETTRE: 14, // Papier2
        LAMPE_CUISINE: 15, // Lampe Cuisine
        CHEMINEE: 16, // Chemine
        BAIGNOIRE: 17, // Baignoire
        BOUTEILLE: 19 // Bouteille
    }
};
