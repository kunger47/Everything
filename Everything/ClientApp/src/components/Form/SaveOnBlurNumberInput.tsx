import { ForwardedRef, forwardRef, useState } from 'react';
import NumberInput from './NumberInput';

interface Props {
    value: number;
    inputName: string;
    onFocus: () => void;
    onBlur: (newValue: any) => void;

    placeholder?: string;
    step?: number;
    customAppendText?: string;
    disabled?: boolean;
}

const SaveOnBlurNumberInput = forwardRef((props: Props, ref: ForwardedRef<HTMLInputElement>) => {
    const [copiedData, setCopiedData] = useState<any>(props.value);

    const valueHasChanged = () => {
        return copiedData !== props.value;
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
            onBlur={() => { valueHasChanged() && props.onBlur(copiedData) }}
            customAppendText={props.customAppendText}
            disabled={props.disabled} />
    );
});

export default SaveOnBlurNumberInput;