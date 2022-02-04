export type Suit = "clubs" | "spades" | "diamonds" | "hearts";
export type CardIndex = "Ace" | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | "Jack" | "Queen" | "King";

export type Card = {
    name: string,
    cardIndex: CardIndex,
    suit: Suit,
}

export function createCard(cardIndex: CardIndex, suit: Suit): Card {
    return {name: `${cardIndex} of ${suit}`, cardIndex, suit};
}