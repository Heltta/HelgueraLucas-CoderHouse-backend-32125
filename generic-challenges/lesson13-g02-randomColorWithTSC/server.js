var lista = [2, 3, 5, 7];
lista.map(function (x) { return x * x; })
    .forEach(function (x) { return console.log(x); });
// Generic challenge
var Paleta = /** @class */ (function () {
    function Paleta(mode) {
        if (mode === void 0) { mode = "RGB"; }
        if (mode === "RGB") {
            this.colors = [];
        }
    }
    Paleta.prototype.randomRGBColor = function () {
        return Math.floor(Math.random() * 256);
    };
    Paleta.prototype.addRandomRGBtoPallet = function () {
        this.colors.push({
            red: this.randomRGBColor(),
            green: this.randomRGBColor(),
            blue: this.randomRGBColor()
        });
    };
    return Paleta;
}());
var paleta = new Paleta();
paleta.addRandomRGBtoPallet();
console.log(paleta.colors);
