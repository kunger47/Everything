import React, { useEffect, useRef, useState } from 'react';
import { Col } from 'react-bootstrap';
import { Link as ReactLink } from 'react-router-dom';
import studyApi from 'services/apis/study-api';
import './Study.scss';
import Input from 'components/Form/Input';
import Game from 'models/study/Game';

interface Props {
    game: Game;
    reload: () => void;
}

const GameBlock = (props: Props) => {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [isHovering, setIsHovering] = useState<boolean>(false);
    const [itemName, setItemName] = useState<string | null>(props.game.name);

    const updateRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setItemName(props.game.name);
    }, [props.game.name]);

    useEffect(() => {
        isEditing && updateRef.current && updateRef.current.focus();
    }, [isEditing]);

    const saveUpdate = () => {
        setIsEditing(false);
        if (props.game.name != itemName && !!itemName && !!itemName.trim())
            studyApi.updateGame({ ...props.game, name: itemName }, props.reload);
    };

    const deleteGame = (gameId: number) => {
        studyApi.removeGame(gameId, props.reload);
    };

    return (
        <Col className='e-study-block' onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
            <ReactLink to={`/questiongame?gameId=${props.game.id}`}>
                <p className="e-study-block-link">
                    GO
                </p>
            </ReactLink>
            {!isEditing
                ? <span>
                    {isHovering && <span className="e-pull-right e-delete-icon" onClick={() => deleteGame(props.game.id)}>x</span>}
                    <p className="e-study-block-name" onClick={() => setIsEditing(true)}>{props.game.name}</p>
                </span>
                : <Input
                    ref={updateRef}
                    inputName={'Game Name'}
                    value={itemName}
                    handleInputChange={setItemName}
                    onBlur={saveUpdate} />
            }
        </Col>
    )
}

export default GameBlock;