import React, { useEffect, useState, KeyboardEvent, useRef } from 'react';
import './Study.scss';
import { Button, Col, FormControl, Modal, Row } from 'react-bootstrap';
import studyApi from 'services/apis/study-api';
import { GameQuestion } from 'models/study/GameQuestionCategory';
import QuestionAnswer from 'models/study/QuestionAnswer';
import { formatAsCurrency } from 'services/formatters';
import { toast } from 'react-toastify';
import Player from 'models/study/Player';
import NumberInput from 'components/Form/NumberInput';

import useSound from 'use-sound';
import rightSound from '../../audio/correct_sound.wav';
import wrongSound from '../../audio/incorrect_sound.mp3';

interface Props {
    question: GameQuestion;
    toggleReload: boolean;
    players: Player[];
    reload: () => void;
}

const GameQuestionBlock = (props: Props) => {
    const [isSelected, setIsSelected] = useState<boolean>(false);
    const [isHovering, setIsHovering] = useState<boolean>(false);
    const [showingAnswer, setShowingAnswer] = useState<boolean>(false);
    const [hasBeenAnswered, setHasBeenAnswered] = useState<boolean>(false);
    const [answers, setAnswers] = useState<QuestionAnswer[]>([]);
    const [sortedAnswers, setSortedAnswers] = useState<QuestionAnswer[]>([]);
    const [colorHexCode, setColorHexCode] = useState<string>('');
    const [playersBet, setPlayersBet] = useState<number>(0);
    const [betIsSubmitted, setBetIsSubmitted] = useState<boolean>(false);

    const inputRef = useRef<HTMLInputElement>(null);
    const betRef = useRef<HTMLInputElement>(null);

    const [playRight] = useSound(rightSound);
    const [playWrong] = useSound(wrongSound);

    useEffect(() => {
        let answerIndex = answers.findIndex(a => a.wasRight);
        if (answerIndex > -1) {
            let playId = answers[answerIndex].playerId;

            let playerIndex = props.players.findIndex(p => p.id == playId);
            if (playerIndex > -1)
                setColorHexCode(props.players[playerIndex].colorHexCode ?? '');
        } else {
            setColorHexCode('');
        }
    }, [props.players, answers]);

    useEffect(() => {
        isSelected && !!inputRef && !!inputRef.current && inputRef.current.focus();
    }, [isSelected]);

    useEffect(() => {
        isSelected && !!betRef && !!betRef.current && betRef.current.focus();
    }, [isSelected]);

    useEffect(() => {
        loadAnswers();
    }, [props.question.id, props.toggleReload]);

    // TODO: Need to handle if no one guesses... might need to add a flag for that?
    useEffect(() => {
        setHasBeenAnswered(props.question.nobodyGotRight || answers.some(a => a.wasRight || a.wasRight == false));
    }, [answers]);

    useEffect(() => {
        setSortedAnswers(answers.sort((a: QuestionAnswer, b: QuestionAnswer) => {
            if (a.playerName < b.playerName) {
                return -1;
            }
            if (a.playerName > b.playerName) {
                return 1;
            }
            return 0;
        }));
    }, [answers]);

    const onPlayerInput = (event: KeyboardEvent<HTMLInputElement>) => {
        let numberPressed = parseInt(event.key);
        if (!isNaN(numberPressed) && numberPressed < props.players.length) {
            let player = props.players[numberPressed];
            toast.success(`${player.name}!`, { style: { backgroundColor: player.colorHexCode ?? "", color: '#000' } });
        }
    }

    const loadAnswers = () => {
        if (!!props.question.id)
            studyApi.getAnswersForGameQuestion(props.question.id, setAnswers);
    }

    const submitUserGuess = (answer: QuestionAnswer, value: boolean | null) => {
        if (value)
            playRight();
        else if (value == false)
            playWrong();

        if (!!answer.id) {
            if (!answer.bet)
                studyApi.submitGuessForQuestion({ ...answer, wasRight: value, bet: playersBet }, loadAnswers);
        }
        else {
            studyApi.createGuessForQuestion({ ...answer, wasRight: value, bet: playersBet }, loadAnswers);
        }
        if (value)
            setShowingAnswer(true);

        isSelected && !!inputRef && !!inputRef.current && inputRef.current.focus();
    }

    const removeUserGuess = (answer: QuestionAnswer) => {
        if (!!answer.id)
            studyApi.removeGuessForQuestion(answer, loadAnswers);
        isSelected && !!inputRef && !!inputRef.current && inputRef.current.focus();
    }

    const handleCloseModal = () => {
        setIsSelected(false);
        props.reload();
    }

    const indicateNoOneKnowsTheAnswer = () => {
        studyApi.updateGameQuestion({ ...props.question, nobodyGotRight: true }, props.reload);
        setShowingAnswer(true);
    }

    return (
        <>
            <Row>
                <Col className="e-study-block e-game-question-block"
                    style={{ backgroundColor: colorHexCode }}
                    onClick={() => setIsSelected(true)}>
                    <span>
                        <p className="e-study-block-name">
                            {!hasBeenAnswered && formatAsCurrency(props.question.points, 0)}
                        </p>
                    </span>
                </Col>
            </Row>
            <Modal
                show={isSelected}
                className={"e-page-study"}>
                <Modal.Body>
                    {props.question.isDouble && <Row>
                        <Col className='e-bonus-col'>
                            <div className=''>
                                <h4>BONUS!</h4>
                            </div>
                        </Col>
                    </Row>}
                    {(!props.question.isDouble || betIsSubmitted) && <Row>
                        <Col className="e-question-block-col e-flipper-container" xs={12} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                            <div className={showingAnswer ? 'e-question-block e-question-answer-block' : 'e-question-block'}>
                                <div className='e-question-statement-side'>
                                    <div className='e-question-actions'>
                                        {isHovering && <span className="" onClick={() => setShowingAnswer(!showingAnswer)}>{' FLIP '}</span>}
                                    </div>
                                    <div className="e-question-text">
                                        <span>{props.question.statement}</span >
                                    </div>
                                </div>
                                <div className='e-question-answer-side'>
                                    <div className='e-question-actions'>
                                        {isHovering && <span className="" onClick={() => setShowingAnswer(!showingAnswer)}>{' FLIP '}</span>}
                                    </div>
                                    <div className="e-question-text">
                                        <span>{props.question.answer}</span >
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>}
                    {!props.question.isDouble && <Row>
                        <Col>
                            <FormControl
                                ref={inputRef}
                                onKeyPress={onPlayerInput} />
                        </Col>
                    </Row>}
                    {props.question.isDouble && <Row>
                        <Col xs={10}>
                            <NumberInput
                                value={playersBet}
                                inputName={'Bet'}
                                ref={inputRef}
                                handleInputChange={setPlayersBet} />
                        </Col>
                        {!betIsSubmitted && <Col xs={2}>
                            <Button onClick={() => setBetIsSubmitted(true)}>Go</Button>
                        </Col>}
                    </Row>}
                    <Row>
                        {(!props.question.isDouble || betIsSubmitted) &&
                            <>
                                {sortedAnswers.map(a =>
                                    <Col xs={3} key={a.playerId} className='e-study-block e-player-answers-block'>
                                        <div>{a.playerName}</div>
                                        <div className="e-answer-toggles">
                                            <span className="e-right-toggle">
                                                <input onClick={() => submitUserGuess(a, true)} type="radio" checked={a.wasRight == true} />
                                            </span>
                                            <span className="e-null-toggle">
                                                <input onClick={() => removeUserGuess(a)} type="radio" checked={a.wasRight == null} />
                                            </span>
                                            <span className="e-wrong-toggle">
                                                <input onClick={() => submitUserGuess(a, false)} type="radio" checked={a.wasRight == false} />
                                            </span>
                                        </div>
                                    </Col>
                                )}
                            </>
                        }
                        {!props.question.isDouble && <Col xs={3} className='e-study-block e-player-answers-block e-clickable' onClick={() => indicateNoOneKnowsTheAnswer()}>
                            <div>{"No one knows the answer."}</div>
                        </Col>}
                        <Col xs={3} className='e-study-block e-player-answers-block e-clickable' onClick={() => handleCloseModal()}>
                            <div>{"Done."}</div>
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default GameQuestionBlock;