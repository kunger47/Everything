export default class Game {
    id: number = 0;
    name: string | null = null;
    date: Date | null = null;

    constructor(init?: Partial<Game>) {
        Object.assign(this, init);
    }
}