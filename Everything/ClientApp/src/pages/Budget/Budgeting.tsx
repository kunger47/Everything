import Page from 'components/Layout/PageLayout';
import BudgetModel from 'models/budget/BudgetModel';
import React, { useEffect, useRef, useState } from 'react';
import { Button, Col } from 'react-bootstrap';
import budgetApi from 'services/apis/budget-api';
import { Link as ReactLink } from 'react-router-dom';

import './Budget.scss';
import SaveOnBlurInput from 'components/Form/SaveOnBlurInput';

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

    const saveNew = (value: string) => {
        if (!!newBudget.name?.trim())
            budgetApi.createBudget({ ...newBudget, name: value }, onSuccessfulAdd);
    }

    const indicateNoLongerAdding = () => {
        setIsAdding(false);
        setNewBudget(new BudgetModel());
    }

    const onSuccessfulAdd = () => {
        indicateNoLongerAdding();
        refreshBudgets();
    }

    return (
        <Page title="Budgeting" classNameExtension='budgeting'>
            <Col>
                {budgets.map(b =>
                    <ReactLink to={`/budget?budgetId=${b.id}`} key={b.id}>
                        <Button className="">
                            {b.name}
                        </Button>
                    </ReactLink>
                )}
                {!isAdding
                    ? <Button className="" onClick={() => setIsAdding(true)}>
                        Add Budget
                    </Button>
                    : <SaveOnBlurInput
                        ref={addRef}
                        inputName={'New Budget Name'}
                        value={newBudget.name ?? ''}
                        onBlur={saveNew}
                        onBlurNoChange={indicateNoLongerAdding}
                        isRequired
                    />
                }
            </Col>
        </Page>
    )
};

export default Budgeting;