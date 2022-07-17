import SaveOnBlurInput from 'components/Form/SaveOnBlurInput';
import Expense from 'models/budget/Expense';
import React, { useEffect, useRef, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import budgetApi from 'services/apis/budget-api';
import { sumByProperty } from 'services/array-helpers';
import { formatAsCurrency } from 'services/formatters';

import './Budget.scss';
import ExpenseRow from './ExpenseRow';

interface Props {
    budgetId: number;
    blurred: boolean;
}

const Expenses = (props: Props) => {
    const addRef = useRef<HTMLInputElement>(null);
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [isAdding, setIsAdding] = useState<boolean>(false);
    const [newItem, setNewItem] = useState<Expense>(new Expense());
    const [total, setTotal] = useState<number>(0);

    useEffect(() => {
        refreshExpenses();
    }, [props.budgetId]);

    useEffect(() => {
        if (isAdding && !!addRef?.current)
            addRef.current.focus();
    }, [isAdding]);

    useEffect(() => {
        setTotal(sumByProperty(expenses, "amount"));
    }, [expenses])

    const refreshExpenses = () => {
        budgetApi.getExpensesForBudget(props.budgetId, setExpenses);
    }

    const saveNew = (value: string) => {
        // budgetApi.createExpense({ ...newItem, name: value, expenseBudgetId:  }, refreshExpenses);
    }

    const indicateNoLongerAdding = () => {
        setIsAdding(false);
        setNewItem(new Expense());
    }

    const onSuccessfulAdd = () => {
        indicateNoLongerAdding();
        refreshExpenses();
    }

    return (
        <Col xs={12} md={6} className='e-column e-table-column'>
            <Row>
                <Col className="e-column-title">Expenses</Col>
            </Row>
            {
                !!expenses && expenses.map(e =>
                    <ExpenseRow expense={e} reload={refreshExpenses} blurred={props.blurred} key={e.id} />
                )
            }
            <Row className="e-total-row e-negative">
                <Col xs={8} className="e-item-col" onClick={() => setIsAdding(true)}>
                    <div className="e-item-block">Total</div>
                </Col>
                <Col xs={4} className="e-item-col" onClick={() => setIsAdding(true)}>
                    <div className={props.blurred ? "e-blurred-text e-item-block e-item-currency" : "e-item-block e-item-currency e-unblurred-text"}>
                        {formatAsCurrency(total)}
                    </div>
                </Col>
            </Row>
            {!props.blurred && <Row>
                {!isAdding
                    ? <Col className="e-item-col" onClick={() => setIsAdding(true)}>
                        <div className="e-item-block e-add-item">Add +</div>
                    </Col>
                    : <Col>
                        <SaveOnBlurInput
                            ref={addRef}
                            inputName="New Expense Name"
                            value={newItem.name ?? ''}
                            onBlur={saveNew}
                            onBlurNoChange={indicateNoLongerAdding}
                            isRequired
                        />
                    </Col>}
            </Row>}
        </Col>
    )
};

export default Expenses;