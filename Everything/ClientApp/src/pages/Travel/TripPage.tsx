import Page from 'components/Layout/PageLayout';
import React, { useEffect, useRef, useState } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { useLocation } from 'react-router-dom';
import TripPackingItem from 'models/travel/TripPackingItem';
import { sortByNumberPropertyAcsending } from 'services/array-helpers';
import travelApi from 'services/apis/travel-api';
import TravelTag from 'models/travel/TravelTag';
import MultiSelectModel from 'components/Form/multi-select-model';
import { onSimpleListDragEnd } from 'services/drag-and-drop-helper';
import { Col, Row } from 'react-bootstrap';
import TripPackingItemRow from './TripPackingItemRow';

import "./TripPage.scss";
import Trip from 'models/travel/Trip';
import MultiSelect from 'components/Form/multi-select';

const TripPage = () => {
    const search = useLocation().search;
    const tripId = new URLSearchParams(search).get('tripId');
    const [items, setItems] = useState<TripPackingItem[]>([]);
    const [sortedItems, setSortedItems] = useState<TripPackingItem[]>([]);
    const [tags, setTags] = useState<TravelTag[]>([]);
    const [tagOptions, setTagOptions] = useState<MultiSelectModel[]>([]);
    const [isEditingTags, setIsEditingTags] = useState<boolean>(false);
    const [selectedTags, setSelectedTags] = useState<MultiSelectModel[]>([]);

    const [intTripId, setIntBoard] = useState<number>();
    const [trip, setTrip] = useState<Trip>(new Trip());

    const updateRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        var id = parseInt(tripId ?? "");
        if (!isNaN(id))
            setIntBoard(id);
    }, [tripId]);

    useEffect(() => {
        loadPage();
    }, [intTripId]);

    useEffect(() => {
        setSortedItems(sortByNumberPropertyAcsending(items, 'sequence'));
    }, [items]);

    useEffect(() => {
        setTagOptions(tags.map((t) => { return { label: t.name, value: t.id, color: t.colorHexCode ?? undefined }; }));
    }, [tags]);

    useEffect(() => {
        isEditingTags && updateRef.current && updateRef.current.focus();
    }, [isEditingTags]);

    useEffect(() => {
        var tags = trip.tags.map((t) => { return { label: t.name, value: t.id, color: t.colorHexCode ?? undefined }; });
        setSelectedTags(tags);
    }, [trip]);

    const loadPage = () => {
        getTrip();
        getTags();
        getItems();
    }

    const getTrip = () => {
        if (!!intTripId)
            travelApi.getTrip(intTripId, setTrip);
    }

    const getTags = () => {
        if (!!intTripId)
            travelApi.getTags(setTags);
    }

    const getItems = () => {
        if (!!intTripId)
            travelApi.getTripPackingItems(intTripId, setItems);
    }

    const saveTrip = (name: string) => {
        travelApi.updateTrip({ ...trip, name: name }, getTrip);
    }

    const onDragEnd = (result: DropResult) => {
        var item = onSimpleListDragEnd(result, sortedItems, setSortedItems);

        if (!!item)
            travelApi.updateTripPackingItem(item, getItems);
    };

    const saveTripTags = (tagIds: number[]) => {
        if (!!intTripId)
            travelApi.updateTagsForTrip(intTripId, tagIds, onSavedTrip);
    }

    const onSavedTrip = () => {
        getTrip();
        getItems();
    }

    return (
        <Page title={trip.name || ''} titlePlaceholder="+ Add Trip Name" saveUpdate={saveTrip} classNameExtension="trip">
            <Col>
                <Row className="e-trip-tags">
                    {!isEditingTags && <span>
                        {trip.tags.length > 0 && trip.tags.map((t) =>
                            <span style={{ backgroundColor: t.colorHexCode ?? '' }} className='e-tag-tag e-clickable' onClick={() => setIsEditingTags(true)}>
                                {t.name}
                            </span>)}
                        {trip.tags.length == 0 && <span className='e-tag-tag e-clickable' onClick={() => setIsEditingTags(true)}>
                            + Tag
                        </span>}
                    </span>}
                    {isEditingTags
                        && <span className='e-item-field'>
                            <MultiSelect
                                label=''
                                showSelectedOptions
                                noCloseOnSelect
                                onChange={saveTripTags}
                                value={selectedTags}
                                options={tagOptions}
                                groupClass="e-no-bottom-margin"
                                onBlur={() => setIsEditingTags(false)} />
                        </span>
                    }
                </Row>
                <Row>
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Col>
                            <Droppable droppableId={'0'}>
                                {provided => (
                                    <div className='row e-column-items-container' ref={provided.innerRef} {...provided.droppableProps}>
                                        {sortedItems.length > 0 && sortedItems.map((i, index) => {
                                            return <TripPackingItemRow key={i.id} index={index} item={i} tagOptions={tagOptions} reload={getItems} />
                                        })}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </Col>
                    </DragDropContext>
                </Row>
            </Col>
        </Page>
    )
}

export default TripPage;