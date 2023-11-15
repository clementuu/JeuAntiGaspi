class Sprite{
    constructor({position, image, frames={max: 1},sprites}) {
        this.position=position;
        this.image=image;
        this.frames={...frames, val:0,elapsed:0};

        this.image.onload = () => {
            this.width=this.image.width/this.frames.max;
            this.height=this.image.height;
        }
        this.moving=false
        this.sprites=sprites
    }
    draw(){
        c.drawImage(
            this.image, 
            this.frames.val*this.width, //position x du début de la coupe de l'image du joueur
            0, //position y du début de la coupe
            this.image.width/this.frames.max, //Largeur de la coupe
            this.image.height, //Hauteur de la coupe
            this.position.x,
            this.position.y,
            this.image.width/this.frames.max,
            this.image.height
        );

        if(!this.moving) return

        if(this.frames.max>1){
            this.frames.elapsed++
        }

        if(this.frames.elapsed%10===0){
            if(this.frames.val<this.frames.max-1){
                this.frames.val++;
            }
            else this.frames.val=0;}
    }
}

class Boundary{
    static width=24;
    static height=24;
    constructor({position}){
        this.position=position;
        this.width=24;
        this.height=24;
    }

    draw(){
        c.fillStyle='rgba(255,0,0,0)';
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}

class Interactive{
    static width=24;
    static height=24;
    constructor({position, type}){
        this.position=position;
        this.width=24;
        this.height=24;
        this.type=type;
        this.active=true;
    }

    draw(){
        if(this.active=true){
            c.fillStyle='rgba(0,255,0,0)';
            c.fillRect(this.position.x, this.position.y, this.width, this.height);
        }
    }

    unactiveFromGame() {
        this.active = false; // Permet de supprimer la zone d'interaction quand le collectible est ajouté à inventaire
    }

}

class Calques {
    constructor({position, images}) {
        this.position=position;
        this.images=images;
    
        this.imagesLoaded = 0;

        this.width=0;
        this.height=0;

        this.images.forEach((image) => {
            image.onload = () => {
                this.imagesLoaded++;
                if (this.imagesLoaded === this.images.length) {
                    this.width = this.images[0].width;
                    this.height = this.images[0].height;
                }
            }
        })
    
        this.active=true;
    }
    
    draw() {
        if(this.active){
            c.drawImage(this.images[0], this.position.x, this.position.y, this.width , this.height );
        }
        else{
            c.drawImage(this.images[1], this.position.x, this.position.y, this.width , this.height );
        }
    }

    changeStatus() {
        if(this.active===true){
            this.active = false;
        }
        else if(this.active===false){
            this.active=true;
        }
    }
}

class Collectible {
    constructor({position, image, name=null}) {
        this.position=position;
        this.image=image;
        this.name=name;

    this.image.onload = () => {
        this.width=this.image.width;
        this.height=this.image.height;
        }
    
    this.visible=true;

    }
    
    draw() {
        if(this.visible){
            c.drawImage(this.image, this.position.x, this.position.y, this.image.width * 1.5, this.image.height * 1.5);
        }
    }

    removeFromGame() {
        this.visible = false; // Permet de ne plus affiché le collectible quand on l'ajoute à inventaire
      }

}

class Inventory {
    constructor() {
        this.collectibles = [];
        this.inventoryElement = document.getElementById('inventory');
        this.selected="";

        this.inBin=false;
    }

    updateInventory() {
        this.inventoryElement.innerHTML = ''; // Efface l'item précédent
    
        this.collectibles.forEach(item => {
            const listItem = document.createElement('ui');

            if (item.image) {
                const itemImage = document.createElement('img');
                itemImage.src = item.image;
                itemImage.style.marginBottom = '-10px';
                listItem.appendChild(itemImage);
            }
            const itemName = document.createElement('span');
            itemName.textContent = item.name;
            itemName.style.margin = '10px';
            listItem.appendChild(itemName);
            //listItem.textContent = item;
            this.inventoryElement.appendChild(listItem);
            listItem.addEventListener('click', () => {
                this.handleItemClick(item.name); // Appel de la fonction handleItemClick avec le nom de l'item en argument
            });
        });
    }

