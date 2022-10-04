const list = [2,3,5,7];

list.map(x => x*x)
    .forEach(x => console.log(x));

// Generic challenge
class Paleta{
    constructor(mode="RGB"){
        if(mode === "RGB"){
            this.colors = [];
        }
    }

    randomRGBColor(){
        return Math.floor(Math.random() * 256)
    }

    addRandomRGBtoPallet(){
        this.colors.push(
            {
                red: this.randomRGBColor(),
                green:this.randomRGBColor(),
                blue: this.randomRGBColor(),
            }
        )
    }
}

const paleta = new Paleta();
paleta.addRandomRGBtoPallet();
console.log(paleta.colors);
