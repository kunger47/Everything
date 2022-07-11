import Input from 'components/Form/Input';
import SaveOnBlurNumberInput from 'components/Form/SaveOnBlurNumberInput';
import Account from 'models/budget/Account';
import React, { useEffect, useRef, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import budgetApi from 'services/apis/budget-api';
import { formatAsCurrency } from 'services/formatters';

import './Budget.scss';

interface Props {
    account: Account;
    blurred: boolean;
    reload: () => void;
}

const AccountRow = (props: Props) => {
    const [isUpdatingName, setIsUpdatingName] = useState<boolean>(false);
    const [isUpdatingAmount, setIsUpdatingAmount] = useState<boolean>(false);
    const [tempName, setTempName] = useState<string>(props.account.name ?? '');
    const [tempAmount, setTempAmount] = useState<number>(props.account.amount);
    const updateNameRef = useRef<HTMLInputElement>(null);
    const updateAmountRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setTempName(props.account.name ?? '');
        setTempAmount(props.account.amount);
    }, [props.account]);

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
            budgetApi.updateAccount({ ...props.account, name: tempName }, onSuccessfulSave);
    }

    const saveAmountUpdate = (value: any) => {
        let newValue = parseInt(value);
        if (!!newValue && newValue != props.account.amount)
            budgetApi.updateAccount({ ...props.account, amount: newValue }, onSuccessfulSave);
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
                        {props.account.name}
                    </div>
                    : <Input
                        ref={updateNameRef}
                        inputName={'Account Name'}
                        value={tempName}
                        handleInputChange={setTempName}
                        onBlur={saveUpdate} />}
            </Col>
            <Col xs={4} className="e-item-col">
                {!isUpdatingAmount
                    ? <div className={props.blurred ? "e-blurred-text e-item-block e-item-currency" : 'e-item-block e-item-currency e-unblurred-text'} onClick={() => !props.blurred && setIsUpdatingAmount(true)}>
                        {formatAsCurrency(props.account.amount)}
                    </div>
                    : <SaveOnBlurNumberInput
                        ref={updateAmountRef}
                        inputName={'Account Value'}
                        value={tempAmount}
                        onBlur={saveAmountUpdate}
                        onBlurNoChange={indicateNoLongerEditing}
                        onFocus={() => { }} />}
            </Col>
        </Row >
    )
};

export default AccountRow;