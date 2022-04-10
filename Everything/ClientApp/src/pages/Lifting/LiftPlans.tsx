import React from 'react';
import LiftDayPlan from "models/lifting/LiftDayPlan";
import './Workout.scss';

interface Props {
    items: LiftDayPlan[];
    onClick: (plan: LiftDayPlan) => void;
}

const LiftPlans = (props: Props) => {
    return (
        <div className="e-grouping">
            {
                props.items.map((plan: LiftDayPlan) => {
                    return <div key={plan.id} className="e-group-item e-item" onClick={() => props.onClick(plan)}>
                        {plan.name}
                    </div>
                })
            }
            <div className="e-group-item e-add-item">
                +
            </div>
        </div>
    )
}

export default LiftPlans;