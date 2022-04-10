export default class QuestionAnswer {
    id: number | null = null;
    playerId: number | null = null;
    playerName: string = '';
    bet: number | null = null;
    wasRight: boolean | null = null;

    constructor(init?: Partial<QuestionAnswer>) {
        Object.assign(this, init);
    }
}