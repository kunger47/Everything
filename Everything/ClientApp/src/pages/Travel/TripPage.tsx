import Page from 'components/Layout/PageLayout';
import React, { useEffect, useRef, useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import ToDoColumn from 'models/todo/ToDoColumn';
import todoApi from 'services/apis/todo-api';
import { Col, Row } from 'react-bootstrap';
import { handleRawInputChange } from 'services/form-helpers';
import { useLocation } from 'react-router-dom';
import Input from 'components/Form/Input';
import { copyObject } from 'services/object-helper';

const TripPage = () => {
    const search = useLocation().search;
    const tripId = new URLSearchParams(search).get('tripId');

    const [intTripId, setIntBoard] = useState<number>();

    const addRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        var id = parseInt(tripId ?? "");
        if (!isNaN(id))
            setIntBoard(id);
    }, [tripId]);

    // const onDragEnd = (result: DropResult) => {
    //     let { destination, source } = result;

    //     if (!destination)
    //         return;
    //     if (destination.droppableId === source.droppableId && destination.index === source.index)
    //         return;

    //     let arrayCopy = copyObject(columns);
    //     let columnIndex = arrayCopy.findIndex(c => c.id.toString() === source.droppableId);
    //     let newColumnIndex = arrayCopy.findIndex(c => c.id.toString() === destination?.droppableId);
    //     if (columnIndex > -1) {
    //         let item = arrayCopy[columnIndex].toDoItems.splice(source.index, 1)[0];
    //         item.sequence = destination.index;
    //         item.toDoColumnId = destination.droppableId as any as number;
    //         arrayCopy[newColumnIndex].toDoItems.splice(destination.index, 0, item);
    //         setColumns(arrayCopy);
    //         todoApi.updateItem(item, loadColumns);
    //     }
    // };

    return (
        <Page title="{Trip name here}" classNameExtension="to-do">
            {/* <DragDropContext onDragEnd={onDragEnd}>
                {columns.map((col: ToDoColumn) =>
                    <Column key={col.id} column={col} reload={loadColumns} />
                )}
            </DragDropContext> */}
            <Col className='e-column'>
                <Row>
                    {/* <Col className='e-column-title'>
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
                    </Col> */}
                </Row>
            </Col>
        </Page>
    )
}

export default TripPage;