import { ChangeEvent, FocusEventHandler, ForwardedRef, KeyboardEvent, forwardRef } from 'react';
import { Form } from 'react-bootstrap';

interface Props {
    value: number | null;
    inputName: string;
    handleInputChange: (newValue: number) => void;

    label?: string | null;
    customAppendText?: string;
    customPrependText?: string;
    error?: string;
    showErrorMessage?: boolean;
    max?: number;
    step?: number;
    disabled?: boolean;
    placeholder?: string;
    inline?: boolean;
    className?: string;
    helpText?: string;
    tabIndex?: number;
    noDecimals?: boolean;
    highlightOnFocus?: boolean;
    onFocus?: () => void;
    onBlur?: FocusEventHandler;
    onTab?: () => void;
}

const NumberInput = forwardRef((props: Props, ref: ForwardedRef<HTMLInputElement>) => {
    const returnNumber = (e: ChangeEvent<HTMLInputElement>) => {
        let value = e.currentTarget.valueAsNumber;
        if (!!props.noDecimals)
            value = Math.round(value);
        props.handleInputChange(value);
    };

    const getValue = () => {
        if (props.value == null)
            return "";
        return props.value;
    }

    const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (!!props.onTab && e.code == 'Tab') {
            e.preventDefault();
            props.onTab();
        }
    }

    const onFocus = (e: any) => {
        if (!!props.onFocus)
            props.onFocus();
        if (!!props.highlightOnFocus)
            e.target.select();
    }

    const onKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.currentTarget.blur();
        }
    };

    return (
        <Form.Group className={props.className}>
            {!props.inline && props.label &&
                <Form.Label>
                    {props.label}
                </Form.Label>
            }
            <div className="input-group">
                {props.inline && props.label &&
                    <Form.Label className="f-inline-label">{props.label}</Form.Label>
                }
                {!!props.customPrependText &&
                    <div className="input-group-prepend">
                        <span className="input-group-text">{props.customPrependText}</span>
                    </div>
                }
                <Form.Control
                    type='number'
                    name={props.inputName}
                    onChange={returnNumber}
                    value={getValue()}
                    min="0"
                    max={props.max}
                    isInvalid={!!props.error && props.showErrorMessage}
                    disabled={props.disabled}
                    placeholder={props.placeholder}
                    onFocus={onFocus}
                    onBlur={props.onBlur}
                    onKeyDown={onKeyDown}
                    step={props.step ?? 1}
                    ref={ref}
                    autoComplete='off'
                    tabIndex={props.tabIndex}
                    onKeyPress={onKeyPress}
                />
                {!!props.customAppendText &&
                    <div className="input-group-append">
                        <span className="input-group-text">{props.customAppendText}</span>
                    </div>
                }
            </div>
            {!!props.error && props.showErrorMessage && <Form.Control.Feedback type="invalid">
                {props.error}
            </Form.Control.Feedback>}
        </Form.Group>
    );
})

export default NumberInput;