
import {TexasHoldem} from "poker-odds-calc"

import Board from "poker-odds-calc/dts/lib/Board"

function greeter() {
    const Table = new TexasHoldem();
    Table
      .addPlayer(["Qs", "Ks"])
      .addPlayer(["Qd", "Kd"])
      .boardAction((board: Board) => {
        board
          .setFlop(["Js", "Ts", "5h"])
          .setTurn("Td")
      });
    
    const Result = Table.calculate();
    
    Result.getPlayers().forEach(player => {
      console.log(`${player.getName()} - ${player.getHand()} - Wins: ${player.getWinsPercentageString()} - Ties: ${player.getTiesPercentageString()}`);
    });
    
    console.log(`Board: ${Result.getBoard()}`);
    console.log(`Iterations: ${Result.getIterations()}`);
    console.log(`Time takes: ${Result.getTime()}ms`);
}

window.onload = greeter