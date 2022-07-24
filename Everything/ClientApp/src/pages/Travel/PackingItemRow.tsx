import InlineUpdate from 'components/Form/InlineUpdate';
import PackingItem from 'models/travel/PackingItem';
import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Col } from 'react-bootstrap';
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
                    </Col>
                    <Col xs={1}>
                        {isHovering && <span className="e-pull-right e-delete-icon" onClick={() => deleteItem(props.item.id)}>x</span>}
                    </Col>
                </div>
            )}
        </Draggable >
    )
};

export default PackingItemRow;