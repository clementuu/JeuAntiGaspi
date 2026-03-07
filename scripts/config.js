const AUDIO_PATHS = {
    theme: "audio/15 - National Park.mp3",
    jukebox: "audio/01 - The Pink Panther Theme.flac",
    collect: "audio/mixkit-martial-arts-punch-2052.wav",
    footsteps: "audio/FootSteps.wav",
    gasOn: "audio/GasOn.wav",
    gasOff: "audio/GasOff.wav",
    robinetOn: "audio/RobinetOn.wav",
    robinetOff: "audio/RobinetOff.wav",
    switch: "audio/mixkit-light-switch-sound-2579.wav",
    fire: "audio/campfireCrackles.wav",
    bathtub: "audio/bathtub.wav",
    vinylStart: "audio/VinylStart.wav",
    vinylStop: "audio/VinylStop.wav",
};

const IMAGE_PATHS = {
    houseMap: 'assets/HouseMap.png',
    playerDown: 'assets/playerDown80.png',
    playerUp: 'assets/playerUp80.png',
    playerLeft: 'assets/playerLeft80.png',
    playerRight: 'assets/playerRight80.png',
    premierPlan: 'assets/PremierPlan.png',
    frigoOff: 'assets/FrigoOff.png',
    frigoOn: 'assets/FrigoOn.png',
    baignoireOn: 'assets/BaignoireOn.png',
    baignoireOff: 'assets/BaignoireOff.png',
    chemineOn: 'assets/ChemineOn.png',
    chemineOff: 'assets/ChemineOff.png',
    lampeCuisineOff: 'assets/LampeCuisineOff.png',
    lampeCuisineOn: 'assets/LampeCuisineOn.png',
    lampeTableOff: 'assets/LampeTableOff.png',
    lampeTableOn: 'assets/LampeTableOn.png',
    lampeSalonOff: 'assets/LampeSalonOff.png',
    lampeSalonOn: 'assets/LampeSalonOn.png',
    lavaboOff: 'assets/lavaboOff.png',
    lavaboOn: 'assets/lavaboOn.png',
    plaquesOff: 'assets/plaquesOff.png',
    plaquesOn: 'assets/plaquesOn.png',
    evierOff: 'assets/evierOff.png',
    evierOn: 'assets/evierOn.png',
    marmiteItem: 'assets/items/Marmite.png',
    cartonItem: 'assets/items/Carton.png',
    papierItem: 'assets/items/Papier.png',
    assietteItem: 'assets/items/Assiette.png',
    papier2Item: 'assets/items/Papier2.png',
    bouteilleItem: 'assets/items/Bouteille.png',
};

const GAME_CONFIG = {
    mapOffset: {
        x: -20,
        y: -100
    },
    duration: {
        min: 10,
        sec: 0
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
