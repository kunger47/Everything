import React, { ChangeEvent, useEffect, useState } from 'react';
import Lift from "models/lifting/Lift";
import LiftingApi from 'services/apis/lifting-api';
import './Workout.scss';
import { Row, Col, Button, FormControl, Form } from 'react-bootstrap';
import ReactPlayer from "react-player"
import LiftSet from 'models/lifting/LiftSet';
import liftingApi from 'services/apis/lifting-api';
import { getDateURLFormat } from 'services/date';
import { handleRawInputChange } from 'services/form-helpers';
import EditibleSetRow from './EditibleSetRow';

interface Props {
    lift: Lift;
    saveLift: (videoLink: string) => void;
}

const SingleLiftLog = (props: Props) => {
    const [showVideo, setShowVideo] = useState<boolean>(true);
    const [sets, setSets] = useState<LiftSet[]>([]);
    const [newSet, setNewSet] = useState<LiftSet>(new LiftSet());
    const [addingSet, setAddingSet] = useState<boolean>(false);
    const [videoLink, setVideoLink] = useState<string>('');

    useEffect(() => {
        //TODO: Pull in Luxon to handle sending down dates to api.
        getSets();
    }, [props.lift]);

    const getSets = () => {
        if (props.lift?.id)
            LiftingApi.getLiftSetRecordsForDate(props.lift.id, new Date(), setSets);
    }

    const onSaveSet = () => {
        // Should I requiry the api? will that restart the video?
        liftingApi.createLiftSetRecord(newSet, handleCreate);
    }

    const handleCreate = () => {
        setAddingSet(false);
        getSets();
    }

    const handleUpdate = () => {
        getSets();
    }

    const onCancelSet = () => {
        setAddingSet(false);
    }

    const getNewSet = () => {
        return { liftId: props.lift.id, number: getNextSetNumber(), date: getDateURLFormat(new Date()), reps: null, weight: null };
    }

    const getNextSetNumber = () => {
        var sequenceNumbers = sets?.map(r => r.number ?? 0);
        if (sequenceNumbers.length === 0)
            sequenceNumbers = [0]
        return Math.max(...sequenceNumbers) + 1;
    }

    const indicateAdding = () => {
        setAddingSet(true);
        setNewSet(getNewSet());
    }

    const returnValue = (property: keyof LiftSet) => (e: ChangeEvent<HTMLInputElement>) => {
        handleRawInputChange([newSet, setNewSet], property)(e.currentTarget.value);
    };

    const updateLink = (e: ChangeEvent<HTMLInputElement>) => {
        setVideoLink(e.currentTarget.value);
    }

    return (
        <>
            <Row>
                <Col md={12} className="e-lift-log-title">
                    <Button className="e-pull-right" onClick={() => { setShowVideo(!showVideo) }}>{showVideo ? "Hide Video" : "Show Video"}</Button>
                    <h2 className="e-lift-title">
                        {props.lift.name}
                    </h2>
                    {props.lift.name
                        && <a target="_blank" href={`https://www.youtube.com/results?search_query=${props.lift.name.replace(' ', '+')}`}>
                            Search Youtube
                        </a>}
                </Col>
            </Row>
            <Row>
                {props.lift.videoLink
                    ? <>
                        {showVideo && <Col md={12} className="e-video">
                            <ReactPlayer
                                url={props.lift.videoLink}
                            />
                        </Col>}
                    </>
                    : <>
                        <Col md={2}>
                            <Form.Label>Video Link</Form.Label>
                        </Col>
                        <Col md={4}>
                            <FormControl
                                value={videoLink}
                                onChange={updateLink}
                            />
                        </Col>
                        <Col md={6}>
                            <Button onClick={() => props.saveLift(videoLink)}>Save Video Link</Button>
                        </Col>
                    </>}
                <hr />
                <Col md={12}>
                    <Row>
                        <Col className="e-label" xs={3}>
                            Set
                        </Col>
                        <Col className="e-label" xs={3}>
                            Reps
                        </Col>
                        <Col className="e-label" xs={3}>
                            Weight
                        </Col>
                        <Col className="e-label" xs={3}>
                        </Col>
                    </Row>
                    {sets && sets.map((set) => {
                        return <EditibleSetRow
                            key={set.id}
                            set={set}
                            onSuccessfulEdit={handleUpdate}
                        />
                    })}
                    {addingSet
                        ? <Row>
                            <Col xs={3}>
                                <FormControl
                                    value={newSet.number ?? undefined}
                                    onChange={returnValue("number")}
                                />
                            </Col>
                            <Col xs={3}>
                                <FormControl
                                    value={newSet.reps ?? undefined}
                                    onChange={returnValue("reps")}
                                />
                            </Col>
                            <Col xs={3}>
                                <FormControl
                                    value={newSet.weight ?? undefined}
                                    onChange={returnValue("weight")}
                                />
                            </Col>
                            <Col xs={3} className="e-btn-group">
                                <Button onClick={onSaveSet}>Save</Button>
                                <Button onClick={onCancelSet}>Cancel</Button>
                            </Col>
                        </Row>
                        : <Row>
                            <Col>
                                <Button className="e-add-row" onClick={() => indicateAdding()}>+</Button>
                            </Col>
                        </Row>
                    }
                </Col>
            </Row >
        </>
    )
}

export default SingleLiftLog;