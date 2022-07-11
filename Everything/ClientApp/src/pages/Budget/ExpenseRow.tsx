import Input from 'components/Form/Input';
import SaveOnBlurNumberInput from 'components/Form/SaveOnBlurNumberInput';
import Expense from 'models/budget/Expense';
import React, { useEffect, useRef, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import budgetApi from 'services/apis/budget-api';
import { formatAsCurrency } from 'services/formatters';

import './Budget.scss';

interface Props {
    expense: Expense;
    blurred: boolean;
    reload: () => void;
}

const ExpenseRow = (props: Props) => {
    const [isUpdatingName, setIsUpdatingName] = useState<boolean>(false);
    const [isUpdatingAmount, setIsUpdatingAmount] = useState<boolean>(false);
    const [tempName, setTempName] = useState<string>(props.expense.name ?? '');
    const [tempAmount, setTempAmount] = useState<number>(props.expense.amount);
    const updateNameRef = useRef<HTMLInputElement>(null);
    const updateAmountRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setTempName(props.expense.name ?? '');
        setTempAmount(props.expense.amount);
    }, [props.expense]);

    useEffect(() => {
        if (isUpdatingName && !!updateNameRef?.current)
            updateNameRef.current.focus();
    }, [isUpdatingName]);

    useEffect(() => {
        if (isUpdatingAmount && !!updateAmountRef?.current)
            updateAmountRef.current.focus();
    }, [isUpdatingAmount]);

    const saveUpdate = () => {
        if (!!tempName.trim())
            budgetApi.updateExpense({ ...props.expense, name: tempName }, onSuccessfulSave);
    }

    const saveAmountUpdate = (value: any) => {
        let newValue = parseInt(value);
        if (!!newValue && newValue != props.expense.amount)
            budgetApi.updateExpense({ ...props.expense, amount: newValue }, onSuccessfulSave);
    }

    const indicateNoLongerEditing = () => {
        setIsUpdatingName(false);
        setIsUpdatingAmount(false);
    }

    const onSuccessfulSave = () => {
        indicateNoLongerEditing();
        props.reload();
    }

    return (
        <Row>
            <Col xs={8} className="e-item-col">
                {!isUpdatingName
                    ? <div className="e-item-block" onClick={() => !props.blurred && setIsUpdatingName(true)}>
                        {props.expense.name}
                    </div>
                    : <Input
                        ref={updateNameRef}
                        inputName={'Expense Name'}
                        value={tempName}
                        handleInputChange={setTempName}
                        onBlur={saveUpdate} />}
            </Col>
            <Col xs={4} className="e-item-col">
                {!isUpdatingAmount
                    ? <div className={props.blurred ? "e-blurred-text e-item-block e-item-currency" : 'e-item-block e-item-currency e-unblurred-text'} onClick={() => !props.blurred && setIsUpdatingAmount(true)}>
                        {formatAsCurrency(props.expense.amount)}
                    </div>
                    : <SaveOnBlurNumberInput
                        ref={updateAmountRef}
                        inputName={'Expense Value'}
                        value={tempAmount}
                        onBlur={saveAmountUpdate}
                        onBlurNoChange={indicateNoLongerEditing}
                        onFocus={() => { }} />}
            </Col>
        </Row >
    )
};

export default ExpenseRow;