import { Deck } from '../src/Deck';
import { createStandardDeck } from '../src/Deck';


describe('Testing functionality of the Deck class', () => {
    const cards = createStandardDeck();
    const deck = new Deck(cards);
    
    it('deals the next card, and removes that card from the deck', () => {
        expect(deck.getCurrentSize() === 52);
        // Checking we can find top card while it's still in deck
        const topCard = deck.getRemainingCards()[deck.getCurrentSize() - 1];
        expect(deck.getRemainingCards().includes(topCard)).toBe(true);
        
        // Dealing the first card and ensuring we can't find it
        const topCardDealt = deck.dealNextCard();
        expect(topCard).not.toBe(undefined);
        expect(topCardDealt).toEqual(topCard);
        if (topCard !== undefined) {
            expect(deck.getCurrentSize()).toBe(51);
            const searchForDealtCard = deck.getRemainingCards().includes(topCard);
            expect(searchForDealtCard).toBe(false);
        }
    });
});

describe('Testing setup functionality', () => {
    test('should create a deck with each of the 13 cards in each suit', () => {
        const deck = createStandardDeck();
        expect(deck.length).toBe(52);
        const hearts = deck.filter(({suit}) => suit === "hearts");
        const diamonds = deck.filter(({suit}) => suit === "diamonds");
        const clubs = deck.filter(({suit}) => suit === "clubs");
        const spades = deck.filter(({suit}) => suit === 'spades');
        expect(hearts.length).toBe(13);
        expect(diamonds.length).toBe(13);
        expect(spades.length).toBe(13);
        expect(clubs.length).toBe(13);
        
    });
});