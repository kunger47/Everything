export default class Expense {
    id: number = 0;
    name: string | null = null;
    date: Date | null = null;
    description: string = '';
    amount: number = 0;

    constructor(init?: Partial<Expense>) {
        Object.assign(this, init);
    }
}