export default class Expense {
    id: number = 0;
    name: string = '';
    date: Date | null = null;
    description: string = '';
    amount: number = 0;
    expenseBudgetId: number = 0;

    constructor(init?: Partial<Expense>) {
        Object.assign(this, init);
    }
}