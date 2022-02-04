import type { PlayerInputPrompter } from "./PlayerInputPrompter";
import type { Card } from "./Card";

export type PlayerResponse = "hit" | "stand";

export class Player {
    isPC: boolean;
    name: string;
    prompter: PlayerInputPrompter;
    hand: Card[] = [];
    bet: number = 0;
    money: number = 40;
    isActive = true;


    constructor(isPC: boolean, name: string, inputPrompter: PlayerInputPrompter) {
        this.isPC = isPC;
        this.name = name;
        this.prompter = inputPrompter;
    }
    addToHand(card: Card) {
        this.hand.push(card);
    }
    getHand(): Card[] {
        return this.hand;
    }
    getHandString(): string {
        return this.getHand().map(hand => hand.name).join(', ');
    }
    getHandValue(): number[] {
        const handValues: number[] = [];
        let totalValueIfAcesAreOne = 0;
        let numberOfAces = 0;
        this.hand.forEach(({cardIndex}) => {
            switch(cardIndex) {
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
        for(let i = 1; i <= numberOfAces; i++) {
            handValues.push(totalValueIfAcesAreOne + (i * 10));
        }
        return handValues;
    }
    getMaxValidHandValue(): number {
        return Math.max(...this.getHandValue().filter(v=>v<22), 0);
    }
    getHandValueString(): string {
        return this.getHandValue().join(' or ');
    }
    hasNatural(): boolean {
        return this.getHandValue().some((value) => value === 21);
    }
    resetHand(): void {
        this.hand = [];
    }
    resetBet(): void {
        this.bet = 0;
    }
    getIsBust(): boolean {
        return !this.getHandValue().some((handValue) => handValue < 22);
    }
    async promptForBet(): Promise<number> {
        if (this.isPC) {
            return Math.floor(this.money / 2);
        }
        let nextBet = -1;
        while (nextBet === -1) {
            const response = await this.prompter.prompt(`${this.name}, how much do you wish to bet? (You have $${this.money} remaining)`);
            const responseAsNumber = Number(response);
            if (isNaN(responseAsNumber)) {
                console.log(`${response} is not a valid input. Please input a number.`);
                continue;
            } else if (responseAsNumber > this.money) {
                console.log(`You don\'t have enough money to place a bet of $${response}! Please place a bet less than or equal to $${this.money}`);
                continue;
            } else if (responseAsNumber < 2) {
                console.log(`Your bet must be above $2!`);
                continue;
            }
            this.money -= responseAsNumber;
            this.bet += responseAsNumber;
            nextBet = responseAsNumber;
        }
        return nextBet;
    }
    getBet(): number {
        return this.bet;
    }
    addWinnings(prizeMoney: number): void {
        this.money += prizeMoney;
        this.resetBet();
    }
    async promptToHitOrStand(): Promise<PlayerResponse> {
        if (this.isPC) {
            const hasTwentyOne = this.getHandValue().some((value) => value === 21);
            const lowestPossibleValue = this.getHandValue().reduce((previous, current) => previous > current ? current : previous);
            if (hasTwentyOne || lowestPossibleValue > 17) {
                console.log('stand\n');
                return "stand"
            }
            else {
                console.log('hit\n');
                return Promise.resolve('hit');
            }
        } else {
            let response = '';
            do {
                response = await this.prompter.prompt('Would you like to hit or stand?');
                if (response !== 'hit' && response !== 'stand') console.log('Please enter \'hit\' or \'stand\'');
            } while (response.toLowerCase() !== 'hit' && response.toLowerCase() !=='stand');

            if (response.toLowerCase() === 'hit') return 'hit';
            return 'stand';

        }
    } 
    setIsActive(value: boolean): void {
        this.isActive = value;
    }
}