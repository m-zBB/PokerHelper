import { HandEstimator, Player } from "./hand-estimator";
import { Card } from '../models/card.models';

describe('getHandValue', () => {

    const expectedError = "HandEstimator.estimate requires array of five not empty cards"

    it('should throw error on undefined', () =>{
        expect(() => HandEstimator.getHandValue(undefined)).toThrowError(expectedError)
    });

    it('should return error on empty array', () =>{
        expect(() => HandEstimator.getHandValue([])).toThrowError(expectedError)
    });

    it('should return error on too short array', () =>{
        expect(() => HandEstimator.getHandValue([new Card(), new Card()])).toThrowError(expectedError)
    });

    it('should return error when any card is not set', () =>{
        expect(() => HandEstimator.getHandValue([new Card(), new Card(), new Card(), new Card(), new Card()])).toThrowError(expectedError)
    });

    it('should return error when cards are not unique', () =>{
        expect(() => HandEstimator.getHandValue(create5Cards("2c", "4d", "2c", "8d", "2d")))
        .toThrowError("HandEstimator.estimate requires array of five unique cards")
    });

    it('should return 7 for high card seven', () => {
        expect(HandEstimator.getHandValue(create5Cards("2c", "3c", "4c", "5c", "7h"))).toEqual(75432);
    });

    it('should return 14 for high card ace', () => {
        expect(HandEstimator.getHandValue(create5Cards("9c", "3c", "4c", "5c", "Ah"))).toEqual(149543);
    });

    it('should return 1003364 for one pair of twos', () => {
        expect(HandEstimator.getHandValue(create5Cards("2c", "6d", "4c", "2d", "Kh"))).toEqual(1003364);
    });

    it('should return 1010762 for one pair of twos', () => {
        expect(HandEstimator.getHandValue(create5Cards("Tc", "6d", "Td", "2d", "7h"))).toEqual(1010762);
    });

    it('should return 2001434 for two pairs', () => {
        expect(HandEstimator.getHandValue(create5Cards("Qc", "Qd", "Ac", "Kd", "Kh"))).toEqual(2001434);
    });

    it('should return 2000986 for two pairs', () => {
        expect(HandEstimator.getHandValue(create5Cards("8c", "9d", "8h", "6d", "9h"))).toEqual(2000986);
    });

    it('should return 3000986 for three of a kind', () => {
        expect(HandEstimator.getHandValue(create5Cards("9c", "9d", "8c", "6d", "9h"))).toEqual(3000986);
    });

    it('should return 3001364 for three of a kind', () => {
        expect(HandEstimator.getHandValue(create5Cards("Kc", "6d", "Kd", "Kh", "4h"))).toEqual(3001364);
    });

    it('should return 7000126 for four of a kind', () => {
        expect(HandEstimator.getHandValue(create5Cards("Qc", "6d", "Qd", "Qh", "Qs"))).toEqual(7000126);
    });

    it('should return 7000072 for four of a kind', () => {
        expect(HandEstimator.getHandValue(create5Cards("6c", "6d", "Qd", "6h", "6s"))).toEqual(7000072);
    });

    it('should return 6000082 for full house', () => {
        expect(HandEstimator.getHandValue(create5Cards("7c", "7d", "Qd", "7h", "Qs"))).toEqual(6000082);
    });

    it('should return 6000026 for full house', () => {
        expect(HandEstimator.getHandValue(create5Cards("6c", "6d", "2d", "2h", "2s"))).toEqual(6000026);
    });

    it('should not return straight for pair', () => {
        expect(HandEstimator.getHandValue(create5Cards("Tc", "Td", "Ad", "Qh", "Ks"))).toEqual(1011542);
    });

    it('should not return straight for two pair', () => {
        expect(HandEstimator.getHandValue(create5Cards("Ac", "Td", "Ad", "Th", "Js"))).toEqual(2001511);
    });

    it('should not return straight for three of a kind', () => {
        expect(HandEstimator.getHandValue(create5Cards("Tc", "Jd", "Ad", "Jh", "Js"))).toEqual(3001250);
    });

    it('should return proper value for straight with ace as one', () => {
        expect(HandEstimator.getHandValue(create5Cards("2s", "5s", "Ad", "4s", "3s"))).toEqual(4000005);
    });

    it('should return proper value for straight', () => {
        expect(HandEstimator.getHandValue(create5Cards("6s", "4c", "2d", "5s", "3d"))).toEqual(4000006);
    });

    it('should return proper value for straight', () => {
        expect(HandEstimator.getHandValue(create5Cards("As", "Tc", "Qd", "Jc", "Kh"))).toEqual(4000014);
    });

    it('should return proper value for flush', () => {
        expect(HandEstimator.getHandValue(create5Cards("2c", "3c", "4c", "5c", "7c"))).toEqual(5075432);
    });

    it('should return proper value for flush  with ace', () => {
        expect(HandEstimator.getHandValue(create5Cards("9h", "3h", "4h", "5h", "Ah"))).toEqual(5149543);
    });

    it('should return proper value for straight flush with ace as one', () => {
        expect(HandEstimator.getHandValue(create5Cards("2s", "5s", "As", "4s", "3s"))).toEqual(8000005);
    });

    it('should return proper value for straight flush', () => {
        expect(HandEstimator.getHandValue(create5Cards("6d", "4d", "2d", "5d", "3d"))).toEqual(8000006);
    });

    it('should return proper value for straight flush', () => {
        expect(HandEstimator.getHandValue(create5Cards("Ah", "Th", "Qh", "Jh", "Kh"))).toEqual(8000014);
    });

    it('should not return straight for high card', () => {
        expect(HandEstimator.getHandValue(create5Cards("Qd", "2d", "Th", "4s", "Ah"))).toEqual(153042);
    });

    it('should not fuck up', () => {
        expect(HandEstimator.getHandValue(create5Cards("Qd", "2d", "Th", "4s", "Ah"))).toEqual(153042);
    });



});


describe('getWinners', () => {

    it('should return best hand from straight and four of a kind', () => {
        const players = createPlayers([["6h", "7s"], ["2s", "2d"]])
        expect(HandEstimator.getWinners(create5Cards("2c", "3c", "4c", "5c", "2h"), players)[0].name)
        .toEqual("2");
    });

    it('should return best hand from two pairs and high card', () => {
        const players = createPlayers([["Qc", "Ac"], ["5s", "7c"]])
        expect(HandEstimator.getWinners(create5Cards("Ah","Qd","Th","2c","4h"), players)[0].name)
        .toEqual("1");
    });
});

describe('getPlayerBestHand', () => {

    it('should return best hand for straight', () => {
        expect(HandEstimator.getPlayerBestHand(create5Cards("2c", "3c", "4c", "5c", "7h"), create2Cards("6h", "7s")))
        .toEqual(4000007);
    });

});

function createPlayers(playersCards: string[][]): Player[] {
    return playersCards.map((cards, index) => new Player((index + 1).toString(), create2Cards(cards[0], cards[1])))
}

function create2Cards(card1: string, card2: string): Card[] {
    return [Card.fromString(card1), Card.fromString(card2)]
}


function create5Cards(card1: string, card2: string, card3: string, card4: string, card5: string): Card[] {
    return [Card.fromString(card1), Card.fromString(card2), Card.fromString(card3),
            Card.fromString(card4), Card.fromString(card5)]
}
