"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCard = void 0;
function createCard(cardIndex, suit) {
    return { name: `${cardIndex} of ${suit}`, cardIndex, suit };
}
exports.createCard = createCard;
