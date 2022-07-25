import React, { useEffect, useRef, useState } from 'react';
import './ToDo.scss';
import todoApi from 'services/apis/todo-api';
import ToDoBoard from 'models/todo/ToDoBoard';
import { Col } from 'react-bootstrap';
import { Link as ReactLink } from 'react-router-dom';
import Input from 'components/Form/Input';
import DeleteButton from 'components/DeleteButton';

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
        <Col sm={3} id={props.board.id.toString()} className='e-todo-page-block e-board-block' draggable="true" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
            <ReactLink to={`/todoboard?boardId=${props.board.id}`}>
                <p className="e-select-board-link">
                    GO
                </p>
            </ReactLink>
            {!isEditing
                ? <span>
                    {isHovering && <DeleteButton className='e-pull-right' onClick={() => deleteBoard(props.board.id)} />}
                    <p className="e-board-name" onClick={() => setIsEditing(true)}>{props.board.name}</p>
                </span>
                : <Input
                    ref={updateRef}
                    value={itemName ?? undefined}
                    inputName={"itemName"}
                    handleInputChange={setItemName}
                    onBlur={saveUpdate}
                />
            }
        </Col>
    )
}

export default BoardBlock;