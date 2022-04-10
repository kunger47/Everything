export default class GameQuestionCategory {
    id: number = 0;
    name: string | null = null;
    gameQuestions: GameQuestion[] = [];

    constructor(init?: Partial<GameQuestionCategory>) {
        Object.assign(this, init);
    }
}

export class GameQuestion {
    id: number = 0;
    statement: string = '';
    answer: string = '';
    round: number = 1;
    points: number = 0;
    isDouble: boolean = false;
    isFinal: boolean = false;
    nobodyGotRight: boolean = false;

    constructor(init?: Partial<GameQuestion>) {
        Object.assign(this, init);
    }
}