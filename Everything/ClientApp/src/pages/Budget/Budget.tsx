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
        if (!!budgetId && !isNaN(budgetId))
            budgetApi.getBudget(budgetId, setBudget);
    }

    return (
        <Page title={budget?.name ?? ""} classNameExtension='budgeting'>
            {!!budget &&
                <>
                    <Col className="e-column">
                        <Row>
                            <Col xs="3" className="e-item-col">
                                <div className="e-item-block e-budget-title">
                                    {budget.name}
                                </div>
                            </Col>
                            <Col xs="8" className="e-item-col">
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
                        </Row>
                    </Col>
                </>
            }
        </Page >
    )
};

export default Budget;