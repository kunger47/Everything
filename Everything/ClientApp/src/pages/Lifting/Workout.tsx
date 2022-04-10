import React, { useEffect, useState } from 'react';
import Lift from "models/lifting/Lift";
import LiftDayPlan from "models/lifting/LiftDayPlan";
import MuscleGroup from "models/lifting/MuscleGroup";
import LiftingApi from 'services/apis/lifting-api';
import './Workout.scss';
import LiftPlans from './LiftPlans';
import MuscleGroups from './MuscleGroups';
import Lifts from './Lifts';
import { Col, Button } from 'react-bootstrap';
import { Link as ReactLink } from 'react-router-dom';
import Page from 'components/Layout/PageLayout';

const Workout = () => {
    const [plans, setPlans] = useState<LiftDayPlan[]>([]);
    const [selectedPlan, setSelectedPlan] = useState<LiftDayPlan>();
    const [groups, setGroups] = useState<MuscleGroup[]>([]);
    const [selectedGroup, setSelectedGroup] = useState<MuscleGroup>();
    const [lifts, setLifts] = useState<Lift[]>([]);
    const [header, setHeader] = useState<string>("Select a Workout Plan");

    useEffect(() => {
        LiftingApi.getLiftDayPlans(setPlans);
    }, []);

    useEffect(() => {
        var title = selectedGroup
            ? `${selectedGroup.name} Excersises`
            : selectedPlan
                ? "Start Workout or Select a Group to View Exersises"
                : "Select a Workout Plan";
        setHeader(title);
    }, [selectedPlan, selectedGroup]);

    useEffect(() => {
        if (selectedPlan?.id)
            LiftingApi.getMuscleGroupsForPlan(selectedPlan.id, setGroups);
    }, [selectedPlan]);

    useEffect(() => {
        if (selectedGroup?.id)
            LiftingApi.getLiftsForGroup(selectedGroup.id, setLifts);
    }, [selectedGroup]);

    return (
        <Page title="Workout" classNameExtension='workout' >
            <Col md={10}>
                <h1>{header}</h1>
                {selectedPlan === undefined
                    ? <LiftPlans
                        items={plans}
                        onClick={setSelectedPlan} />
                    : selectedGroup === undefined
                        ? <MuscleGroups
                            items={groups}
                            onClick={setSelectedGroup}
                            onBack={setSelectedPlan} />
                        : <Lifts
                            items={lifts}
                            onBack={setSelectedGroup} />
                }
                {!!selectedPlan && selectedGroup === undefined &&
                    <ReactLink to={`/workoutplan?planId=${selectedPlan.id}`}>
                        <Button className="">
                            Start Workout
                        </Button>
                    </ReactLink>}
            </Col>
            <Col md={2} className="e-sidebar">
                <h5 className="e-sidebar-title">History</h5>
            </Col>
        </Page>
    )
}

export default Workout;