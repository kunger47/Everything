import DeleteButton from 'components/DeleteButton';
import ColorPickerPopover from 'components/Form/color-picker-popover';
import InlineUpdate from 'components/Form/InlineUpdate';
import TravelTag from 'models/travel/TravelTag';
import React, { useState } from 'react';
import { Col } from 'react-bootstrap';
import travelApi from 'services/apis/travel-api';

import "./TravelLists.scss";

interface Props {
    tag: TravelTag;
    reload: () => void;
}

const TravelTagRow = (props: Props) => {
    const [isHovering, setIsHovering] = useState<boolean>(false);

    const saveTag = (name: string) => {
        travelApi.updateTag({ ...props.tag, name: name }, props.reload);
    }

    const handleSelectedColor = (itemColor: string) => {
        if (itemColor != props.tag.colorHexCode) {
            travelApi.updateTag({ ...props.tag, colorHexCode: itemColor }, props.reload);
        }
    }

    const deleteItem = (id: number) => {
        travelApi.removeTag(id, props.reload);
    };

    return (
        <Col style={{ backgroundColor: props.tag.colorHexCode ?? '' }} xs={12} className='e-tag-block' onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
            <InlineUpdate
                className='e-tag-name'
                value={props.tag.name ?? ''}
                inputName={"tagname"}
                onBlur={saveTag}
                isRequired
            />
            {isHovering && <DeleteButton onClick={() => deleteItem(props.tag.id)} />}
            {isHovering && <ColorPickerPopover
                title={'Tag Color'}
                color={props.tag.colorHexCode ?? ''}
                className="e-pull-right"
                handleColorChange={handleSelectedColor} />}
        </Col>
    )
};

export default TravelTagRow;