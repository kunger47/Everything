import { ForwardedRef, forwardRef, useState } from 'react';
import Input from './Input';

interface Props {
    value: string;
    inputName: string;
    onBlur: (newValue: string) => void;
    onBlurNoChange: () => void;

    isRequired?: boolean;
    placeholder?: string;
    onFocus?: () => void;
}

const SaveOnBlurInput = forwardRef((props: Props, ref: ForwardedRef<HTMLInputElement>) => {
    const [copiedData, setCopiedData] = useState<string>(props.value);

    const valueHasChanged = () => {
        return (props.isRequired ? !!copiedData.trim() : true) && copiedData !== props.value;
    }

    const onBlur = () => {
        valueHasChanged()
            ? props.onBlur(copiedData)
            : props.onBlurNoChange();
    }

    return (
        <Input
            ref={ref}
            value={copiedData}
            inputName={props.inputName}
            placeholder={props.placeholder}
            handleInputChange={setCopiedData}
            onFocus={() => !!props.onFocus && props.onFocus()}
            onBlur={onBlur}
            removeBottomMargin />
    );
});

export default SaveOnBlurInput;