import InlineAddCol from 'components/Form/InlineAddCol';
import MultiSelectModel from 'components/Form/multi-select-model';
import Page from 'components/Layout/PageLayout';
import PackingItem from 'models/travel/PackingItem';
import TravelTag from 'models/travel/TravelTag';
import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { Col, Row } from 'react-bootstrap';
import travelApi from 'services/apis/travel-api';
import { sortByNumberPropertyAcsending } from 'services/array-helpers';
import { getNextSequence, onSimpleListDragEnd } from 'services/drag-and-drop-helper';
import PackingItemRow from './PackingItemRow';

import "./TravelLists.scss";
import TravelTagsColumn from './TravelTagsColumn';

const TravelLists = () => {
    const [items, setItems] = useState<PackingItem[]>([]);
    const [sortedItems, setSortedItems] = useState<PackingItem[]>([]);
    const [tags, setTags] = useState<TravelTag[]>([]);
    const [tagOptions, setTagOptions] = useState<MultiSelectModel[]>([]);

    useEffect(() => {
        loadPage();
    }, []);

    useEffect(() => {
        setSortedItems(sortByNumberPropertyAcsending(items, 'sequence'));
    }, [items]);

    useEffect(() => {
        setTagOptions(tags.map((t) => { return { label: t.name, value: t.id, color: t.colorHexCode ?? undefined }; }));
    }, [tags]);

    const loadPage = () => {
        getTags();
        getItems();
    }

    const getTags = () => {
        travelApi.getTags(setTags);
    }

    const getItems = () => {
        travelApi.getPackingItems(setItems);
    }

    const saveNewItem = (name: string) => {
        var newItem = new PackingItem();
        travelApi.createPackingItem({ ...newItem, name: name, sequence: getNextSequence(items) }, getItems);
    }

    const onDragEnd = (result: DropResult) => {
        var item = onSimpleListDragEnd(result, sortedItems, setSortedItems);

        if (!!item)
            travelApi.updatePackingItem(item, getItems);
    };

    return (
        <Page title="Packing Items" classNameExtension='travel-lists'>
            <DragDropContext onDragEnd={onDragEnd}>
                <Col>
                    <Droppable droppableId={'0'}>
                        {provided => (
                            <div className='row e-column-items-container' ref={provided.innerRef} {...provided.droppableProps}>
                                {sortedItems.length > 0 && sortedItems.map((i, index) => {
                                    return <PackingItemRow key={i.id} index={index} item={i} tagOptions={tagOptions} reload={getItems} />
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
            <TravelTagsColumn tags={tags} reload={loadPage} />
        </Page>
    )
};

export default TravelLists;
