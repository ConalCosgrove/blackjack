import { Card, Suit, CardIndex } from './Card';
import { createStandardDeck, Deck } from './Deck';
import { Game } from './Game';
import { Player } from './Player';
import { PlayerInputPrompter } from './PlayerInputPrompter';

import {createInterface } from 'readline';

const rl = createInterface({
    input: process.stdin,
    output: process.stdout
});

async function runGame() {
    const playerPrompter = new PlayerInputPrompter(rl);

    const deck = new Deck(createStandardDeck());
    deck.shuffle();

    const playerName = await playerPrompter.prompt('What is your name?');

    // Adding players - one playable, and one computer
    const playerOne = new Player(false, playerName, playerPrompter);
    const playerTwo = new Player(true, "Computer", playerPrompter);

    const game = new Game(deck, [playerOne,playerTwo], playerPrompter);
    game.start();
}

runGame();