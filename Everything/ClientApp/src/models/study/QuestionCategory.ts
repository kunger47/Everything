export default class QuestionCategory {
    id: number = 0;
    name: string | null = null;
    isSelected: boolean = false;
    containsAllDifficulties: boolean = false;

    constructor(init?: Partial<QuestionCategory>) {
        Object.assign(this, init);
    }
}