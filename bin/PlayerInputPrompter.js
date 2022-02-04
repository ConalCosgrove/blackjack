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
exports.PlayerInputPrompter = void 0;
class PlayerInputPrompter {
    constructor(readlineInterface) {
        this.rl = readlineInterface;
    }
    prompt(question) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new Promise((resolve) => {
                this.rl.question(question + '\n', (answer) => {
                    console.log('\n');
                    resolve(answer);
                });
            });
        });
    }
}
exports.PlayerInputPrompter = PlayerInputPrompter;
