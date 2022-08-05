import DeleteButton from 'components/DeleteButton';
import MultiSelectModel from 'components/Form/multi-select-model';
import TripPackingItem from 'models/travel/TripPackingItem';
import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Col } from 'react-bootstrap';
import travelApi from 'services/apis/travel-api';

import "./TravelLists.scss";

interface Props {
    item: TripPackingItem;
    index: number;
    tagOptions: MultiSelectModel[];
    reload: () => void;
}

const TripPackingItemRow = (props: Props) => {
    const [isHovering, setIsHovering] = useState<boolean>(false);

    const deleteItem = (id: number) => {
        travelApi.removeTripPackingItem(id, props.reload);
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
                        <span className='e-item-field'>
                            <span className='e-item-name'>{props.item.name ?? ''}</span>
                        </span>
                        {props.item.tags.length > 0 && props.item.tags.map((t) =>
                            <span style={{ backgroundColor: t.colorHexCode ?? '' }} className='e-tag-tag e-clickable'>
                                {t.name}
                            </span>)}
                    </Col>
                    <Col xs={1}>
                        {isHovering && <DeleteButton className='e-pull-right' onClick={() => deleteItem(props.item.id)} />}
                    </Col>
                </div>
            )}
        </Draggable >
    )
};

export default TripPackingItemRow;