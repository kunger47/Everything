import Lift from 'models/lifting/Lift';
import MuscleGroup from 'models/lifting/MuscleGroup';
import React from 'react';
import './Workout.scss';

interface Props {
    items: Lift[];
    onBack: (group?: MuscleGroup) => void;
}

const Lifts = (props: Props) => {
    return (
        <div className="e-grouping">
            <div className="e-group-item e-back" onClick={() => props.onBack(undefined)}>
                {"<-"}
            </div>
            {
                props.items.map((lift: Lift) => {
                    return <div key={lift.id} className="e-group-item e-item">
                        {lift.name}
                    </div>
                })
            }
            <div className="e-group-item e-add-item">
                +
            </div>
        </div>
    )
}

export default Lifts;