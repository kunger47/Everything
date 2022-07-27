import './multi-select.scss';
import { Form, Row } from "react-bootstrap";
import { MultiValue } from "react-select";
import Select from "react-select";
import MultiSelectModel from './multi-select-model';
import { KeyboardEvent, useRef } from 'react';

interface Props {
    label: string;
    value: MultiSelectModel[] | null;
    options: MultiSelectModel[];
    onChange: (newValue: number[]) => void;

    error?: string;
    groupClass?: string;
    noCloseOnSelect?: boolean;
    showSelectedOptions?: boolean;
    onBlur?: () => void;
}

function MultiSelect(props: Props) {
    const ref = useRef<any>(null);

    const customStyles = {
        // option: (provided: any, state: any) => ({
        //     ...provided,
        //     'background-color': state.isSelected ? '#00B93E' : '',
        // }),
        option: (styles: any, { data, isFocused, isSelected }: any) => ({
            ...styles,
            'background-color': isSelected
                ? data.color
                : isFocused
                    ? data.color
                    : undefined
        }),
        multiValue: (styles: any, { data }: any) => ({
            ...styles,
            'background-color': data.color
        }),
        multiValueLabel: (styles: any, { data }: any) => ({
            ...styles
        }),
        multiValueRemove: (styles: any, { data }: any) => ({
            ...styles,
            'color': data.color,
            ':hover': {
                'background-color': data.color,
                'color': 'white',
            },
        }),
    }

    const onChangeHandle = (newValue: MultiValue<MultiSelectModel>) => {
        props.onChange(newValue.map((value: MultiSelectModel) => { return value.value }));
    }

    const CustomOptionRow = (props: any) => {
        const { innerProps, innerRef } = props;
        return (
            <Row ref={innerRef} {...innerProps} className={`f-option-row${props.isDisabled ? ' f-disabled' : ''}`}>
                <span style={{ backgroundColor: props.isSelected ? props.data.color ?? '' : '' }}
                    className={`${props.isSelected ? 'e-option e-selected-item' : 'e-option'}`}>
                    {props.data.label}
                </span>
            </Row>
        );
    };

    const onKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            !!ref.current && ref.current.blur();
        }
    };

    return (
        <Form.Group className={`f-multi-select ${props.groupClass || ''}`}>
            {/* <Form.Label>{props.label}</Form.Label> */}
            <Select
                isMulti
                autoFocus
                ref={ref}
                value={props.value}
                options={props.options}
                onChange={onChangeHandle}
                onBlur={props.onBlur}
                styles={customStyles}
                onKeyDown={onKeyPress}
                className={!!props.error ? 'error' : ''}
                classNamePrefix='f-multi-select'
                closeMenuOnSelect={!props.noCloseOnSelect}
                hideSelectedOptions={!props.showSelectedOptions}
                components={{ Option: CustomOptionRow }}
            />
            {!!props.error &&
                <span className='error'>{props.error}</span>
            }
        </Form.Group>
    )
}
export default MultiSelect;