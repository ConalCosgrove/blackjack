import { stdin } from 'process';
import { createInterface } from 'readline';
import {createCard} from '../src/Card';
import { Player } from '../src/Player';
import { PlayerInputPrompter } from '../src/PlayerInputPrompter';

describe('functionality of player class', () => {
    const prompter = new PlayerInputPrompter(createInterface({input: stdin}));
    const aceOfSpades = createCard("Ace", "spades");
    const aceOfHearts = createCard("Ace", "hearts");
    const fiveOfClubs = createCard(5, "clubs");
    const tenOfDiamonds = createCard(10, "diamonds");
    const player = new Player(false, 'Conal', prompter);

    describe('getHandValue()', () => {
        beforeEach(() => {
            player.resetHand();
        });
    
        it('getHandValue function reflects player\'s current hand. No Aces', () => {
            expect(player.getHandValue()).toEqual([0]);
            player.addToHand(fiveOfClubs);
            player.addToHand(tenOfDiamonds);
            expect(player.getHandValue()).toEqual([15]);
        }); 
    
        it('getHandValue function returns both possible hand values with one Ace', () => {
            expect(player.getHandValue()).toEqual([0]);
            player.addToHand(fiveOfClubs);
            player.addToHand(aceOfSpades);
            expect(player.getHandValue()).toEqual([6, 16]);
        });
    
        it('getHandValue function returns 3 possible hand values with two Aces', () => {
            expect(player.getHandValue()).toEqual([0]);
            player.addToHand(aceOfHearts);
            player.addToHand(aceOfSpades);
            expect(player.getHandValue()).toEqual([2, 12, 22]);
        });
    });

    describe('addWinnings()', () => {
        it('Adds the amount to the player\'s money and resets their bet', () => {
            const prompter = new PlayerInputPrompter(createInterface({input: stdin}));
            const player = new Player(false, 'Test', prompter);
            player.bet = 20;
            player.money = 5;
            player.addWinnings(20);
            expect(player.money).toBe(25);
            expect(player.bet).toBe(0);
        });
    });

    describe('getMaxValidHandValue()', () => {
        const player = new Player(false, "Test", prompter);
        beforeEach(() => {
            player.resetHand();
        });
        it('Returns the maximum possible value of the hand that is below 22', () => {
            player.hand = [createCard('Ace', 'clubs'), createCard('Ace', 'hearts'), createCard(10, 'diamonds')];
            expect(player.getMaxValidHandValue()).toBe(12);
        });
        it('Returns 0 if there are no valid values from players hand', () => {
            player.hand = [createCard('Ace', 'clubs'), createCard('Ace', 'diamonds'), createCard('King', 'diamonds'), createCard('Jack', 'clubs')];
            expect(player.getMaxValidHandValue()).toBe(0);
        });
    });
   
});