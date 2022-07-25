import React, { useEffect, useRef, useState } from 'react';
import './Study.scss';
import { Col, Row } from 'react-bootstrap';
import Question, { QuestionDifficultyType } from 'models/study/Question';
import studyApi from 'services/apis/study-api';
import Input from 'components/Form/Input';
import DeleteButton from 'components/DeleteButton';

interface Props {
    question: Question;
    reload: () => void;
}

const QuestionBlock = (props: Props) => {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [isEditingAnswer, setIsEditingAnswer] = useState<boolean>(false);
    const [isHovering, setIsHovering] = useState<boolean>(false);
    const [showingAnswer, setShowingAnswer] = useState<boolean>(false);
    const [questionStatement, setQuestionStatement] = useState<string | null>(props.question.statement);
    const [questionAnswer, setQuestionAnswer] = useState<string | null>(props.question.answer);

    const updateRef = useRef<HTMLInputElement>(null);
    const updateAnswerRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setQuestionStatement(props.question.statement);
        if (!!props.question.statement && !props.question.answer) {
            setIsEditingAnswer(true);
            setShowingAnswer(true);
        }
    }, [props.question.statement]);

    useEffect(() => {
        setQuestionAnswer(props.question.answer);
    }, [props.question.answer]);

    useEffect(() => {
        isEditing && updateRef.current && updateRef.current.focus();
    }, [isEditing]);

    useEffect(() => {
        if (showingAnswer && !questionAnswer) {
            setIsEditingAnswer(true);
        }
        if (!showingAnswer && !questionStatement) {
            setIsEditing(true);
        }
    }, [showingAnswer]);

    useEffect(() => {
        isEditingAnswer && updateAnswerRef.current && updateAnswerRef.current.focus();
    }, [isEditingAnswer]);

    const saveUpdate = () => {
        setIsEditing(false);
        if (props.question.statement != questionStatement && !!questionStatement && !!questionStatement.trim())
            studyApi.updateQuestion({ ...props.question, statement: questionStatement }, props.reload);
    };

    const saveAnswerUpdate = () => {
        setIsEditingAnswer(false);
        if (props.question.answer != questionAnswer && !!questionAnswer && !!questionAnswer.trim())
            studyApi.updateQuestion({ ...props.question, answer: questionAnswer }, props.reload);
    };

    const saveDifficultyUpdate = (diff: QuestionDifficultyType) => {
        studyApi.updateQuestion({ ...props.question, difficulty: diff }, props.reload);
    };

    const deleteItem = (id: number) => {
        studyApi.removeQuestion(id, props.reload);
    };

    const getDiffClass = (diff: QuestionDifficultyType) => {
        return props.question.difficulty == diff ? 'e-selected' : '';
    }

    return (
        <Col className="e-question-block-col e-flipper-container" xs={3} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
            <div className={showingAnswer ? 'e-question-block e-question-answer-block' : 'e-question-block'}>
                <div className={props.question.answer ? "e-question-statement-side" : "e-question-statement-side e-question-no-answer"}>
                    <div className='e-question-actions'>
                        {isHovering && <DeleteButton className='e-pull-right' onClick={() => deleteItem(props.question.id)} />}
                        {isHovering && <span className="" onClick={() => setShowingAnswer(!showingAnswer)}>{' FLIP '}</span>}
                    </div>
                    <div className="e-question-text">
                        {!isEditing
                            ? <span>
                                <Row className="e-question-question" onClick={() => setIsEditing(true)}>
                                    {!props.question.statement.includes("http")
                                        ? <>{props.question.statement}</>
                                        : <img src={props.question.statement} />
                                    }
                                </Row>
                                <Row className="e-question-difficulties">
                                    <Col xs={2} onClick={() => saveDifficultyUpdate(0)}><div className={getDiffClass(0)}></div></Col>
                                    <Col xs={2} onClick={() => saveDifficultyUpdate(1)}><div className={getDiffClass(1)}></div></Col>
                                    <Col xs={2} onClick={() => saveDifficultyUpdate(2)}><div className={getDiffClass(2)}></div></Col>
                                    <Col xs={2} onClick={() => saveDifficultyUpdate(3)}><div className={getDiffClass(3)}></div></Col>
                                    <Col xs={2} onClick={() => saveDifficultyUpdate(4)}><div className={getDiffClass(4)}></div></Col>
                                    <Col xs={2} onClick={() => saveDifficultyUpdate(5)}><div className={getDiffClass(5)}></div></Col>
                                </Row>
                            </span>
                            : <Input
                                ref={updateRef}
                                inputName={'Question'}
                                value={questionStatement}
                                handleInputChange={setQuestionStatement}
                                onBlur={saveUpdate}
                                removeBottomMargin />
                        }
                    </div>
                </div>
                <div className='e-question-answer-side'>
                    <div className='e-question-actions'>
                        {isHovering && <DeleteButton className='e-pull-right' onClick={() => deleteItem(props.question.id)} />}
                        {isHovering && <span className="" onClick={() => setShowingAnswer(!showingAnswer)}>{' FLIP '}</span>}
                    </div>
                    <div className="e-question-text">
                        {!isEditingAnswer
                            ? <span onClick={() => setIsEditingAnswer(true)}>{props.question.answer || "Add Answer +"}</span >
                            : <Input
                                ref={updateAnswerRef}
                                inputName={'Question Answer'}
                                value={questionAnswer}
                                handleInputChange={setQuestionAnswer}
                                onBlur={saveAnswerUpdate}
                                removeBottomMargin />
                        }
                    </div>
                </div>
            </div>
        </Col>
    )
}

export default QuestionBlock;