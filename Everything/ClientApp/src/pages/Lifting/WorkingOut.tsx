import React, { useEffect, useState } from 'react';
import LiftingApi from 'services/apis/lifting-api';
import './Workout.scss';
import { Row, Col, Button } from 'react-bootstrap';
import { useLocation } from "react-router-dom";
import SingleLiftLog from './SingleLiftLog';
import Page from 'components/Layout/PageLayout';
import LiftingWorkout, { SimpleLiftSetLink } from 'models/lifting/LiftingWorkout';

const WorkingOut = () => {
    const search = useLocation().search;
    const liftingWorkoutId = new URLSearchParams(search).get('liftingWorkoutId');
    const [liftingWorkout, setLiftingWorkout] = useState<LiftingWorkout>();
    const [setLinks, setSetLinks] = useState<SimpleLiftSetLink[]>([]);
    const [currentLiftIndex, setCurrentLiftIndex] = useState<number>(0);
    const [workoutComplete, setWorkoutComplete] = useState<boolean>(false);

    useEffect(() => {
        getLiftWorkout();
    }, [liftingWorkoutId]);

    useEffect(() => {
        setSetLinks(liftingWorkout?.liftSetLinks ?? []);
    }, [liftingWorkout]);

    const getLiftWorkout = () => {
        var id = parseInt(liftingWorkoutId ?? "");
        if (!isNaN(id))
            LiftingApi.getLiftingWorkout(id, setLiftingWorkout);
    }

    const isFirstLift = () => {
        return currentLiftIndex == 0;
    }

    const isLastLift = () => {
        if (!!setLinks)
            return currentLiftIndex == setLinks.length - 1;
    }

    return (
        <Page title="Workout" classNameExtension='workout' >
            {setLinks.length > 0 &&
                <>
                    <Col md={2} className="e-sidebar">
                        <h5 className="e-sidebar-title">Workout Plan</h5>
                        <ul>
                            {setLinks.map((l, i) => {
                                return <li key={l.id} style={i === currentLiftIndex ? { fontWeight: "bold" } : {}}>
                                    <a onClick={() => setCurrentLiftIndex(i)}>{l.name}</a>
                                </li>
                            })}
                        </ul>
                    </Col>
                    {workoutComplete
                        ? <Col>
                            All Done.
                            <Button onClick={() => setWorkoutComplete(false)}>Back to Workout</Button>
                        </Col>
                        : <>
                            <Col md={8}>
                                {/* TODO: Convert buttons to icons on small screen sizes */}
                                <Row>
                                    <Col xs={4}>
                                        <div className="e-lift-previous">
                                            {!isFirstLift() &&
                                                <Button onClick={() => setCurrentLiftIndex(currentLiftIndex - 1)}>Previous</Button>}
                                        </div>
                                    </Col>
                                    <Col xs={4}>
                                        <div className="e-lift-skip" >
                                            <Button onClick={() => setCurrentLiftIndex(currentLiftIndex + 1)}>Remove</Button>
                                        </div>
                                    </Col>
                                    <Col xs={4}>
                                        <div className="e-lift-next" >
                                            {!isLastLift()
                                                ? <Button onClick={() => setCurrentLiftIndex(currentLiftIndex + 1)}>Next</Button>
                                                : <Button onClick={() => setWorkoutComplete(true)}>Finish Workout</Button>}
                                        </div>
                                    </Col>
                                </Row>
                                {setLinks[currentLiftIndex] && <SingleLiftLog
                                    liftSetLinkId={setLinks[currentLiftIndex].id}
                                />}
                            </Col>
                            <Col md={2} className="e-sidebar">
                                <h5 className="e-sidebar-title">History</h5>
                            </Col>
                        </>}
                </>}
        </Page >
    )
}

export default WorkingOut;