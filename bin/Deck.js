"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStandardDeck = exports.Deck = void 0;
const Card_1 = require("./Card");
class Deck {
    constructor(cards) {
        this.cards = cards;
    }
    getCurrentSize() { return this.cards.length; }
    ;
    shuffle() { this.cards.sort((a, b) => 0.5 - Math.random()); }
    ;
    dealNextCard() { return this.cards.pop(); }
    ;
    getRemainingCards() { return this.cards; }
    ;
}
exports.Deck = Deck;
const listOfSuits = ["clubs", "spades", "diamonds", "hearts"];
const listOfCardIndicies = ["Ace", 2, 3, 4, 5, 6, 7, 8, 9, 10, "Jack", "Queen", "King"];
function createStandardDeck() {
    const deck = [];
    for (let i = 1; i <= 52; i++) {
        const cardIndex = listOfCardIndicies[(i - 1) % 13];
        const suit = listOfSuits[Math.floor((i - 1) / 13)];
        const card = (0, Card_1.createCard)(cardIndex, suit);
        deck.push(card);
    }
    return deck;
}
exports.createStandardDeck = createStandardDeck;
