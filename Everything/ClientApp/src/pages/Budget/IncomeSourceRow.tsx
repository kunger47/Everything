import SaveOnBlurInput from 'components/Form/SaveOnBlurInput';
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
    const updateNameRef = useRef<HTMLInputElement>(null);
    const updateAmountRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isUpdatingName && !!updateNameRef?.current)
            updateNameRef.current.focus();
    }, [isUpdatingName]);

    useEffect(() => {
        if (isUpdatingAmount && !!updateAmountRef?.current)
            updateAmountRef.current.focus();
    }, [isUpdatingAmount]);

    const saveUpdate = (value: string) => {
        budgetApi.updateIncomeSource({ ...props.source, name: value }, onSuccessfulSave);
    }

    const saveAmountUpdate = (value: number | null) => {
        budgetApi.updateIncomeSource({ ...props.source, amount: value ?? 0 }, onSuccessfulSave);
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
                        {props.source.name}
                    </div>
                    : <SaveOnBlurInput
                        ref={updateNameRef}
                        inputName={'Source Name'}
                        value={props.source.name ?? ''}
                        onBlur={saveUpdate}
                        onBlurNoChange={indicateNoLongerEditing}
                        isRequired />}
            </Col>
            <Col xs={4} className="e-item-col">
                {!isUpdatingAmount
                    ? <div className={props.blurred ? "e-blurred-text e-item-block e-item-currency" : 'e-item-block e-item-currency e-unblurred-text'} onClick={() => !props.blurred && setIsUpdatingAmount(true)}>
                        {formatAsCurrency(props.source.amount)}
                    </div>
                    : <SaveOnBlurNumberInput
                        ref={updateAmountRef}
                        inputName={'Source Value'}
                        value={props.source.amount}
                        onBlur={saveAmountUpdate}
                        onBlurNoChange={indicateNoLongerEditing}
                        onFocus={() => { }}
                        isRequired />}
            </Col>
        </Row >
    )
};

export default IncomeSourceRow;