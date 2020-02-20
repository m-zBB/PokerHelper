
//import {TexasHoldem} from "poker-odds-calc"

//import Board from "poker-odds-calc/dts/lib/Board"

//import * as hutchison from 'hutchison';

const hutchison = require('hutchison');

function calculate(event: KeyboardEvent) {
  if (event.keyCode === 13) {
      var x = <HTMLInputElement>document.getElementById("hand");
      var cards = x.value.split(",")
      console.log(cards);
      var result = hutchison.texasHoldem({hand: cards})
      alert(result.percentile*100)
      

  }
}

var input = document.getElementById("hand");
if (input) {
  input.onkeyup = calculate;
}
var modal = <any>$("#cardpicker").first();



var cards = document.getElementsByClassName("card");
for(const card of cards) {
  card.addEventListener("click",  pickCard)
}

function pickCard(e:Event) {
  // get picked card symbol
  var symbol = (<any>e.srcElement).getAttribute("data-card");
  //get card placeholder
  var cardid = modal.attr("data-cardid");
  var card = <HTMLImageElement>document.getElementById(cardid);
  //set picked card in placeholder
  card.src = "img/cards/" + symbol + ".svg";
  card.setAttribute("data-symbol", symbol);
  
  modal.modal("hide");
}


var cardPickers = document.getElementsByClassName("cardpick");
for(const cardpick of cardPickers) {
  cardpick.addEventListener("click", openCardPicker);
}

function openCardPicker(e:Event) {
  const id = (<any>e.srcElement).id;
  modal.attr("data-cardid", id);
  modal.modal("show");
}

// function greeter() {
//   console.log(hutchison.texasHoldem({hand: ['Ah', 'Ad']}));
// }
// window.onload = greeter