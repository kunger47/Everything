import Page from 'components/Layout/PageLayout';
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link as ReactLink } from 'react-router-dom';

import "./Travel.scss";

const Travel = () => {
    return (
        <Page classNameExtension='travel'>
            <Col>
                <Row>
                    {/* {!!selectedFolder && <BackBlock previousFolder={() => previousFolder()} />}
                    {folders.sort((a, b) => a.id - b.id).map((folder: ToDoBoardFolder) =>
                        <FolderBlock key={folder.id} folder={folder} reload={loadFolders} selectFolder={() => setSelectedFolder(folder)} />
                    )}
                    {boards.sort((a, b) => a.id - b.id).map((board: ToDoBoard) =>
                        <BoardBlock key={board.id} board={board} reload={loadBoards} />
                    )} */}
                    {/* <Col sm={3} className='e-todo-page-block e-add-board-block'>
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
                    </Col> */}
                </Row>
            </Col>
            <Col className='e-side-bar'>
                <Row>
                    <Col className='e-side-bar-title'>
                        <p>Lists</p>
                    </Col>
                </Row>
                <Row>
                    <ReactLink to={`/travellists`}>
                        <Col className='e-travel-block'>
                            <span>
                                <p className="e-block-name">{"Packing Items & Tags"}</p>
                            </span>
                        </Col>
                    </ReactLink>
                </Row>
            </Col>
        </Page>
    )
};

export default Travel;