import Input from 'components/Form/Input';
import Page from 'components/Layout/PageLayout';
import Trip from 'models/travel/Trip';
import TripFolder from 'models/travel/TripFolder';
import React, { useEffect, useRef, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link as ReactLink } from 'react-router-dom';
import travelApi from 'services/apis/travel-api';
import { handleRawInputChange } from 'services/form-helpers';
import BackBlock from './BackBlock';
import FolderBlock from './FolderBlock';

import "./Travel.scss";
import TripBlock from './TripBlock';

const Travel = () => {
    const [trips, setTrips] = useState<Trip[]>([]);
    const [folders, setFolders] = useState<TripFolder[]>([]);
    const [selectedFolder, setSelectedFolder] = useState<TripFolder | null>(null);
    const [newFolder, setNewFolder] = useState<TripFolder>(new TripFolder());
    const [isAddingFolder, setIsAddingFolder] = useState<boolean>(false);
    const [newTrip, setNewTrip] = useState<Trip>(new Trip());
    const [isAddingTrip, setIsAddingTrip] = useState<boolean>(false);

    const addRef = useRef<HTMLInputElement>(null);
    const addTripRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const draggableTrips = document.querySelectorAll('.e-trip-block');
        const draggableFolders = document.querySelectorAll('.e-folder-block');
        const dropZoneFolders = document.querySelectorAll('.e-folder-block');

        draggableTrips.forEach(b => {
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
            saveTripMoveUpdate(parseInt(dragItem.target.id), parseInt(droppedIn.target.id));
        }
    }

    const saveTripMoveUpdate = (tripId: number, folderId: number) => {
        var droppedTrip = trips.find(b => b.id == tripId) ?? null;

        if (!!droppedTrip)
            travelApi.updateTrip({ ...droppedTrip, folderId: folderId }, loadTrips);
    };

    // const saveFolderMoveUpdate = () => {
    //     if (props.folder.name != itemName && !!itemName && !!itemName.trim())
    //         todoApi.updateFolder({ ...props.folder, name: itemName }, props.reload);
    // };

    useEffect(() => {
        loadTrips();
        loadFolders();
    }, [selectedFolder]);

    useEffect(() => {
        isAddingTrip && addTripRef.current && addTripRef.current.focus();
    }, [isAddingTrip]);

    useEffect(() => {
        isAddingFolder && addRef.current && addRef.current.focus();
    }, [isAddingFolder]);

    const loadTrips = () => {
        travelApi.getTripsForFolder(selectedFolder?.id ?? null, setTrips);
    }

    const loadFolders = () => {
        travelApi.getFoldersForFolder(selectedFolder?.id ?? null, setFolders);
    }

    const saveFolder = () => {
        if (!!newFolder.name && !!newFolder.name.trim())
            travelApi.createFolder({ ...newFolder, folderId: selectedFolder?.id ?? null }, loadFolders);
        setIsAddingFolder(false);
    }

    const saveTrip = () => {
        if (!!newTrip.name && !!newTrip.name.trim())
            travelApi.createTrip({ ...newTrip, folderId: selectedFolder?.id ?? null }, loadTrips);
        setIsAddingTrip(false);
    }

    const previousFolder = () => {
        if (!!selectedFolder) {
            setSelectedFolder(folders.find(folder => folder.id == selectedFolder.folderId) ?? null);
        }
    }

    return (
        <Page classNameExtension='travel'>
            <Col>
                <Row>
                    {!!selectedFolder && <BackBlock previousFolder={() => previousFolder()} />}
                    {folders.sort((a, b) => a.id - b.id).map((folder: TripFolder) =>
                        <FolderBlock key={folder.id} folder={folder} reload={loadFolders} selectFolder={() => setSelectedFolder(folder)} />
                    )}
                    <Col sm={3} className='e-travel-page-block e-add-trip-block e-folder-block'>
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
                    {trips.sort((a, b) => a.id - b.id).map((trip: Trip) =>
                        <TripBlock key={trip.id} trip={trip} reload={loadTrips} />
                    )}
                    <Col sm={3} className='e-travel-page-block e-add-trip-block'>
                        {!isAddingTrip
                            ? <p className='e-add-column' onClick={() => setIsAddingTrip(true)}>+</p>
                            : <>
                                <Input
                                    ref={addTripRef}
                                    value={newTrip.name ?? undefined}
                                    inputName={"newTripName"}
                                    handleInputChange={handleRawInputChange([newTrip, setNewTrip], "name")}
                                    onBlur={saveTrip}
                                />
                            </>}
                    </Col>
                </Row>
            </Col>
            <Col className='e-side-bar'>
                <ReactLink to={`/travellists`}>
                    <Row className='e-packing-items-button'>
                        <Col className='e-travel-block'>
                            <span className="e-block-name">
                                {"Packing Items & Tags"}
                            </span>
                        </Col>
                    </Row>
                </ReactLink>
            </Col>
        </Page>
    )
};

export default Travel;