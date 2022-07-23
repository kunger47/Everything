import InlineAdd from 'components/Form/InlineAdd';
import SaveOnBlurInput from 'components/Form/SaveOnBlurInput';
import Page from 'components/Layout/PageLayout';
import PackingItem from 'models/travel/PackingItem';
import TravelTag from 'models/travel/TravelTag';
import React, { useEffect, useRef, useState } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { Col, Row } from 'react-bootstrap';
import travelApi from 'services/apis/travel-api';
import PackingItemRow from './PackingItemRow';

import "./TravelLists.scss";

const TravelLists = () => {
    const [tags, setTags] = useState<TravelTag[]>([]);
    const [items, setItems] = useState<PackingItem[]>([]);

    useEffect(() => {
        getTags();
        getItems();
    }, []);

    const getTags = () => {
        travelApi.getTags(setTags);
    }

    const getItems = () => {
        travelApi.getPackingItems(setItems);
    }

    const saveNewItem = (name: string) => {
        var newItem = new PackingItem();
        travelApi.createPackingItem({ ...newItem, name: name }, getItems);
        // travelApi.createPackingItem({ ...newItem, sequence: getNextSequence() }, props.reload);
    }

    const saveNewTag = (name: string) => {
        var newTag = new TravelTag();
        travelApi.createTag({ ...newTag, name: name }, getTags);
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
                    </Droppable >
                    <Row className="e-add-item-row">
                        <Col className='e-item-block'>
                            <InlineAdd
                                addText={"+ Add Packing Item"}
                                inputName={"item name"}
                                onBlur={saveNewItem}
                                isRequired
                            />
                        </Col>
                    </Row>
                </Col >
            </DragDropContext >
            < Col className='e-side-bar' >
                <Row>
                    <Col className='e-side-bar-title'>
                        <p>Tags</p>
                    </Col>
                </Row>
                <Row>
                    {tags.length > 0 && tags.map((t) =>
                        <Col className='e-tag-block'>
                            <span>
                                <p className='e-tag-name'>{t.name}</p>
                            </span>
                        </Col>
                    )}
                </Row>
                <Row className="e-add-item-row">
                    <Col>
                        <InlineAdd
                            addText={"+ Add Tag"}
                            inputName={"tag name"}
                            onBlur={saveNewTag}
                            isRequired
                        />
                    </Col>
                </Row>
            </Col >
        </Page >
    )
};

export default TravelLists;