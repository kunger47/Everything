import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import './ToDo.scss';
import todoApi from 'services/apis/todo-api';
import ToDoBoard from 'models/todo/ToDoBoard';
import { Col, FormControl } from 'react-bootstrap';
import { Link as ReactLink } from 'react-router-dom';

interface Props {
    board: ToDoBoard;
    reload: () => void;
}

const BoardBlock = (props: Props) => {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [isHovering, setIsHovering] = useState<boolean>(false);
    const [itemName, setItemName] = useState<string | null>(props.board.name);

    const updateRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setItemName(props.board.name);
    }, [props.board.name]);

    useEffect(() => {
        isEditing && updateRef.current && updateRef.current.focus();
    }, [isEditing]);

    const saveUpdate = () => {
        setIsEditing(false);
        if (props.board.name != itemName && !!itemName && !!itemName.trim())
            todoApi.updateBoard({ ...props.board, name: itemName }, props.reload);
    };

    const deleteBoard = (boardId: number) => {
        todoApi.removeBoard(boardId, props.reload);
    };

    return (
        <Col sm={3} className='e-board-block' onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
            <ReactLink to={`/todoboard?boardId=${props.board.id}`}>
                <p className="e-select-board-link">
                    GO
                </p>
            </ReactLink>
            {!isEditing
                ? <span>
                    {isHovering && <span className="e-pull-right e-delete-icon" onClick={() => deleteBoard(props.board.id)}>x</span>}
                    <p className="e-board-name" onClick={() => setIsEditing(true)}>{props.board.name}</p>
                </span>
                : <FormControl
                    ref={updateRef}
                    value={itemName ?? undefined}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => { setItemName(e.currentTarget.value) }}
                    onBlur={saveUpdate} />
            }
        </Col>
    )
}

export default BoardBlock;