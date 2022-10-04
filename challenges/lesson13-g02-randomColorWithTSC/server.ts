const lista:Array<number>=[2,3,5,7];

lista.map((x:number) => x*x)
    .forEach((x:number) => console.log(x));

    
// Generic challenge
class Paleta{

    colors: { 
        red: number;
        green: number;
        blue: number;
    }[];
    
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
