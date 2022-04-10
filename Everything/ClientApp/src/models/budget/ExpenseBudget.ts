export default class ExpenseBudget {
    id: number = 0;
    name: string | null = null;
    description: string = '';
    amount: number = 0;
    isActual: boolean = false;
    budgetId: number = 0;

    constructor(init?: Partial<ExpenseBudget>) {
        Object.assign(this, init);
    }
}