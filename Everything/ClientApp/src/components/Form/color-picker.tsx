import { SketchPicker, ColorResult } from "react-color";

import { Form } from "react-bootstrap";

interface Props {
    title: string;
    color: string;
    columns?: number;
    handleColorChange: (color: string) => void;
}

function ColorPicker(props: Props) {
    return (
        <Form.Group>
            {props.title && <Form.Label>{props.title}</Form.Label>}
            <SketchPicker
                color={props.color ?? undefined}
                onChangeComplete={(color: ColorResult) => { props.handleColorChange(color.hex) }}
                width={props.columns === 3 ? "127px" : undefined}
            />
        </Form.Group>
    )
}

export default ColorPicker;