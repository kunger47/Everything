import DeleteButton from 'components/DeleteButton';
import InlineUpdate from 'components/Form/InlineUpdate';
import PackingItem from 'models/travel/PackingItem';
import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Button, Col } from 'react-bootstrap';
import travelApi from 'services/apis/travel-api';

import "./TravelLists.scss";

interface Props {
    item: PackingItem;
    index: number;
    reload: () => void;
}

const PackingItemRow = (props: Props) => {
    const [isHovering, setIsHovering] = useState<boolean>(false);

    const saveItem = (name: string) => {
        travelApi.updatePackingItem({ ...props.item, name: name }, props.reload);
    }

    const saveItemTags = () => {
        travelApi.updateTagsForPackingItem(props.item.id, [1, 2, 3], props.reload);
    }

    const deleteItem = (id: number) => {
        travelApi.removePackingItem(id, props.reload);
    };

    return (
        <Draggable draggableId={props.item.id.toString()} index={props.index}>
            {provided => (
                <div className='row e-item-block'
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}
                >
                    <Col>
                        <InlineUpdate
                            className='e-item-name'
                            value={props.item.name ?? ''}
                            inputName={"itemName"}
                            onBlur={saveItem}
                            isRequired
                        />
                        {props.item.tags.length > 0 && props.item.tags.map((t) =>
                            <span style={{ backgroundColor: t.colorHexCode ?? '' }} className='e-tag-tag'>
                                {t.name}
                                {isHovering && <DeleteButton onClick={() => { }} />}
                            </span>)}
                    </Col>
                    <Col xs={5}>
                        {isHovering && <a onClick={saveItemTags}>+ Add Tag</a>}
                    </Col>
                    <Col xs={1}>
                        {isHovering && <DeleteButton className='e-pull-right' onClick={() => deleteItem(props.item.id)} />}
                    </Col>
                </div>
            )}
        </Draggable >
    )
};

export default PackingItemRow;