import { ForwardedRef, forwardRef, useState } from 'react';
import { nullIfNaN, zeroIfNaN } from 'services/number-helper';
import NumberInput from './NumberInput';

interface Props {
    value: number;
    inputName: string;
    onFocus: () => void;
    onBlur: (newValue: number | null) => void;
    onBlurNoChange: () => void;

    isRequired?: boolean;
    placeholder?: string;
    step?: number;
    customAppendText?: string;
    disabled?: boolean;
}

const SaveOnBlurNumberInput = forwardRef((props: Props, ref: ForwardedRef<HTMLInputElement>) => {
    const [copiedData, setCopiedData] = useState<any>(props.value);

    const valueHasChanged = (newValue: number | null) => {
        return newValue !== props.value;
    }

    const onBlur = () => {
        let newValue: number | null = props.isRequired ? zeroIfNaN(copiedData) : nullIfNaN(copiedData);

        valueHasChanged(newValue)
            ? props.onBlur(newValue)
            : props.onBlurNoChange();
    }

    return (
        <NumberInput
            ref={ref}
            value={copiedData}
            inputName={props.inputName}
            placeholder={props.placeholder}
            handleInputChange={setCopiedData}
            onFocus={() => props.onFocus}
            step={props.step}
            onBlur={onBlur}
            customAppendText={props.customAppendText}
            disabled={props.disabled} />
    );
});

export default SaveOnBlurNumberInput;