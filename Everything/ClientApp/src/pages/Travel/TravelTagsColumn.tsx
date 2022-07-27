import InlineAddCol from 'components/Form/InlineAddCol';
import TravelTag from 'models/travel/TravelTag';
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import travelApi from 'services/apis/travel-api';

import "./TravelLists.scss";
import TravelTagRow from './TravelTagRow';

interface Props {
    tags: TravelTag[];
    reload: () => void;
}

const TravelTagsColumn = (props: Props) => {
    const saveNewTag = (name: string) => {
        var newTag = new TravelTag();
        travelApi.createTag({ ...newTag, name: name }, props.reload);
    }

    return (
        <Col className='e-side-bar' >
            <Row>
                <Col className='e-side-bar-title'>
                    <p>Tags</p>
                </Col>
            </Row>
            <Row>
                {props.tags.length > 0 && props.tags.map((t) => <TravelTagRow key={t.id} tag={t} reload={props.reload} />)}
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