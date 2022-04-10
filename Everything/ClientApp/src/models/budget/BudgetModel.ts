import Account from "./Account";
import ExpenseBudget from "./ExpenseBudget";
import IncomeSource from "./IncomeSource";

export default class BudgetModel {
    id: number = 0;
    name: string | null = null;
    description?: string = '';
    isActive: boolean = false;
    createdDate: Date | null = null;
    accounts: Account[] = [];
    incomeSources: IncomeSource[] = [];
    expenseBudgets: ExpenseBudget[] = [];

    constructor(init?: Partial<BudgetModel>) {
        Object.assign(this, init);
    }
}