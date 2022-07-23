import SaveOnBlurInput from 'components/Form/SaveOnBlurInput';
import Page from 'components/Layout/PageLayout';
import PackingItem from 'models/travel/PackingItem';
import TravelTag from 'models/travel/TravelTag';
import React, { useEffect, useRef, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import travelApi from 'services/apis/travel-api';

import "./TravelLists.scss";

const TravelLists = () => {
    const [tags, setTags] = useState<TravelTag[]>([]);
    const [newTag, setNewTag] = useState<TravelTag>(new TravelTag());
    const [isAddingTag, setIsAddingTag] = useState<boolean>(false);
    const addTagRef = useRef<HTMLInputElement>(null);

    const [items, setItems] = useState<PackingItem[]>([]);
    const [newItem, setNewItem] = useState<PackingItem>(new PackingItem());
    const [isAddingItem, setIsAddingItem] = useState<boolean>(false);
    const addItemRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        isAddingItem && addItemRef.current && addItemRef.current.focus();
    }, [isAddingItem]);

    useEffect(() => {
        isAddingTag && addTagRef.current && addTagRef.current.focus();
    }, [isAddingTag]);

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
        travelApi.createPackingItem({ ...newItem, name: name }, onSuccessfulItemSave);
        // travelApi.createPackingItem({ ...newItem, sequence: getNextSequence() }, props.reload);
    }

    const resetAddingItem = () => {
        setIsAddingItem(false);
        setNewItem(new PackingItem());
    }

    const onSuccessfulItemSave = () => {
        getItems();
        resetAddingItem();
    }

    const saveNewTag = (name: string) => {
        travelApi.createTag({ ...newTag, name: name }, onSuccessfulTagSave);
    }

    const resetAddingTag = () => {
        setIsAddingTag(false);
        setNewTag(new TravelTag());
    }

    const onSuccessfulTagSave = () => {
        getTags();
        resetAddingTag();
    }

    return (
        <Page title="Packing Items" classNameExtension='travel-lists'>
            {/* <DragDropContext onDragEnd={onDragEnd}> */}
            <Col>
                {items.length > 0 && items.map((i) => {
                    return <>
                        {/* <Droppable droppableId={props.column.id.toString()}> */}
                        {/* {provided => ( }*/}
                        <div className='row e-column-items-container'>
                            {/* ref={provided.innerRef} {...provided.droppableProps}> */}
                            {/* {props.column.toDoItems.sort((a, b) => a.sequence - b.sequence).map((item: ToDoItem, index: number) =>
                            <ItemBlock item={item} key={item.id} index={index} reload={props.reload} />
                        )}
                            {provided.placeholder} */}
                            <Col className='e-item-block'>{i.name}</Col>
                        </div>
                        {/* )}
                        </Droppable > */}
                    </>
                })}
                <Row className="e-add-item-row">
                    <Col className='e-item-block'>
                        {!isAddingItem
                            ? <a onClick={() => setIsAddingItem(true)}>+ Add Packing Item</a>
                            : <SaveOnBlurInput
                                ref={addItemRef}
                                value={newItem.name ?? ''}
                                inputName={"item name"}
                                onBlurNoChange={resetAddingItem}
                                onBlur={saveNewItem}
                                isRequired
                            />}
                    </Col>
                </Row>
            </Col >
            {/* </DragDropContext> */}
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
                        {!isAddingTag
                            ? <a onClick={() => setIsAddingTag(true)}>+ Add Tag</a>
                            : <SaveOnBlurInput
                                ref={addTagRef}
                                value={newTag.name ?? ''}
                                inputName={"tag name"}
                                onBlurNoChange={resetAddingTag}
                                onBlur={saveNewTag}
                                isRequired
                            />}
                    </Col>
                </Row>
            </Col >
        </Page >
    )
};

export default TravelLists;