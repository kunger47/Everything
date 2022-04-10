export type QuestionDifficultyType = 0 | 1 | 2 | 3 | 4 | 5;

export default class Question {
    id: number = 0;
    statement: string = '';
    answer: string | null = null;
    categoryId: number = 0;
    difficulty: QuestionDifficultyType = 1;

    constructor(init?: Partial<Question>) {
        Object.assign(this, init);
    }
}