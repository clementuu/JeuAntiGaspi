// CodeJS/input.js
class InputHandler {
    constructor() {
        this.keys = {
            z: { pressed: false }, // haut
            d: { pressed: false }, // droite
            s: { pressed: false }, // bas
            q: { pressed: false }, // gauche
            m: { pressed: false }, // interagir
            l: { pressed: false }  // retour
        };
        this.lastKey = '';
        this.setEventListeners();
    }

    setEventListeners() {
        window.addEventListener('keydown', (e) => {
            switch (e.key) {
                case 'ArrowUp':
                    this.keys.z.pressed = true;
                    this.lastKey = 'z';
                    break;
                case 'ArrowRight':
                    this.keys.d.pressed = true;
                    this.lastKey = 'd';
                    break;
                case 'ArrowDown':
                    this.keys.s.pressed = true;
                    this.lastKey = 's';
                    break;
                case 'ArrowLeft':
                    this.keys.q.pressed = true;
                    this.lastKey = 'q';
                    break;
                case 'a':
                    this.keys.m.pressed = true;
                    this.lastKey = 'm';
                    break;
                case 'z':
                    this.keys.l.pressed = true;
                    this.lastKey = 'l';
                    break;
            }
        });

        window.addEventListener('keyup', (e) => {
            switch (e.key) {
                case 'ArrowUp':
                    this.keys.z.pressed = false;
                    break;
                case 'ArrowRight':
                    this.keys.d.pressed = false;
                    break;
                case 'ArrowDown':
                    this.keys.s.pressed = false;
                    break;
                case 'ArrowLeft':
                    this.keys.q.pressed = false;
                    break;
                case 'a':
                    this.keys.m.pressed = false;
                    break;
                case 'z':
                    this.keys.l.pressed = false;
                    break;
            }
        });
    }
}