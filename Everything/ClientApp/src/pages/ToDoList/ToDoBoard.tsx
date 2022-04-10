import Page from 'components/Layout/PageLayout';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import './ToDo.scss';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import Column from './Column';
import ToDoColumn from 'models/todo/ToDoColumn';
import todoApi from 'services/apis/todo-api';
import { Col, FormControl, Row } from 'react-bootstrap';
import { handleRawInputChange } from 'services/form-helpers';
import { useLocation } from 'react-router-dom';

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

    const returnValue = (property: keyof ToDoColumn) => (e: ChangeEvent<HTMLInputElement>) => {
        handleRawInputChange([newColumn, setNewColumn], property)(e.currentTarget.value);
    };

    const onDragEnd = (result: DropResult) => {
        let { destination, source, draggableId } = result;

        if (!destination) {
            return;
        }

        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }

        let columnIndex = columns.findIndex(c => c.id.toString() === source.droppableId);
        if (columnIndex > -1) {
            let col = columns[columnIndex];
            let toDoIndex = col.toDoItems.findIndex(i => i.id.toString() === draggableId);

            if (toDoIndex > -1) {
                let item = col.toDoItems[toDoIndex];
                let updates = JSON.parse(JSON.stringify(item));
                todoApi.updateItem({ ...updates, sequence: destination.index, toDoColumnId: (destination.droppableId as any as number) }, loadColumns);
            }
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
                                <FormControl
                                    ref={addRef}
                                    value={newColumn.name ?? undefined}
                                    onChange={returnValue("name")}
                                    onBlur={() => saveColumn()}
                                />
                            </>}
                    </Col>
                </Row>
            </Col>
        </Page>
    )
}

export default ToDoBoard;