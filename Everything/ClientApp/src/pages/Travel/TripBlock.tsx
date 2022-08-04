import React, { useEffect, useRef, useState } from 'react';
import { Col } from 'react-bootstrap';
import { Link as ReactLink } from 'react-router-dom';
import Input from 'components/Form/Input';
import DeleteButton from 'components/DeleteButton';
import Trip from 'models/travel/Trip';
import travelApi from 'services/apis/travel-api';

interface Props {
    trip: Trip;
    reload: () => void;
}

const TripBlock = (props: Props) => {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [isHovering, setIsHovering] = useState<boolean>(false);
    const [itemName, setItemName] = useState<string | null>(props.trip.name);

    const updateRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setItemName(props.trip.name);
    }, [props.trip.name]);

    useEffect(() => {
        isEditing && updateRef.current && updateRef.current.focus();
    }, [isEditing]);

    const saveUpdate = () => {
        setIsEditing(false);
        if (props.trip.name != itemName && !!itemName && !!itemName.trim())
            travelApi.updateTrip({ ...props.trip, name: itemName }, props.reload);
    };

    const deleteTrip = (tripId: number) => {
        travelApi.removeTrip(tripId, props.reload);
    };

    return (
        <Col sm={3} id={props.trip.id.toString()} className='e-travel-page-block e-trip-block' draggable="true" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
            <ReactLink to={`/trip?tripId=${props.trip.id}`}>
                <p className="e-select-trip-link">
                    GO
                </p>
            </ReactLink>
            {!isEditing
                ? <span>
                    {isHovering && <DeleteButton className='e-pull-right' onClick={() => deleteTrip(props.trip.id)} />}
                    <p className="e-trip-name" onClick={() => setIsEditing(true)}>{props.trip.name}</p>
                </span>
                : <Input
                    ref={updateRef}
                    value={itemName ?? undefined}
                    inputName={"itemName"}
                    handleInputChange={setItemName}
                    onBlur={saveUpdate}
                />
            }
        </Col>
    )
}

export default TripBlock;