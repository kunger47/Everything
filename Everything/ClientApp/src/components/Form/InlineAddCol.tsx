import SaveOnBlurInput from 'components/Form/SaveOnBlurInput';
import React, { useEffect, useRef, useState } from 'react';
import { Col } from 'react-bootstrap';

interface Props {
    inputName: string;
    addText: string;
    onBlur: (newValue: string) => void;

    isRequired?: boolean;
    placeholder?: string;
    className?: string;
    onBlurNoChange?: () => void;
    onFocus?: () => void;
}

const InlineAddCol = (props: Props) => {
    const [newValue, setNewValue] = useState<string>('');
    const [isAdding, setIsAdding] = useState<boolean>(false);
    const addRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        isAdding && addRef.current && addRef.current.focus();
    }, [isAdding]);

    const onBlur = (value: string) => {
        setIsAdding(false);
        props.onBlur(value);
        setNewValue('');
    }

    const onBlurNoChange = () => {
        setIsAdding(false);
        setNewValue('');
        !!props.onBlurNoChange && props.onBlurNoChange();
    }

    return (
        <Col className={props.className} onClick={() => !isAdding && setIsAdding(true)}>
            {!isAdding
                ? <a>{props.addText}</a>
                : <SaveOnBlurInput
                    ref={addRef}
                    value={newValue}
                    inputName={props.inputName}
                    onBlurNoChange={onBlurNoChange}
                    onBlur={onBlur}
                    isRequired={props.isRequired}
                />}
        </Col>
    )
};

export default InlineAddCol;