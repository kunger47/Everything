import Page from 'components/Layout/PageLayout';
import BudgetModel from 'models/budget/BudgetModel';
import React, { useEffect, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import budgetApi from 'services/apis/budget-api';
import { useLocation } from 'react-router-dom';

import './Budget.scss';
import Accounts from './Accounts';
import Incomes from './Incomes';
import ExpenseBudgets from './ExpenseBudgets';
import Expenses from './Expenses';
import { isANumberAndGreaterThan0 } from 'services/number-helper';

const Budget = () => {
    const search = useLocation().search;
    const budgetIdParam = new URLSearchParams(search).get('budgetId');
    const [budgetId, setBudgetId] = useState<number>(0);
    const [budget, setBudget] = useState<BudgetModel>();
    const [blurred, setBlurred] = useState<boolean>(true);

    useEffect(() => {
        setBudgetId(parseInt(budgetIdParam ?? ""));
    }, [budgetIdParam]);

    useEffect(() => {
        refreshBudget();
    }, [budgetId]);

    const refreshBudget = () => {
        if (isANumberAndGreaterThan0(budgetId))
            budgetApi.getBudget(budgetId, setBudget);
    }

    return (
        <Page title={budget?.name ?? ""} titlePlaceholder="+ Add Budget Name" classNameExtension='budgeting' saveUpdate={() => { }}>
            {!!budget &&
                <>
                    <Col className="e-column">
                        <Row>
                            <Col xs={11} className="e-item-col">
                                <div className="e-item-block e-add-item">
                                    {!!budget.description
                                        ? <p>budget.description</p>
                                        : <p>Add Description +</p>}
                                </div>
                            </Col>
                            <Col xs={1}>
                                <Button onClick={() => setBlurred(!blurred)}>
                                    {blurred ? 'Show' : 'Hide'}
                                </Button>
                            </Col>
                        </Row>
                        <Row>
                            <Accounts budgetId={budget.id} blurred={blurred} />
                            <Incomes budgetId={budget.id} blurred={blurred} />
                            <ExpenseBudgets budgetId={budget.id} blurred={blurred} />
                            <Expenses budgetId={budget.id} blurred={blurred} />
                        </Row>
                    </Col>
                </>
            }
        </Page >
    )
};

export default Budget;