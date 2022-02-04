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
const Deck_1 = require("./Deck");
const Game_1 = require("./Game");
const Player_1 = require("./Player");
const PlayerInputPrompter_1 = require("./PlayerInputPrompter");
const readline_1 = require("readline");
const rl = (0, readline_1.createInterface)({
    input: process.stdin,
    output: process.stdout
});
function runGame() {
    return __awaiter(this, void 0, void 0, function* () {
        const playerPrompter = new PlayerInputPrompter_1.PlayerInputPrompter(rl);
        const deck = new Deck_1.Deck((0, Deck_1.createStandardDeck)());
        deck.shuffle();
        const playerName = yield playerPrompter.prompt('What is your name?');
        // Adding players - one playable, and one computer
        const playerOne = new Player_1.Player(false, playerName, playerPrompter);
        const playerTwo = new Player_1.Player(true, "Computer", playerPrompter);
        const game = new Game_1.Game(deck, [playerOne, playerTwo], playerPrompter);
        game.start();
    });
}
runGame();
