export default class IncomeSource {
    id: number = 0;
    name: string | null = null;
    description: string = '';
    amount: number = 0;
    budgetId: number = 0;

    constructor(init?: Partial<IncomeSource>) {
        Object.assign(this, init);
    }
}