import InlineAddCol from 'components/Form/InlineAddCol';
import TravelTag from 'models/travel/TravelTag';
import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import travelApi from 'services/apis/travel-api';

import "./TravelLists.scss";
import TravelTagRow from './TravelTagRow';

const TravelTagsColumn = () => {
    const [tags, setTags] = useState<TravelTag[]>([]);

    useEffect(() => {
        getTags();
    }, []);

    const getTags = () => {
        travelApi.getTags(setTags);
    }

    const saveNewTag = (name: string) => {
        var newTag = new TravelTag();
        travelApi.createTag({ ...newTag, name: name }, getTags);
    }

    return (
        <Col className='e-side-bar' >
            <Row>
                <Col className='e-side-bar-title'>
                    <p>Tags</p>
                </Col>
            </Row>
            <Row>
                {tags.length > 0 && tags.map((t) => <TravelTagRow key={t.id} tag={t} reload={getTags} />)}
            </Row>
            <Row className="e-add-item-row">
                <InlineAddCol
                    className='e-tag-block'
                    addText={"+ Add"}
                    inputName={"tag name"}
                    onBlur={saveNewTag}
                    isRequired
                />
            </Row>
        </Col>
    )
};

export default TravelTagsColumn;