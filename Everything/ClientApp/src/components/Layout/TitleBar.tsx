import Input from 'components/Form/Input';
import React, { useEffect, useRef, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import './TitleBar.scss';

interface Props {
    title?: string;
    saveUpdate?: (newValue: string) => void;
}

const Titlebar = (props: Props) => {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editableTitle, setEditableTitle] = useState<string>(props.title ?? '');

    const updateRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        isEditing && updateRef.current && updateRef.current.focus();
    }, [isEditing]);

    useEffect(() => {
        setEditableTitle(props.title ?? '');
    }, [props.title]);

    const onSave = () => {
        !!props.saveUpdate && props.saveUpdate(editableTitle);
        setIsEditing(false);
    }

    return (<>
        {props.title && <Row className="e-title-bar">
            <Col>
                {(!props.saveUpdate || !isEditing)
                    ? <p className={!!props.saveUpdate ? 'e-clickable' : ''} onClick={() => setIsEditing(true)}>
                        {!!props.title ? props.title : "+ Add a Category Name"}
                    </p>
                    : <Input
                        ref={updateRef}
                        inputName={'Question'}
                        value={editableTitle}
                        handleInputChange={setEditableTitle}
                        onBlur={onSave}
                        removeBottomMargin />
                }
            </Col>
        </Row>}
    </>)
}

export default Titlebar;