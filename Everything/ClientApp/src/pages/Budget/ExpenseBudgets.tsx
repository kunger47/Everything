import SaveOnBlurInput from 'components/Form/SaveOnBlurInput';
import ExpenseBudget from 'models/budget/ExpenseBudget';
import React, { useEffect, useRef, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import budgetApi from 'services/apis/budget-api';
import { sumByProperty } from 'services/array-helpers';
import { formatAsCurrency } from 'services/formatters';

import './Budget.scss';
import ExpenseBudgetRow from './ExpenseBudgetRow';

interface Props {
    budgetId: number;
    blurred: boolean;
}

const ExpenseBudgets = (props: Props) => {
    const addRef = useRef<HTMLInputElement>(null);
    const [budgets, setBudgets] = useState<ExpenseBudget[]>([]);
    const [isAdding, setIsAdding] = useState<boolean>(false);
    const [newItem, setNewItem] = useState<ExpenseBudget>(new ExpenseBudget());
    const [total, setTotal] = useState<number>(0);

    useEffect(() => {
        refreshBudgets();
    }, [props.budgetId]);

    useEffect(() => {
        if (isAdding && !!addRef?.current)
            addRef.current.focus();
    }, [isAdding]);

    useEffect(() => {
        setTotal(sumByProperty(budgets, "amount"));
    }, [budgets])

    const refreshBudgets = () => {
        budgetApi.getExpenseBudgetForBudget(props.budgetId, setBudgets);
    }

    const saveNew = (value: string) => {
        budgetApi.createExpenseBudget({ ...newItem, name: value, budgetId: props.budgetId }, onSuccessfulAdd);
    }

    const indicateNoLongerAdding = () => {
        setIsAdding(false);
        setNewItem(new ExpenseBudget());
    }

    const onSuccessfulAdd = () => {
        indicateNoLongerAdding();
        refreshBudgets();
    }

    return (
        <Col xs={12} md={6} className='e-column e-table-column'>
            <Row>
                <Col className="e-column-title">Expense Budgets</Col>
            </Row>
            {
                !!budgets && budgets.map(i =>
                    <ExpenseBudgetRow budget={i} reload={refreshBudgets} blurred={props.blurred} key={i.id} />
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
                            inputName="New Budget Name"
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

export default ExpenseBudgets;