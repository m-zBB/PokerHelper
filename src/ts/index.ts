
//import {TexasHoldem} from "poker-odds-calc"

//import Board from "poker-odds-calc/dts/lib/Board"

//import * as hutchison from 'hutchison';

const hutchison = require('hutchison');

function greeter() {
  console.log(hutchison.texasHoldem({hand: ['Ah', 'Ad']}));
}

window.onload = greeter