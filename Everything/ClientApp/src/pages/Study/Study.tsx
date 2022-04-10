import Input from 'components/Form/Input';
import Page from 'components/Layout/PageLayout';
import Game from 'models/study/Game';
import QuestionCategory from 'models/study/QuestionCategory';
import React, { useEffect, useRef, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import studyApi from 'services/apis/study-api';
import { handleRawInputChange } from 'services/form-helpers';
import GameBlock from './GameBlock';
import QuestionCategoryBlock from './QuestionCategoryBlock';
import './Study.scss';

const Study = () => {
    const [games, setGames] = useState<Game[]>([]);
    const [questionCategorys, setQuestionCategorys] = useState<QuestionCategory[]>([]);
    const [blurred, setBlurred] = useState<boolean>(true);

    const [newQuestionCategory, setNewQuestionCategory] = useState<QuestionCategory>(new QuestionCategory());
    const [isAddingQuestionCategory, setIsAddingQuestionCategory] = useState<boolean>(false);

    const [newGame, setNewGame] = useState<Game>(new Game());
    const [isAddingGame, setIsAddingGame] = useState<boolean>(false);

    const addRef = useRef<HTMLInputElement>(null);
    const addGameRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        loadQuestionCategorys();
        loadGames();
    }, []);

    useEffect(() => {
        isAddingQuestionCategory && addRef.current && addRef.current.focus();
    }, [isAddingQuestionCategory]);

    useEffect(() => {
        isAddingGame && addGameRef.current && addGameRef.current.focus();
    }, [isAddingGame]);

    const loadQuestionCategorys = () => {
        studyApi.getQuestionCategories(setQuestionCategorys);
    }

    const loadGames = () => {
        studyApi.getGames(setGames);
    }

    const saveQuestionCategory = () => {
        if (!!newQuestionCategory.name && !!newQuestionCategory.name.trim())
            studyApi.createQuestionCategory(newQuestionCategory, loadQuestionCategorys);
        setNewQuestionCategory(new QuestionCategory());
        setIsAddingQuestionCategory(false);
    }

    const saveGame = () => {
        if (!!newGame.name && !!newGame.name.trim())
            studyApi.createGame(newGame, loadGames);
        setNewGame(new Game());
        setIsAddingGame(false);
    }

    return (
        <Page title="Study" classNameExtension='study'>
            <Col className="e-study-categories-column">
                <Row>
                    <Col className='e-study-categories-title'>
                        <p onClick={() => setBlurred(!blurred)}>Categories</p>
                    </Col>
                </Row>
                <Row>
                    {questionCategorys.map((questionCategory: QuestionCategory) =>
                        <QuestionCategoryBlock
                            key={questionCategory.id}
                            questionCategory={questionCategory}
                            reload={loadQuestionCategorys}
                            blurred={blurred} />
                    )}
                    <Col sm={3} className='e-study-block e-add-study-block'>
                        {!isAddingQuestionCategory
                            ? <p onClick={() => setIsAddingQuestionCategory(true)}>+</p>
                            : <>
                                <Input
                                    ref={addRef}
                                    inputName={'Category Name'}
                                    value={newQuestionCategory.name}
                                    handleInputChange={handleRawInputChange([newQuestionCategory, setNewQuestionCategory], "name")}
                                    onBlur={saveQuestionCategory} />
                            </>}
                    </Col>
                </Row>
            </Col>
            <Col className='e-study-column'>
                <Row>
                    <Col className='e-study-column-title'>
                        <p>Games</p>
                    </Col>
                </Row>
                {games.map(game =>
                    <Row>
                        <GameBlock game={game} reload={loadGames} />
                    </Row>
                )}
                <Row>
                    <Col className='e-study-block e-add-study-block'>
                        {!isAddingGame
                            ? <p onClick={() => setIsAddingGame(true)}>+</p>
                            : <>
                                <Input
                                    ref={addGameRef}
                                    inputName={'Game Name'}
                                    value={newGame.name}
                                    handleInputChange={handleRawInputChange([newGame, setNewGame], "name")}
                                    onBlur={saveGame} />
                            </>}
                    </Col>
                </Row>
            </Col>
        </Page >
    )
};

export default Study;