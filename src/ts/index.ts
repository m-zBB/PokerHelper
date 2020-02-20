
//import {TexasHoldem} from "poker-odds-calc"

//import Board from "poker-odds-calc/dts/lib/Board"

//import * as hutchison from 'hutchison';

const hutchison = require('hutchison');

function calculate(event: KeyboardEvent) {
  if (event.keyCode === 13) {
      var x = <HTMLInputElement>document.getElementById("hand");
      alert(x.value);
  }
}

var input = document.getElementById("hand");
if (input) {
  input.onkeyup = calculate;
}


// function greeter() {
//   console.log(hutchison.texasHoldem({hand: ['Ah', 'Ad']}));
// }
// window.onload = greeter