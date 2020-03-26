import { HandEstimator } from "./hand-estimator";
import { Card } from '../models/card.models';

describe('HandEstimator', () => {

    it('should return 7 for high card 7', () => {
        expect(HandEstimator.estimate(toCards("2c", "3c", "4c", "5c", "7h"))).toEqual(7);
    });

    it('should return 14 for high card ace', () => {
        expect(HandEstimator.estimate(toCards("2c", "3c", "4c", "5c", "Ah"))).toEqual(14);
    });
});

function toCards(card1: string, card2: string, card3: string, card4: string, card5: string): Card[] {

}