    handleItemClick(itemName) {
        //console.log('Clicked item:', itemName);
        let msg="";

        if(this.inBin===false){
            this.selected="";
            switch (itemName) {
                case "Carton ":
                    msg = "Ohhh c'est le carton dans lequel est arrivé mon super lego Batman ! Mais bon il ne sert plus à grand chose maintenant...";
                    break;
                case "Papier ":
                    msg = "\nUne promotion sur les chocolats ! Ah mince, la date est dépassée...";
                    break;
                case "Marmite ":
                    msg = "\nCe sont les restes du repas que mamie a cuisiné, qu'est-ce que j'en fais ?";
                    break;
                case "Assiette ":
                    msg = "Beeuurk ces choux de Bruxelles était vraiment pas terrible, je ne les finirai pas, autant les jeter...";
                    break;
                case "Lettre ":
                    msg = "Coucou mon chéri, je suis parti chez le coiffeur. Avant de sortir tu penseras à ramasser et ranger ce qui traine, et surtout n'oublie pas de fermer les robinets et d'éteindre la lumière avant de sortir !";
                    break;
                case "Bouteille ":
                    msg = "\nSi mamie voit que j'ai laissé trainer ma bouteille vide...";
                    break;
            }    
            setTextContent(msg);
            showTextWindow(20000);
        }
        else{
            switch (itemName) {
                case "Carton ":
                    msg = "\nDans quelle poubelle devrais-je jeter ça ?";
                    this.selected="Carton ";
                    break;
                case "Papier ":
                    msg = "\nDans quelle poubelle devrais-je jeter ça ?";
                    this.selected="Papier ";
                    break;
                case "Marmite ":
                    msg = "\nJe ferais mieux de ne pas jeter ça...";
                    this.selected="Marmite ";
                    break;
                case "Assiette ":
                    msg = "\nDans quelle poubelle devrais-je jeter ça ?";
                    this.selected="Assiette ";
                    break;
                case "Lettre ":
                    msg = "\nJe ferais mieux de ne pas jeter ça...";
                    this.selected="Lettre ";
                    break;
                case "Bouteille ":
                    msg = "\nDans quelle poubelle devrais-je jeter ça ?";
                    this.selected="Bouteille ";
                    break;
            }
            setTextContent(msg);
            showTextWindow();
        }
    }
  
    addCollectible(name,image) {
        const collectible = {
            name: name,
            image: image.src
          };

        this.collectibles.push(collectible);
        this.updateInventory();
        let message = "";

        // Determine the message based on the item
        switch (collectible.name) {
            case "Carton ":
                message = "\nVous avez trouvé un carton !";
                break;
            case "Papier ":
                message = "\nVous avez trouvé un papier !";
                break;
            case "Marmite ":
                message = "\nVous avez trouvé une marmite !";
                break;
            case "Assiette ":
                message = "\nVous avez ramassé une assiette !";
                break;
            case "Lettre ":
                message = "\nVous avez ramassé une lettre !";
                break;
            case "Bouteille ":
                message = "\nVous avec trouvé une bouteille !";
                break
            default:
                message = "\nItem ajouté à l'inventaire !";
                break;
        }

        // Show the text window with the message
        setTextContent(message);
        showTextWindow(3000);
    }

    removeCollectible(name) {
        const index = this.collectibles.findIndex(collectible => collectible.name === name);
        if (index !== -1) {
            this.collectibles.splice(index, 1);
            this.updateInventory();
        }
        else {
            console.log(`${name} introuvable.`);
          }
    }

    binAccessed(){
        if(this.inBin===false){
            this.inBin=true;
        }
        else{
            this.inBin=false;
        }
    }
}