import Page from 'components/Layout/PageLayout';
import React, { useEffect, useRef, useState } from 'react';
import './ToDo.scss';
import todoApi from 'services/apis/todo-api';
import { Col, Row } from 'react-bootstrap';
import { handleRawInputChange } from 'services/form-helpers';
import ToDoBoard from 'models/todo/ToDoBoard';
import BoardBlock from './BoardBlock';
import Input from 'components/Form/Input';

const ToDo = () => {
    const [boards, setBoards] = useState<ToDoBoard[]>([]);
    const [newBoard, setNewBoard] = useState<ToDoBoard>(new ToDoBoard());
    const [isAddingBoard, setIsAddingBoard] = useState<boolean>(false);

    const addRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        loadBoards();
    }, []);

    useEffect(() => {
        isAddingBoard && addRef.current && addRef.current.focus();
    }, [isAddingBoard]);

    const loadBoards = () => {
        todoApi.getBoards(setBoards);
    }

    const saveBoard = () => {
        if (!!newBoard.name && !!newBoard.name.trim())
            todoApi.createBoard(newBoard, loadBoards);
        setIsAddingBoard(false);
    }

    return (
        <Page title="To Do" classNameExtension="to-do">
            <Col>
                <Row>
                    {boards.sort((a, b) => a.sequence - b.sequence).map((board: ToDoBoard) =>
                        <BoardBlock key={board.id} board={board} reload={loadBoards} />
                    )}
                    <Col sm={3} className='e-board-block e-add-board-block'>
                        {!isAddingBoard
                            ? <p className='e-add-column' onClick={() => setIsAddingBoard(true)}>+</p>
                            : <>
                                <Input
                                    ref={addRef}
                                    value={newBoard.name ?? undefined}
                                    inputName={"newBoardName"}
                                    handleInputChange={handleRawInputChange([newBoard, setNewBoard], "name")}
                                    onBlur={saveBoard}
                                />
                            </>}
                    </Col>
                </Row>
            </Col>
            <Col className='e-column'>
                <Row>
                    <Col className='e-column-title'>
                        <p>Upcoming Deadlines</p>
                    </Col>
                </Row>
            </Col>
        </Page >
    )
}

export default ToDo;