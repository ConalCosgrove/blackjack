"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const Player_1 = require("./Player");
class Game {
    constructor(deck, players, prompter) {
        this.deck = deck;
        this.players = players;
        this.dealer = new Player_1.Player(true, 'Dealer', prompter);
    }
    getNumberOfPlayers() { return this.players.length; }
    ;
    dealToPlayer(player, card) {
        player.addToHand(card);
    }
    printHands() {
        this.players.forEach((player) => {
            console.log(`${player.name}:`);
            console.log(`${player.getHandString()}`);
            console.log(`Hand value: ${player.getHandValueString()}\n`);
        });
        console.log('Dealer:');
        console.log(`${this.dealer.getHand()[0].name} and a face down card\n`);
    }
    reset() {
        [...this.players, this.dealer].forEach((player) => {
            player.resetBet();
            player.resetHand();
            player.setIsActive(true);
        });
    }
    dealToEachPlayer() {
        [...this.players, this.dealer].forEach((player) => {
            const nextCard = this.deck.dealNextCard();
            if (nextCard === undefined) {
                throw Error('Deck has run out of cards!');
            }
            ;
            this.dealToPlayer(player, nextCard);
        });
    }
    hitOrStandLoop(player) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`${player.name}. You currently have a hand of:\n${player.getHandString()} (Value: ${player.getHandValue()})`);
            let latestResponse = 'hit';
            while (latestResponse !== 'stand' && !player.getIsBust()) {
                latestResponse = yield player.promptToHitOrStand();
                if (latestResponse === 'hit') {
                    const nextCard = this.deck.dealNextCard();
                    if (nextCard === undefined) {
                        throw Error('Deck has run out of cards!!! Take a break and come back later.');
                    }
                    this.dealToPlayer(player, nextCard);
                    console.log(`${player.name}'s next card is a ${nextCard.name}. Their hand's value is now ${player.getHandValueString()}`);
                }
            }
            if (player.getIsBust()) {
                console.log(`Oh no! ${player.name} is bust!! Their cards total ${Math.min(...player.getHandValue())}\n`);
                player.setIsActive(false);
            }
        });
    }
    dealerLoop(dealer) {
        console.log(`The dealer's face down card was ${dealer.getHand()[1].name}. Their hand value is ${dealer.getHandValueString()}\n`);
        while (Math.max(...dealer.getHandValue()) < 17) {
            const nextCard = this.deck.dealNextCard();
            if (nextCard === undefined)
                throw Error('The deck is empty! Take a break and come back again.');
            this.dealToPlayer(dealer, nextCard);
            console.log(`The dealer's next card is the ${nextCard.name}. Their new hand value is ${dealer.getHandValueString()}\n`);
        }
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            let roundCounter = 0;
            while (true) {
                this.reset();
                console.log(`*** Round ${++roundCounter} ***`);
                // first round of betting
                for (let i = 0; i < this.players.length; i++) {
                    yield this.players[i].promptForBet();
                }
                // deal first card to each player
                this.dealToEachPlayer();
                // deal second card to each player
                this.dealToEachPlayer();
                this.printHands();
                // check naturals
                const playersWithNaturals = this.players.filter(player => player.hasNatural());
                if (this.dealer.hasNatural()) {
                    console.log(`Dealer has a natural! ${this.dealer.getHand().map(card => card.name).join(', ')}`);
                    console.log('All players with natural have their bets returned, players without naturals lose their bets...');
                    // losers 
                    this.players.filter(player => !player.hasNatural())
                        .forEach((player) => {
                        player.resetBet();
                    });
                    // naturals
                    playersWithNaturals.forEach((player) => {
                        player.addWinnings(player.getBet());
                    });
                    // reset game 
                    continue;
                }
                else {
                    playersWithNaturals.forEach((player) => {
                        console.log(`${player.name} has a natural!`);
                        console.log(`${player.name} receives 1.5x their bet.`);
                        player.addWinnings(player.getBet() * 1.5);
                        console.log(`${player.name} now has $${player.money}\n`);
                        player.setIsActive(false);
                    });
                }
                // go around players asking them if they want to hit or stand
                let activePlayers = this.players.filter(player => player.isActive);
                for (let i = 0; i < activePlayers.length; i++) {
                    const player = activePlayers[i];
                    yield this.hitOrStandLoop(player);
                }
                // refresh which players are still active (not bust or paid out)
                activePlayers = this.players.filter(player => player.isActive);
                if (activePlayers.length === 0)
                    continue;
                // dealer plays their hand
                this.dealerLoop(this.dealer);
                if (this.dealer.getIsBust()) {
                    console.log('The dealer is bust!!! All standing players win their wagers.\n');
                    activePlayers.forEach((player) => {
                        player.addWinnings(player.getBet() * 2);
                    });
                }
                else {
                    console.log(`The dealer stands with a hand of value ${this.dealer.getHandValueString()}\n`);
                    const winners = activePlayers.filter(player => player.getMaxValidHandValue() > this.dealer.getMaxValidHandValue());
                    const draws = activePlayers.filter(player => player.getMaxValidHandValue() === this.dealer.getMaxValidHandValue());
                    winners.forEach((winner) => {
                        console.log(`${winner.name} wins their wager! Receives $${winner.getBet()}\n`);
                        winner.addWinnings(winner.getBet() * 2);
                    });
                    draws.forEach((draw) => {
                        console.log(`${draw.name} has tied with the dealer, they keep their bet.\n`);
                        draw.addWinnings(draw.getBet());
                    });
                }
            }
        });
    }
}
exports.Game = Game;
