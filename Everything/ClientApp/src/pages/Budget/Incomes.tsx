import Input from 'components/Form/Input';
import IncomeSource from 'models/budget/IncomeSource';
import React, { useEffect, useRef, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import budgetApi from 'services/apis/budget-api';
import { handleRawInputChange } from 'services/form-helpers';
import { formatAsCurrency } from 'services/formatters';

import './Budget.scss';
import IncomeSourceRow from './IncomeSourceRow';

interface Props {
    budgetId: number;
    blurred: boolean;
}

const Incomes = (props: Props) => {
    const addRef = useRef<HTMLInputElement>(null);
    const [incomes, setIncomes] = useState<IncomeSource[]>([]);
    const [isAdding, setIsAdding] = useState<boolean>(false);
    const [newItem, setNewItem] = useState<IncomeSource>(new IncomeSource());
    const [total, setTotal] = useState<number>(0);

    useEffect(() => {
        refreshIncomes();
    }, [props.budgetId]);

    useEffect(() => {
        if (isAdding && !!addRef?.current)
            addRef.current.focus();
    }, [isAdding]);

    useEffect(() => {
        setTotal(incomes.length > 0 ? incomes.map(a => a.amount).reduce((accumulator, curr) => accumulator + curr) : 0);
    }, [incomes])

    const refreshIncomes = () => {
        budgetApi.getIncomeSourcesForBudget(props.budgetId, setIncomes);
    }

    const saveNew = () => {
        if (!!newItem.name?.trim())
            budgetApi.createIncomeSource({ ...newItem, budgetId: props.budgetId }, refreshIncomes);
        setIsAdding(false);
        setNewItem(new IncomeSource());
    }

    return (
        <Col xs={12} md={6} className='e-column e-table-column'>
            <Row>
                <Col className="e-column-title">Income Sources</Col>
            </Row>
            {
                !!incomes && incomes.map(i =>
                    <IncomeSourceRow source={i} reload={refreshIncomes} blurred={props.blurred} key={i.id} />
                )
            }
            <Row className="e-total-row">
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
                        <Input
                            ref={addRef}
                            inputName="New Source Name"
                            value={newItem.name ?? undefined}
                            handleInputChange={handleRawInputChange([newItem, setNewItem], "name")}
                            onBlur={saveNew}
                        />
                    </Col>}
            </Row>}
        </Col>
    )
};

export default Incomes;