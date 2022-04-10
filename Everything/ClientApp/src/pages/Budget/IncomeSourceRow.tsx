import Input from 'components/Form/Input';
import SaveOnBlurNumberInput from 'components/Form/SaveOnBlurNumberInput';
import IncomeSource from 'models/budget/IncomeSource';
import React, { useEffect, useRef, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import budgetApi from 'services/apis/budget-api';
import { formatAsCurrency } from 'services/formatters';

import './Budget.scss';

interface Props {
    source: IncomeSource;
    blurred: boolean;
    reload: () => void;
}

const IncomeSourceRow = (props: Props) => {
    const [isUpdatingName, setIsUpdatingName] = useState<boolean>(false);
    const [isUpdatingAmount, setIsUpdatingAmount] = useState<boolean>(false);
    const [tempName, setTempName] = useState<string>(props.source.name ?? '');
    const [tempAmount, setTempAmount] = useState<number>(props.source.amount);
    const updateNameRef = useRef<HTMLInputElement>(null);
    const updateAmountRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setTempName(props.source.name ?? '');
        setTempAmount(props.source.amount);
    }, [props.source]);

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
            budgetApi.updateIncomeSource({ ...props.source, name: tempName }, props.reload);
        setIsUpdatingName(false);
        setIsUpdatingAmount(false);
    }

    const saveAmountUpdate = (value: any) => {
        let newValue = parseInt(value);
        if (!!newValue && newValue != props.source.amount)
            budgetApi.updateIncomeSource({ ...props.source, amount: newValue }, props.reload);
        setIsUpdatingName(false);
        setIsUpdatingAmount(false);
    }

    return (
        <Row>
            <Col xs={8} className="e-item-col">
                {!isUpdatingName
                    ? <div className="e-item-block" onClick={() => !props.blurred && setIsUpdatingName(true)}>
                        {props.source.name}
                    </div>
                    : <Input
                        ref={updateNameRef}
                        inputName={'Source Name'}
                        value={tempName}
                        handleInputChange={setTempName}
                        onBlur={saveUpdate} />}
            </Col>
            <Col xs={4} className="e-item-col">
                {!isUpdatingAmount
                    ? <div className={props.blurred ? "e-blurred-text e-item-block e-item-currency" : 'e-item-block e-item-currency e-unblurred-text'} onClick={() => !props.blurred && setIsUpdatingAmount(true)}>
                        {formatAsCurrency(props.source.amount)}
                    </div>
                    : <SaveOnBlurNumberInput
                        ref={updateAmountRef}
                        inputName={'Source Value'}
                        value={tempAmount}
                        onBlur={saveAmountUpdate}
                        onFocus={() => { }} />}
            </Col>
        </Row >
    )
};

export default IncomeSourceRow;