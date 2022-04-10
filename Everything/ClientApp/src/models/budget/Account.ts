export default class Account {
    id: number = 0;
    budgetId: number = 0;
    name: string | null = null;
    description?: string = '';
    amount: number = 0;
    isInvesting: boolean = false;

    constructor(init?: Partial<Account>) {
        Object.assign(this, init);
    }
}