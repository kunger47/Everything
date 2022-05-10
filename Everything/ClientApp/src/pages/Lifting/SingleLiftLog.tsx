import React, { useEffect, useState } from 'react';
import LiftingApi from 'services/apis/lifting-api';
import './Workout.scss';
import { Row, Col, Button, Form } from 'react-bootstrap';
import ReactPlayer from "react-player"
import LiftSet from 'models/lifting/LiftSet';
import liftingApi from 'services/apis/lifting-api';
import { getDateURLFormat } from 'services/date';
import { handleRawInputChange } from 'services/form-helpers';
import EditibleSetRow from './EditibleSetRow';
import LiftSetLink from 'models/lifting/LiftSetLink';
import Lift from 'models/lifting/Lift';
import Input from 'components/Form/Input';
import NumberInput from 'components/Form/NumberInput';

interface Props {
    liftSetLinkId: number;
}

const SingleLiftLog = (props: Props) => {
    const [showVideo, setShowVideo] = useState<boolean>(true);
    const [liftSetLink, setLiftSetLink] = useState<LiftSetLink>();
    const [lift, setLift] = useState<Lift>(new Lift());
    const [sets, setSets] = useState<LiftSet[]>([]);
    const [newSet, setNewSet] = useState<LiftSet>(new LiftSet());
    const [addingSet, setAddingSet] = useState<boolean>(false);
    const [videoLink, setVideoLink] = useState<string>('');

    useEffect(() => {
        setLift(liftSetLink?.lift ?? new Lift());
        setSets(liftSetLink?.sets ?? []);
    }, [liftSetLink]);

    useEffect(() => {
        setVideoLink(lift.videoLink);
        if (!showVideo && lift.videoLink)
            setShowVideo(true);
        if (showVideo && !lift.videoLink)
            setShowVideo(false);
    }, [lift.videoLink]);

    useEffect(() => {
    }, [lift.videoLink]);

    useEffect(() => {
        getLiftSetLink();
    }, [props.liftSetLinkId]);

    const getLiftSetLink = () => {
        if (props.liftSetLinkId)
            LiftingApi.getLiftSetLink(props.liftSetLinkId, setLiftSetLink);
    }

    const onSaveSet = () => {
        liftingApi.createLiftSetRecord(newSet, handleCreate);
    }

    const onSaveCopySet = (copiedSet: LiftSet) => {
        var newSet = getNewSet();
        liftingApi.createLiftSetRecord({ ...newSet, weight: copiedSet.weight, reps: copiedSet.reps }, handleCreate);
    }

    const handleCreate = () => {
        setAddingSet(false);
        getLiftSetLink();
    }

    const handleUpdate = () => {
        getLiftSetLink();
    }

    const onCancelSet = () => {
        setAddingSet(false);
    }

    const getNewSet = () => {
        return { liftSetLinkId: props.liftSetLinkId, number: getNextSetNumber(), date: getDateURLFormat(new Date()), reps: null, weight: null };
    }

    const getNextSetNumber = () => {
        var sequenceNumbers = sets.map(r => r.number ?? 0) ?? [];
        if (sequenceNumbers.length === 0)
            sequenceNumbers = [0]
        return Math.max(...sequenceNumbers) + 1;
    }

    const indicateAdding = () => {
        setAddingSet(true);
        setNewSet(getNewSet());
    }

    const updateLink = (link: string) => {
        setVideoLink(link);
    };

    const saveLift = (videoLink: string) => {
        lift.videoLink = videoLink;
        LiftingApi.updateLift(lift, getLiftSetLink);
    }

    return (
        <>
            <Row>
                <Col md={12} className="e-lift-log-title">
                    {!!lift.videoLink && <Button className="e-pull-right" onClick={() => { setShowVideo(!showVideo) }}>
                        {showVideo ? "Hide Video" : "Show Video"}
                    </Button>}
                    <h2 className="e-lift-title">
                        {lift.name ?? ''}
                    </h2>
                    <Col md={12} className="">
                        {<p>{!!lift.description ? `${lift.description}` : "+ Add a lift description"}</p>}
                    </Col>
                    <Col md={12} className="">
                        <a target="_blank" href={`https://www.youtube.com/results?search_query=${(lift.name ?? "").replace(' ', '+')}`}>
                            Search Youtube
                        </a>
                    </Col>
                </Col>
            </Row>
            <Row>
                {showVideo
                    ? <Col md={12} className="e-video">
                        <ReactPlayer
                            url={lift.videoLink ?? ''}
                        />
                    </Col>
                    : <>
                        <Col md={2}>
                            <Form.Label>Video Link</Form.Label>
                        </Col>
                        <Col md={4}>
                            <Input
                                value={videoLink}
                                inputName={"videolink"}
                                handleInputChange={updateLink}
                            />
                        </Col>
                        <Col md={6}>
                            <Button onClick={() => saveLift(videoLink)}>Save Video Link</Button>
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
                    {sets.length > 0 && sets.map((set) => {
                        return <EditibleSetRow
                            key={set.id}
                            set={set}
                            onSuccessfulEdit={handleUpdate}
                            onCopy={() => onSaveCopySet(set)}
                        />
                    })}
                    {addingSet
                        ? <Row>
                            <Col xs={3}>
                                <NumberInput
                                    value={newSet.number}
                                    inputName={'SetNumber'}
                                    handleInputChange={handleRawInputChange([newSet, setNewSet], "number")}
                                />
                            </Col>
                            <Col xs={3}>
                                <NumberInput
                                    value={newSet.reps}
                                    inputName={'SetReps'}
                                    handleInputChange={handleRawInputChange([newSet, setNewSet], "reps")}
                                />
                            </Col>
                            <Col xs={3}>
                                <NumberInput
                                    value={newSet.weight}
                                    inputName={'SetWeight'}
                                    handleInputChange={handleRawInputChange([newSet, setNewSet], "weight")}
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