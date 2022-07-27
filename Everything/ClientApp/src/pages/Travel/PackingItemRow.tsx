import DeleteButton from 'components/DeleteButton';
import InlineUpdate from 'components/Form/InlineUpdate';
import MultiSelect from 'components/Form/multi-select';
import MultiSelectModel from 'components/Form/multi-select-model';
import PackingItem from 'models/travel/PackingItem';
import React, { useEffect, useRef, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Col } from 'react-bootstrap';
import travelApi from 'services/apis/travel-api';

import "./TravelLists.scss";

interface Props {
    item: PackingItem;
    index: number;
    tagOptions: MultiSelectModel[];
    reload: () => void;
}

const PackingItemRow = (props: Props) => {
    const [isHovering, setIsHovering] = useState<boolean>(false);
    const [isEditingTags, setIsEditingTags] = useState<boolean>(false);
    const [selectedTags, setSelectedTags] = useState<MultiSelectModel[]>([]);
    const updateRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        isEditingTags && updateRef.current && updateRef.current.focus();
    }, [isEditingTags]);

    useEffect(() => {
        var tags = props.item.tags.map((t) => { return { label: t.name, value: t.id, color: t.colorHexCode ?? undefined }; });
        setSelectedTags(tags);
    }, [props.item]);

    const saveItem = (name: string) => {
        travelApi.updatePackingItem({ ...props.item, name: name }, props.reload);
    }

    const saveItemTags = (tagIds: number[]) => {
        travelApi.updateTagsForPackingItem(props.item.id, tagIds, props.reload);
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
                        <span className='e-item-field'>
                            <InlineUpdate
                                className='e-item-name'
                                value={props.item.name ?? ''}
                                inputName={"itemName"}
                                onBlur={saveItem}
                                isRequired
                            />
                        </span>
                        {!isEditingTags && props.item.tags.length > 0 && props.item.tags.map((t) =>
                            <span style={{ backgroundColor: t.colorHexCode ?? '' }} className='e-tag-tag e-clickable' onClick={() => setIsEditingTags(true)}>
                                {t.name}
                            </span>)}
                        {!isEditingTags && props.item.tags.length == 0 && <span className='e-tag-tag e-clickable' onClick={() => setIsEditingTags(true)}>
                            + Tag
                        </span>}
                        {isEditingTags
                            && <span className='e-item-field'>
                                <MultiSelect
                                    label=''
                                    showSelectedOptions
                                    noCloseOnSelect
                                    onChange={saveItemTags}
                                    value={selectedTags}
                                    options={props.tagOptions}
                                    groupClass="e-no-bottom-margin"
                                    onBlur={() => setIsEditingTags(false)} />
                            </span>
                        }
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