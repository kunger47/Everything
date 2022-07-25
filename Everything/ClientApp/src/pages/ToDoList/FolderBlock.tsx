import React, { useEffect, useRef, useState } from 'react';
import './ToDo.scss';
import todoApi from 'services/apis/todo-api';
import { Col } from 'react-bootstrap';
import Input from 'components/Form/Input';
import ToDoBoardFolder from 'models/todo/ToDoBoardFolder';
import DeleteButton from 'components/DeleteButton';

interface Props {
    folder: ToDoBoardFolder;
    reload: () => void;
    selectFolder: () => void;
}

const FolderBlock = (props: Props) => {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [isHovering, setIsHovering] = useState<boolean>(false);
    const [itemName, setItemName] = useState<string | null>(props.folder.name);

    const updateRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setItemName(props.folder.name);
    }, [props.folder.name]);

    useEffect(() => {
        isEditing && updateRef.current && updateRef.current.focus();
    }, [isEditing]);

    const saveUpdate = () => {
        setIsEditing(false);
        if (props.folder.name != itemName && !!itemName && !!itemName.trim())
            todoApi.updateFolder({ ...props.folder, name: itemName }, props.reload);
    };

    const deleteFolder = (folderId: number) => {
        todoApi.removeFolder(folderId, props.reload);
    };

    return (
        <Col id={props.folder.id.toString()} sm={3} className='e-todo-page-block e-folder-block' onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
            <span onClick={() => props.selectFolder()}>
                <p className="e-select-board-link">
                    Select
                </p>
            </span>
            {!isEditing
                ? <span>
                    {isHovering && <DeleteButton className='e-pull-right' onClick={() => deleteFolder(props.folder.id)} />}
                    <p className="e-board-name" onClick={() => setIsEditing(true)}>{props.folder.name}</p>
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

export default FolderBlock;