import { Card, Suit, CardIndex, createCard } from "./Card";

export class Deck {
    cards: Card[];
    constructor(cards: Card[]) {
        this.cards = cards;
    }
    getCurrentSize() { return this.cards.length};

    shuffle() { this.cards.sort((a, b) => 0.5 - Math.random())};

    dealNextCard() { return this.cards.pop()};

    getRemainingCards() {return this.cards};
}

const listOfSuits: Suit[] = ["clubs", "spades", "diamonds", "hearts"];
const listOfCardIndicies: CardIndex[] = ["Ace", 2, 3, 4, 5, 6, 7, 8, 9, 10, "Jack", "Queen", "King"];

export function createStandardDeck(): Card[] {
    const deck: Card[] = [];
    for (let i = 1; i <= 52; i++) {
        const cardIndex = listOfCardIndicies[(i - 1) % 13];
        const suit = listOfSuits[Math.floor((i-1) / 13)];
        const card = createCard(cardIndex, suit);
        deck.push(card);
    }
    return deck;
}