import './color-picker.scss';
import { OverlayTrigger, Popover } from "react-bootstrap";
import ColorPicker from './color-picker';
import LimitedColorPicker from './limited-color-picker';

interface Props {
    color: string;
    title?: string;
    className?: string;
    handleColorChange: (color: string) => void;
}

function ColorPickerPopover(props: Props) {
    return (
        <OverlayTrigger
            rootClose
            placement="bottom"
            trigger="click"
            overlay={
                <Popover id="button-tooltip" className="confirm-toggle" style={{ zIndex: 0 }}>
                    <Popover.Content>
                        <LimitedColorPicker
                            title={props.title ?? "Select a Color"}
                            color={props.color}
                            columns={3}
                            handleColorChange={(color: string) => {
                                props.handleColorChange(color);
                                document.body.click();
                            }} />
                    </Popover.Content>
                </Popover>
            }
        >
            <span style={{ backgroundColor: props.color }} className={!!props.className ? `f-selected-color ${props.className}` : 'f-selected-color'}>
            </span>
        </OverlayTrigger>
    )
}
export default ColorPickerPopover;