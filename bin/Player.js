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
exports.Player = void 0;
class Player {
    constructor(isPC, name, inputPrompter) {
        this.hand = [];
        this.bet = 0;
        this.money = 40;
        this.isActive = true;
        this.isPC = isPC;
        this.name = name;
        this.prompter = inputPrompter;
    }
    addToHand(card) {
        this.hand.push(card);
    }
    getHand() {
        return this.hand;
    }
    getHandString() {
        return this.getHand().map(hand => hand.name).join(', ');
    }
    getHandValue() {
        const handValues = [];
        let totalValueIfAcesAreOne = 0;
        let numberOfAces = 0;
        this.hand.forEach(({ cardIndex }) => {
            switch (cardIndex) {
                case "Ace":
                    numberOfAces++;
                    totalValueIfAcesAreOne += 1;
                    break;
                case "Jack":
                case "Queen":
                case "King":
                    totalValueIfAcesAreOne += 10;
                    break;
                default:
                    totalValueIfAcesAreOne += cardIndex;
            }
        });
        handValues.push(totalValueIfAcesAreOne);
        for (let i = 1; i <= numberOfAces; i++) {
            handValues.push(totalValueIfAcesAreOne + (i * 10));
        }
        return handValues;
    }
    getMaxValidHandValue() {
        return Math.max(...this.getHandValue().filter(v => v < 22), 0);
    }
    getHandValueString() {
        return this.getHandValue().join(' or ');
    }
    hasNatural() {
        return this.getHandValue().some((value) => value === 21);
    }
    resetHand() {
        this.hand = [];
    }
    resetBet() {
        this.bet = 0;
    }
    getIsBust() {
        return !this.getHandValue().some((handValue) => handValue < 22);
    }
    promptForBet() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isPC) {
                return Math.floor(this.money / 2);
            }
            let nextBet = -1;
            while (nextBet === -1) {
                const response = yield this.prompter.prompt(`${this.name}, how much do you wish to bet? (You have $${this.money} remaining)`);
                const responseAsNumber = Number(response);
                if (isNaN(responseAsNumber)) {
                    console.log(`${response} is not a valid input. Please input a number.`);
                    continue;
                }
                else if (responseAsNumber > this.money) {
                    console.log(`You don\'t have enough money to place a bet of $${response}! Please place a bet less than or equal to $${this.money}`);
                    continue;
                }
                else if (responseAsNumber < 2) {
                    console.log(`Your bet must be above $2!`);
                    continue;
                }
                this.money -= responseAsNumber;
                this.bet += responseAsNumber;
                nextBet = responseAsNumber;
            }
            return nextBet;
        });
    }
    getBet() {
        return this.bet;
    }
    addWinnings(prizeMoney) {
        this.money += prizeMoney;
        this.resetBet();
    }
    promptToHitOrStand() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isPC) {
                const hasTwentyOne = this.getHandValue().some((value) => value === 21);
                const lowestPossibleValue = this.getHandValue().reduce((previous, current) => previous > current ? current : previous);
                if (hasTwentyOne || lowestPossibleValue > 17) {
                    console.log('stand\n');
                    return "stand";
                }
                else {
                    console.log('hit\n');
                    return Promise.resolve('hit');
                }
            }
            else {
                let response = '';
                do {
                    response = yield this.prompter.prompt('Would you like to hit or stand?');
                    if (response !== 'hit' && response !== 'stand')
                        console.log('Please enter \'hit\' or \'stand\'');
                } while (response.toLowerCase() !== 'hit' && response.toLowerCase() !== 'stand');
                if (response.toLowerCase() === 'hit')
                    return 'hit';
                return 'stand';
            }
        });
    }
    setIsActive(value) {
        this.isActive = value;
    }
}
exports.Player = Player;
