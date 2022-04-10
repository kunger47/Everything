import { ChangeEvent, ForwardedRef, KeyboardEvent, forwardRef } from 'react';
import { Form } from 'react-bootstrap';

interface Props {
    value: string | undefined | null;
    inputName: string;
    handleInputChange: (newValue: string) => void;

    label?: string | null;
    helpText?: string;
    error?: string;
    showErrorMessage?: boolean;
    placeholder?: string;
    inputType?: string;
    removeBottomMargin?: boolean;
    tabIndex?: number;
    isTextArea?: boolean;
    onBlur?: () => void;
    onFocus?: (value: any) => void;
    onKeyPress?: (event: KeyboardEvent<HTMLInputElement>) => void;
}

const Input = forwardRef((props: Props, ref: ForwardedRef<HTMLInputElement>) => {
    const returnValue = (e: ChangeEvent<HTMLInputElement>) => {
        props.handleInputChange(e.currentTarget.value);
    };

    const onKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (!!props.onKeyPress)
            props.onKeyPress(e);
        else {
            if (e.key === 'Enter') {
                e.currentTarget.blur();
            }
        }
    };

    return (
        <Form.Group
            className={props.removeBottomMargin ? "e-no-bottom-margin" : ""}
        >
            {props.label &&
                <Form.Label>{props.label}</Form.Label>
            }
            <div className="input-group">
                <Form.Control
                    as={props.isTextArea ? 'textarea' : 'input'}
                    type={props.inputType ?? 'text'}
                    name={props.inputName}
                    onChange={returnValue}
                    value={props.value != null && props.value != undefined ? props.value : ""}
                    placeholder={props.placeholder}
                    isInvalid={!!props.error && props.showErrorMessage}
                    onBlur={props.onBlur}
                    onFocus={props.onFocus}
                    ref={ref}
                    tabIndex={props.tabIndex}
                    autoComplete='off'
                    onKeyPress={onKeyPress}
                />
            </div>
            {props.helpText && <Form.Text className="text-muted">{props.helpText}</Form.Text>}
            {!!props.error && props.showErrorMessage &&
                <Form.Control.Feedback type="invalid">
                    {props.error}
                </Form.Control.Feedback>
            }
        </Form.Group>
    );
});

export default Input;