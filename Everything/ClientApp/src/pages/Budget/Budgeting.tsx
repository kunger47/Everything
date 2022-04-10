import Page from 'components/Layout/PageLayout';
import BudgetModel from 'models/budget/BudgetModel';
import React, { useEffect, useRef, useState } from 'react';
import { Button, Col } from 'react-bootstrap';
import budgetApi from 'services/apis/budget-api';
import { Link as ReactLink } from 'react-router-dom';

import './Budget.scss';
import { handleRawInputChange } from 'services/form-helpers';
import Input from 'components/Form/Input';

const Budgeting = () => {
    const [budgets, setBudgets] = useState<BudgetModel[]>([]);
    const [isAdding, setIsAdding] = useState<boolean>(false);
    const [newBudget, setNewBudget] = useState<BudgetModel>(new BudgetModel());
    const addRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        refreshBudgets();
    }, []);

    const refreshBudgets = () => {
        budgetApi.getBudgets(setBudgets);
    }

    const saveNew = () => {
        if (!!newBudget.name?.trim())
            budgetApi.createBudget({ ...newBudget }, refreshBudgets);
        setIsAdding(false);
        setNewBudget(new BudgetModel());
    }

    return (
        <Page title="Budgeting" classNameExtension='budgeting'>
            <Col>
                {budgets.map(b =>
                    <ReactLink to={`/budget?budgetId=${b.id}`}>
                        <Button className="">
                            {b.name}
                        </Button>
                    </ReactLink>
                )}
                {!isAdding
                    ? <Button className="" onClick={() => setIsAdding(true)}>
                        Add Budget
                    </Button>
                    : <Input
                        ref={addRef}
                        inputName={'New Budget Name'}
                        value={newBudget.name ?? undefined}
                        handleInputChange={handleRawInputChange([newBudget, setNewBudget], "name")}
                        onBlur={saveNew}
                    />
                }
            </Col>
        </Page>
    )
};

export default Budgeting;