import { Col, Row } from 'react-bootstrap';
import GameQuestionCategory, { GameQuestion } from 'models/study/GameQuestionCategory';
import GameQuestionBlock from './GameQuestionBlock';
import Player from 'models/study/Player';
import { useState } from 'react';

interface Props {
    categoryWithQuestions: GameQuestionCategory;
    players: Player[];
    toggleReload: boolean;
    reload: () => void;
}

const QuestionCategoryColumn = (props: Props) => {
    const [blurred, setBlurred] = useState<boolean>(true);

    return (
        <Col className='e-study-column'>
            <Row>
                <Col className='e-study-column-title' onClick={() => setBlurred(false)}>
                    <span>
                        <p className={blurred ? 'e-blurred-text e-clickable' : 'e-unblurred-text'}>
                            {props.categoryWithQuestions.name}
                        </p>
                    </span>
                </Col>
            </Row>
            {props.categoryWithQuestions.gameQuestions.filter(q => !q.isFinal).map((question: GameQuestion) => {
                return <GameQuestionBlock
                    question={question}
                    key={question.id}
                    toggleReload={props.toggleReload}
                    players={props.players}
                    reload={props.reload} />
            })}
        </Col >
    )
}

export default QuestionCategoryColumn;