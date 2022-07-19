import Page from 'components/Layout/PageLayout';
import React from 'react';
import { Col, Row } from 'react-bootstrap';

import "./PackingItems.scss";

const PackingItems = () => {
    return (
        <Page title="Packing Items" classNameExtension='packing-items'>
            <Col>
                <Row>
                </Row>
            </Col>
            <Col className='e-side-bar'>
                <Row>
                    <Col className='e-side-bar-title'>
                        <p>Tags</p>
                    </Col>
                </Row>
                <Row>
                    <Col className='e-tag-block'>
                        <span>
                            <p className="e-tag-name">{"tags go here"}</p>
                        </span>
                    </Col>
                </Row>
            </Col>
        </Page>
    )
};

export default PackingItems;