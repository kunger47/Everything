import Account from "models/budget/Account";
import BudgetModel from "models/budget/BudgetModel";
import ExpenseBudget from "models/budget/ExpenseBudget";
import IncomeSource from "models/budget/IncomeSource";
import Api from "../api";

class BudgetApi {
    //Budget
    createBudget(data: BudgetModel, onSuccess: () => void) {
        return Api.post({ url: `https://localhost:44340/budgets`, body: data, onSuccess });
    }

    getBudgets(onSuccess: (result: BudgetModel[]) => void) {
        return Api.callApi({ url: `https://localhost:44340/budgets`, onSuccess });
    }

    getBudget(id: number, onSuccess: (result: BudgetModel) => void) {
        return Api.callApi({ url: `https://localhost:44340/budgets/${id}`, onSuccess });
    }

    updateBudget(data: BudgetModel, onSuccess: () => void) {
        return Api.put({ url: `https://localhost:44340/budgets`, body: data, onSuccess });
    }

    removeBudget(id: number, onSuccess: () => void) {
        return Api.delete({ url: `https://localhost:44340/budgets/${id}`, onSuccess });
    }

    //Accounts
    createAccount(data: Account, onSuccess: () => void) {
        return Api.post({ url: `https://localhost:44340/accounts`, body: data, onSuccess });
    }

    getAccounts(budgetId: number, onSuccess: (result: Account[]) => void) {
        return Api.callApi({ url: `https://localhost:44340/accounts/forbudget/${budgetId}`, onSuccess });
    }

    updateAccount(data: Account, onSuccess: () => void) {
        return Api.put({ url: `https://localhost:44340/accounts`, body: data, onSuccess });
    }

    removeAccount(id: number, onSuccess: () => void) {
        return Api.delete({ url: `https://localhost:44340/accounts/${id}`, onSuccess });
    }

    //IncomeSources
    getIncomeSourcesForBudget(budgetId: number, onSuccess: (result: IncomeSource[]) => void) {
        return Api.callApi({ url: `https://localhost:44340/incomesources/forBudget/${budgetId}`, onSuccess });
    }

    createIncomeSource(data: IncomeSource, onSuccess: () => void) {
        return Api.post({ url: `https://localhost:44340/incomesources`, body: data, onSuccess });
    }

    updateIncomeSource(data: IncomeSource, onSuccess: () => void) {
        return Api.put({ url: `https://localhost:44340/incomesources`, body: data, onSuccess });
    }

    removeIncomeSource(id: number, onSuccess: () => void) {
        return Api.delete({ url: `https://localhost:44340/incomesources/${id}`, onSuccess });
    }

    //ExpenseBudgets
    getExpenseBudgetForBudget(budgetId: number, onSuccess: (result: ExpenseBudget[]) => void) {
        return Api.callApi({ url: `https://localhost:44340/expensebudgets/forBudget/${budgetId}`, onSuccess });
    }

    createExpenseBudget(data: ExpenseBudget, onSuccess: () => void) {
        return Api.post({ url: `https://localhost:44340/expensebudgets`, body: data, onSuccess });
    }

    updateExpenseBudget(data: ExpenseBudget, onSuccess: () => void) {
        return Api.put({ url: `https://localhost:44340/expensebudgets`, body: data, onSuccess });
    }

    removeExpenseBudget(id: number, onSuccess: () => void) {
        return Api.delete({ url: `https://localhost:44340/expensebudgets/${id}`, onSuccess });
    }
}

export default new BudgetApi();