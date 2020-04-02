import { HandEstimator } from "./hand-estimator";
import { Card } from '../models/card.models';

describe('HandEstimator', () => {

    const expectedError = "HandEstimator.estimate requires array of five not empty cards"

    it('should throw error on undefined', () =>{
        expect(() => HandEstimator.estimate(undefined)).toThrowError(expectedError)
    });

    it('should return error on empty array', () =>{
        expect(() => HandEstimator.estimate([])).toThrowError(expectedError)
    });

    it('should return error on too short array', () =>{
        expect(() => HandEstimator.estimate([new Card(), new Card()])).toThrowError(expectedError)
    });

    it('should return error when any card is not set', () =>{
        expect(() => HandEstimator.estimate([new Card(), new Card(), new Card(), new Card(), new Card()])).toThrowError(expectedError)
    });

    it('should return 7 for high card seven', () => {
        expect(HandEstimator.estimate(toCards("2c", "3c", "4c", "5c", "7h"))).toEqual(75432);
    });

    it('should return 14 for high card ace', () => {
        expect(HandEstimator.estimate(toCards("2c", "3c", "4c", "5c", "Ah"))).toEqual(145432);
    });

    it('should return 1003364 for one pair of twos', () => {
        expect(HandEstimator.estimate(toCards("2c", "6d", "4c", "2d", "Kh"))).toEqual(1003364);
    });

    it('should return 1010762 for one pair of twos', () => {
        expect(HandEstimator.estimate(toCards("Tc", "6d", "Tc", "2d", "7h"))).toEqual(1010762);
    });

    it('should return 2001434 for two pairs', () => {
        expect(HandEstimator.estimate(toCards("Qc", "Qd", "Ac", "Kd", "Kh"))).toEqual(2001434);
    });

    it('should return 2000986 for two pairs', () => {
        expect(HandEstimator.estimate(toCards("8c", "9d", "8c", "6d", "9h"))).toEqual(2000986);
    });

    it('should return 3000986 for three of a kind', () => {
        expect(HandEstimator.estimate(toCards("9c", "9d", "8c", "6d", "9h"))).toEqual(3000986);
    });

    it('should return 3001364 for three of a kind', () => {
        expect(HandEstimator.estimate(toCards("Kc", "6d", "Kd", "Kh", "4h"))).toEqual(3001364);
    });

    it('should return 4000126 for four of a kind', () => {
        expect(HandEstimator.estimate(toCards("Qc", "6d","Qd", "Qh", "Qs"))).toEqual(4000126);
    });

    it('should return 4000072 for four of a kind', () => {
        expect(HandEstimator.estimate(toCards("6c", "6d","Qd", "6h", "6s"))).toEqual(4000072);
    });
});



function toCards(card1: string, card2: string, card3: string, card4: string, card5: string): Card[] {
    return [Card.fromString(card1), Card.fromString(card2), Card.fromString(card3),
            Card.fromString(card4), Card.fromString(card5),]
}
