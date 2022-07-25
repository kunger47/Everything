import React, { useEffect, useRef, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import studyApi from 'services/apis/study-api';
import './Study.scss';
import Input from 'components/Form/Input';
import Player from 'models/study/Player';
import { formatAsCurrency } from 'services/formatters';
import LimitedColorPickerPopover from 'components/Form/limited-color-picker-popover';
import DeleteButton from 'components/DeleteButton';

interface Props {
    player: Player;
    isResults?: boolean;
    reload: () => void;
}

const GamePlayerBlock = (props: Props) => {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [isHovering, setIsHovering] = useState<boolean>(false);
    const [itemName, setItemName] = useState<string | null>(props.player.name);
    const [itemColor, setItemColor] = useState<string | null>(props.player.colorHexCode);

    const updateRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setItemName(props.player.name);
    }, [props.player.name]);

    useEffect(() => {
        setItemColor(props.player.colorHexCode);
    }, [props.player.colorHexCode]);

    useEffect(() => {
        if (itemColor != props.player.colorHexCode) {
            studyApi.updatePlayer({ ...props.player, colorHexCode: itemColor }, props.reload);
        }
    }, [itemColor]);

    useEffect(() => {
        isEditing && updateRef.current && updateRef.current.focus();
    }, [isEditing]);

    const saveUpdate = () => {
        setIsEditing(false);
        if (props.player.name != itemName && !!itemName && !!itemName.trim())
            studyApi.updatePlayer({ ...props.player, name: itemName }, props.reload);
    };

    const handleSelectColor = (color: string) => {
        setItemColor(color);
    };

    const deletePlayer = (playerId: number) => {
        studyApi.removePlayer(playerId, props.reload);
    };

    return (
        <>
            {props.isResults
                ? <Col style={{ backgroundColor: props.player.colorHexCode ?? '' }} className='e-study-block' onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                    <Row>
                        <Col className="e-study-block-name">{props.player.name ?? ""}</Col>
                        <Col>{formatAsCurrency(props.player.amount, 0)}</Col>
                        <Col>{props.player.numberOfRightAnswers ?? 0}</Col>
                        <Col>{props.player.numberOfWrongAnswers ?? 0}</Col>
                    </Row>
                </Col>
                : <Col style={{ backgroundColor: props.player.colorHexCode ?? '' }} className='e-study-block e-player-block' onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                    {!isEditing
                        ? <span>
                            {isHovering && <DeleteButton onClick={() => deletePlayer(props.player.id)} />}
                            {isHovering && <LimitedColorPickerPopover
                                title={'Player Color'}
                                color={props.player.colorHexCode ?? ''}
                                className="e-pull-right"
                                handleColorChange={handleSelectColor} />}
                            <span className="e-study-block-name" onClick={() => setIsEditing(true)}>{props.player.name ?? "Click to add name..."}</span>
                            <span className="e-study-block-name">{": " + formatAsCurrency(props.player.amount, 0)}</span>
                        </span>
                        : <Input
                            ref={updateRef}
                            inputName={'Player Name'}
                            value={itemName}
                            handleInputChange={setItemName}
                            onBlur={saveUpdate} />
                    }
                </Col>
            }
        </>
    )
}

export default GamePlayerBlock;