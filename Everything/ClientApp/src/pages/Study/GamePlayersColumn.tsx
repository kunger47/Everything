import { Col, Row } from 'react-bootstrap';
import Player from 'models/study/Player';
import GamePlayerBlock from './GamePlayerBlock';
import Input from 'components/Form/Input';
import { useEffect, useRef, useState } from 'react';
import { handleRawInputChange } from 'services/form-helpers';
import studyApi from 'services/apis/study-api';
import { GameRoundType } from './Game';

interface Props {
    players: Player[];
    gameId?: number;
    round: GameRoundType;
    reload: () => void;
    setRound: (round: GameRoundType) => void;
}

const GamePlayersColumn = (props: Props) => {
    const [newPlayer, setNewPlayer] = useState<Player>(new Player());
    const [isAdding, setIsAdding] = useState<boolean>(false);

    const addRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        isAdding && addRef.current && addRef.current.focus();
    }, [isAdding]);

    const savePlayer = () => {
        if (!!newPlayer.name && !!newPlayer.name.trim() && !!props.gameId)
            studyApi.createPlayer({ ...newPlayer, gameId: props.gameId }, props.reload);
        setNewPlayer(new Player());
        setIsAdding(false);
    }

    const setGameRound = (forward: boolean) => {
        if (forward) {
            if (props.round == "Single")
                props.setRound("Double");
            else if (props.round == "Double")
                props.setRound("Final");
            else if (props.round == "Final")
                props.setRound("Results");
        } else {
            if (props.round == "Double")
                props.setRound("Single");
            else if (props.round == "Final")
                props.setRound("Double");
            else if (props.round == "Results")
                props.setRound("Final");
        }
    }

    return (
        <Col className='e-study-column e-players-column'>
            <Row>
                <Col className='e-study-round-column'>
                    {props.round != 'Single' &&
                        <span className="e-study-round-toggle" onClick={() => setGameRound(false)}>
                            {"<"}
                        </span>}
                    <span>{props.round.toUpperCase()}</span>
                    {props.round != 'Results' &&
                        <span className="e-study-round-toggle" onClick={() => setGameRound(true)}>
                            {">"}
                        </span>}
                </Col>
            </Row>
            {(props.round != "Results" && props.round != "Final")
                && <>
                    <Row>
                        <Col className='e-study-column-title'>
                            <span>
                                <p>Players</p>
                            </span>
                        </Col>
                    </Row>
                    {props.players.length > 0 && props.players.map((player: Player) => {
                        return <Row key={player.id}>
                            <GamePlayerBlock player={player} reload={props.reload} />
                        </Row>
                    })}
                    {props.players.length < 9 && <Row>
                        <Col className='e-study-block e-add-study-block'>
                            {!isAdding
                                ? <p onClick={() => setIsAdding(true)}>+</p>
                                : <>
                                    <Input
                                        ref={addRef}
                                        inputName={'Player Name'}
                                        value={newPlayer.name}
                                        handleInputChange={handleRawInputChange([newPlayer, setNewPlayer], "name")}
                                        onBlur={savePlayer} />
                                </>}
                        </Col>
                    </Row>}
                </>
            }
        </Col >
    )
}

export default GamePlayersColumn;