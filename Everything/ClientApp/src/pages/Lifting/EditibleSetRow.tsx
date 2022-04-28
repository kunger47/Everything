import React, { useState } from 'react';
import './Workout.scss';
import { Row, Col, Button } from 'react-bootstrap';
import LiftSet from 'models/lifting/LiftSet';
import liftingApi from 'services/apis/lifting-api';
import { handleRawInputChange } from 'services/form-helpers';
import NumberInput from 'components/Form/NumberInput';

interface Props {
    set: LiftSet;
    onSuccessfulEdit: () => void;
}

const EditibleSetRow = (props: Props) => {
    const [editingSet, setEditingSet] = useState<boolean>(false);
    const [copySet, setCopySet] = useState<LiftSet>(props.set);

    const deleteSet = () => {
        if (copySet.id)
            liftingApi.deleteLiftSetRecord(copySet.id, handleUpdate);
    }

    const onSaveSet = () => {
        liftingApi.updateLiftSetRecord(copySet, handleUpdate);
    }

    const handleUpdate = () => {
        setEditingSet(false);
        props.onSuccessfulEdit();
    }

    const onCancel = () => {
        setCopySet(props.set);
        setEditingSet(false);
    }

    return (
        <>
            {!editingSet
                ? <Row>
                    <Col xs={3} className="e-table-value-col">{copySet.number ?? undefined}</Col>
                    <Col xs={3} className="e-table-value-col">{copySet.reps ?? undefined}</Col>
                    <Col xs={3} className="e-table-value-col">{copySet.weight ?? undefined}</Col>
                    <Col xs={3} className="e-btn-group">
                        <Button onClick={() => setEditingSet(true)}>Update</Button>
                        <Button onClick={() => deleteSet()}>Delete</Button>
                    </Col>
                </Row>
                : <Row>
                    <Col xs={3}>
                        <NumberInput
                            value={copySet.number}
                            inputName={'SetNumber'}
                            handleInputChange={handleRawInputChange([copySet, setCopySet], "number")}
                        />
                    </Col>
                    <Col xs={3}>
                        <NumberInput
                            value={copySet.reps}
                            inputName={'SetReps'}
                            handleInputChange={handleRawInputChange([copySet, setCopySet], "reps")}
                        />
                    </Col>
                    <Col xs={3}>
                        <NumberInput
                            value={copySet.weight}
                            inputName={'SetWeight'}
                            handleInputChange={handleRawInputChange([copySet, setCopySet], "weight")}
                        />
                    </Col>
                    <Col xs={3} className="e-btn-group">
                        <Button onClick={onSaveSet}>Save</Button>
                        <Button onClick={onCancel}>Cancel</Button>
                    </Col>
                </Row>
            }
        </>
    )
}

export default EditibleSetRow;