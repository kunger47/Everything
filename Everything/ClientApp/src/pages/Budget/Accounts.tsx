import SaveOnBlurInput from 'components/Form/SaveOnBlurInput';
import Account from 'models/budget/Account';
import React, { useEffect, useRef, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import budgetApi from 'services/apis/budget-api';
import { sumByProperty } from 'services/array-helpers';
import { formatAsCurrency } from 'services/formatters';
import AccountRow from './AccountRow';

import './Budget.scss';

interface Props {
    budgetId: number;
    blurred: boolean;
}

const Accounts = (props: Props) => {
    const addRef = useRef<HTMLInputElement>(null);
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [isAdding, setIsAdding] = useState<boolean>(false);
    const [newAccount, setNewAccount] = useState<Account>(new Account());
    const [total, setTotal] = useState<number>(0);

    useEffect(() => {
        refreshAccounts();
    }, [props.budgetId]);

    useEffect(() => {
        if (isAdding && !!addRef?.current)
            addRef.current.focus();
    }, [isAdding]);

    useEffect(() => {
        setTotal(sumByProperty(accounts, "amount"));
    }, [accounts])

    const refreshAccounts = () => {
        budgetApi.getAccounts(props.budgetId, setAccounts);
    }

    const saveNew = (value: string) => {
        budgetApi.createAccount({ ...newAccount, name: value, budgetId: props.budgetId }, onSuccessfulAdd);
    }

    const indicateNoLongerAdding = () => {
        setIsAdding(false);
        setNewAccount(new Account());
    }

    const onSuccessfulAdd = () => {
        indicateNoLongerAdding();
        refreshAccounts();
    }

    return (
        <Col xs={12} md={6} className='e-column e-table-column'>
            <Row>
                <Col className="e-column-title">Accounts</Col>
            </Row>
            {
                !!accounts && accounts.map(a =>
                    <AccountRow account={a} reload={refreshAccounts} blurred={props.blurred} />
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
                        <SaveOnBlurInput
                            ref={addRef}
                            inputName="New Account Name"
                            value={newAccount.name ?? ''}
                            onBlur={saveNew}
                            onBlurNoChange={indicateNoLongerAdding}
                            isRequired
                        />
                    </Col>}
            </Row>}
        </Col>
    )
};

export default Accounts;