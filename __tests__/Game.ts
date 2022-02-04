import { createStandardDeck } from "../src/Deck";
import { createCard } from '../src/Card';
import { Deck } from "../src/Deck";
import { Game } from "../src/Game";
import { Player } from "../src/Player";
import { PlayerInputPrompter } from "../src/PlayerInputPrompter";
import { createInterface } from "readline";


describe('the main game class', () => {
    const deck = new Deck(createStandardDeck());
    const prompter = new PlayerInputPrompter(createInterface({input: process.stdin, output: process.stdout}));
    const playerOne = new Player(true, 'Calculon', prompter);
    const playerTwo = new Player(false, 'Conal', prompter);

    describe('dealToPlayer()', () => {
        const game = new Game(deck, [playerOne, playerTwo], prompter);
        beforeEach(() => {
            playerOne.resetHand();
            playerTwo.resetHand();
        });

        it('updates the players hand with the added card', () => {
            const aceOfClubs = createCard(8, 'clubs');
            game.dealToPlayer(playerOne,aceOfClubs);
            expect(playerOne.getHandString()).toEqual('8 of clubs');
        });
    });

    describe('dealerLoop()', () => {
        const game = new Game(deck, [playerOne, playerTwo], prompter);
        const dealer = new Player(false, 'Dealer', prompter);
        beforeEach(() => {
            playerOne.resetHand();
            playerTwo.resetHand();
        });

        it('Dealer stands if hand is 17 or higher', () => {
            dealer.hand = [createCard(10, 'clubs'), createCard(7, 'diamonds')];
            expect(dealer.getHandValueString()).toBe('17');
            game.dealerLoop(dealer);
            expect(dealer.getHandValueString()).toBe('17');
        });

        it('Dealer hits if hand is 16 or lower', () => {
            dealer.hand = [createCard(10, 'clubs'), createCard(6, 'hearts')];
            expect(dealer.getHandValueString()).toBe('16');
            game.dealerLoop(dealer);
            expect(dealer.getHandValueString()).not.toBe('16');
        });
    });

    describe('dealToEachPlayer()', () => {
        const game = new Game(deck, [playerOne, playerTwo], prompter);

        beforeEach(() => {
            playerOne.resetHand();
            playerTwo.resetHand();
            game.dealer.resetHand();
        });

        it('Deals a card to all players and the dealer', () => {
            expect(playerOne.getHand().length).toEqual(0);
            expect(playerTwo.getHand().length).toEqual(0);
            expect(game.dealer.getHand().length).toEqual(0);
            game.dealToEachPlayer();
            expect(playerOne.getHand().length).toEqual(1);
            expect(playerTwo.getHand().length).toEqual(1);
            expect(game.dealer.getHand().length).toEqual(1);
        });
    });
 
});