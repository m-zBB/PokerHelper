import { HandEstimator, Player } from "./hand-estimator";
import { Card } from '../models/card.models';
import { create2Cards, create5Cards } from './hand-estimator.spec';
import { monteCarloNew } from './simulator-new';
import { monteCarlo } from './simulator';

describe('monteCarloSimulation', () => {

//to do new tests

    it('new and old simulation should return similar value', () => {
        checkNewAndOldSimulationIsSimilar(["As", "Kh"], ["Tc", "8s", "Qd", "3d", "5h"])
    });
}
)

function checkNewAndOldSimulationIsSimilar(h: string[], t: string[]) {
    const hand: Card[] = create2Cards(h[0], h[1])
    const table: Card[] = create5Cards(t[0], t[1], t[2], t[3], t[4])
    const resultNew = monteCarloNew(hand, table, 2, 1000)
    const resultOld = monteCarlo(hand.map(card => card.getSymbolForPokerCalcLib())
        , table.map(card => card.getSymbolForPokerCalcLib()), 2, 1000)

    expect(Math.abs(resultNew[0] - resultOld[0])).toBeLessThan(0.05);
    expect(Math.abs(resultNew[1] - resultOld[1])).toBeLessThan(0.05);
    expect(Math.abs(resultNew[2] - resultOld[2])).toBeLessThan(0.05);
}



