import React from 'react';
import './Workout.scss';
import MuscleGroup from 'models/lifting/MuscleGroup';
import LiftDayPlan from 'models/lifting/LiftDayPlan';

interface Props {
    items: MuscleGroup[];
    onClick: (group?: MuscleGroup) => void;
    onBack: (plan?: LiftDayPlan) => void;
}

const MuscleGroups = (props: Props) => {
    return (
        <div className="e-grouping">
            <div className="e-group-item e-back" onClick={() => props.onBack(undefined)}>
                {"<-"}
            </div>
            {
                props.items.map((group: MuscleGroup) => {
                    return <div key={group.id} className="e-group-item e-item" onClick={() => props.onClick(group)}>
                        {group.name}
                    </div>
                })
            }
            <div className="e-group-item e-add-item">
                +
            </div>
        </div>
    )
}

export default MuscleGroups;