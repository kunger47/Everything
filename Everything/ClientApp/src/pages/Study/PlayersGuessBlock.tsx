import React, { useState } from 'react';
import './Study.scss';
import { Col } from 'react-bootstrap';
import QuestionAnswer from 'models/study/QuestionAnswer';
import NumberInput from 'components/Form/NumberInput';

interface Props {
    questionAnswer: QuestionAnswer;
    submitUserGuess: (right: boolean | null, playersBet: number) => void;
    removeUserGuess: () => void;
}

const PlayersGuessBlock = (props: Props) => {
    const [playersBet, setPlayersBet] = useState<number>(props.questionAnswer.bet ?? 0);

    return (
        <Col xs={3} key={props.questionAnswer.playerId} className='e-study-block e-player-answers-block'>
            <div>{props.questionAnswer.playerName}</div>
            <div>
                <NumberInput
                    value={playersBet}
                    inputName={'Bet'}
                    handleInputChange={setPlayersBet} />
            </div>
            <div className="e-answer-toggles">
                <span className="e-right-toggle">
                    <input onClick={() => props.submitUserGuess(true, playersBet)} type="radio" checked={props.questionAnswer.wasRight == true} />
                </span>
                <span className="e-null-toggle">
                    <input onClick={() => props.removeUserGuess()} type="radio" checked={props.questionAnswer.wasRight == null} />
                </span>
                <span className="e-wrong-toggle">
                    <input onClick={() => props.submitUserGuess(false, playersBet)} type="radio" checked={props.questionAnswer.wasRight == false} />
                </span>
            </div>
        </Col>
    )
}

export default PlayersGuessBlock;