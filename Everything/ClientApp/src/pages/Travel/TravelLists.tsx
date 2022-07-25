import InlineAddCol from 'components/Form/InlineAddCol';
import Page from 'components/Layout/PageLayout';
import PackingItem from 'models/travel/PackingItem';
import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { Col, Row } from 'react-bootstrap';
import travelApi from 'services/apis/travel-api';
import PackingItemRow from './PackingItemRow';

import "./TravelLists.scss";
import TravelTagsColumn from './TravelTagsColumn';

const TravelLists = () => {
    const [items, setItems] = useState<PackingItem[]>([]);

    useEffect(() => {
        getItems();
    }, []);

    const getItems = () => {
        travelApi.getPackingItems(setItems);
    }

    const saveNewItem = (name: string) => {
        var newItem = new PackingItem();
        travelApi.createPackingItem({ ...newItem, name: name }, getItems);
        // travelApi.createPackingItem({ ...newItem, sequence: getNextSequence() }, props.reload);
    }

    const onDragEnd = (result: DropResult) => {
        // let { destination, source, draggableId } = result;

        // if (!destination) {
        //     return;
        // }

        // if (destination.droppableId === source.droppableId && destination.index === source.index) {
        //     return;
        // }

        // let columnIndex = columns.findIndex(c => c.id.toString() === source.droppableId);
        // if (columnIndex > -1) {
        //     let col = columns[columnIndex];
        //     let toDoIndex = col.toDoItems.findIndex(i => i.id.toString() === draggableId);

        //     if (toDoIndex > -1) {
        //         let item = col.toDoItems[toDoIndex];
        //         let updates = copyObject(item);
        //         todoApi.updateItem({ ...updates, sequence: destination.index, toDoColumnId: (destination.droppableId as any as number) }, loadColumns);
        //     }
        // }
    };

    return (
        <Page title="Packing Items" classNameExtension='travel-lists'>
            <DragDropContext onDragEnd={onDragEnd}>
                <Col>
                    <Droppable droppableId={'0'}>
                        {provided => (
                            <div className='row e-column-items-container' ref={provided.innerRef} {...provided.droppableProps}>
                                {items.length > 0 && items.map((i, index) => {
                                    return <PackingItemRow key={i.id} index={index} item={i} reload={getItems} />
                                })}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                    <Row className="e-add-item-row">
                        <InlineAddCol
                            className='e-item-block'
                            addText={"+ Add"}
                            inputName={"item name"}
                            onBlur={saveNewItem}
                            isRequired
                        />
                    </Row>
                </Col>
            </DragDropContext>
            <TravelTagsColumn />
        </Page>
    )
};

export default TravelLists;