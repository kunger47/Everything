import React, { useEffect, useState } from 'react';
import Lift from "models/lifting/Lift";
import LiftingApi from 'services/apis/lifting-api';
import './Workout.scss';
import { Row, Col, Button } from 'react-bootstrap';
import { useLocation } from "react-router-dom";
import SingleLiftLog from './SingleLiftLog';
import Page from 'components/Layout/PageLayout';

const WorkingOut = () => {
    const search = useLocation().search;
    const planId = new URLSearchParams(search).get('planId');
    const [lifts, setLifts] = useState<Lift[]>([]);
    const [currentLiftIndex, setCurrentLiftIndex] = useState<number>(0);
    const [workoutComplete, setWorkoutComplete] = useState<boolean>(false);

    useEffect(() => {
        getLifts();
    }, [planId]);

    const getLifts = () => {
        var id = parseInt(planId ?? "");
        // TODO: return these as grouped by muscle group from api
        if (!isNaN(id))
            LiftingApi.getLiftsForPlan(id, setLifts);
    }

    const saveLift = (liftId: number) => (videoLink: string) => {
        let lift = lifts.find(l => l.id === liftId);
        if (lift) {
            lift.videoLink = videoLink;
            LiftingApi.updateLift(lift, getLifts);
        }
    }

    const isFirstLift = () => {
        return currentLiftIndex == 0;
    }

    const isLastLift = () => {
        return currentLiftIndex == lifts.length - 1;
    }

    return (
        <Page title="Workout" classNameExtension='workout' >
            {/* TODO: Convert into component */}
            <Col md={2} className="e-sidebar">
                <h5 className="e-sidebar-title">Workout Plan</h5>
                <ul>
                    {/* TODO: Turn this into a checklist where you can click to add another random lift */}
                    {/* TODO: how to determine that it is complete? */}
                    {lifts && lifts.map((l, i) => {
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
                            {/* TODO: Turn this into a shuffle where is gets a new lift in the avalible selection (if any) */}
                            <Col xs={4}>
                                <div className="e-lift-skip" >
                                    <Button onClick={() => setCurrentLiftIndex(currentLiftIndex + 1)}>Skip</Button>
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
                        {lifts[currentLiftIndex] && <SingleLiftLog
                            lift={lifts[currentLiftIndex]}
                            saveLift={saveLift(lifts[currentLiftIndex].id)}
                        />}
                    </Col>
                    <Col md={2} className="e-sidebar">
                        <h5 className="e-sidebar-title">History</h5>
                    </Col>
                </>}
        </Page>
    )
}

export default WorkingOut;