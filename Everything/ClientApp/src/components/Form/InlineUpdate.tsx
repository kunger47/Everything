import SaveOnBlurInput from 'components/Form/SaveOnBlurInput';
import React, { useEffect, useRef, useState } from 'react';

interface Props {
    value: string;
    inputName: string;
    onBlur: (newValue: string) => void;

    isRequired?: boolean;
    placeholder?: string;
    onBlurNoChange?: () => void;
    onFocus?: () => void;
}

const InlineUpdate = (props: Props) => {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const updateRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        isEditing && updateRef.current && updateRef.current.focus();
    }, [isEditing]);

    const onBlur = (value: string) => {
        setIsEditing(false);
        props.onBlur(value);
    }

    const onBlurNoChange = () => {
        setIsEditing(false);
        !!props.onBlurNoChange && props.onBlurNoChange();
    }

    return (
        <>
            {!isEditing
                ? <span onClick={() => setIsEditing(true)}>{props.value}</span >
                : <SaveOnBlurInput
                    ref={updateRef}
                    value={props.value}
                    inputName={props.inputName}
                    onBlur={onBlur}
                    onBlurNoChange={onBlurNoChange}
                    isRequired={props.isRequired}
                />
            }
        </>
    )
};

export default InlineUpdate;