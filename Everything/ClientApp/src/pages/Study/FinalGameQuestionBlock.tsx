import React, { useEffect, useState, useRef } from 'react';
import './Study.scss';
import { Col, Modal, Row } from 'react-bootstrap';
import studyApi from 'services/apis/study-api';
import { GameQuestion } from 'models/study/GameQuestionCategory';
import QuestionAnswer from 'models/study/QuestionAnswer';
import Player from 'models/study/Player';
import PlayersGuessBlock from './PlayersGuessBlock';

import useSound from 'use-sound';
import rightSound from '../../audio/correct_sound.wav';
import wrongSound from '../../audio/incorrect_sound.mp3';
import thinkingSound from '../../audio/welcome_to_the_family.mp3';

interface Props {
    question: GameQuestion;
    toggleReload: boolean;
    players: Player[];
    priceOverride: string;
    reload: () => void;
}

const FinalGameQuestionBlock = (props: Props) => {
    const [isSelected, setIsSelected] = useState<boolean>(false);
    const [isHovering, setIsHovering] = useState<boolean>(false);
    const [showingAnswer, setShowingAnswer] = useState<boolean>(false);
    const [answers, setAnswers] = useState<QuestionAnswer[]>([]);
    const [sortedAnswers, setSortedAnswers] = useState<QuestionAnswer[]>([]);
    const [hideQuestion, setHideQuestion] = useState<boolean>(true);

    const inputRef = useRef<HTMLInputElement>(null);
    const betRef = useRef<HTMLInputElement>(null);

    const [playRight] = useSound(rightSound);
    const [playWrong] = useSound(wrongSound);
    const [playThinking] = useSound(thinkingSound);

    useEffect(() => {
        isSelected && !!inputRef && !!inputRef.current && inputRef.current.focus();
    }, [isSelected]);

    useEffect(() => {
        isSelected && !!betRef && !!betRef.current && betRef.current.focus();
    }, [isSelected]);

    useEffect(() => {
        loadAnswers();
    }, [props.question.id, props.toggleReload]);

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

    const loadAnswers = () => {
        if (!!props.question.id)
            studyApi.getAnswersForGameQuestion(props.question.id, setAnswers);
    }

    const submitUserGuess = (answer: QuestionAnswer) => (right: boolean | null, playersBet: number) => {
        if (right)
            playRight();
        else if (right == false)
            playWrong();

        if (!!answer.id) {
            if (!answer.bet)
                studyApi.submitGuessForQuestion({ ...answer, wasRight: right, bet: playersBet }, loadAnswers);
        }
        else
            studyApi.createGuessForQuestion({ ...answer, wasRight: right, bet: playersBet }, loadAnswers);

        if (right)
            setShowingAnswer(true);

        isSelected && !!inputRef && !!inputRef.current && inputRef.current.focus();
    }

    const removeUserGuess = (answer: QuestionAnswer) => () => {
        if (!!answer.id)
            studyApi.removeGuessForQuestion(answer, loadAnswers);
        isSelected && !!inputRef && !!inputRef.current && inputRef.current.focus();
    }

    const handleCloseModal = () => {
        setIsSelected(false);
        props.reload();
    }

    return (
        <>
            <Row className={!!props.priceOverride ? "e-game-final-block" : ''}>
                <Col className="e-study-block e-game-question-block"
                    onClick={() => setIsSelected(true)}>
                    <span>
                        <p className="e-study-block-name">
                            {props.priceOverride}
                        </p>
                    </span>
                </Col>
            </Row>
            <Modal
                show={isSelected}
                className={"e-page-study"}>
                <Modal.Body>
                    <Row>
                        <Col className="e-question-block-col e-flipper-container" xs={12} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                            <div className={showingAnswer ? 'e-question-block e-question-answer-block' : 'e-question-block'}>
                                <div className={hideQuestion ? "e-final-question-card e-question-statement-side" : 'e-question-statement-side'}>
                                    <div className='e-question-actions'>
                                        {isHovering && !hideQuestion && <span className="" onClick={() => setShowingAnswer(!showingAnswer)}>{' FLIP '}</span>}
                                    </div>
                                    <div className="e-question-text e-clickable" onClick={() => {
                                        playThinking();
                                        setHideQuestion(false)
                                    }}>
                                        {hideQuestion
                                            ? <span>Write Down Your Bets</span>
                                            : <>{!props.question.statement.includes("http")
                                                ? <span>{props.question.statement}</span>
                                                : <img src={props.question.statement} />}
                                            </>
                                        }
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
                    </Row>
                    {!hideQuestion && <Row>
                        <>
                            {sortedAnswers.map((a, i) =>
                                <PlayersGuessBlock
                                    key={i}
                                    questionAnswer={a}
                                    submitUserGuess={submitUserGuess(a)}
                                    removeUserGuess={removeUserGuess(a)}
                                />)}
                        </>
                        <Col xs={3} className='e-study-block e-player-answers-block e-clickable' onClick={() => handleCloseModal()}>
                            <div>{"Done."}</div>
                        </Col>
                    </Row>}
                </Modal.Body>
            </Modal>
        </>
    )
}

export default FinalGameQuestionBlock;