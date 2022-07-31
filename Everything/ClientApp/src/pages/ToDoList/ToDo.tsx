import Page from 'components/Layout/PageLayout';
import React, { useEffect, useRef, useState } from 'react';
import './ToDo.scss';
import todoApi from 'services/apis/todo-api';
import { Col, Row } from 'react-bootstrap';
import { handleRawInputChange } from 'services/form-helpers';
import ToDoBoard from 'models/todo/ToDoBoard';
import BoardBlock from './BoardBlock';
import Input from 'components/Form/Input';
import ToDoBoardFolder from 'models/todo/ToDoBoardFolder';
import FolderBlock from './FolderBlock';
import BackBlock from './BackBlock';

const ToDo = () => {
    const [boards, setBoards] = useState<ToDoBoard[]>([]);
    const [folders, setFolders] = useState<ToDoBoardFolder[]>([]);
    const [selectedFolder, setSelectedFolder] = useState<ToDoBoardFolder | null>(null);
    const [newFolder, setNewFolder] = useState<ToDoBoardFolder>(new ToDoBoardFolder());
    const [isAddingFolder, setIsAddingFolder] = useState<boolean>(false);
    const [newBoard, setNewBoard] = useState<ToDoBoard>(new ToDoBoard());
    const [isAddingBoard, setIsAddingBoard] = useState<boolean>(false);

    const addRef = useRef<HTMLInputElement>(null);
    const addBoardRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const draggableBoards = document.querySelectorAll('.e-board-block');
        const draggableFolders = document.querySelectorAll('.e-folder-block');
        const dropZoneFolders = document.querySelectorAll('.e-folder-block');

        draggableBoards.forEach(b => {
            b.addEventListener('dragstart', dragStart)
            b.addEventListener('dragend', dragEnd)
        });

        draggableFolders.forEach(f => {
            f.addEventListener('dragstart', dragStart)
            f.addEventListener('dragend', dragEnd)
        });

        dropZoneFolders.forEach(f => {
            f.addEventListener('dragover', dragOver);
            f.addEventListener('dragenter', dragEnter);
            f.addEventListener('dragleave', dragLeave);
            f.addEventListener('drop', dragDrop);
        });
    });

    let dragItem: any | null = null;

    let dragStart = (e: any) => {
        dragItem = e;
        console.log('drag started');
    }

    let dragEnd = () => {
        dragItem = null;
        console.log('drag ended');
    }

    let dragOver = (e: any) => {
        e.preventDefault();
        console.log('drag over');
    }

    let dragEnter = () => {
        console.log('drag entered');
    }

    let dragLeave = () => {
        console.log('drag left');
    }

    let dragDrop = (e: any) => {
        var droppedIn: any = e;

        console.log('drag dropped');
        if (!!droppedIn?.target && !!dragItem?.target) {
            console.log(dragItem.target.id);
            console.log(droppedIn.target.id);
            saveBoardMoveUpdate(parseInt(dragItem.target.id), parseInt(droppedIn.target.id));
        }
    }

    const saveBoardMoveUpdate = (boardId: number, folderId: number) => {
        var droppedBoard = boards.find(b => b.id == boardId) ?? null;

        if (!!droppedBoard)
            todoApi.updateBoard({ ...droppedBoard, boardFolderId: folderId }, loadBoards);
    };

    // const saveFolderMoveUpdate = () => {
    //     if (props.folder.name != itemName && !!itemName && !!itemName.trim())
    //         todoApi.updateFolder({ ...props.folder, name: itemName }, props.reload);
    // };

    useEffect(() => {
        loadBoards();
        loadFolders();
    }, [selectedFolder]);

    useEffect(() => {
        isAddingBoard && addBoardRef.current && addBoardRef.current.focus();
    }, [isAddingBoard]);

    useEffect(() => {
        isAddingFolder && addRef.current && addRef.current.focus();
    }, [isAddingFolder]);

    const loadBoards = () => {
        todoApi.getBoardsForFolder(selectedFolder?.id ?? null, setBoards);
    }

    const loadFolders = () => {
        todoApi.getFoldersForFolder(selectedFolder?.id ?? null, setFolders);
    }

    const saveFolder = () => {
        if (!!newFolder.name && !!newFolder.name.trim())
            todoApi.createFolder({ ...newFolder, boardFolderId: selectedFolder?.id ?? null }, loadFolders);
        setIsAddingFolder(false);
    }

    const saveBoard = () => {
        if (!!newBoard.name && !!newBoard.name.trim())
            todoApi.createBoard({ ...newBoard, boardFolderId: selectedFolder?.id ?? null }, loadBoards);
        setIsAddingBoard(false);
    }

    const previousFolder = () => {
        if (!!selectedFolder) {
            setSelectedFolder(folders.find(folder => folder.id == selectedFolder.boardFolderId) ?? null);
        }
    }

    return (
        <Page classNameExtension="to-do">
            <Col>
                <Row>
                    {!!selectedFolder && <BackBlock previousFolder={() => previousFolder()} />}
                    {folders.sort((a, b) => a.id - b.id).map((folder: ToDoBoardFolder) =>
                        <FolderBlock key={folder.id} folder={folder} reload={loadFolders} selectFolder={() => setSelectedFolder(folder)} />
                    )}
                    <Col sm={3} className='e-todo-page-block e-add-board-block e-folder-block'>
                        {!isAddingFolder
                            ? <p className='e-add-column' onClick={() => setIsAddingFolder(true)}>+</p>
                            : <>
                                <Input
                                    ref={addRef}
                                    value={newFolder.name ?? undefined}
                                    inputName={"newFolderName"}
                                    handleInputChange={handleRawInputChange([newFolder, setNewFolder], "name")}
                                    onBlur={saveFolder}
                                />
                            </>}
                    </Col>
                    {boards.sort((a, b) => a.id - b.id).map((board: ToDoBoard) =>
                        <BoardBlock key={board.id} board={board} reload={loadBoards} />
                    )}
                    <Col sm={3} className='e-todo-page-block e-add-board-block'>
                        {!isAddingBoard
                            ? <p className='e-add-column' onClick={() => setIsAddingBoard(true)}>+</p>
                            : <>
                                <Input
                                    ref={addBoardRef}
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