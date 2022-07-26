import Page from 'components/Layout/PageLayout';
import React, { useEffect, useRef, useState } from 'react';
import './ToDo.scss';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import Column from './Column';
import ToDoColumn from 'models/todo/ToDoColumn';
import todoApi from 'services/apis/todo-api';
import { Col, Row } from 'react-bootstrap';
import { handleRawInputChange } from 'services/form-helpers';
import { useLocation } from 'react-router-dom';
import Input from 'components/Form/Input';
import { copyObject } from 'services/object-helper';

const ToDoBoard = () => {
    const search = useLocation().search;
    const boardId = new URLSearchParams(search).get('boardId');

    const [newColumn, setNewColumn] = useState<ToDoColumn>(new ToDoColumn());
    const [columns, setColumns] = useState<ToDoColumn[]>([]);
    const [isAddingColumn, setIsAddingColumn] = useState<boolean>(false);
    const [intBoardId, setIntBoard] = useState<number>();

    const addRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        var id = parseInt(boardId ?? "");
        if (!isNaN(id))
            setIntBoard(id);
    }, [boardId]);

    useEffect(() => {
        loadColumns();
    }, [intBoardId]);

    useEffect(() => {
        isAddingColumn && addRef.current && addRef.current.focus();
    }, [isAddingColumn]);

    const loadColumns = () => {
        if (!!intBoardId)
            todoApi.getColumns(intBoardId, setColumns);
    }

    const saveColumn = () => {
        if (newColumn.name && !!newColumn.name.trim() && !!intBoardId)
            todoApi.createColumn({ ...newColumn, toDoBoardId: intBoardId }, loadColumns);
        setIsAddingColumn(false);
        setNewColumn(new ToDoColumn());
    }

    const onDragEnd = (result: DropResult) => {
        let { destination, source } = result;

        if (!destination)
            return;
        if (destination.droppableId === source.droppableId && destination.index === source.index)
            return;

        let arrayCopy = copyObject(columns);
        let columnIndex = arrayCopy.findIndex(c => c.id.toString() === source.droppableId);
        let newColumnIndex = arrayCopy.findIndex(c => c.id.toString() === destination?.droppableId);
        if (columnIndex > -1) {
            let item = arrayCopy[columnIndex].toDoItems.splice(source.index, 1)[0];
            item.sequence = destination.index;
            item.toDoColumnId = destination.droppableId as any as number;
            arrayCopy[newColumnIndex].toDoItems.splice(destination.index, 0, item);
            setColumns(arrayCopy);
            todoApi.updateItem(item, loadColumns);
        }
    };

    return (
        <Page title="To Do" classNameExtension="to-do">
            <DragDropContext onDragEnd={onDragEnd}>
                {columns.map((col: ToDoColumn) =>
                    <Column key={col.id} column={col} reload={loadColumns} />
                )}
            </DragDropContext>
            <Col className='e-column'>
                <Row>
                    <Col className='e-column-title'>
                        {!isAddingColumn
                            ? <p className='e-add-column' onClick={() => setIsAddingColumn(true)}>Add +</p>
                            : <>
                                <Input
                                    ref={addRef}
                                    value={newColumn.name ?? undefined}
                                    inputName={"newColumnName"}
                                    handleInputChange={handleRawInputChange([newColumn, setNewColumn], "name")}
                                    onBlur={saveColumn}
                                />
                            </>}
                    </Col>
                </Row>
            </Col>
        </Page>
    )
}

export default ToDoBoard;