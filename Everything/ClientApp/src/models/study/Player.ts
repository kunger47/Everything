export default class Player {
    id: number = 0;
    name: string | null = null;
    amount: number | null = null;
    gameId: number | null = null;
    colorHexCode: string | null = null;
    playerNumber: number | null = null;
    numberOfRightAnswers: number = 0;
    numberOfWrongAnswers: number = 0;

    constructor(init?: Partial<Player>) {
        Object.assign(this, init);
    }
}