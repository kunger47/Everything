import React, { useEffect, useRef, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import './ToDo.scss';
import { Droppable } from 'react-beautiful-dnd';
import ItemBlock from './ItemBlock';
import ToDoColumn from 'models/todo/ToDoColumn';
import ToDoItem from 'models/todo/ToDoItem';
import todoApi from 'services/apis/todo-api';
import { handleRawInputChange } from 'services/form-helpers';
import Input from 'components/Form/Input';

interface Props {
    column: ToDoColumn;
    reload: () => void;
}

const Column = (props: Props) => {
    const [newItem, setNew] = useState<ToDoItem>(new ToDoItem());
    const [isAdding, setIsAdding] = useState<boolean>(false);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [isHovering, setIsHovering] = useState<boolean>(false);
    const [columnName, setColumnName] = useState<string | null>(props.column.name);

    const addRef = useRef<HTMLInputElement>(null);
    const updateRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setColumnName(props.column.name);
    }, [props.column.name]);

    useEffect(() => {
        isEditing && updateRef.current && updateRef.current.focus();
    }, [isEditing]);

    useEffect(() => {
        isAdding && addRef.current && addRef.current.focus();
    }, [isAdding]);

    const saveNew = () => {
        if (!!newItem.name?.trim())
            todoApi.createItem({ ...newItem, toDoColumnId: props.column.id }, props.reload);
        setIsAdding(false);
        setNew(new ToDoItem());
    }

    const saveUpdate = () => {
        setIsEditing(false);
        if (!!columnName && props.column.name != columnName && !!columnName.trim())
            todoApi.updateColumn({ ...props.column, name: columnName }, props.reload);
    };

    const deleteColumn = (id: number) => {
        todoApi.removeColumn(id, props.reload);
    };

    return (
        <>
            <Col className='e-column'>
                <Row>
                    <Col className='e-column-title' onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                        {!isEditing
                            ? <span>
                                {isHovering && <span className="e-pull-right e-delete-icon" onClick={() => deleteColumn(props.column.id)}>x</span>}
                                <p onClick={() => setIsEditing(true)}>{props.column.name}</p>
                            </span>
                            : <Input
                                ref={updateRef}
                                value={columnName ?? undefined}
                                inputName={"columnName"}
                                handleInputChange={setColumnName}
                                onBlur={saveUpdate}
                            />}
                    </Col>
                </Row>
                <Droppable droppableId={props.column.id.toString()}>
                    {provided => (
                        <div className='row e-column-items-container' ref={provided.innerRef} {...provided.droppableProps}>
                            {props.column.toDoItems.sort((a, b) => a.sequence - b.sequence).map((item: ToDoItem, index: number) =>
                                <ItemBlock item={item} key={item.id} index={index} reload={props.reload} />
                            )}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable >
                <Row className="e-add-item-row">
                    {!isAdding
                        ? <Button onClick={() => setIsAdding(true)}>+</Button>
                        : <Input
                            ref={addRef}
                            value={newItem.name ?? undefined}
                            inputName={"columnName"}
                            handleInputChange={handleRawInputChange([newItem, setNew], "name")}
                            onBlur={saveNew}
                        />}
                </Row>
            </Col >
        </>
    )
}

export default Column;