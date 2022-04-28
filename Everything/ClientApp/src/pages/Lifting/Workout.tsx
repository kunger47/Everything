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
import LiftingWorkout from 'models/lifting/LiftingWorkout';
import Input from 'components/Form/Input';
import { handleRawInputChange } from 'services/form-helpers';

const Workout = () => {
    const [workouts, setWorkouts] = useState<LiftingWorkout[]>([]);
    const [plans, setPlans] = useState<LiftDayPlan[]>([]);
    const [selectedPlan, setSelectedPlan] = useState<LiftDayPlan>();
    const [groups, setGroups] = useState<MuscleGroup[]>([]);
    const [selectedGroup, setSelectedGroup] = useState<MuscleGroup>();
    const [lifts, setLifts] = useState<Lift[]>([]);
    const [header, setHeader] = useState<string>("Select a Workout Plan");
    const [isCreating, setIsCreating] = useState<boolean>(false);
    const [newWorkout, setNewWorkout] = useState<LiftingWorkout>(new LiftingWorkout());

    useEffect(() => {
        LiftingApi.getLiftDayPlans(setPlans);
    }, []);

    useEffect(() => {
        getWorkouts();
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

    const getWorkouts = () => {
        LiftingApi.getLiftingWorkoutsForDate(new Date(), setWorkouts);
    }

    const createWorkout = () => {
        if (!!selectedPlan?.id)
            LiftingApi.createLiftingWorkout(selectedPlan.id, newWorkout, onSaved);
    }

    const onSaved = () => {
        setIsCreating(false);
        setNewWorkout(new LiftingWorkout());
        getWorkouts();
    }

    return (
        <Page title="Workout" classNameExtension='workout' >
            <Col md={10}>
                {!isCreating
                    ? <div className="e-grouping">
                        {
                            workouts.map((workout: LiftingWorkout) => {
                                return <ReactLink to={`/workoutplan?liftingWorkoutId=${workout.id}`}>
                                    <Button key={workout.id}>
                                        {workout.name}
                                    </Button>
                                </ReactLink>
                            })
                        }
                        <Button onClick={() => setIsCreating(true)}>
                            +
                        </Button>
                    </div>
                    : <>
                        <h1>{header}</h1>
                        {!!selectedPlan && selectedGroup === undefined &&
                            <>
                                <Input
                                    value={newWorkout.name}
                                    inputName={'WorkoutName'}
                                    handleInputChange={handleRawInputChange([newWorkout, setNewWorkout], "name")}
                                />
                                <Button onClick={createWorkout}>
                                    Create Workout
                                </Button>
                            </>}
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
                    </>
                }
            </Col>
            <Col md={2} className="e-sidebar">
                <h5 className="e-sidebar-title">History</h5>
            </Col>
        </Page >
    )
}

export default Workout;