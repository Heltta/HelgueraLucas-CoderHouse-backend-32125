"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var list = [2, 3, 5, 7];
list.map(function (x) {
  return x * x;
}).forEach(function (x) {
  return console.log(x);
}); // Generic challenge

var Paleta = /*#__PURE__*/function () {
  function Paleta() {
    var mode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "RGB";

    _classCallCheck(this, Paleta);

    if (mode === "RGB") {
      this.colors = [];
    }
  }

  _createClass(Paleta, [{
    key: "randomRGBColor",
    value: function randomRGBColor() {
      return Math.floor(Math.random() * 256);
    }
  }, {
    key: "addRandomRGBtoPallet",
    value: function addRandomRGBtoPallet() {
      this.colors.push({
        red: this.randomRGBColor(),
        green: this.randomRGBColor(),
        blue: this.randomRGBColor()
      });
    }
  }]);

  return Paleta;
}();

var paleta = new Paleta();
paleta.addRandomRGBtoPallet();
console.log(paleta.colors);
