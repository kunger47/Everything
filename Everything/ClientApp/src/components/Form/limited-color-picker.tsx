import { CirclePicker, ColorResult } from "react-color";

import { Form } from "react-bootstrap";

interface Props {
    title: string;
    color: string;
    columns?: number;
    handleColorChange: (color: string) => void;
}

function LimitedColorPicker(props: Props) {
    return (
        <Form.Group>
            {props.title && <Form.Label>{props.title}</Form.Label>}
            <CirclePicker
                color={props.color ?? undefined}
                onChangeComplete={(color: ColorResult) => { props.handleColorChange(color.hex) }}
                colors={["#e8d8f2", "#dcf2b0", "#dddfdf", "#d7fcfc", "#fec8df", "#c4e6d5", "#fce9d6", "#feffbe", "#fed8af", "#f0af9d", "#a5c2e6", "#e0efda"]}
                width={props.columns === 3 ? "127px" : undefined}
            />
        </Form.Group>
    )
}

export default LimitedColorPicker;