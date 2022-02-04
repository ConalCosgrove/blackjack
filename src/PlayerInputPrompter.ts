import { Interface } from 'readline';

export class PlayerInputPrompter {
    rl: Interface;
    constructor(readlineInterface: Interface) {
        this.rl = readlineInterface;
    }

    async prompt(question: string): Promise<string> {
        return await new Promise((resolve) => {
            this.rl.question(question + '\n', (answer) => {
                console.log('\n');
                resolve(answer);
            });
        });
    }
}