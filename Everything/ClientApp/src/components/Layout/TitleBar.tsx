import InlineUpdate from 'components/Form/InlineUpdate';
import React, { useEffect, useRef, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import './TitleBar.scss';

interface Props {
    title?: string | null;
    titlePlaceholder?: string;
    saveUpdate?: (newValue: string) => void;
}

const TitleBar = (props: Props) => {
    const onSave = (value: string) => {
        !!props.saveUpdate && props.saveUpdate(value);
    }

    return (<>
        {(!!props.title || !!props.saveUpdate) && <Row className="e-title-bar">
            <Col>
                {(!props.saveUpdate)
                    ? <span className={!!props.saveUpdate ? 'e-clickable' : ''}>
                        {!!props.title ? props.title : props.titlePlaceholder}
                    </span>
                    : <InlineUpdate
                        placeholder={props.titlePlaceholder ?? ''}
                        // onBlurNoChange={() => setIsEditing(false)}
                        inputName={'header name'}
                        value={props.title ?? props.titlePlaceholder ?? ''}
                        onBlur={onSave}
                        isRequired />
                }
            </Col>
        </Row>}
    </>)
}

export default TitleBar;